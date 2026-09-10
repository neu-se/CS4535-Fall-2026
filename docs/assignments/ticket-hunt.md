---
title: "The Ticket Hunt"
description: Sep 9–16. File two tickets against Pawtograder and reach a verdict on two undecided items. What the class files becomes the pool the First Implementation Ticket draws from in October.
sidebar_position: 4
---

# The Ticket Hunt

**Assigned:** Wed Sep 9 · **Due:** Wed Sep 16, 23:59 · **Feeds:** a **Pass** requirement, and the pool the [First Implementation Ticket](./first-implementation-ticket.md) is drawn from

## Overview

Writing a ticket somebody else can act on is a skill worth practicing on its own, and it's the first thing you'll do once your local development environment is running. You'll file two tickets against Pawtograder and reach a verdict on two items nobody has ruled on yet.

What you're looking for is anything that's wrong for somebody using the product. Pawtograder has three kinds of user (student, TA and instructor), and this week you're also a fourth, the new contributor. Each of the four roles in the Instructions comes with an hour spent doing that role's actual work, and you write down everything that made you stop. The roles matter because you can't find an instructor's problems by acting as a student. Grading a hundred submissions, building a gradebook column that computes something real, or running a poll in a live class are workflows you've likely never been on the far side of, and that's where the product is thinnest. The fourth role is only open to you this week, which is part of why the deadline falls on Sep 16. By October you'll know the setup too well to notice what the docs leave out.

The tickets the class publishes on Sep 17 also become the pool that the [First Implementation Ticket](./first-implementation-ticket.md) draws from when that assignment opens in October.

## Learning Outcomes

By completing this assignment, you will:

