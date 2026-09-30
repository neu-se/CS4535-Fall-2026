---
title: "Project Milestones & Checkpoints"
description: How the team project is organized from Oct 1 to Dec 10, how we track it, what each checkpoint shows, and how the project counts toward your grade
sidebar_position: 6.8
---

# Project Milestones & Checkpoints

**Checkpoint 1:** Tue Oct 13 · **Checkpoint 2:** Thu Nov 5 · **Checkpoint 3:** Thu Dec 3 · **Feature freeze:** Mon Nov 23 · **Final demos:** Dec 9–10

## How the project runs

Your team owns one area of Pawtograder from Oct 1 to Dec 10. The term has a shape, and each checkpoint is where we look at whether your project is where that shape says it should be.

| When | What happens | What it should show |
|---|---|---|
| **Thu Oct 1** | Team charter | Your goal: what a user can do on Nov 23 that they can't do today, and your first milestone |
| **Oct 2–13** | Async sprint | The risky questions answered. Each person investigates one thing the plan depends on, and the team adjusts scope |
| **Tue Oct 13** | **Checkpoint 1** | **Progress.** The risks you found, the scope you've set, and a backlog of tickets someone could claim |
| Thu Oct 15 | Demo Day 1 | What the sprint found. First implementation tickets assigned |
| Thu Oct 29 | Demo Day 2 | First implementation tickets merged, deployed, and demoed |
| **Thu Nov 5** | **Checkpoint 2** | **A mostly working thing.** The main flow runs on staging behind your course flag, in your team's demo class |
| Thu Nov 12 | Demo Day 3 | The main flow, end to end |
| Mon Nov 23 | Feature freeze | Nothing new lands after this |
| **Thu Dec 3** | **Checkpoint 3**, Demo Day 4 | **Wrapped up.** Shipped, tested, documented, with the user study written up and an ops playbook for what you shipped |
| Dec 9–10 | Final demos and handoff | What January 2027 inherits |

The charter's goal is allowed to change. The async sprint exists partly to find out that it should. When it changes, update section 2 of `charter.md` and say why in the commit message.

## How we track the work

We don't ask for status reports. We read the places where the work already happens:

- **Your team's backlog.** It starts as a planning doc in your Team Workspace repo, private to your team. Once a ticket is ready for someone to claim, it becomes an issue on [`pawtograder/platform`](https://github.com/pawtograder/platform) with your team's label (`team:paper-exams`, `team:workspaces`, `team:office-hours`, or `team:usability`). The first batch goes up at the end of the [async sprint](./async-sprint.md#4-file-your-first-issues).
- **Pull requests and reviews** on the platform.
- **Your Team Workspace repo:** the charter, `notes/`, and your user study.
- **Standups and team meeting summaries** in Discord.
- **Demos.** Each demo is live, in your team's demo class, five minutes plus questions.

If something only exists in a DM or in someone's head, we can't see it, and neither can your teammates.

## How checkpoint reviews work

Each checkpoint has a team part and an individual part.

**The team part.** We review your project against the row for that checkpoint in the table above. We read the backlog, the merged and open PRs, the charter's history, the meeting summaries, and the last demo, and your team gets written feedback within a week: what's on track, what's at risk, and the one thing most worth doing next.

**The individual part.** Each of you submits a short survey in Pawtograder with links to your own work so far: your sprint artifact, your PRs, the reviews you've written, and your part in the user study. We read it against the same sources and send back a written judgment, on track or not, and why. When the answer is no, it says so plainly, while there's still time to act on it.

Submitting each checkpoint survey is a Pass requirement. What's in it isn't graded. It's there so the feedback is about your actual work.

## How the project counts toward your grade

The project doesn't get a grade of its own. Your grade is individual, and it comes from the [bands](/syllabus#the-four-bands): a list of things you've demonstrably done, which you claim in December with a link to each.

Most of those links come from the project. At Pass, for example:

- your first implementation ticket, merged, deployed, and verified running
- at least one user-visible change shipped in your team's area
- your part in your team's user study
- your reviews, at least six across the term, two outside your team
- your standups and sprint artifact
- your game-day postmortems

A team that ships something good gives each member plenty to link. A team member who contributed little has little to link, whatever the team shipped. That's why every checkpoint asks for your own links, and why the team charter is the first thing we read when a grievance comes to us.

**Demos count double for attendance.** Missing a demo day without arranging it in advance counts as two absences. See the [participation floor](/syllabus#participation).

## Checkpoint 1

**Survey due Tue Oct 13, 23:59 ET**, the same night as your sprint artifact. Feedback by Mon Oct 19.

**The team should be able to show:**

- what the sprint found, in the sprint artifacts in `notes/`
- section 2 of the charter updated if the goal or first milestone changed
- the next two weeks' tickets filed as labeled issues on the platform, each small enough to claim
- the user study plan, with its timing chosen

**The survey asks you for:**

1. A link to your sprint artifact, and one sentence on what a teammate can do with it
2. Links to the reviews you've written so far
3. Your team's study timing, and your part in it
4. The band you're working toward, and for anything above Pass, the artifact you expect to link and where it stands
5. The biggest risk to your part of the project, and what would help

It takes about 15 minutes if your work is committed and linked.

## Checkpoints 2 and 3

Same team review and the same survey, against the Checkpoint 2 and 3 rows in the table. Checkpoint 3 is also the last day to change the band you're working toward, and it's the draft of your Learning Summary Report: If you can't link an artifact to a requirement on Dec 3, it's too late to make one. Each gets its own section here when it opens.
