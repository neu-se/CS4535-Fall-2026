---
title: "Async Sprint: Focused Learning + Team Sync"
description: Oct 2–13. Individual focus work with team sync points, graded on process
sidebar_position: 6
---

# Async Sprint: Focused Learning + Team Sync

**Runs:** Fri Oct 2 – Tue Oct 13 · **Artifacts due:** Tue Oct 13 · **Feeds:** Pass requirements, and Checkpoint 1 (Wed Oct 14)

:::warning Draft
This handout is a draft and will change before the semester begins.
:::

## Overview

Face time is a scarce resource. Spend it on work that's coupled.

Right now your work isn't coupled. Each of you is ramping on a different corner of a large unfamiliar system, reading code you've never seen, figuring out how row-level security actually behaves, prototyping something risky, reproducing a bug. That work is individual focus time. Putting your whole team in a room to do it in parallel makes it worse.

In November that flips. Every team will be landing changes in one codebase, with shared schema migrations, interacting feature flags, and merge conflicts on the same files. That work *is* the interfaces between people, and it degrades badly when done apart. That's why Nov 4 and Nov 16 are integration sessions. Everyone in the room, failures on screen.

The course doesn't pause here. This stretch is the half of the arc where async is the right tool, and recognizing which half you're in is part of what you're learning.

## Learning Outcomes

By completing this sprint, you will:

- **Collaborate on a shared codebase** by coordinating in writing: two standups, two sync summaries, and an artifact your teammates can pick up ([LO7](/syllabus#grading))
- **Get productive in an unfamiliar codebase** through one focused objective in your team's area, with evidence a teammate can use ([LO1](/syllabus#grading))

## Instructions

### 1. Individual focus block

Commit to **one** objective in your team's area and produce an evidence artifact a teammate can use. "I read some code" doesn't count. Pick a shape:

| Shape | What you produce |
|---|---|
| **Trace** | Follow one flow end to end (*how does a submission become a grade?*). Diagram it. Name three things that surprised you |
| **Spike** | Prototype the risky part of your team's approach. The deliverable is what you learned, and working code is not required |
| **Reproduction** | Take an open issue, reproduce it locally, write the repro steps |
| **Research** | Read the source or docs for something your project depends on. Write what applies to us and what doesn't |
| **Practice** | Work through Playwright, k6, or RLS properly, and land one small real use of it |

**Deliverable:** one page or less, plus a link to whatever you made. Commit it to your team repo under `notes/`, where it survives, rather than dropping it in a DM or a chat message.

Your team ratifies your objective on Thu Oct 1, in the last class session before the sprint starts. Five minutes of agreement protects two weeks of work from being irrelevant.

### 2. Two team sync points

Team-scheduled, 30–45 minutes, video or in person. Roughly Oct 6–7 to share early and adjust, then by Mon Oct 12 to converge and plan for Oct 14, so the summary lands with the artifact rather than after it.

Within 24 hours, post a written summary to your team's Discord channel that:

- names who attended
- summarizes what each person is learning
- answers the question *what changed in our plan because of what someone else learned?*

Answer that question specifically. Without it you get four people who learned four things separately and a team that integrated none of it. The summary author rotates, so a different person writes each of the two summaries.

### 3. Two standups

The first is a Discord post, **Mon Oct 5 by 10:30 ET**. The second is in the room: the sprint closes at the standup + clinic on **Wed Oct 14**, which is where the lost Oct 12 Monday session lands. Same format either way:

- **Shipped:** what actually landed, with links
- **Blocked:** what's in your way and *the specific thing you need from someone*
- **Next:** what you're doing before the next standup

"Still working on it" is not a standup post. Writing one that's useful to someone who wasn't there is a real skill, and you're being assessed on it.

### 4. The recorded tech talk

**s12** is a recorded talk released Wed Oct 7. Watch it and post one question or observation in its Discord thread by **Fri Oct 9**.

These posts are **attendance**. Oct 5, Oct 7 and Oct 8 are scheduled class sessions run asynchronously. For those, the written post *is* your attendance, and not posting is recorded exactly as an empty chair would be. Absences cap your final letter grade regardless of which band you complete: see the [participation floor](/syllabus#participation). If something will stop you posting, tell us before the deadline. Excused absences don't count against the cap.

**If your team never schedules a sync.** Propose two times in the channel and post what happened. A documented attempt your teammates ignored is evidence for you, and a Checkpoint 1 conversation for them.

## Grading Rubric

This is assessed on process. The artifact and both standups are Pass requirements; sync summaries are assessed here and read at Checkpoint 1. See the [bands](/syllabus#letter-grade-requirements). What you learned shows up in Checkpoint 1, and how you worked shows up here.

| Expectation | Standard |
|---|---|
| **Cadence** | At least 4 substantive contributions per week, on at least 3 distinct days |
| **Standups** | Both posts, on time, in format, with links |
| **Sync points** | Both held, both summarized within 24 hours, rotating author, "what changed" answered |
| **Artifact** | Committed to the team repo by Tue Oct 13 |

A **contribution** is a commit, a PR opened or updated, a substantive review comment, an issue comment that moves something forward, a committed note, or a standup/sync summary. We count substance rather than volume. Twelve whitespace commits is not twelve contributions.

The spacing matters more than the count. A sprint worked in one ten-hour Sunday is cramming, and it's plainly visible in your git history. Your team depends on you being reachable and making progress across the week, rather than on you disappearing and reappearing with a pile of work.

### What strong looks like

Contributions spread across six or more days. Blockers raised on Oct 5 rather than discovered on Oct 13. A sync summary where you can trace a change in the team's plan directly to something a teammate found. An artifact another team member actually cites in Checkpoint 1.

### What weak looks like

All activity in the final 48 hours. Standups that say "still working on it" with no links and no request for help. A sync summary that lists topics discussed but records no decision and no change. An artifact nobody else reads.

## Dates

| | |
|---|---|
| Objectives ratified with your team | Thu Oct 1 (in class) |
| Standup post #1 (Discord) | Mon Oct 5, 10:30 ET |
| Sync point #1 + summary | ~Oct 6–7 |
| Recorded tech talk watched + thread post | Fri Oct 9 |
| Drill Zero triage log | Fri Oct 9 |
| Sync point #2 + summary | by Mon Oct 12 |
| Individual artifact committed | Tue Oct 13, 23:59 ET |
| Standup #2 (in the room) + Checkpoint 1 | Wed Oct 14 (in class) |

**Drill Zero** also runs in this window: an unannounced break in the preview stack on **Thu Oct 8**, with a written triage log due **Fri Oct 9**. It's pass/fail and the log is a Pass requirement. See the [schedule](/schedule).
