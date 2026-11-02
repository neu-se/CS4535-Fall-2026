# Rubric definitions

Pawtograder rubrics in the CLI's YML format, kept under version control alongside the handouts
that describe them.

| File | Assignment | Type | Max |
|---|---|---|---|
| `ticket-hunt.rubric.yml` | [The Ticket Hunt](../docs/assignments/ticket-hunt.md) | grading | 3 |
| `hw1-onboarding.rubric.yml` | [Onboarding: Gradebook Column Groups](../docs/assignments/onboarding-column-groups.md) | grading | 4 |
| `team-charter.rubric.yml` | [Team Workspace & Charter](../docs/assignments/team-charter.md) | grading | 1 |
| `checkpoint-1.rubric.yml` | [Checkpoints](../docs/assignments/checkpoints.md#checkpoint-1) | grading | 1 |

## Importing

```bash
pawtograder rubrics import -c 636 -a ticket-hunt -f rubrics/ticket-hunt.rubric.yml --dry-run
```

`--dry-run` resolves the file against the live rubric and prints what would change without
writing. Re-run without it to apply. `rubrics export` round-trips the same shape, so pulling
after a GUI edit and committing the result keeps the committed file matching the live rubric.

**Once grading has started, don't import these files as they are.** They carry no ids, so the
importer removes every live part, criterion and check and creates new ones. That throws away
any checks already applied to submission reviews. Export the live rubric first (it carries the
ids), copy the edits onto that export, and import the result. The dry run should then show
`Updating` and `Creating` with no `Removing` block.

## How the Ticket Hunt rubric is built

**Part 1 is the handout's grading table, unchanged.** Three criteria (tickets filed, triage,
honesty about scope) are each Met or Not yet, one point each. No partial credit, because the
assignment is a Pass requirement under task-oriented portfolio assessment: work either meets the
published standard or comes back for resubmission. Set the assignment to 3 points so Pass reads
as 3/3 at a glance.

**Part 2 carries no points.** It is a tick-list of the faults that actually recurred in the first
cohort, with `student_visibility: if_applied` so a student sees only the notes that were ticked.
Two clicks and a sentence is most of the feedback. Nothing in Part 2 changes the score on its own;
it only explains a Not yet.

Splitting it this way keeps a promise the assessment design makes: publish the conversion before
the term, and don't grade against criteria the student never saw. The Part 2 notes are diagnostic
vocabulary for feedback, and none of them is a grading criterion.

**The file carries no `ordinal` keys and no null-valued properties.** `lib/rubric/parse.ts`
assigns every ordinal from array position and ignores whatever the YAML says, and every nullable
field goes through `valOrNull`, so an absent property and an explicit `null` import identically.
`group` is hardcoded to null on import and is never read. Note that `rubrics export` writes the
verbose form, so a round-trip through the CLI will put the noise back, so strip it again before
committing.

## Things worth changing deliberately

- **"Verdict refuted on verification" is the most useful check.** In the first cohort,
  triage verdicts on classmates' same-day tickets were almost all correct, because "still real,
  filed two hours ago" is hard to get wrong. Verification only discriminated on items old enough
  to have plausibly been fixed. If the triage sources get tightened so same-day tickets are out of
  bounds, this check does more work and "Triaged a same-day ticket" can go.
- **Four of the Part 2 checks require a comment:** hypothesis-not-reproduction, mechanism
  asserted without checking, verdict refuted, and cited-evidence-not-in-the-item. Each is an
  accusation of sorts, and none should be applied without the specific claim that failed.
- **"Missing the cs4535-hunt tag" says tag, not label.** Students can't apply repository labels
  without triage permission, so the title tag is the agreed substitute and the form question that
  asks about the label should be reworded to match.
- **There is no criterion for the form.** The form only records that the work happened. The
  handout says we read the issues and the comments. Keep it that way, or
  the form becomes the deliverable.
- **Nothing here scores the number of tickets that survive into the pool.** Whether somebody else
  claims your ticket is neither graded nor in your control, and counting survivors would make it
  look otherwise.