- **Get productive in an unfamiliar codebase** by reading Pawtograder with a purpose, which is finding what's wrong with it ([LO1](/syllabus#grading))
- **Work out what is actually needed** by naming, for every ticket you file, the role affected and what the defect costs them ([LO2](/syllabus#grading))

## Instructions

You'll hand in two tickets and **also** two triage verdicts.

### Two tickets you file

The first comes from the student role, which is Pawtograder used as yourself, on the coursework you already have. The second comes from the grader, instructor, or new-contributor role, one you have to step into deliberately. Claim that second role in class on **Thu Sep 10**, so that all four get covered and the class doesn't converge on the docs.

A ticket somebody can act on has:

- Numbered steps to reproduce, starting from a state a stranger can reach. "Go to the gradebook and it's broken" gives a reader nowhere to start.
- Both what you expected and what happened. The gap between them is the bug, and a report carrying only the second half leaves the reader guessing at the first.
- Where you saw it, meaning production, staging, or local. If local, say what you seeded.
- Who it affects, whether that's students, instructors, or graders. Say whether it's one person with an odd setup or everyone in a 400-person course, since that's what decides whether anyone picks the ticket up.
- Evidence, such as a screenshot, a stack trace, a log line, or a failing response. Something beyond your own account of events.
- Why it matters, and whose week is worse for it. Compare "this uses `any`" with "grading the fourth submission blanks the page, because this call can return null and the `any` hides it, and here is the call site." The second one names the mechanism, the role, and what the defect cost them. If you can't write that sentence, what you've found is a lint violation instead of a ticket.

Search before you file. Read the open issues and the closed ones, searching in the terms a stranger would use for the problem, which may not be the terms you'd reach for. Duplicate filing is the most common way this assignment goes wrong, and it's easy to miss, because you find out three days later in a one-line comment on your issue.

### Two items you triage

Take two items nobody has ruled on and reach a verdict. You can draw from the axe findings in [#910](https://github.com/pawtograder/platform/issues/910), any `TODO` comment in the tree, or an open issue with no label and no size. These have to be somebody else's records, not your own findings from this week, because a verdict on something you reproduced an hour ago can only come out "still real."

Each triage is a comment on the item itself, reaching one of three verdicts:

- **Still real:** give the reproduction, who it affects, and a size, which makes the item claimable.
- **No longer real:** it's fixed, obsolete, or a false positive. Say how you know.
- **Undecidable without something you don't have:** name precisely what you'd need and who has it. This is a legitimate verdict and a useful one.

We're grading the reasoning, so say how you reached the verdict. A usable triage comment cites specifics: the commit that introduced the `TODO`, the April ship date of the migration it refers to, and the line showing that the branch it guards is now unreachable. A comment reading "still relevant" earns nothing, because a reader has no way to check it.

### The four roles

The grader and instructor roles run on your seeded local instance. See [Technical Specifications](#technical-specifications) for how to get one and why it has to be seeded.

#### 1. The student

Use Pawtograder this week for the coursework you actually have, in this course and any other, and write down the moments you'd normally absorb and move past: the submission you re-uploaded because you weren't sure the first one took, the grade you couldn't reconcile with the rubric, the help request you abandoned.

#### 2. The grader

Log in as a TA on your seeded instance and do a full grading pass. Open a queue of submissions, apply a rubric across them, leave feedback somebody could act on, then handle a regrade request end to end. Time any step that repeats, and work out what it costs across a full course roster.

#### 3. The instructor

Log in as an instructor and set something up from nothing: create an assignment, build a gradebook column that computes something real, open a discussion thread, run a poll. Then try to answer a question you'd actually have, such as who hasn't submitted, who is failing, or what happened in a particular office hours session. Most of the project slate lives in this part of the product, so what you find here may inform your [project bid](./project-bids.md).

#### 4. The new contributor

Follow the setup and contribution docs literally, in order, without using anything you've picked up in Discord or from a classmate. Every place you had to guess, backtrack, or ask somebody is a defect, so write each one down as it happens.

## Technical Specifications

**Production access:** You won't have it at any point in this course, for the reasons in the [syllabus](/syllabus#working-with-real-student-data). The grader and instructor roles happen on your seeded local instance, where `npm run seed` gives you fabricated students and lets you log in as any role. Seeded data is the only version of this exercise we can run legally.

**Getting the instance:** [Local Development](../local-dev.md) has the setup commands, the seeding options, and the problems that most often cost people an afternoon. Two entries there matter for this assignment in particular. `scripts/GenerateMagicLink.ts` prints a login URL for any seeded user, which is how you move between roles without collecting passwords. And `FIXED_GRADER_EMAIL=you@northeastern.edu npm run seed` seeds your own address into the grader seat, so the grading pass happens as you.

**Finding the mechanism in the code:** Once one of the roles gives you a symptom, you can often work out the mechanism from the code, and a ticket that names the mechanism gives whoever picks it up somewhere to start. Use your IDE or `grep` to find, for example, flags to disable eslint rules or TODO comments.

## AI Policy

Use whatever agent you like to explore the codebase, gather context, and draft. Two requirements hold regardless of what the agent did.

A filed ticket needs a reproduction you performed. "Claude thinks there may be a race condition here" isn't a bug report, and if you can't make the problem happen, what you have is a hypothesis. Hypotheses go to Discord, where somebody may help you confirm it.

A triage verdict needs evidence you checked. An agent will tell you a `TODO` is stale with complete confidence and no reason, and the commit that proves it is the part we're asking for.

## Grading Rubric

Filing two tickets and triaging two items is a **Pass** requirement. Nothing in this assignment is required for **Credit**, and whether somebody else claims your ticket is neither graded nor in your control.

| Expectation | Standard |
|---|---|
| **Tickets filed** | Two by Sep 16, from two different roles. Reproducible by a stranger, searched for duplicates, names the role it affects, carries evidence and a statement of why it matters that a reader could check |
| **Triage** | Two items resolved to a verdict with reasoning somebody could check |
| **Honesty about scope** | A ticket you couldn't size, said so, and named what you'd need |

### What strong looks like

Your grader ticket names the step that costs four seconds a submission, times it, and multiplies it by a real course roster. One triage closes an axe finding as a false positive and includes the screen-reader output that proves it. Another says "undecidable, because I need to know whether phase 2 is scheduled and only the instructor knows," which is both correct and useful. Your bid the next day argues for a project you had no opinion about on Sep 9.

### What weak looks like

Two tickets filed Sep 16 at 23:00, both from the student role, both one line long, and neither naming who is affected. A triage comment reading "still relevant." A duplicate of an issue from March that one search would have surfaced. A ticket whose reproduction steps only work if you already know what the reporter meant.

## Submission

File both tickets as issues on [`pawtograder/platform`](https://github.com/pawtograder/platform/issues), labeled `cs4535-hunt` so we can find them, and post each triage verdict as a comment on the item you triaged. We read the issues and the comments there, not the form.

The **hunt form in Pawtograder** is the record that you did it. It opens Wed Sep 9 and closes with the assignment on Wed Sep 16, 23:59 ET. Per ticket it asks for the issue link, the role it came from, who's affected and how many of them, and where you saw it. It also asks what evidence you attached, one sentence on why it matters, and a size or what you'd need to produce one. Per triage it asks for the item, a link to your comment, your verdict, and what you checked to reach it. Two other fields are worth knowing about before you start: the terms you searched before filing, so keep them as you go, and roughly how long the assignment took you, which is how we size next year's version of it.

We spend Sep 16–17 deduping, sizing, and labeling everything the hunt produced, working from the form. What survives is labeled `cs4535-first-ticket` and becomes the pool published on **Thu Sep 17**, which the [First Implementation Ticket](./first-implementation-ticket.md) draws from when it opens on **Thu Oct 15**. You may not claim your own ticket then, since the point is to read code somebody else chose and understand a problem as somebody else described it.

Your ticket being merged into somebody else's, or closed as already fixed, is not a mark against you. A duplicate filed after a real search is a different thing from one filed instead of searching.

## Dates

| | |
|---|---|
| Assigned; project slate pitched | Wed Sep 9 |
| Local dev running: bring it to class | Thu Sep 10 |
| Claim your second role in class | Thu Sep 10 |
| **Everything due** | Wed Sep 16, 23:59 |
| Triage gate; `cs4535-first-ticket` pool published | Thu Sep 17 |
| Project bids due | Thu Sep 17, 23:59 |
