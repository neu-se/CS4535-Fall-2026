---
title: "Team Workspace & Charter"
description: Due Oct 1. Your team's shared repo, and the agreement you'll reach for when something goes wrong
sidebar_position: 5.5
---

# Team Workspace & Charter

**Assigned:** Mon Sep 28 · **Due:** Thu Oct 1, 23:59 · **Team assignment** · **Feeds:** the async sprint, Checkpoint 1, and any teammate grievance

## Overview

Your team works in Pawtograder's staging branch alongside everyone else, so there's no team fork of the platform. There is one small repo per team, created by the **Team Workspace** assignment in Pawtograder. It holds your charter and the `notes/` directory where every async-sprint artifact lands. Checkpoint 1 reads both.

A charter is the set of agreements your team makes in week four, while everyone still likes each other, about what happens in week nine when somebody doesn't. The syllabus sends every teammate grievance through it first. So the test for each section is whether you could point at it during an argument and settle something. "We'll communicate openly" can't settle anything. "A PR with no review after 48 hours gets pinged in the team channel, and after 72 the author can ask any other team's member to review" can.

You'll draft most of it in class on Mon Sep 28, finish it before Thursday, and fill in the last section at the end of class on Thu Oct 1, when you ratify each other's sprint objectives.

## Learning Outcomes

By completing this assignment, you will:

- **Collaborate on a shared codebase** by writing down how your team reviews, decides, and escalates before any of it is urgent ([LO7](/syllabus#grading))
- **Scope work in an unfamiliar codebase** by committing each teammate to one investigation whose answer changes your plan ([LO1](/syllabus#grading))

## Instructions

### 1. Get into your Team Workspace

Final teams are posted Mon Sep 28, and we create the Pawtograder groups from that list. Open the **Team Workspace** assignment, check that it shows the right teammates, and clone the team repo. It starts with `charter.md` and an empty `notes/`.

If the group is wrong, or you can't see the assignment, say so in class or on Discord that day. Everything in the next two weeks gets committed here.

### 2. Write `charter.md`

Write the sections below in order. The template has the headings. Keep the whole thing under two pages, short enough that your team will reread it when a disagreement comes up.

**1. Who's on the team.** For each person: name, GitHub handle, the primary and secondary energy you named in your bid, your cross-project function, and the hours you can't be reached. Teammates take **different** functions. If your team can't cover a function without doubling up, say so and we'll balance across teams.

**2. What we're shipping by Nov 23.** One paragraph, in your own words, describing what a user can do on Nov 23 that they can't do today. Then name your first milestone and a date for it. Start from the slate blurb and rewrite it. If it still reads like our pitch, you haven't made it yours yet.

**3. How we talk.** Which channel is for what, and where a decision counts as made. A decision made in a DM doesn't exist for the teammate who wasn't in it, so name the place decisions get written down: the team channel, an issue, or an ADR. Then the response time you owe each other on a weekday, and what you do when someone blows past it.

**4. When we meet.** Book both async-sprint sync points now, with a date, time, and place or link: one on Oct 6 or 7, one by Mon Oct 12. Say who writes each summary, since the author has to rotate. Add a recurring weekly slot for after the sprint.

**5. How we decide.** Who decides what. Most teams split decisions by ownership. The person who owns a piece of work decides inside it, and anything that crosses owners or can't be undone cheaply goes to the team. Say what happens when the team splits two against two, or one against two, and what gets written up as an ADR.

**6. Definition of done for a PR.** What has to be true before anyone on your team approves a PR. Start from the checklist in the [First Implementation Ticket](./first-implementation-ticket.md#what-end-to-end-means) and add what your project needs. A permissions team might require a test that runs as each affected role. An exams team might require a scanned-page fixture.

**7. When it goes wrong.** Answer these three situations in writing. They come up every semester.
- A teammate misses two standups in a row and doesn't answer in the channel.
- A PR has been waiting on review for three days and the author's deadline is tomorrow.
- Two of you disagree on an approach, and both approaches would work.

For each one: who does what, by when, and at what point it comes to us at clinic. "We'd talk about it" isn't an answer. Say who starts that conversation, and what happens if it doesn't fix anything.

**8. Sprint objectives.** Leave this blank until Thu Oct 1. At the end of that class, each person writes one line: their objective, its shape (trace, spike, reproduction, research, or practice), and the question it answers. The team ratifies the set. The [spike menu](./async-sprint-menu.md) has candidates for each project, and your own is fine if the team agrees to it.

### 3. Commit it

Commit `charter.md` to the team repo by Thursday night. Everyone on the team should have at least one commit to it. The commit history shows us that the whole team wrote it.

The charter can change after Thursday. When you change a rule, say why in the commit message. At Checkpoint 1 we read the history along with the current version, and a rule that changed after it was tested is a good sign.

## AI Policy

Use an agent to explore your project's corner of the codebase, check what an issue refers to, or tidy the formatting. Don't have one write sections 5 through 7. They're agreements between the specific people on your team, and a generated charter reads like every other generated charter. Nobody feels bound by it, and a charter only settles a disagreement if the team feels bound by it.

## Grading Rubric

The charter isn't banded, but it's required. It's read at Checkpoint 1 along with your sync summaries. When a grievance comes to us, the first thing we ask is what the charter says.

| Expectation | Standard |
|---|---|
| **Complete** | All eight sections present, and section 8 filled in by the end of Thu Oct 1 |
| **Specific** | Sections 3, 5, and 7 name people, times, and places. Someone outside the team could tell whether a rule was followed |
| **Booked** | Both sync points have a date and time, and a named author for each summary |
| **Shared** | Every teammate has a commit to `charter.md` |

### What strong looks like

A charter that settles something. The "when it goes wrong" answers have a first step with a name next to it and a point where it goes to clinic. The definition of done has at least one line that exists because of what your project is. By Checkpoint 1 there's at least one commit that changes a rule, with a message saying what happened.

### What weak looks like

"We value open communication and mutual respect." Sync points described as "TBD, probably early in the week." A definition of done that says "tests pass." Every commit from one person.

## Submission

Commit to your Team Workspace repo in Pawtograder by **Thu Oct 1, 23:59 ET**. You don't upload anything separately. We read the repo.

## Dates

| | |
|---|---|
| Final teams posted, Team Workspace opens | Mon Sep 28 |
| Charter drafted in class (sections 1–7) | Mon Sep 28 |
| Sprint objectives ratified in class (section 8) | Thu Oct 1 |
| **Charter committed** | **Thu Oct 1, 23:59** |
| Async-sprint artifacts committed to `notes/` | Tue Oct 13, 23:59 |
| Charter read at Checkpoint 1 | Wed Oct 14 |
