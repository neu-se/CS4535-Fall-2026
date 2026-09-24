---
title: "Cost and Signal Worksheet"
description: Prevent a possible failure if you can, then decide which layers go on top - test, detect, recover - or accept it. Walks through five ways the gradebook column-groups feature could fail. Used in the Sep 24 session and afterwards on your own project area.
sidebar_position: 5
---

# Cost and Signal Worksheet

You've found a way the system could break. The first question is whether you can design it out. The second is what goes on top, because a guard is code too, and nothing is impossible until you have checked.

**First: can you prevent it?**

| | What it means | What it costs, forever |
|---|---|---|
| **Prevent** | A guard, a constraint, a type, a foreign key that refuses the bad state | A branch that must be read and maintained, and that is only a guard if it actually holds |

**Then: which layers go on top?** Tick every one it deserves. The layers stack on each other and on Prevent, so you can pick several.

| | What it means | What it costs, forever |
|---|---|---|
| **Test** | An assertion that fails before it ships, including a test that the guard holds | Authoring, plus runtime on every run, plus the time spent chasing false failures |
| **Detect** | A probe, an alert, and a playbook for when it fires | Instrumentation, threshold tuning, and somebody carrying the pager |
| **Recover** | A way to undo it: a backup you have restored from, a down migration, a flag you can turn off | Storage, drills, and the discipline to run the drills |
| **Accept** | None of the above, on purpose. Write down why it's survivable | Nothing, if you were right. The incident, if you were wrong |

**Blast radius decides how deep the stack goes.** A failure that can lose a semester of grades gets a guard, a test of the guard, a backup, a restore drill, and an alert when the backup doesn't run. A failure a human can fix by hand in a minute gets one sentence in the pull request.

**Every layer needs its own evidence that it works.** A backup you've never restored from doesn't count as a layer yet. A constraint you have never tried to violate might be on the wrong column.

**Accept is a real engineering decision when you can defend it.** It's only legitimate when you can say why: the blast radius is small, the failure announces itself, a human can fix it by hand, or the cost of the alternative exceeds the cost of the failure. "I didn't get to it" isn't the same sentence as "I decided not to, and here is the reason." Accept is also the only choice that excludes the others, since it means zero layers.

> **In class on Thu Sep 24:** [print the one-page worksheet](pathname:///worksheets/cost-and-signal.html), one per pair, and bring a pen. The sheets are collected and scanned, and become test data for the paper-exam grading project. They're used inside this course only, and are never published or shared outside the class. Say so in the room if you would rather yours were not used.

## The four questions

For each candidate failure, answer these before you decide what it gets.

1. **How bad is it when it happens?** Ask about severity here, not likelihood. One student's grade is wrong, or every course loses the gradebook.
2. **How would you find out?** Immediately from a crash, within an hour from an alert, or in November from a student.
3. **Can you undo it?** A flag you can flip in thirty seconds is a different risk from a migration that has already run. If the answer is no, ask whether you could build a way.
4. **What does the fix cost forever?** Count what it costs the next person who reads the file, beyond what it costs to write.

Likelihood is the question students reach for first and it is the least useful of the four. A one-in-a-thousand failure that silently corrupts grades outranks a daily annoyance that announces itself.

## The five candidates

All five are ways a column-groups feature could go wrong. You just spent two weeks building one, so you already know everything you need to judge them. Where a candidate depends on a choice you made in your own migration, it says so.

### A. The backfill puts a column in the wrong group, and it looks plausible

Your backfill reads the existing columns in every course and assigns each one to a group. In one course, with a slug shape the seed doesn't have, one column ends up in a neighboring group instead of its own. The gradebook renders, every header is there, and the grouping looks like a choice somebody could have made.

> **Why it happens:** the heuristic you replaced has special cases (`assignment-<type>-*`, the `sort_order` contiguity check), and a backfill that reimplements it can disagree with it on exactly the inputs nobody seeded.

### B. The gradebook is fine on the seed, and crawls for our biggest course

The `cs4535` seed is one small class. CS 2100 is 500 students and 400 columns, and it is the course that uses Pawtograder hardest. The gradebook page loads groups, columns and scores together, and on that course it takes long enough to load that instructors give up on it.

> **Why it happens:** a query that is cheap for 40 columns can be expensive for 400, especially if the group lookup runs once per column, or an RLS policy on your new table does extra work per row.

### C. A new column can't be filed into its group, because the group was just deleted

When an assignment is released, a background job creates its gradebook column and puts it in the right group. If an instructor deletes that exact group in the same second, the job fails. The job isn't lost. It lands in a failed-jobs queue (a *dead-letter queue*) where someone can look at it and retry it by hand.

Until then, the new column sits in the gradebook ungrouped. No scores are affected. For this to happen at all, an instructor has to delete a group at the same moment an assignment in it is being released.

> **Why it happens:** the job reads the group, then writes the column. Between those two steps, nothing stops the group from disappearing. Closing that gap means locking, or retry logic that decides what an orphaned column should become.

### D. Deleting a group deletes its columns, and every student's scores in them

An instructor deletes a group they no longer want, expecting its columns to become ungrouped. Instead the columns go with it, and so does every student's score in every one of those columns.

> **Why it happens:** it depends on the foreign key you wrote. If the column's reference to its group is `ON DELETE CASCADE`, deleting a group deletes its columns, and the scores cascade from there. Go and check what yours says.

### E. Instructors open the new group editor, get confused, and give up

You ship create, rename and reorder for groups. Instructors open the editor, don't understand what dragging a column between groups will do, and close it without changing anything. Nothing errors, and every test passes.

> **Why it happens:** tests check that the editor does what you built. They can't check that what you built is what an instructor expected.

## An example row

The candidate: **an instructor can create a group with an empty name.**

| Question | Answer |
|---|---|
| How bad? | A header with no text above some columns. Confusing, not dangerous. |
| How would you find out? | The instructor who did it would see it straight away. |
| Can you undo it? | Yes, trivially: rename it. |
| **Prevent?** | **Yes.** One `CHECK (length(trim(name)) > 0)` in the migration. |
| **Then** | Nothing more. The failure is visible and harmless, so the guard doesn't need a test, an alert or a backup behind it. |

The cost of the fix decided this row. Severity was low, and likelihood didn't come into it. When prevention is nearly free and lives in the schema, prevent. And because the blast radius is small, stop there.
