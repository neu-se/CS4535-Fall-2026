---
title: "Code Review"
description: Continuous, Sep 17 – Dec 7. Six substantive reviews, two outside your team, each one yours to defend in person, and every thread on your own PRs answered. Code Review 1 is due Mon Nov 2
sidebar_position: 7
---

# Code Review

**Runs:** Sep 17 – Dec 7, continuously · **Code Review 1 due:** Mon Nov 2, 10:30 · **Feeds:** Pass (LO4), Credit, and one Distinction option. See the [bands](/syllabus#letter-grade-requirements)

## Overview

There is no TA in this course. A pull request on Pawtograder gets read by a classmate, and then by Jon if it touches RLS, a migration, auth or the autograder. Peer review is the real review here. Over fifteen hundred people use this product every week, and in January that number goes up. Review is the last cheap place to catch a mistake. After merge, the usual way to find it is an incident.

## Learning Outcomes

- **Review others' work substantively, and respond to review** on your own PRs ([LO4](/syllabus#learning-outcomes))
- **Collaborate on a shared codebase** by reading code outside your own team's area ([LO7](/syllabus#learning-outcomes))

## What you have to do

1. **Write at least six substantive reviews by Mon Dec 7.** [What counts as a review](#what-counts-as-a-review) is below. Every one starts with an [Agent line](#accountability) and meets the rules for [what you answer for](#accountability).
2. **Make at least two of the six [outside your team](#outside-your-team).**
3. **Answer every review thread on your own PRs within 48 hours.** "I need a day on this one" counts as an answer.
4. **Do [Code Review 1](#code-review-1)** between Thu Oct 29 and Mon Nov 2. It gives you two of the six, and one of the two outside your team.
5. **[Defend a review in person](#review-defense)** on Mon Nov 16 and again on Mon Dec 7. Jon picks which one. By Nov 16, at least one of your reviews has to ask for a change.
6. **Keep a list of links to your reviews.** Checkpoints 2 and 3 ask for it, and so does the Learning Summary Report.

That's Pass. For **Credit**, at least three of your reviews have to [change the code](#grading). One of the five **Distinction** options is a [checklist entry](#adding-an-entry) you propose.

One review a week gets you to six without a scramble in December. If there's nothing to review, ask in Discord and we'll point you at an open PR. Some of those are PRs we opened ourselves.

## What counts as a review {#what-counts-as-a-review}

**One review is one PR, or one stack of PRs you review together.** You read the whole change and submit a GitHub review on it: Comment, Request changes, or Approve. When the author pushes changes and you look again, that's still the same review. It doesn't add to your count.

**It has to be on GitHub, on the PR.** Feedback in Discord or a DM doesn't count. We can't see it, and neither can the next person who wonders why the code looks the way it does.

**It has to be substantive.** At least one comment has to be the kind in the left column, or the approval has to say what you checked:

| Substantive | Not substantive |
|---|---|
| "This throws if `submission` is null, which happens for a group assignment with no submitter: here's the row that does it." | "Might want to null-check this." |
| "This contradicts the decision in #841 to validate expressions strictly. Was that reconsidered?" | "Are you sure about this approach?" |
| "The test doesn't cover the resubmission window closing mid-request, which is the case that broke last time." | "Could use more tests." |
| "Why does this need a new provider when `TimeZoneProvider` already exists?" | "Seems complicated." |
| "These four snapshot tests break on any markup change and would never have caught a bug we've had. Can we keep only the one that checks the button is disabled after the deadline?" | "Nice, lots of tests." |
| "Approving: I read the migration and the down path, and it's clean." | "LGTM" |

A review that finds no bugs can still be substantive. If it says what you read and what you checked, it counts.

## Outside your team {#outside-your-team}

Two of your six have to be outside your team. A review counts as outside your team if either of these is true:

- **Somebody on another team wrote the PR.** PRs that we open count too.
- **You did it through your [cross-project function](./cross-project-functions.md).** For example, Release and CI reviewing a workflow change, or Accessibility reviewing a new form.

When you list your reviews at a checkpoint, mark the ones outside your team with **(outside)**.

The PRs nobody wants to read are worth the most here: CI config, migrations, the seed script. After you review another team's query layer, two people understand it, and the second one isn't on the team that owns it.

## Code Review 1 {#code-review-1}

**Assigned:** Thu Oct 29, at Demo Day 2 · **Due:** Mon Nov 2, 10:30, before class

This is the first assigned round. Every first implementation ticket gets two reviewers: one teammate and one from another team.

1. **Watch for two review requests on GitHub.** Jon requests you as a reviewer on two stacks, one a teammate's and one from another team, and GitHub notifies you.
2. **Review each stack on GitHub.** Read every PR in the stack, work the [checklist entries](#the-checklist) that apply, and submit a GitHub review on each PR. Start each one with an [Agent line](#accountability).
3. **Link your reviews in the Code Review 1 survey** on Pawtograder by 10:30 on Mon Nov 2.
4. **Come to the Integration Session on Mon Nov 2.** The cross-team conflicts your reviews turn up get worked through in the room that morning.

The authors answer within 48 hours. Jon merges once both reviews are addressed, and every ticket has to be merged by Wed Nov 4. If your review comes in late, the author's ticket gets blocked.

Code Review 1 counts as two of your six reviews, and one of the two outside your team. If a comment of yours changes the code, it also counts toward Credit. Code Review 1 reviews can be picked for the [defense](#review-defense) on Nov 16.

## How to review

Spend about twenty minutes, and look at these in order. Stop when you run out of time. A partial review posted today does more good than a thorough one posted after the merge.

**1. Does the PR do what its description says?** Read the description first, then the diff. The most common real problem is a PR that does two things, one of which nobody asked for and the description doesn't mention. *"The description covers the query fix, but this also changes the default sort order. Is that intended?"*

**2. Does everything in this diff need to exist?** Agents add whatever looks thorough. Ask one for a fix and you can get the fix plus tests that assert what the code already does, a metric nobody will look at, an alert with an invented threshold, a retry around a call that can't fail, and a flag on a change nobody will need to roll back. Each one looks responsible, and each one is something a person now has to maintain. A test that breaks on every refactor and has never caught a bug costs time on every PR after this one. An alert that fires for nothing teaches people to ignore alerts. For each addition the description doesn't explain, ask what it protects against, who would act on it, and what it costs to keep. If nobody has an answer, ask for it to be removed: *"This alert fires when queue depth passes 50. Who gets it, and what do they do? If nobody, let's drop it."* An agent reviewer will rarely flag this, because to an agent more tests and more monitoring always look like more safety. Seeing the cost takes someone who knows the product and will still be maintaining it next month.

**3. Would this break in production?** Work the [checklist](#the-checklist) entries that apply. The one call you have to make yourself is **blast radius**. Is this on a path all 1,500 users touch, or a settings page three instructors use? Both are fine, but they need different scrutiny.

**4. Is there a test that would have caught the thing this fixes?** A bug-fix test that passes *before* the fix is applied tests nothing. If you can't tell, ask the author to show you the test failing.

**5. What happens when this turns out to be wrong?** Every PR needs a rollback sentence. Check that it exists and that somebody who has never seen the code could follow it. "Revert the commit" stops being true once a migration is involved.

**6. Will the next person understand it?** Names say what things are, there's no commented-out code, and there's a comment wherever the *why* isn't obvious from the *what*.

**Skip** formatting (Prettier owns it, and CI runs `prettier --check`), names that are only different from the ones you'd have picked, and anything you'd start with "personally I would have."

## The checklist {#the-checklist}

**Every entry is a way Pawtograder has actually broken,** and each one cites the thing that put it there. Work the entries that apply to the diff in front of you and ignore the rest. A two-line CSS change touches none of them, and a review that answers all eight anyway is a review nobody can use.

**1. Does this query trust the client to filter rows that RLS should be enforcing?**
*A `.eq("class_id", ...)` in a component is a convenience. The boundary is in Postgres.* This is the highest-consequence bug class in this codebase, and the hardest to spot. The diff looks right, the page renders, and the data is exposed anyway. Covered in the Architecture II session on Sep 14.

**2. If this effect's dependency array is incomplete, what stale value does it capture?**
*15 `react-hooks/exhaustive-deps` suppressions are live in the tree, two of them in the gradebook.* Each suppression is a hook that uses a value missing from its dependency array. Ask what the user sees when it goes stale.

**3. Does this migration have a down path, and does that path work on rows that already exist?**
*See `docs/operations/rollback.md`.* If there's no down path, that's allowed, but the PR has to say so.

**4. On the failure path, does state end up consistent?**
*`supabase/functions/autograder-create-regression-test-run/index.ts:88`, "TODO update the submission status to failed."* A handler that returns early and leaves a submission marked in-progress shows a student a spinner that never stops.

**5. Would this failure be visible to anyone?**
*Seeded by the CI failure that ran for twenty hours without logging a single error anywhere.* Does anything log, alert, or tell the user? With 117 `no-console` suppressions in the tree, "it prints something" is not the same as "somebody will see it." The answer is a person who sees it and can act. Another log line or another alert nobody owns doesn't count, and adds to [the cost](#how-to-review) of keeping the code.

**6. Does the second delivery of this event do what the first one did?**
*`supabase/functions/_shared/ChimeWrapper.ts:221`, "This could race for two users trying to join the meeting concurrently."* Realtime events and webhooks arrive twice. Ask what happens when they do.

**7. Does every date in this diff go through the course's timezone?**
*`supabase/functions/assignment-group-approve-request/index.ts:34`, "TODO timezones."* A date formatted in the server's zone is off by a day for anyone outside Eastern, and it shows up as a grade dispute instead of a bug report.

**8. Can this be operated without a mouse, and does it announce what it is?**
*In [#913](https://github.com/pawtograder/platform/issues/913), all three survey radio options announce as "checked," so a screen-reader user cannot tell what they selected.* For some of our users, a control with no accessible name can't be found or used.

### Adding an entry {#adding-an-entry}

The checklist should be longer by December, and the new entries should come from you. Proposing one is one of the five Distinction options.

An entry is three things: **a question**, **a citation**, and **one sentence on what it would have caught**. The citation is an incident, a PR, an issue, or a line of code, and it has to have happened *here*. "The gradebook did an N+1 on the submissions join, here is the PR that fixed it, and here is what the page load looked like before" is an entry. "Watch out for N+1 queries" has no citation, so it isn't one. Open a PR against this file.

## Receiving review

- **Answer every thread within 48 hours.** The clock counts weekdays and pauses over university holidays. We judge it as a habit across the term. One lapse you flagged and cleared is fine, but a pattern of silence counts against you.
- **Disagree with evidence.** A reviewer has twenty minutes of context, and sometimes they're wrong. Bring a test, a line of code, or a link to the decision.
- **Resolve a thread only when you've addressed it.** Resolving one you didn't address hides the disagreement.
- **Don't force-push over an open conversation.** The comments detach and nobody can reconstruct what was discussed. The [syllabus](/syllabus#academic-integrity) lists this under academic integrity.

What we look for is whether the PR got better because somebody reviewed it. Sometimes it correctly didn't, because the reviewer was wrong and the author showed why. That's a good outcome too.

## AI Policy: what you answer for {#accountability}

Use an agent as much as you like to read code and look for problems. Point it at a subsystem you've never seen and ask what it does before you review a change to it. But a review is a set of claims made under your name, and every claim is yours. Every review follows these rules:

1. **Start every review with an Agent line,** from Code Review 1 (Oct 29) on. Reviews you wrote before then count as they stand. Say what an agent did and what you checked yourself: *"Agent: explained the recalculation path. Findings 1 and 3 came from `/code-review`, and I reproduced both."* If you didn't use one, write *"Agent: none."* A review without this line doesn't count.
2. **Post a finding as fact only if you've verified it.** Verified means you reproduced it, or you can point to the line, row, or test that proves it. Anything else goes up as a question: *"Is this reachable when the group has no submitter?"* A question costs the author a minute. A wrong claim stated as fact makes them prove a negative. `/code-review --comment` posts every finding under your name, so this rule covers everything it posts.
3. **Say what you checked.** Name what you read, what you ran, and what you didn't check. Include at least one thing you did beyond reading the diff: you ran the branch in your Coder workspace, ran the test before and after the fix, ran the query, or tied the change to a decision your team made or an incident you saw.
4. **Be ready to defend it in person,** without an agent. See [Review defense](#review-defense).

**A review with a wrong finding you didn't verify doesn't count,** whatever else is in it. Being wrong after you checked is fine, and the review still counts.

Generated reviews are easy to spot. They comment on every file at the same depth, flag the same generic things, and never say *"this contradicts what we decided in #841,"* because the agent doesn't know your team decided anything. A pasted review fails rules 2 and 3 by itself.

### Review defense {#review-defense}

**When:** Mon Nov 16 (Integration Session II) and Mon Dec 7 (Retro and Learning Summary Workshop), in the room.

Jon picks one of your reviews on the spot, from any you've written so far, and puts the thread on the projector. Your laptop is closed and there's no agent. In about two minutes, you answer three questions:

1. What change did you ask for?
2. Why does it matter to the product, either to a user or to the next person who maintains this code?
3. How do you know the problem is real?

Then the author, or anyone in the room, asks one question.

The defense is always of a **requested change**. Asking for something to be removed counts, and it's often the easiest kind to defend: Say what it would cost to keep. Approvals still count toward your six, but they can't be defended, so by Nov 16 at least one of your reviews has to ask for a change.

If you can't defend the review, it doesn't count toward the six or toward Credit, and the next pick comes from your other reviews. Any review can be picked, so post only reviews you could stand up and defend.

- **No requested change by Nov 16** counts as a failed defense. Write one before Dec 7 and defend it then.
- **A failed defense on Dec 7** can be made up at Final Demos (Wed Dec 9 or Thu Dec 10), by defending a different review Jon picks. That's the last chance, because no new reviews count after Dec 7.
- **If you miss a defense day,** come to office hours within a week and defend a review Jon picks. A Dec 7 make-up has to happen by Dec 10. Nov 16 is an integration session, so missing it without arranging it in advance also [counts as two absences](/syllabus#participation).

## Grading {#grading}

Continuous, from GitHub. There's nothing to submit except the Code Review 1 links. You link your reviews at Checkpoints 2 and 3, and the written judgment that comes back says whether they count. If you want to know sooner whether a particular review counted, ask.

| Band | Requirement | What we check |
|---|---|---|
| **Pass** | At least 6 substantive reviews, 2 of them outside your team | The links you give at checkpoints, read on GitHub |
| **Pass** | Review on your own PRs answered, no thread left dead | The threads on your PRs, across the term |
| **Pass** | Every review meets [what you answer for](#accountability), and you can defend the one we pick | The Agent line on each review, and the [defense](#review-defense) on Nov 16 and Dec 7 |
| **Credit** | At least 3 reviews where your comment changed the code | The comment, then the commit or linked issue that followed it |
| **Distinction**, one of five options | A checklist entry you proposed, with its citation | Your PR against this file |

**What "changed the code" means.** You left a comment, and then a commit on that branch or a follow-up issue the author opened and linked exists because of it. "Good catch, I'll do it in a follow-up" plus the linked issue counts. A change you argued for and lost doesn't count. Bring it to a checkpoint anyway, because three well-argued disagreements that went the other way are evidence we'll take.

**If there aren't enough PRs.** The requirement is on your effort. Ask in Discord and we'll find you one. If you couldn't meet the requirement because there was nothing to review, we won't hold it against you. We will hold it against you if you first notice the shortfall in December.

### What strong looks like

You blocked a PR because the migration had no working down path, and the author was glad you did. You reviewed the CI change nobody wanted to read. You caught a query that trusted the client to filter rows RLS should have enforced. You asked for three agent-written tests and an alert to be deleted because nobody would ever act on them, and the author agreed. You disagreed with a reviewer, produced a failing test that proved your point, and the design changed. You said "you're right, I was wrong" in a public thread. On Nov 16 you stood at the projector and explained, from memory, why the change you asked for mattered to the students who'd hit it.

### What weak looks like

Six approvals reading "LGTM." An approval that praises a PR for its test count. Every review on your own team's PRs. Comments only about formatting Prettier already enforces. A thread marked resolved with nothing changed. A review that shows up after the PR merged. A review that answers every checklist question on a two-line CSS change. A review that is visibly generated: uniform depth, generic findings, no knowledge of anything this team has decided. Findings from `/code-review` posted as fact, unchecked, with an Agent line that says nothing about verifying them.

## Milestones

| | |
|---|---|
| First PRs to review: onboarding column groups | Thu Sep 17 |
| Code Review 1 assigned, at Demo Day 2 | Thu Oct 29 |
| Code Review 1 due, then Integration Session I | Mon Nov 2, 10:30 |
| Checkpoint 2: your review links so far | Thu Nov 5 |
| Integration Session II, review defense 1 | Mon Nov 16 |
| Checkpoint 3: your review links so far | Thu Dec 3 |
| Review defense 2, then the last day reviews count | Mon Dec 7 |
