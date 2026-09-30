---
title: "Async Sprint: Focused Learning + Team Sync"
description: Oct 2–13. One learning objective each, two standups, and two team meetings, with no class meetings
sidebar_position: 6
---

# Async Sprint: Focused Learning + Team Sync

**Runs:** Fri Oct 2 – Tue Oct 13 · **Sprint artifact due:** Tue Oct 13, 23:59 ET · **Closes:** standup #2 in the room, Wed Oct 14 · **Feeds:** Pass requirements, and [Checkpoint 1](./checkpoints.md)

## Overview

For two weeks there are no class meetings. Each of you works on one learning objective in your team's area, and your team keeps in touch through two written standups and two short team meetings. At the end, each of you commits a sprint artifact that a teammate can use, and your team files its first issues on the platform.

## Learning Outcomes

By completing this sprint, you will:

- **Collaborate on a shared codebase** by coordinating in writing: two standups, two team meeting summaries, and an artifact your teammates can pick up ([LO7](/syllabus#grading))
- **Get productive in an unfamiliar codebase** through one learning objective in your team's area, with evidence a teammate can use ([LO1](/syllabus#grading))

## Instructions

### 1. Your learning objective

Pick **one** objective in your team's area. The [spike menu](./async-sprint-menu.md) lists candidates for each project, and you can propose your own. Before the sprint starts, write down three things in section 8 of your team's [charter](./team-charter.md):

- **The question** your objective answers
- **What you'll be able to explain afterward** that you can't explain today
- **The shape** of the work, from the table below

Your team ratifies the set in class on Thu Oct 1.

| Shape | What you produce |
|---|---|
| **Trace** | Follow one flow end to end (*how does a submission become a grade?*), or follow a known bug to the line where it goes wrong. Write down each step with the file and function it happens in, and what's still unclear |
| **Spike** | Prototype the risky part of your team's approach. The deliverable is what you learned. Working code isn't required |
| **Research** | Read the source or docs for something your project depends on, or plan and run the first sessions of your team's user study. Write what applies to us and what doesn't, and link what you read |
| **Practice** | Work through Playwright, k6, or row-level security (RLS) in depth, and merge one small real use of it |

**Reproducing a bug on its own doesn't count.** Everyone did that in the ticket hunt. If your objective starts from a bug, it's a trace: the artifact says where and why it fails, not just how to make it fail.

**You're accountable for what you said you'd learn.** Your teammates will ask you about it at the second team meeting, and we'll ask at Checkpoint 1. An artifact that's an AI's summary of some documentation doesn't meet the objective, even if it's accurate. Use whatever tools you like to get there, and then be ready to explain what you found, in your own words, without them.

**If your objective is your team's user study,** Jon clears your recruiting list before you contact anyone.

**The sprint artifact** is one page or less, plus a link to whatever you made: a diagram, a branch, a PR, a test. Commit it as `notes/<github-handle>-<short-topic>.md` in your [Team Workspace](./team-charter.md) repo, where your teammates can find it later.

### 2. Two standups

A **standup** is a short status update that every member of a team gives on a regular schedule. The name comes from teams that hold the meeting standing up, so it stays short. Each person answers the same three questions, and the point is to surface problems early, while a teammate can still help.

You'll do two, in this format:

- **Done:** what you finished since the last standup, with links
- **Blocked:** what's in your way, and *the specific thing you need from someone*. "Nothing" is a fine answer if it's true
- **Next:** what you'll do before the next standup

**Standup #1** is a post in your team's Discord channel by **Mon Oct 5, 10:30 ET**. **Standup #2** is in the room on **Wed Oct 14**: each person gets about a minute.

A post that says "still working on it" doesn't meet the format. The test is whether a teammate who reads it knows what you did and what you need.

### 3. Two team meetings

Each team meets twice, for about 30 minutes, in person or on video:

- **Meeting 1: Thu Oct 8, during our usual class time.** There's no class that day, so your team already has the time free.
- **Meeting 2: any time from Fri Oct 9 to Mon Oct 12.** Put the time in your charter.

At each meeting, each person says what they've learned so far and what's in their way. Then the team answers one question: **does anything we've learned change our plan?**

Within 24 hours, one person posts a summary in your team's Discord channel with three things: who was there, one line per person on what they've learned, and what changed in the plan, or "nothing" and why. A different person writes the summary each time.

**If your team never schedules a meeting,** propose two times in the channel and post what happened. If your teammates ignore a documented attempt, it counts in your favor, and we'll raise it with them at Checkpoint 1.

### 4. File your first issues

The last step of the sprint turns what you learned into work someone can pick up. Until now your backlog has been a planning doc in your team repo, and it stays there: rough tickets, open questions, ideas you haven't checked. By **Tue Oct 13**, your team moves the tickets for the next two weeks (Oct 15–29) onto [`pawtograder/platform`](https://github.com/pawtograder/platform) as GitHub issues:

- Label each one with your team's label: `team:paper-exams`, `team:workspaces`, `team:office-hours`, or `team:usability`.
- Make each one claimable, as on Sep 28: who it's for, what "done" means, and roughly how big it is.
- Link the sprint artifact it came from, if there is one.
- Add it to your team's board: [Paper Exams](https://github.com/orgs/pawtograder/projects/3), [Cloud Workspaces](https://github.com/orgs/pawtograder/projects/2), [Office Hours](https://github.com/orgs/pawtograder/projects/4), or [Usability, Accessibility & Permissions](https://github.com/orgs/pawtograder/projects/5).

Your first implementation tickets are assigned from these at Demo Day 1 on Oct 15, so file enough that each of you has one to pick from. Decide at team meeting 2 which tickets go up and who files them.

The platform repo is public. Anything about a real person, such as notes from a user study session, stays in your team repo.

### 5. The Wed Oct 7 activity

Wed Oct 7 is a class session run asynchronously. The activity is posted that morning in Discord, and it ends with one post in its thread by **Fri Oct 9**.

### Attendance

Oct 5, Oct 7 and Oct 8 are scheduled class sessions run asynchronously, and each one has its own attendance record:

| Session | You're counted present if |
|---|---|
| Mon Oct 5 | Your standup #1 is posted by 10:30 ET |
| Wed Oct 7 | Your activity post is in the thread by Fri Oct 9 |
| Thu Oct 8 | You're named as present in your team's meeting 1 summary |

Absences cap your final letter grade regardless of which band you complete. See the [participation floor](/syllabus#participation). If something will stop you from posting or attending, tell us before the deadline. Excused absences don't count against the cap.

## Grading Rubric

The sprint is assessed on process. Your sprint artifact and both standups are Pass requirements. Meeting summaries are assessed here and read at Checkpoint 1, along with what you learned. See the [bands](/syllabus#letter-grade-requirements).

| Expectation | Standard |
|---|---|
| **Cadence** | At least 4 substantive contributions per week, on at least 3 distinct days |
| **Standups** | Both on time, in format, with links |
| **Team meetings** | Both held, both summarized within 24 hours, by different authors, with "what changed" answered |
| **Sprint artifact** | Committed to `notes/` by Tue Oct 13, answers the question you wrote in section 8, and you can explain it when asked |
| **Issues filed** | The team's tickets for Oct 15–29 are on the platform by Tue Oct 13, labeled and claimable |

A **contribution** is a commit, a PR opened or updated, a substantive review comment, an issue comment that moves something forward, a committed note, or a standup or meeting summary. We count substance rather than volume, so whitespace-only commits don't count.

Spacing matters more than the count. A sprint done in one ten-hour Sunday shows up plainly in your git history, and your team needs you reachable across the week.

### What strong looks like

- Contributions spread across six or more days
- Blockers raised on Oct 5, not discovered on Oct 13
- A meeting summary where a change in the team's plan traces to something a teammate found
- A sprint artifact another teammate uses

### What weak looks like

- All activity in the last 48 hours
- Standups with no links and no specific request for help
- A meeting summary that lists topics but records no decision
- A sprint artifact you can't explain without rereading it

## Dates

| | |
|---|---|
| Objectives ratified, section 8 of the charter | Thu Oct 1, in class |
| Standup #1, Discord post | Mon Oct 5, 10:30 ET |
| Wed Oct 7 activity posted | Wed Oct 7; your thread post by Fri Oct 9 |
| Team meeting 1 + summary | Thu Oct 8, class time; summary within 24 hours |
| Team meeting 2 + summary | Fri Oct 9 – Mon Oct 12; summary within 24 hours |
| Sprint artifact committed | Tue Oct 13, 23:59 ET |
| Team's first issues filed on the platform | Tue Oct 13, 23:59 ET |
| [Checkpoint 1](./checkpoints.md) survey | Tue Oct 13, 23:59 ET |
| Standup #2, in the room | Wed Oct 14, in class |
