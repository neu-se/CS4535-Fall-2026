# Measured on Postgres 16.14, container `cs4535-rls-demo`, 2026-09-12
shared_buffers=512MB, work_mem=32MB, single-threaded unless noted.

## A. Storage and indexes (table `gcs_big`)
20,000,000 rows | 1754 MB heap | 224,450 pages of 8 kB | 89 rows per page | index on student_id = 131 MB

| Query | Time | Pages touched |
|---|---|---|
| read every row (forced seq scan) | 3133 ms | 224,450 |
| one student's 200 scores, no index | 1353 ms | 224,450 |
| one student's 200 scores, with index | 0.1 ms | 6 |

## B. RLS policy cost (table gradebook_column_students, 213,000 rows; query returns 105,000)
Instructor opens one class gradebook: `select id, student_id, score from gradebook_column_students where class_id = 1`

| Policy predicate | Time |
|---|---|
| `true` (no check) | 22.7 ms |
| `authz_plpgsql(class_id)` plpgsql STABLE SECURITY DEFINER over user_roles | 1336.7 ms |
| `authz_sql(class_id)` LANGUAGE sql STABLE over user_privileges (invoker) | 1778.7 ms |
| inline `EXISTS (... user_privileges ...)` | 57.1 ms |
| `class_id IN (subquery)` | 32.5 ms |

Function call count confirmed via pg_stat_user_functions: 105,000 calls, one per row, for both helpers.
SECURITY INVOKER vs DEFINER on the same sql helper: 1793 ms vs 1145 ms (inner table's own RLS runs per call).

## C. Group-table policies (8 groups per class, 150 columns in class 1)
Header query (150 columns LEFT JOIN 8 groups): inline 0.4 ms | plpgsql helper 2.9 ms | no class_id, reach via gradebooks 1.9 ms
Whole-gradebook query (105,000 scores JOIN columns JOIN groups): all three ~60 ms (groups hash-joined once, 8 rows)

## D. Correctness demos (all reproduced)
1. Group policy scoped only by gradebook_id: student in class 2 sees 8 groups from each of 10 classes (80 rows).
   With `class_id IN (caller's classes)`: sees 8, class 2 only.
2. class_id checked but gradebook_id not: instructor of class 1 inserts (class_id=1, gradebook_id=2) successfully.
   Composite FK `(gradebook_id, class_id) REFERENCES gradebooks(id, class_id)` rejects it; the honest row still inserts.
3. SELECT policy gates the NEW row of an UPDATE. With `FOR UPDATE ... WITH CHECK (true)`, an instructor of class 1
   still cannot set class_id=2 while a restrictive SELECT policy exists; relax the SELECT policy to `true` and the
   same UPDATE succeeds. Confirmed against the CREATE POLICY docs table: for UPDATE, the SELECT/ALL USING expression
   is "Filter existing row & check new row" (footnote: when read access to either row is required).
4. Superusers bypass RLS entirely (BYPASSRLS), so the `postgres` role sees all rows even under FORCE ROW LEVEL SECURITY.

## E. DRAM pricing (Counterpoint Research via Network World, TrendForce)
- DRAM up ~50% YTD 2025, +30% Q4 2025, +20% early 2026
- Samsung 32GB DDR5 module: $149 -> $239 in September 2025 (+60%)
- DDR5 64GB RDIMM projected to cost 2x by end of 2026 vs early 2025
- TrendForce: conventional DRAM contract prices +58-63% QoQ in 2Q26; +13-18% QoQ in 3Q26
- SK Hynix: HBM/DRAM/NAND capacity sold out through 2026
