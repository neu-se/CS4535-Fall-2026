# Reproducing the numbers on the s03 slides

**Not published.** The leading underscore keeps Docusaurus from building this directory.

Every timing, page count and row count on `s03-data-and-security.mdx` was measured on a throwaway
Postgres 16 container, not estimated. If a student asks where a number came from, this is the answer.
`RESULTS.md` holds the raw output.

## Setup

```bash
docker run --rm -d --name cs4535-rls-demo \
  -e POSTGRES_PASSWORD=postgres -p 55432:5432 \
  postgres:16 -c shared_buffers=512MB -c work_mem=32MB

export PGPASSWORD=postgres
PSQL="psql -h 127.0.0.1 -p 55432 -U postgres -v ON_ERROR_STOP=1"

$PSQL -f 01-schema-and-data.sql     # ~10 classes, 213,000 gradebook_column_students rows
$PSQL -f 02-roles-and-helpers.sql   # authenticated role, the two authorize* helpers, RLS on
```

Then redefine `auth.uid()` to match the real Supabase one, which parses the JWT claims out of a GUC.
This matters: a cheaper `auth.uid()` understates the per-row cost by a large margin.

```sql
create or replace function auth.uid() returns uuid language sql stable as $$
  select coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;
```

To run a query as a given user, in one session:

```sql
set role authenticated;
set request.jwt.claims = '{"sub":"<uuid from user_privileges>","role":"authenticated"}';
explain (analyze, buffers, costs off) select ... ;
```

The storage numbers in Arc 1 use a second, larger table built the same way: 20,000,000 rows across
200 course-terms, which is 1,754 MB and 224,450 pages. See `RESULTS.md` section A for the generator
and the three measurements.

## Two things I got wrong first, which are worth keeping

**The reach-through policy is not a leak on its own.** `gradebook_id in (select id from gradebooks)`
inherits the policy on `gradebooks`, so a student correctly sees only their own class. It only leaks
once a *second* permissive policy is added to `gradebooks`, because permissive policies OR together.
That is what Decision 1 in the deck demonstrates, and the first version of that slide claimed a leak
that does not exist. Do not re-simplify it back.

**A missing `WITH CHECK` is not the bug.** Postgres reuses `USING` as `WITH CHECK` on a `FOR ALL`
policy. The bug is a `WITH CHECK` written looser than `USING`, usually `with check (true)`. And even
that is partly caught by the `SELECT` policy, which for `UPDATE` is applied to the new row as well as
the existing one. The deck states it that way.

## Caveats to state in the room

- A container on a laptop, single-threaded, medians of five runs. The ratios are the point.
- `shared hit` versus `read` is a statement about Postgres's own pool. A `read` may still have been
  served by the operating system's page cache rather than the device.
- Whether the planner can hoist a policy subquery into an `InitPlan` depends on the query, not only
  on the policy. The same policy can be cheap in one query and expensive in another.
