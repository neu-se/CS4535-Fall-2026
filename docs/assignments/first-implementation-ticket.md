---
title: "First Implementation Ticket"
description: Oct 15 – Nov 4. One change owned end to end, through review, merge, deploy and whatever happens next
sidebar_position: 5
---

# First Implementation Ticket

**Assigned:** Thu Oct 15 · **Review-ready:** Thu Oct 29 · **Merged:** Wed Nov 4 · **Feeds:** a **Pass** requirement, and evidence toward the **Distinction** requirement *a feature owned end to end*

## Overview

Onboarding taught you to read the codebase, by cutting one vertical slice through it. This one is about owning a change to it, and unlike onboarding, **this one ships.**

The difference is the last two steps. In onboarding your work ended at a pull request that never merged. Here it ends when the change is **merged and deployed to staging**, behind a course feature flag if it needs one. Getting it through review and merged is part of the assignment. So is what you do if it goes wrong. Every project you do after this is a longer version of this loop.

## Learning Outcomes

By completing this assignment, you will:

- **Take a change from problem through design, implementation, review, merge, deploy and observation**, including the stages on either side of writing the code ([LO3](/syllabus#grading))
- **Design for operability** with a test that fails without your fix, a rollback sentence you could execute, and a flag if the change is user-visible and unfinished or potentially breaking ([LO5](/syllabus#grading))

## Picking one

**Leave Demo Day 1 knowing your ticket.** You pick it in class on Oct 15, after the demos, while Jon is in the room to agree scopes. It has to be **XL**, and by Mon Oct 19 the scope has to be agreed with Jon in a comment on the issue.

### Start from your own project

Most of you should take a ticket from your own project. You spent the async sprint investigating one thing in your team's area, and that artifact, together with your Agents Activity analysis, is where this ticket comes from. You know something about your project now that you didn't know on Oct 1. The most useful version of this assignment is shipping the change your own investigation says is worth making.

Good places to look: the issues your team filed at the end of the sprint, the "for the team" or "next" section of your sprint artifact, and the tickets your Agents Activity analysis proposed. If the ticket doesn't exist yet, open it in class and tag Jon.

Steps 4 to 6 of the [Agents Activity](./agents-activity.md) are a good way to scope it. Plan it as a stacked series of PRs that you can each review line by line. Two tests for whether it's XL:

- It touches more than one layer. A UI change and the query behind it. An edge function and the schema it reads. A CI workflow and the test it runs. If it lives in one file in one layer, it's too small.
- You can say what "done" looks like in one sentence, and that sentence mentions a user. If you can't, you don't understand the ticket yet. That's fine on Oct 15 and a problem by Oct 19.

### One ticket, one owner

The point of this ticket is a contribution to your project that is clearly yours. Two ways of getting to XL are fine:

- **Combining.** If your team has a pile of small, related bugs, one person can take several of them as one XL ticket. They have to add up to one outcome for a user, and you own the whole stack.
- **Growing it with tests.** If your ticket is too small, write the end-to-end tests for the flow it belongs to, and fix what they find in the part you own. File issues for whatever they turn up in other people's parts. Your teammates own those.

What doesn't count is integrating for the team. When one person collects everyone's fixes into one big PR and merges it for them, that's useful coordination, but it isn't anyone's first ticket, including theirs. Each fix should arrive as its owner's PR, reviewed like any other.

### Or the pool

**If you already claimed an XL pool ticket during the Agents Activity, that's your first ticket.** Keep it, and you're done picking.

Most of the [`cs4535-first-ticket` pool](https://github.com/pawtograder/platform/issues?q=is%3Aopen+label%3Acs4535-first-ticket+label%3AXL) was claimed that way. As of Oct 14, two XL tickets are still free: [#467](https://github.com/pawtograder/platform/issues/467) (*An extension grades work the student already pushed*) and [#1026](https://github.com/pawtograder/platform/issues/1026) (*Course settings update live without the expensive database watcher*). Claim one by commenting on it. You may not claim a pool ticket you filed yourself.

Another open issue, or something you tripped over while building column groups, works the same way as a ticket from your own project: it counts once Jon agrees on the issue that it's XL.

### Why Oct 19

You have two weeks, and Game Day 1 lands in the middle of them on Oct 22. A ticket chosen on Oct 24 gets four working days. Four days is how you end up opening the PR at midnight on the 28th, with nothing reviewable at Demo Day 2.

## What end to end means

The checklist below is not ceremony. Every line on it corresponds to something that has broken a deploy on this codebase.

1. **A branch**, cut from current `staging`, pushed either to `pawtograder/platform` itself or to your fork. Both get the full CI run, including the end-to-end tests, as long as you have write access to the platform. [Local Development](../local-dev.md) covers what CI does with your PR, along with the commands to run the same checks locally first.
2. **A PR description** that says what changed, why, and how you tested it. If a reader has to open the diff to find out what the PR does, the description isn't finished.
3. **Tests where the change warrants them.** A bug fix gets a test that fails without the fix. That case is not negotiable, because it is the only proof you fixed the thing you think you fixed. Other changes should say in the PR what they test and what they deliberately don't.
4. **CI green before Oct 29.** Your assigned reviewers start then, and a red PR spends their attention on your build.
5. **A rollback sentence.** One line: if this turns out to be wrong in production, what do we do? Revert cleanly? Flip a flag? Fix forward with a migration? Writing this sentence changes the design more often than you'd expect. A change with no clean revert is a different change.
6. **Review-ready by Thu Oct 29.** Steps 1 to 5 done on every PR in the stack. At Demo Day 2 your team walks through its project board and each member's PR: what it changes, how it's tested, and its rollback sentence. Running it live is optional. Submit your issue and PR links in the **review-ready survey** on Pawtograder by 10:30 that morning, because that's how your reviewers get assigned.
7. **Two assigned reviewers.** On Oct 30 Jon assigns each stack two reviewers through the **Code Review 1** assignment in Pawtograder: one teammate and one from another team. Their reviews are due Mon Nov 2 at 11:59pm, and Monday's class is time to work on them with you in the room. As [code review](./code-review.md) explains, there's no TA tier, so these two reads are most of the review your PR will get. You'll review two stacks yourself.
8. **Address the review by Tue Nov 3 at 11:59pm.** Don't just comply with it. If a reviewer is wrong, say why, with evidence. Quietly force-pushing over a comment is the one behavior on this list that is a real problem. Everything else here is a rough edge.
9. **Jon merges to staging.** Once both reviews are addressed, Jon does a last read, merges, and checks that the deploy went through, all by Wed Nov 4. The instructor promotes staging to production periodically, so this is the last gate before real users see it. The merged PR is the evidence for this requirement.
10. **A course feature flag, if the change is user-visible and unfinished or potentially breaking.** Not every ticket needs one, and reaching for a flag you do not need is its own mistake: a flag is a promise that something is incomplete, and a codebase full of flags nobody retires is worse off than one with none. Over fifteen hundred people use this product every week, though, and not one of them agreed to test a half-built or half-validated feature.

Steps 9 and 10 are what this assignment has that nothing you have submitted before did. Your change merges, deploys to staging, and is one promotion away from real users.

## If it goes wrong after it ships

Then fixing it is part of this assignment, not a separate misfortune that happened to you.

Revert first, diagnose second. Reliably Releasing Software, back on Sep 17, is about precisely this. Re-read it before your PR merges. A change that you shipped, broke, reverted inside the hour, and landed correctly two days later is a **better** submission than one that happened to work the first time. Put all of it in the PR. That history is the most interesting thing about your submission.

## If it doesn't merge

Some tickets are bigger than they look. Sizing a ticket you have not opened is guesswork, and the guess is sometimes wrong.

**What passes:** you took a ticket, worked it, found the reason it was larger than advertised, wrote that reason down in the issue, scoped down to something shippable, and shipped that instead.

**What doesn't:** silence. A ticket you sat on for two weeks and mentioned to nobody is the exact failure this assignment is built to catch. The missing feature does less damage than the missing information. The thirty-minute rule in the [syllabus](/syllabus#communication) exists for this, and two weeks is a lot of thirty minutes.

**If an assigned review hasn't come by 11:59pm on Mon Nov 2,** say so in your Tuesday standup post. A PR that was review-ready on Oct 29 and then waited on somebody else meets this requirement on the date it was ready. What you have to be able to show is the timestamp: the PR was green and described. If you're waiting on somebody, say so in standup.

## Grading Rubric

Merging and deploying this is a **Pass** requirement. Steps 5 and 10 are the rollback sentence and the flag. Doing those well is part of what the **Distinction** requirement *a feature owned end to end* asks for. That requirement also asks you to watch the change deploy and to name the dashboard or query you would actually check afterwards. Add both and this ticket carries the whole requirement.

| Expectation | Standard |
|---|---|
| **Scope** | Touches more than one layer; lands as one reviewable PR, or a stacked series with a stated plan |
| **PR quality** | What, why, how you tested, and the rollback sentence, all present *before* review is requested |
| **Tests** | A bug fix has a test that fails without it; other changes justify what they cover and what they don't |
| **Review** | Review-ready by Oct 29; both assigned reviews answered by Tue Nov 3; disagreement argued with evidence |
| **Landed** | Merged to staging by Nov 4 |
| **Ops** | Unfinished user-visible work sits behind a flag |

### What strong looks like

The description tells you what the change does without opening the diff. The rollback sentence is specific enough to execute at 2am by someone who has never seen your code. A reviewer asked a question, you disagreed, and the thread ends somewhere better than either of you started. Both reviews were answered within a day, and it merged on Nov 3.

### What weak looks like

A PR opened Oct 29 at 9:00. "Fixed the bug" as a description. Tests that assert the implementation and never check the behavior. A green CI you obtained by deleting the assertion. A review left unanswered until Nov 4. A ticket that turned out to be fixed by somebody else's PR two weeks earlier, which reading the issue would have told you.

## Dates

| | |
|---|---|
| Assigned at Demo Day 1 | Thu Oct 15 |
| Know your ticket | end of class, Thu Oct 15 |
| Scope agreed on the issue | by Mon Oct 19 |
| Game Day 1, mid-window | Thu Oct 22 |
| Review-ready survey: issue and PR links | Thu Oct 29, 10:30 |
| Review-ready, walked through at Demo Day 2 | Thu Oct 29 |
| Code Review 1 assigned | Fri Oct 30 |
| Reviews due | Mon Nov 2, 11:59pm |
| Review addressed | Tue Nov 3, 11:59pm |
| Merged to staging, by Jon | Wed Nov 4 |
| Feedback returned | ~Mon Nov 9 |
