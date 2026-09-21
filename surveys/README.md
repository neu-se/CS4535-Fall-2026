# Survey definitions

SurveyJS JSON for the assignments that hand in through a Pawtograder survey. Not part of the
Docusaurus build; these files exist to be pasted into the survey editor and to keep the questions
under version control alongside the handout that describes them.

| File | Assignment | Opens | Closes |
|---|---|---|---|
| `ticket-hunt.survey.json` | [The Ticket Hunt](../docs/assignments/ticket-hunt.md) | Wed Sep 9 | Wed Sep 16, 23:59 ET |
| `project-bids.survey.json` | [Project Bids](../docs/assignments/project-bids.md) | Wed Sep 9 | Thu Sep 17, 23:59 ET |
| `reading-bid.survey.json` | [Reading Presentation](../docs/assignments/reading-presentation.md#how-you-get-your-reading) | Wed Sep 9 | Thu Sep 24, 23:59 ET |

All three were checked against `survey-core` 3.0.3: the JSON loads, every declared question type
survives the round trip, all `visibleIf` and validator expressions parse, and the conditionals and
validators behave as intended (bad URLs rejected, unchecked attestations blocking, panel-scoped
conditions independent per panel, the reading bid accepting exactly three ranked readings and
rejecting two or four).

## What the definitions assume

- **Identity comes from Pawtograder.** None of the three asks for a name or an email.
- **Resubmission is how a bid changes.** Both bid handouts tell students they can change their
  minds until the deadline, Sep 17 for projects and Sep 24 for readings, which means the platform
  has to keep the latest response per student.
- Question types used beyond the basics: `ranking` (both bids), `paneldynamic` (hunt and project
  bids), `panel` with `visibleIf` (both bids), and `expression` validators (all three).
  `"showProgressBar": "top"` is the v1/v2 spelling and still loads in v3.
- **The reading bid ranks three of thirteen, not all thirteen.** It uses `selectToRankEnabled` with
  `minSelectedChoices` and `maxSelectedChoices` set to 3, which is why its ranking question looks
  different from the project bid's drag-all-seven. `maxSelectedChoices` stops a fourth item being
  dragged in, but it raises no validation error on a value set any other way, so the question also
  carries an `expression` validator on `{preferences.length}`.

## Things worth changing deliberately

- **Character minimums.** `case_first` and `case_second` require 200 characters, and the hunt's
  `why` fields require 60. Both are floors against one-line answers, not targets. Lower them if
  they push anybody toward padding.
- **The hours question** at the end of the hunt is required. It exists because the assessment
  design treats a stalled student as evidence that a task was mis-sized, so the number is worth
  having even though nothing is graded on it.
- **`t1_*` is fixed to the student role** and `t2_role` offers the other three, matching the
  handout's rule that the first ticket comes from using Pawtograder as yourself. If that rule
  relaxes, ticket 1 needs a role question too.
- **The veto question** (`unhappy_on`) is required, with an explicit "None of them" choice, so a
  blank answer can't be read as either an omission or a veto.
- **The reading bid asks nothing about who you want to present with.** Pairing is ours to make and
  carries no constraint, so a preference question would collect input we don't act on.
- **`why_*` caps at 300 characters rather than flooring.** The handout asks for one sentence each,
  so the validator pushes the other way from the project bid's 200-character minimums. The artifact
  question keeps a 60-character floor, because "this reminds me of our gradebook" is the failure
  mode named in the handout.
- **`artifact_first` asks only about the first choice**, and says in its description that naming an
  artifact isn't a commitment to bringing that one. Ask for all three and most of the answers will
  be padding.
