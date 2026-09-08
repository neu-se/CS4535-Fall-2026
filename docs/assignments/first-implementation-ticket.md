---
title: "First Implementation Ticket"
description: Oct 15 – Oct 29. One change owned end to end, through review, merge, deploy and whatever happens next
sidebar_position: 5
---

# First Implementation Ticket

**Assigned:** Thu Oct 15 · **Merged by:** Thu Oct 29 · **Feeds:** a **Pass** requirement, and evidence toward the **Distinction** requirement *a feature owned end to end*

:::warning Draft
This handout is a draft and will change before the semester begins.
:::

## Overview

Onboarding taught you to read the codebase, by cutting one vertical slice through it. This one is about owning a change to it, and unlike onboarding, **this one ships.**

The difference is the last two steps. In onboarding your work ended at a pull request that never merged. Here it ends when the change is **running**, behind a course feature flag in your team's demo class on staging, and you have gone and looked at what happened. Deploying it is part of the assignment. So is what you do if it goes wrong. Every project you do after this is a longer version of this loop.

## Learning Outcomes

By completing this assignment, you will:

- **Take a change from problem through design, implementation, review, merge, deploy and observation**, including the stages on either side of writing the code ([LO3](/syllabus#grading))
- **Design for operability** with a test that fails without your fix, a rollback sentence you could execute, and a flag if the change is user-visible and unfinished ([LO5](/syllabus#grading))

## Picking one

Bigger than a single-file fix, much smaller than your project. Two tests that work:

- It touches more than one layer. A UI change and the query behind it. An edge function and the schema it reads. A CI workflow and the test it runs. If it lives in one file in one layer, it is too small for this.
- You can say what "done" looks like in one sentence, and that sentence mentions a user. If you can't, you don't understand the ticket yet, which is fine on Oct 15 and a problem by Oct 19.

Where to look: the **`cs4535-first-ticket` pool**, published Sep 17 and built by the class during [the ticket hunt](./ticket-hunt.md). You may not claim a ticket you filed yourself; reading code somebody else chose, and understanding a problem as somebody else described it, is the point.

If nothing in the pool suits, the open issue list is fair game, as is something you tripped over while building column groups.

### Start from your spike

You spent the async sprint investigating one thing in your team's area. That artifact is where this ticket should come from: you now know something about your project that you did not know on Oct 1, and the useful version of this assignment is shipping the change your own investigation says is worth making.

Pick by Mon Oct 19. You have two weeks, Game Day 1 lands in the middle of them on Oct 22, and a ticket chosen on Oct 24 gets four working days. Four days is how you end up opening the PR at midnight on the 28th.

## What end to end means

The checklist below is not ceremony. Every line on it corresponds to something that has broken a deploy on this codebase.

1. **A branch**, cut from current `main`, and pushed to `pawtograder/platform` itself. A pull request from a fork gets the lint lane and nothing else, because the end-to-end job runs PR code on the project's own machines and won't do that for a fork. [Local Development](../local-dev.md) covers what CI does with your PR, along with the commands to run the same checks locally first.
2. **A PR description** that says what changed, why, and how you tested it. If a reader has to open the diff to find out what the PR does, the description isn't finished.
3. **Tests where the change warrants them.** A bug fix gets a test that fails without the fix. That case is not negotiable, because it is the only proof you fixed the thing you think you fixed. Other changes should say in the PR what they test and what they deliberately don't.
4. **CI green before you request review.** Asking somebody to review a red PR spends their attention on your build.
5. **A rollback sentence.** One line: if this turns out to be wrong in production, what do we do? Revert cleanly? Flip a flag? Fix forward with a migration? Writing this sentence changes the design more often than you'd expect. A change with no clean revert is a different change.
6. **Peer review first, then the instructor if it warrants it.** As [code review](./code-review.md) explains, there is no TA tier, so your classmate's read is most of the review this PR will get. Your peer is a teammate. If the change touches another team's area, ask a reviewer there instead.
7. **Address the review.** Don't just comply with it. If a reviewer is wrong, say why, with evidence. Quietly force-pushing over a comment is the one behavior on this list that is a real problem rather than a rough edge.
8. **Merge to staging, then watch it deploy.** Confirm it is live in your team's demo class. Click the thing. Look at Sentry for anything new in your area. The instructor promotes staging to production periodically, so this is the last gate before real users see it. Then post the verification in your team's channel: the PR link, the deploy timestamp, what you clicked, and what Sentry showed. That post is the evidence for this requirement.
9. **A course feature flag, if the change is user-visible and unfinished.** Not every ticket needs one, and reaching for a flag you do not need is its own mistake: a flag is a promise that something is incomplete, and a codebase full of flags nobody retires is worse off than one with none. Over fifteen hundred people use this product every week, though, and not one of them agreed to test a half-built feature.

Steps 8 and 9 are what this assignment has that nothing you have submitted before did. There is no "turn it in." There is "it's live, and I went and looked."

## If it goes wrong after it ships

Then fixing it is part of this assignment, not a separate misfortune that happened to you.

Revert first, diagnose second. Reliably Releasing Software, back on Sep 17, is about precisely this. Re-read it before you deploy. A change that you shipped, broke, reverted inside the hour, and landed correctly two days later is a **better** submission than one that happened to work the first time. Put all of it in the PR. That history is the most interesting thing about your submission.

## If it doesn't merge

Some tickets are bigger than they look. Sizing a ticket you have not opened is guesswork, and the guess is sometimes wrong.

**What passes:** you took a ticket, worked it, found the reason it was larger than advertised, wrote that reason down in the issue, scoped down to something shippable, and shipped that instead.

**What doesn't:** silence. A ticket you sat on for two weeks and mentioned to nobody is the exact failure this assignment is built to catch. The damage comes from the missing information rather than the missing feature. The thirty-minute rule in the [syllabus](/syllabus#communication) exists for this, and two weeks is a lot of thirty minutes.

**If your PR is ready and nobody has reviewed it.** Ask for a second reviewer in Discord after 48 hours, and tell the instructor after 72. A PR that was review-ready, publicly chased, and then blocked on somebody else meets this requirement on the date it was ready rather than the date it merged. What you have to be able to show is the timestamp: the PR was green, described, and asked for. Waiting quietly is not chasing.

## Grading Rubric

Merging and deploying this is a **Pass** requirement. Steps 5, 8 and 9 are the rollback sentence, watching it deploy, and the flag. Doing those three well is most of what the **Distinction** requirement *a feature owned end to end* is asking for. The piece this assignment does not require, and that requirement does, is the dashboard or query you would actually check afterwards. Add one and this ticket carries the whole requirement.

| Expectation | Standard |
|---|---|
| **Scope** | Touches more than one layer; lands as one reviewable PR, or a stacked series with a stated plan |
| **PR quality** | What, why, how you tested, and the rollback sentence, all present *before* review is requested |
| **Tests** | A bug fix has a test that fails without it; other changes justify what they cover and what they don't |
| **Review** | Peer review before any escalation; comments answered within 48 hours; disagreement argued rather than ignored |
| **Landed** | Merged to staging by Oct 29, and you verified it running in your team's demo class |
| **Ops** | Unfinished user-visible work sits behind a flag; you checked Sentry after the deploy |

### What strong looks like

The description tells you what the change does without opening the diff. The rollback sentence is specific enough to execute at 2am by someone who has never seen your code. A reviewer asked a question, you disagreed, and the thread ends somewhere better than either of you started. It deployed on Oct 26 and you said so in Discord.

### What weak looks like

A PR opened Oct 28 at 23:00. "Fixed the bug" as a description. Tests that assert the implementation rather than the behavior. A green CI you obtained by deleting the assertion. A merged PR you never confirmed had actually deployed. A ticket that turned out to be fixed by somebody else's PR two weeks earlier, which reading the issue would have told you.

## Dates

| | |
|---|---|
| Assigned at Demo Day 1 | Thu Oct 15 |
| Pick your ticket | by Mon Oct 19 |
| Game Day 1, mid-window | Thu Oct 22 |
| Merged to staging and verified | Thu Oct 29 |
| Demoed at Demo Day 2 | Thu Oct 29 |
| Feedback returned | ~Mon Nov 2 |
