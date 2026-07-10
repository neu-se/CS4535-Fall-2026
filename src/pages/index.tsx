"use client";

import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Img from '../components/Img';

export default function Home() {
  return (
    <Layout title="Welcome" description="CS 4535: Software Design & Delivery — Professional Practicum Capstone">
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>

        {/* Hero */}
        <div style={{ marginBottom: '3rem' }}>
          <Img src="/img/software-that-ships.png" alt="Software Design & Delivery Banner" prompt="A wide pixel-art cityscape banner in retro 16-bit style, reading left to right as a single continuous panorama. The scene depicts the SAME city in two states — rough and scrappy on the left, polished and thriving on the right — with the transformation happening in the middle. The entire scene sits on a waterfront with dark reflective water at the bottom edge and a dark navy sky with small white stars above.

Left third — the codebase as you find it: The city works, but nobody lingers. Buildings have exposed wiring and visible duct tape on pipes. The spaces between buildings are dark, narrow, uninviting — no one gathers there. Windows glow with harsh bluish-white light, the kind that says 'get your work done and leave.' A rooftop monitor shows a yellow 'Deploy' bar with a spinning icon. A server rack blinks amber warning lights. One building has a large screen displaying the exact text '500' in big red numbers with the exact text 'We hit a ruff patch' below it, and a small sad pixel-art husky sitting next to the error message. A few windows show developers squinting at confusing code. Scaffolding leans against buildings. The waterfront on the left side is empty — no one sits there. Color palette is muted amber, dusty brick, harsh blue-white from screens, and washed-out tones — functional but lifeless.

Center third — the work happening: This is the active construction zone. Fifty small pixel-art figures are everywhere, visibly diverse — different skin tones, hair styles, and clothing colors, some wearing hijabs, some with glasses, some tall, some short. Some are on scaffolding rewiring cables between buildings, some at screens showing code diffs with red and green lines, some huddled in pairs doing code review with a speech bubble containing the exact text 'LGTM', some on rooftops installing fresh server racks with blinking green LEDs, some in a ground-floor room talking to pixel-art students across a table (user research). A rooftop dashboard shows three pipeline stages labeled 'Build', 'Test', and 'Deploy' — the first two green, the third transitioning from yellow to green. Glowing teal and green fiber optic cables are being run from left to right, replacing the old exposed wiring. The energy is busy, collaborative, and purposeful. Color palette transitions here — muted tones giving way to brighter teals, greens, and clean whites.

Right third — the codebase as you leave it: The same skyline, recognizably the same buildings, but transformed — and now the city has the quality without a name. Not just functional. Alive. Clean glowing cables connect everything in neat parallel runs. Every rooftop has a small green beacon light pulsing softly. Monitors show steady green lines and the exact text '99.9%'. Server racks blink calm green behind glass-walled panels. But the real change is how the city feels inhabited. Buildings have warm light spilling from windows on two sides — not fluorescent, but golden, like places people choose to be. Small courtyards have appeared between buildings where pixel-art figures sit together at outdoor tables, laptops open, talking. A covered walkway connects two buildings, with students walking through it mid-conversation. Rooftop gardens with small green plants grow between the server units — infrastructure and life coexisting. A café or common room glows at street level in one building, with figures visible inside gathered around a shared screen. The largest building is a warmly-lit lecture hall with generous windows — light on two sides — where rows of pixel-art students sit at laptops. One laptop screen shows a code editor with colorful syntax-highlighted lines. Another shows a discussion forum with three message bubbles and avatar squares. A student has a thumbs-up reaction bubble above their head. Another student's screen shows a terminal with the exact text 'git push' in green. In a smaller adjacent building with an open door and a welcoming entrance, a TA sits at a screen showing the exact text 'Office Hours' with the names 'Alex T.', 'Sam W.', 'Jordan L.' and a green dot with the number '3'. Through another window, an instructor views a live poll with four bars labeled 'A', 'B', 'C', 'D'. The building that showed the 500 error now has a clean dashboard with all green checkmarks and the exact text 'All systems operational'. The husky from the error page sits happily on the tallest rooftop, tail wagging, wearing a tiny hard hat. The right edge glows with golden-hour light — a sunrise washing over the skyline. The waterfront on the right side has a small dock where pixel-art figures sit with feet dangling over the water, taking a break. A small pixel-art tugboat loaded with glowing cube-shaped packages is approaching this dock from the left, almost there, trailing a V-shaped wake behind it across the water. It's arriving, not yet docked — still has momentum, bow pointed at the pier. The city doesn't just work. People want to be there.

Style: pixel art, 16-bit retro aesthetic, detailed but readable at small sizes. Wide aspect ratio (roughly 5:2). No text in the image other than what is specified above on in-scene screens, monitors, and UI elements." />
          <h1 style={{ fontSize: '2.25rem', marginBottom: '0.25rem' }}>
            CS 4535: Software Design &amp; Delivery
          </h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--ifm-color-emphasis-700)', marginBottom: '1.5rem' }}>
            Professional Practicum Capstone &middot; AI &amp; Open Source &middot; Fall 2026 &middot; MWR 10:30–11:35 AM
          </p>

          <div style={{
            background: 'var(--ifm-color-success-contrast-background)',
            border: '1px solid var(--ifm-color-success-dark)',
            borderRadius: '8px',
            padding: '0.75rem 1.25rem',
            marginBottom: '1.5rem',
            lineHeight: 1.6,
          }}>
            <strong>30+ seats still available for Fall 2026.</strong> We're building a large section — our goal is 50 students. Applications are accepted on a rolling basis, so <Link to="/apply"><strong>apply as soon as possible</strong></Link>.
          </div>

          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            When you join a company, you'll be working on a product that predates you. Lots of features. Lots of code. Lots of technical debt. Some teams struggle under that weight — barely satisfying their users, burning through resources. But the best teams find ways to make a codebase better than they found it, ship features that users didn't know they needed, and turn inherited complexity into a platform for something new. The difference isn't luck — it's skill. This course teaches you that skill.
          </p>

          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            The product is <a href="https://github.com/pawtograder">Pawtograder</a> — a production platform with 1,500+ weekly active users across CS 2000, 2100, and 3100 at Northeastern. It manages assignments, group projects, grading workflows, discussion forums, live polling, and real-time office hours. All repos are public and open source — you can start exploring right now. Your commits don't go to a grading script. They go to staging, then to production. All 50 students work on one codebase together, shipping continuously to production throughout the semester.
          </p>

          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            This course surfaces questions that matter beyond any single assignment:
          </p>

          <ol style={{ fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-700)', lineHeight: 1.6, paddingLeft: '1.25rem' }}>
            <li>What changes when the users of your software are sitting in the same building?</li>
            <li>How do you onboard to a codebase with tens of thousands of lines you didn't write?</li>
            <li>When should you trust an AI agent to write code on your behalf — and when should you intervene?</li>
            <li>What does it mean to "own" a feature from requirements through production monitoring?</li>
            <li>How do you make architectural decisions when fifty people need to merge code into the same repo?</li>
            <li>What separates a contribution from a commit?</li>
          </ol>
        </div>

        {/* Philosophy */}
        <div style={{ marginBottom: '3rem' }}>
          <h2>Philosophy</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)', fontStyle: 'italic', fontSize: '1.05rem' }}>
            How much do you do? I define the minimum for an A. You decide the minimum for your goals. Choose the topic focus that you want. Make the GitHub resume that you want. Use the AI that you want, too.
          </p>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            Real products need more than people who can write code. They need people who can talk to users, design interfaces, write documentation, set up monitoring, optimize queries, wrangle CI pipelines, and figure out why the thing that worked yesterday doesn't work today. This course has room for all of those people.
          </p>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            A student who is passionate about user research and student experience — who conducts usability studies, synthesizes findings into design recommendations, and uses Claude Code to implement and ship those changes — is just as valued as the distributed systems hacker who profiles the gradebook and rewrites the query layer. Both are doing real engineering. Both are accountable for what ships. The difference is where you focus, not whether your work counts.
          </p>
        </div>

        {/* Course Structure */}
        <div style={{ marginBottom: '3rem' }}>
          <h2>Course Structure</h2>

          <h3>Phase 1: Onboarding (Weeks 1–3)</h3>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            Lectures cover the architecture of Pawtograder, CI/CD and continuous delivery, serverless and microservices patterns, testing and monitoring, estimation, risk management, and user research — ordered to get you productive in the codebase as fast as possible.
          </p>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            In parallel, you'll complete a ticket burn-down: documentation tickets and a small implementation task, shipping a change through the full pipeline (branch → PR → review → merge → deploy).
          </p>

          <h3>Phase 2: Studio (Weeks 4–14)</h3>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            After onboarding, class shifts to studio format. You bid on a project team and work continuously for the rest of the semester:
          </p>
          <ul style={{ lineHeight: 1.8, color: 'var(--ifm-color-emphasis-800)', marginBottom: '1rem' }}>
            <li><strong>Day 1:</strong> Standup + Clinic — 15-min all-hands standup, then teams sign up for instructor/TA consultation on blockers and design tradeoffs</li>
            <li><strong>Day 2:</strong> Design/Code Review — 1–2 teams present a design decision, significant PR, or user research finding for structured critique</li>
            <li><strong>Day 3:</strong> Team work session — dedicated in-class time for coordination, pair programming, and co-located work</li>
            <li><strong>Biweekly:</strong> Demo days — each team demos what shipped, live in the real product, 5 minutes plus questions</li>
          </ul>
        </div>

        {/* Projects */}
        <div style={{ marginBottom: '3rem' }}>
          <h2>Projects</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            One team per project. Team sizes adjust based on demand through a bidding process. Each project spans the full SDLC. The projects below are starting points — we're also looking for ideas from students. If you see a problem in Pawtograder that isn't listed here, tell us in your application.
          </p>

          <div className="tech-stack-grid">
            <div className="tech-stack-card">
              <h4>Usability Strike Force</h4>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>
                User research and UX improvements. Conduct usability studies with real users, identify pain points, design and ship improvements.
              </p>
            </div>
            <div className="tech-stack-card">
              <h4>Office Hours Reconceptualization</h4>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>
                Rethink and rebuild the office hours experience. Full product design challenge from user research through deployment.
              </p>
            </div>
            <div className="tech-stack-card">
              <h4>Docusaurus Integration</h4>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>
                Build integrations between Pawtograder and Docusaurus course sites. Schedule sync, office hours widgets, search, live polls in slides.
              </p>
            </div>
            <div className="tech-stack-card">
              <h4>Paper Exam Generation &amp; Grading</h4>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>
                A full Gradescope replacement: generate and shuffle exam variants, barcode and scan handling, OCR (including handwriting), and grading workflows. A major project.
              </p>
            </div>
            <div className="tech-stack-card">
              <h4>GitHub → Forgejo Migration</h4>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>
                Move Pawtograder's Git hosting from GitHub to self-hosted Forgejo: account auto-provisioning, repo automation, CI, and the migration path itself.
              </p>
            </div>
            <div className="tech-stack-card">
              <h4>Coder Workspaces Integration</h4>
              <p style={{ fontSize: '0.9rem', margin: 0 }}>
                One-click cloud dev environments for intro courses: integrate Coder with Pawtograder — SSO, per-class workspace provisioning, and grading hooks.
              </p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: '3rem' }}>
          <h2>The Stack</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            Pawtograder is a production application. This is what you'll be working in:
          </p>

          <div className="tech-stack-grid">
            <div className="tech-stack-card">
              <h4>Core</h4>
              <ul>
                <li><strong>TypeScript</strong> — everywhere, front to back</li>
                <li><strong>Next.js 15</strong> / <strong>React</strong> — frontend and API routes</li>
                <li><strong>Supabase</strong> (PostgreSQL) — database, auth, realtime, edge functions</li>
                <li><strong>Deno</strong> — edge functions runtime</li>
              </ul>
            </div>
            <div className="tech-stack-card">
              <h4>Infrastructure &amp; Ops</h4>
              <ul>
                <li><strong>GitHub Actions</strong> — CI/CD pipelines</li>
                <li><strong>Docker</strong> — local development</li>
              </ul>
            </div>
            <div className="tech-stack-card">
              <h4>Integrations</h4>
              <ul>
                <li><strong>GitHub API</strong> (Octokit) — repos, OAuth, app integrations</li>
                <li><strong>LangChain</strong> / <strong>OpenAI</strong> / <strong>Anthropic</strong> — AI-powered hints and grading</li>
                <li><strong>Amazon Chime SDK</strong> — video for office hours</li>
                <li><strong>Sentry</strong> — error monitoring</li>
                <li><strong>Discord bot</strong> — course ops sync (discussions, help requests, ACL)</li>
                <li><strong>MCP server</strong> — AI-assisted TA support tooling</li>
              </ul>
            </div>
            <div className="tech-stack-card">
              <h4>Testing</h4>
              <ul>
                <li><strong>Jest</strong> — unit tests</li>
                <li><strong>Playwright</strong> — end-to-end tests</li>
                <li><strong>k6</strong> — load testing</li>
              </ul>
            </div>
          </div>

          <p style={{ fontSize: '0.95rem', color: 'var(--ifm-color-emphasis-600)', fontStyle: 'italic', marginTop: '0.5rem' }}>
            Experience with any of these is a bonus, not a prerequisite. You'll learn what you need on the job — that's the point.
          </p>
        </div>

        {/* AI Policy */}
        <div style={{ marginBottom: '3rem' }}>
          <h2>Our Approach to AI</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            AI coding agents are not merely permitted. They are expected. This is a course about professional software engineering, and AI-assisted development is part of professional software engineering. Use AI for implementation, design, operations, code review, documentation, research — whatever makes you more effective. All Northeastern students have access to Claude Code through the university's Anthropic partnership — $200/month in credits, included with your enrollment.
          </p>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            You are responsible for everything you ship, regardless of who or what wrote it. Accountability follows the whole chain — author, reviewer, mentor, instructor. Using AI well means reviewing what it produces with the same rigor you'd apply to a junior teammate's PR.
          </p>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            The one exception: personal reflection. We respectfully ask that you use your own words and thoughts there. The point of reflection is the thinking itself.
          </p>
        </div>

        {/* Apply */}
        <div style={{ marginBottom: '3rem' }}>
          <h2>Apply</h2>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            This is a selective capstone for up to 50 students, and <strong>30+ seats are still available</strong>. The only prerequisite is CS 3100 (or CS 3500). Enrollment is by application — we're building a team, not filling seats. We prioritize diversity of skills: frontend, backend, user research, ops, documentation, and everything in between.
          </p>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            Applications are open and reviewed on a rolling basis — seats fill as strong applications arrive, so apply as soon as possible. The fastest path to a decision: complete the pre-application activity (get Pawtograder running locally) before you apply — it answers most of the questions we'd otherwise have. Join the <a href="https://discord.gg/tZRR36bcgQ">Pawtograder Community Discord</a> to get started early.
          </p>
          <p style={{ lineHeight: 1.7, color: 'var(--ifm-color-emphasis-800)' }}>
            <Link to="/apply"><strong>Learn more and apply →</strong></Link>
          </p>
        </div>

        {/* Navigation */}
        <div style={{
          borderTop: '1px solid var(--ifm-color-emphasis-300)',
          paddingTop: '1.5rem',
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <Link to="/apply"><strong>Apply</strong></Link>
          <a href="https://github.com/pawtograder"><strong>Pawtograder on GitHub</strong></a>
        </div>

      </div>
    </Layout>
  );
}
