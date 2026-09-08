---
title: "Reading Presentation"
description: You and one person from another team teach the room a paper, and bring the artifact that proves it applies here
sidebar_position: 8
---

# Reading Presentation

**Sessions:** Wed Oct 21 · Wed Oct 28 · Wed Dec 2 · **Bid due:** Thu Sep 24 · **Your reading:** assigned with your session date on Mon Sep 28 · **Feeds:** a **Pass** requirement

## Overview

**Two students co-present one reading. Two readings per session.** Your co-presenter comes from **another** project team. That pairing is deliberate, and it's half the value. You'll have to explain the paper to somebody whose corner of the codebase you don't know, before either of you explains it to the room.

Twenty minutes of talk per pair, then ten minutes of discussion you run. Two pairs fills the session. You're assessed individually on your half, and jointly on whether the session held together.

Everyone teaches once. Three sessions at two pairs each seat twelve. The reading is yours to bid for, from [the list below](#the-reading-list).

## Learning Outcomes

This assignment is where [LO8](/syllabus#grading) is demonstrated. Teaching technical work to peers here means deciding what to leave out of a paper, and bringing an artifact from our own codebase that shows the reading applies to it.

## The reading list

The list has thirteen readings, and six of them get taught. The rest are here because a reading you cite in a design doc in November does as much for you as one you presented.

Every reading on the list is peer-reviewed empirical work, with two deliberate exceptions noted below. Each one is tagged with the [cross-project function](/syllabus#project-teams-and-cross-project-functions) it belongs to. That tag is a hint about where to look for your artifact, and any pair can take any reading.

| # | Reading | The claim | Function |
|---|---|---|---|
| **R1** | Luo et al., FSE 2014 | Ten root causes of flaky tests, from 201 commits that fixed one. Async waits, concurrency, and test-order dependence account for most of them | Release and CI |
| **R2** | Hilton et al., ASE 2016 | What CI costs and what developers say they get for it, across 34,000 GitHub projects and 442 surveyed developers | Release and CI |
| **R3** | Bacchelli and Bird, ICSE 2013 | What teams believe code review is for, and what it actually produces. The two aren't the same | (LO4) |
| **R4** | Sadowski et al., ICSE-SEIP 2018 | Code review at Google. Small changes, one reviewer, fast turnaround, and most comments about readability | (LO4) |
| **R5** | Savor et al., ICSE 2016 | Continuous deployment at Facebook and OANDA, and what happened to failure rates as deploy frequency went up | Release and CI |
| **R6** | Rahman et al., MSR 2016 | How feature toggles are used in practice, with Chrome as the case study, and the debt they leave when nobody removes them | Release and CI |
| **R7** | Oppenheimer et al., USITS 2003 | Why three large internet services actually failed. Operator error was the largest cause, and configuration mistakes were the largest category of operator error | Observability |
| **R8** | Chen et al., ICSE 2014 | Database access anti-patterns in ORM-backed applications, and detecting them statically before they reach production | (LO2, performance) |
| **R9** | He, Huq and Malek, FSE 2025 | A generative-AI accessibility checker measured against the deterministic tools, including where each one misses | Accessibility |
| **R10** | Aghajani et al., ICSE 2019 | A taxonomy of what's wrong with software documentation, built from what developers complain about | Docs and handoff |
| **R11** | Vaithilingam, Zhang and Glassman, CHI 2022 EA, with Ziegler et al., CACM 2024 | 24 programmers with Copilot finished no faster and preferred it anyway. Then more than 2,000 developers whose perceived productivity tracked how often they accepted a suggestion | AI research |
| **R12** | Baltes, Cheong and Treude, 2026 | AI slop as a tragedy of the commons, from 1,154 developer posts. Review friction, quality degradation, and who pays for whose productivity gain | AI research |
| **R13** | Nagappan, Murphy and Basili, ICSE 2008 | Organizational structure predicted defects in Windows Vista better than code churn, complexity, or coverage did. Conway's law with numbers attached | (LO7) |

### Full citations

- **R1** Qingzhou Luo, Farah Hariri, Lamyaa Eloussi, and Darko Marinov. An empirical analysis of flaky tests. FSE 2014. [10.1145/2635868.2635920](https://doi.org/10.1145/2635868.2635920)
- **R2** Michael Hilton, Timothy Tunnell, Kai Huang, Darko Marinov, and Danny Dig. Usage, costs, and benefits of continuous integration in open-source projects. ASE 2016. [10.1145/2970276.2970358](https://doi.org/10.1145/2970276.2970358)
- **R3** Alberto Bacchelli and Christian Bird. Expectations, outcomes, and challenges of modern code review. ICSE 2013. [10.1109/ICSE.2013.6606617](https://doi.org/10.1109/ICSE.2013.6606617)
- **R4** Caitlin Sadowski, Emma Söderberg, Luke Church, Michal Sipko, and Alberto Bacchelli. Modern code review: a case study at Google. ICSE-SEIP 2018. [10.1145/3183519.3183525](https://doi.org/10.1145/3183519.3183525)
- **R5** Tony Savor, Mitchell Douglas, Michael Gentili, Laurie Williams, Kent Beck, and Michael Stumm. Continuous deployment at Facebook and OANDA. ICSE 2016 (Companion). [10.1145/2889160.2889223](https://doi.org/10.1145/2889160.2889223)
- **R6** Md Tajmilur Rahman, Louis-Philippe Querel, Peter C. Rigby, and Bram Adams. Feature toggles: practitioner practices and a case study. MSR 2016. [10.1145/2901739.2901745](https://doi.org/10.1145/2901739.2901745)
- **R7** David Oppenheimer, Archana Ganapathi, and David A. Patterson. Why do internet services fail, and what can be done about it? USITS 2003. [usenix.org](https://www.usenix.org/conference/usits-03/why-do-internet-services-fail-and-what-can-be-done-about-it)
- **R8** Tse-Hsun Chen, Weiyi Shang, Zhen Ming Jiang, Ahmed E. Hassan, Mohamed Nasser, and Parminder Flora. Detecting performance anti-patterns for applications developed using object-relational mapping. ICSE 2014. [10.1145/2568225.2568259](https://doi.org/10.1145/2568225.2568259)
- **R9** Ziyao He, Syed Fatiul Huq, and Sam Malek. Enhancing web accessibility: automated detection of issues with generative AI. Proc. ACM Softw. Eng. 2 (FSE 2025). [10.1145/3729371](https://doi.org/10.1145/3729371)
- **R10** Emad Aghajani, Csaba Nagy, Olga Lucero Vega-Márquez, Mario Linares-Vásquez, Laura Moreno, Gabriele Bavota, and Michele Lanza. Software documentation issues unveiled. ICSE 2019. [10.1109/ICSE.2019.00122](https://doi.org/10.1109/ICSE.2019.00122)
- **R11** Priyan Vaithilingam, Tianyi Zhang, and Elena L. Glassman. Expectation vs. experience: evaluating the usability of code generation tools powered by large language models. CHI 2022 Extended Abstracts. [10.1145/3491101.3519665](https://doi.org/10.1145/3491101.3519665) · Albert Ziegler et al. Measuring GitHub Copilot's impact on productivity. CACM 67(3), 2024. [10.1145/3633453](https://doi.org/10.1145/3633453)
- **R12** Sebastian Baltes, Marc Cheong, and Christoph Treude. "An endless stream of AI slop": how developers discuss the burden of AI-assisted software development. Preprint, submitted to IEEE Software, 2026. [arXiv:2603.27249](https://arxiv.org/abs/2603.27249)
- **R13** Nachiappan Nagappan, Brendan Murphy, and Victor Basili. The influence of organizational structure on software quality: an empirical case study. ICSE 2008. [10.1145/1368088.1368160](https://doi.org/10.1145/1368088.1368160)

### How the list was chosen

Two things had to be true of everything on the list. It had to report evidence, because you're being asked what the result *was* and how big it was, and a position paper gives you nothing to say there. And it had to be applicable to Pawtograder, because every slot has to produce an artifact from our codebase. There are wonderful papers about the Linux kernel that would leave you with nothing to bring to the room.

R12 is not peer-reviewed, and R11's first half is a short late-breaking work with 24 participants. Both are on the list on purpose. The peer-reviewed literature on working with agents lags what you'll be doing all term, so the AI slot takes the best available evidence and the pair's job includes saying why you should or shouldn't believe it. If you take R11, the companion piece to read is the METR randomized trial ([arXiv:2507.09089](https://arxiv.org/abs/2507.09089)). In it, 16 experienced developers on their own repositories, who predicted AI would make them 24% faster, reported afterwards that it had made them 20% faster, and were measured 19% slower. The three studies use different methods and reach different conclusions. You'll be working on the same codebase all term, so you can judge for yourself.

**Proposing something off-list.** Same overall process as the project slate. If there's a paper you want to teach, put it in your bid with two sentences on the artifact you'd bring, and it needs to clear the same two bars. Approved or rejected by Sep 28.

## How you get your reading

You bid, the same way you bid for a project.

Rank your **top three** readings by number, one sentence each on why, and name the artifact you think you could bring. If you'd rather teach something off the list, that goes in the bid too. Bids are due **Thu Sep 24**, the day teams are announced. Rank the readings on their own merits. We make the pairing.

Pairs, readings, and session dates go up **Mon Sep 28**. Six pairs fill three sessions. If enrollment goes above twelve we'll either add a fourth session or run one group of three, and we'll know which on Sep 24 once bids are in.

## Instructions

You're not summarizing the paper. The bar is whether the room can explain the core idea afterwards, which means deciding what to leave out. That's most of the work. A twenty-minute faithful summary of a fourteen-page paper is a worse outcome than eight minutes on the one idea that matters plus twelve on why it matters here.

Three things have to be in it:

### 1. The idea, taught

Pick the load-bearing claim and teach that. If the paper has a result, say what the result actually was, including the size of it. On its own, "faster" is not a finding. If the paper has a threat to validity that matters, say so. You're teaching engineers who'll ask.

### 2. A concrete artifact from our codebase

Bring something real that applies the reading to Pawtograder. A PR. A diagram of a subsystem. A measurement you took. A test that fails for the reason the paper predicts. A query that shows the phenomenon in our data.

"This reminds me of our gradebook" is not an artifact. The artifact is the thing that makes the paper stop being a reading and start being about us, and it's the part the room will remember in December.

### 3. A discussion you run

Come with a question the room can **genuinely disagree about**, one where you don't already know what you want people to say. Then manage the conversation when it starts: bring in the person who hasn't spoken, cut off the thread that's eating the clock, and say when you've changed your own mind.

A monologue with a question mark at the end is not facilitation.

## Submission

| | |
|---|---|
| **Pre-read**, one page | Posted to the course Discord by **10:30 Monday**, 48 hours before your session |
| **Slides or artifact** | Committed to `pawtograder/cs4535-public-resources` within **48 hours after** your session, so the room can go back to it |

Write what you want people to have in their head when they walk in: the one claim, why it might be wrong, and the question you're going to open with.

## When you're in the audience

The sessions you're not presenting in aren't time off. A substantive contribution in at least two of the three sessions is a **Pass** requirement, and the session you present in counts as one of them. That means a question in the room, or a written response in the thread, that moves the discussion somewhere.

Attendance earns nothing here. Presenting to a room that hasn't read the pre-read and won't argue is a waste of the presenter's two weeks, and you'll be on the other side of that in a few weeks.

## Grading Rubric

Delivering your presentation with the pre-read posted on time is a **Pass** requirement, as is audience contribution across the sessions.

**Your session counts double.** Under the [participation floor](/syllabus#participation), the session you present in is a performance. Missing it without arranging a swap in advance is two absences and scores zero on a Pass requirement. Tell us in advance and the swap is easy. There is no retroactive version of it.

**If your co-presenter goes quiet.** Tell us as soon as you notice, not the night before. You're not assessed on your partner's half, and a session you carried alone because your partner didn't appear is a pass rather than a penalty, provided we hear about it before the session. Bring what you have: the messages, the dates. If you're the one who has to drop, the same rule applies in reverse, and it applies before your session rather than after. Presentations don't have their own band, but teaching is where LO8 is demonstrated, and it's often where the **High Distinction** requirement *you made somebody else more capable* starts.

| Expectation | Standard |
|---|---|
| **Teaching** | The room can explain the core idea afterwards. You decided what to leave out and can say why |
| **Artifact** | Something concrete from this codebase, brought and shown |
| **Facilitation** | A question the room could genuinely disagree about, and a discussion you actually managed |
| **Co-presentation** | One talk with two people in it, not two talks sharing a slot |
| **Pre-read** | One page, 48 hours ahead, useful to somebody who hasn't read the paper |
| **Audience** | Substantive contribution in at least two of the three sessions |

### What strong looks like

You cut two-thirds of the paper and the room still got the idea. Your artifact was a failing test that demonstrated exactly what the paper predicted, on our code. The question you opened with split the room, and somebody changed their position out loud. Your co-presenter's half only made sense because of yours. Three weeks later somebody cites your reading in a PR review.

### What weak looks like

A summary that walks the paper's section order. Slides that are the abstract in bullets. "This reminds me of our gradebook." A discussion question with one defensible answer, which everybody gives, in four minutes. A pre-read posted the morning of. Two ten-minute talks that never reference each other. Silence in the sessions where you weren't presenting.

## Dates

| | |
|---|---|
| Reading list published | Wed Sep 9 |
| Your bid, three readings ranked | Thu Sep 24 |
| Pairs, readings and session dates assigned | Mon Sep 28 |
| Session 1 | Wed Oct 21 |
| Session 2 | Wed Oct 28 |
| Session 3 | Wed Dec 2 |
| Your pre-read | 10:30 Monday, 48 hours before your session |
| Your slides or artifact, committed | within 48 hours after |
