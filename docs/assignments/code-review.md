---
title: "Code Review"
description: Continuous. Review supplies requirements at every band, and there is nobody below you to catch what you miss
sidebar_position: 7
---

# Code Review

**Runs:** Sep 17 – Dec 10, continuously · **Feeds:** requirements at **every band**, see the [bands](/syllabus#letter-grade-requirements)

:::warning Draft
This handout is a draft and will change before the semester begins.
:::

## Overview

There is no TA in this course. A pull request in Pawtograder gets read by a classmate, and then, if it touches something architectural or risky, by the instructor.

Which means that in this course, peer review is the real review.

Over fifteen hundred people use this product every week, and in January the number goes up and the users are more courses than the eight running this term, and none of them have any idea who you are. Review is the last cheap place to catch a mistake. After review, catching it costs an incident.

## Learning Outcomes

By reviewing continuously through the term, you will:

- **Review others' work substantively, and respond to review** on your own PRs within 48 hours ([LO4](/syllabus#grading))
- **Collaborate on a shared codebase** by reading outside your own project area, where what you learn about a subsystem counts as much as what you catch in it ([LO7](/syllabus#grading))

## What a review is actually for

A review does four things, none of them gatekeeping. They matter roughly in this order:

1. **Catches what the author couldn't see.** They've been staring at it for four hours. You have fresh eyes for twenty minutes. That asymmetry is the entire value.
2. **Spreads knowledge.** After you review the gradebook query layer, two people understand it. This is why reviewing outside your own area carries its own requirement.
3. **Creates a written record of why.** The thread on a PR is where "we considered X and rejected it because Y" gets preserved. Six months from now that thread is the only reason anyone knows.
4. **Sets the bar.** Whatever you let through becomes the standard. Approving a PR with no tests is a vote about what this codebase is.

Note that "finding bugs" is only part of the first one. A review that finds no bugs and teaches you a subsystem was still worth doing.

## Reviewing: what to look at, in order

Twenty minutes, spent in this order, gets most of the value. Stop when you run out of time. A partial review posted today beats a thorough one posted right at the deadline.

**1. Does the PR do what its description says?**

Read the description first, then the diff. The most common real problem in a PR is that it quietly does two things, one of which nobody asked for. Outright bugs are rarer. Say so: *"the description covers the query fix, but this also changes the default sort order. Is that intended?"*

**2. Would this break in production?**

This is the question [the checklist](#the-checklist) exists to answer, so work the entries that apply. The one judgment to make for yourself is **blast radius**. Is this on a path all 1,500 users touch, or a settings page three instructors use? Both are fine, but they warrant different scrutiny, and no checklist knows which one you're looking at.

**3. Is there a test that would have caught the thing this fixes?**

The question is narrower than "are there tests." A bug fix whose test passes *before* the fix is applied is a test-shaped object that tests nothing. If you can't tell, ask the author to show you the test failing.

**4. What happens when this turns out to be wrong?**

Every PR should be revertible or flagged. As a reviewer you check that the author's rollback sentence exists and could actually be executed by somebody who has never seen the code. "Revert the commit" is fine if it's true; it often isn't once a migration is involved.

**5. Will the next person understand it?**

Names that say what the thing is. No commented-out code. A comment wherever the *why* isn't recoverable from the *what*.

**What not to spend your review on:** formatting (prettier owns it, and CI runs `prettier --check`), naming that is merely different from what you'd have picked, and anything you'd preface with "personally I would have." You have twenty minutes; spend them on the four things above.

## The checklist {#the-checklist}

**This is a list of ways Pawtograder has actually broken,** rather than a list of good practice. Good practice is generic, and a generic checklist produces generic reviews. Every entry cites the thing that put it there.

**Work the entries that apply to the diff in front of you and ignore the rest.** A list this long does not mean a comment per entry. A two-line CSS change touches none of them, and a review that answers all of them anyway is the exact failure this format exists to avoid.

**1. Does this query trust the client to filter rows that RLS should be enforcing?**
*A `.eq("class_id", ...)` in a component is a convenience. The boundary is in Postgres.* The highest-consequence bug class in this codebase, and the one that hides best. The diff looks correct, the page renders correctly, and the data is exposed anyway. Covered in the Architecture II session on Sep 14.

**2. If this effect's dependency array is incomplete, what stale value does it capture?**
*15 `react-hooks/exhaustive-deps` suppressions are live in the tree, two of them in the gradebook.* The lint rule is not being pedantic. Each suppression is a hook closing over a value it promised to watch. Ask what the user sees when it goes stale.

**3. Does this migration have a down path, and does that path work on rows that already exist?**
*See `docs/operations/rollback.md`.* "Revert the commit" stops being true the moment a migration is involved. If there is no down path, that's allowed, but it has to be said out loud in the PR rather than discovered during an incident.

**4. On the failure path, does state end up consistent?**
*`supabase/functions/autograder-create-regression-test-run/index.ts:88`, "TODO update the submission status to failed."* A handler that returns early and leaves a submission marked in-progress is a student staring at a spinner forever. The happy path is the easy half.

**5. Would this failure be visible to anyone?**
*Seeded by the CI failure that ran for twenty hours without logging a single error anywhere, which is also Game Day 1.* Does anything log, alert, or tell the user? A silent failure is strictly worse than a loud one, and with 117 `no-console` suppressions in the tree, "it prints something" is not the same as "somebody will see it."

**6. Does the second delivery of this event do what the first one did?**
*`supabase/functions/_shared/ChimeWrapper.ts:221`, "This could race for two users trying to join the meeting concurrently."* Realtime events and webhooks arrive twice. Ask what happens when they do.

**7. Does every date in this diff go through the course's timezone?**
*`supabase/functions/assignment-group-approve-request/index.ts:34`, "TODO timezones."* Deadlines are the thing this product exists to enforce. A date formatted in the server's zone is an off-by-one-day for anyone outside Eastern, and it surfaces as a grade dispute rather than as a bug report.

**8. Can this be operated without a mouse, and does it announce what it is?**
*In [#913](https://github.com/pawtograder/platform/issues/913), all three survey radio options announce as "checked," so a screen-reader user cannot tell what they selected.* There are 12 open accessibility issues and 88 findings awaiting triage. For some of our users, a control with no accessible name is a control that does not exist.

### Adding an entry

The checklist is meant to grow. By December it should be longer than this, and the additions should come from you.

An entry is three things: **a question**, **a citation**, and **one sentence on what it would have caught**. The citation is an incident, a PR, an issue, or a line of code. Open a PR against this file.

The bar is that it has to have actually happened *here*. "Watch out for N+1 queries" is not an entry. "The gradebook did an N+1 on the submissions join, here is the PR that fixed it, and here is what the page load looked like before" is.

**A proposed entry counts as [cross-team contribution](#cross-team-contribution).** It is one of the cheapest ways to earn in that category and by far the most durable. In January the next cohort inherits this page, and a document that records how a system fails is the most expensive kind of knowledge to reacquire.

Every game day postmortem should end by asking whether it produced one.

## What "substantive" means

You are graded on the quality of the feedback, not the count of comments. Five categories count, and each one has to be earned:

| Substantive | Not substantive |
|---|---|
| "This throws if `submission` is null, which happens for a group assignment with no submitter: here's the row that does it." | "Might want to null-check this." |
| "This contradicts the decision in #841 to validate expressions strictly. Was that reconsidered?" | "Are you sure about this approach?" |
| "The test doesn't cover the resubmission window closing mid-request, which is the case that broke last time." | "Could use more tests." |
| "Why does this need a new provider rather than reading the existing `TimeZoneProvider`?" | "Seems complicated." |
| "Approving: I read the migration and the down path, and it's clean." | "LGTM" |

That last row matters, because an approval can be substantive. Saying what you actually checked is useful and it's honest; it also means that when you approve something you didn't read, that's visible too.

## Receiving review

The easiest requirement in the course to meet, and the easiest to throw away.

- Answer every thread within 48 hours, even if the answer is "I need a day on this one." Silence reads as avoidance whether or not you meant it that way.
- Disagreement is expected. A reviewer is a person with twenty minutes of context, and sometimes they're wrong. Argue with evidence, not assertion. Bring a test, a line of code, or a link to the decision.
- Resolving a thread is a claim that you addressed it. Resolving one you didn't is worse than leaving it open, because it hides the disagreement instead of recording it.
- Do not force-push over an open conversation. The comments detach, the history goes, and there is no way for anyone to reconstruct what was discussed. This is the one behavior in this handout that is a genuine problem rather than a rough edge. The [syllabus](/syllabus) lists it under academic integrity for exactly that reason.

The thing we're looking for is simple: did the PR get better because somebody reviewed it? Sometimes the answer is "no, and correctly so, because the reviewer was wrong and the author showed why." That's a good outcome too.

## Cross-team contribution {#cross-team-contribution}

With three or four teams in a room this small, "cross-team" mostly means **outside your own project area**:

- Reviewing a PR from another team, especially the ones nobody wants to read, such as CI config, migrations, and the seed script.
- Answering a question in Discord that somebody would otherwise have spent an afternoon on.
- Fixing shared infrastructure. The person who fixes the flaky test that everybody had been silently re-running is doing exactly the work this requirement is for, and it will never look like a feature.
- Writing something down. A note in `docs/` that saves the next person the search you just did, or an entry on [the checklist](#the-checklist).

This category rewards a specific instinct: noticing that a problem is everybody's and therefore nobody's, and picking it up.

## AI Policy

Reviewing is a great use of an agent. Point it at a subsystem you've never seen and ask what it does before you review a change to it. That's exactly the workflow we want you to build.

What doesn't work is **pasting an agent's review as your review.** Two reasons, and the first is practical: it's obvious. Generated reviews comment on every file at the same depth, flag the same five generic things, and never say *"this contradicts what we decided in #841"*, because the agent doesn't know your team decided anything.

The standard is a review only you could have written. You have the context an agent doesn't: the argument in Monday's clinic, the incident on Oct 22, the ticket you triaged in week one. Use it.

## Grading Rubric

Continuous, from GitHub history. There is nothing to submit. The artifact is your review record, and you link it in the Learning Summary Report.

Review supplies requirements at all four bands rather than forming a band of its own:

| Band | What review has to show |
|---|---|
| **Pass** | At least 6 substantive reviews, 2 of them outside your own team; every comment on your own PRs answered within 48 hours |
| **Credit** | At least 3 reviews where your comment changed the code |
| **Distinction** | A checklist entry you proposed on [the checklist](#the-checklist), with its citation; review and help delivered through your cross-project function |
| **High Distinction** | You made somebody else more capable. Review is where that usually happens first |

**What "changed the code" means.** A comment of yours, and then a commit on that branch, or a follow-up issue the author opened and linked, that exists because of it. "Good catch, I'll do it in a follow-up" plus the linked issue counts. A change you argued for and lost does not — but bring it to a checkpoint, because a record of three well-argued disagreements that went the other way is evidence we will take.

**If the PRs are not there.** The requirement is on your effort, not on your classmates' cadence. Ask in Discord when you need something to review and we will point you at an open PR, including ones we open. A requirement you could not meet because the supply failed is not held against you. What is held against you is discovering the shortfall in December.

**The 48-hour clock** counts weekdays and pauses over university holidays and Fall Break. It is judged on your record across the term rather than on a single thread. The failure mode is a pattern of silence rather than one lapse you flagged and cleared.

**You do not have to guess where you stand.** Your running count is one of the things checkpoints 1–3 (Oct 14, Nov 5, Dec 3) report back to you. If you want to know earlier whether a specific review landed as substantive, ask. The answer is cheap in October and useless in December.

| Expectation | Standard |
|---|---|
| **Reviews given** | The floor is 6 substantive reviews, 2 of them outside your project area. A review a week from Sep 28 is the cadence that gets you there without a December scramble. A review you were asked for is returned within 48 hours |
| **Review depth** | Works the checklist entries that apply, in your own words. Formatting-only reviews earn nothing, and neither does answering every entry on a diff that touches none of them |
| **Reviews received** | Every thread answered within 48 hours; disagreement argued with evidence; no force-push over an open conversation; resolved means addressed |
| **Cross-team** | Review and help outside your area; shared-infrastructure fixes; Discord answers that unblock somebody; notes and accepted checklist entries that save the next person a search |
| **Authorship** | A review only you could have written. Agent-assisted reading, human judgment |

### What strong looks like

You blocked a PR because the migration had no working down path, and the author was glad you did. You reviewed the CI change nobody wanted to read. You caught a query that trusted the client to filter rows RLS should have enforced, which is the highest-value catch available in this codebase. You disagreed with a reviewer, produced a failing test that proved your point, and the design changed. You said "you're right, I was wrong" in a public thread. After Game Day 2 you added a checklist entry naming the metric that stayed green while the pods died.

### What weak looks like

Eleven approvals reading "LGTM." A review record that touches only your own team. Comments exclusively about formatting that prettier already enforces. A thread marked resolved with nothing changed. A force-push that made a conversation disappear. Reviews that arrive four days after they were requested, on a PR that had already been merged out of impatience. A review that answers every checklist question on a two-line CSS change. A review that is visibly generated: uniform depth, generic findings, no knowledge of anything this team has ever decided.

## Milestones

| | |
|---|---|
| First PRs to review: onboarding column groups | Thu Sep 17 |
| Escalation: peer review first, instructor when the change touches RLS, a migration, auth or the autograder | Thu Sep 17 |
| Weekly cadence expected from | Mon Sep 28 |
| Review in the room: integration sessions | Wed Nov 4 · Mon Nov 16 |
| Last day reviews count | Mon Dec 7 |
