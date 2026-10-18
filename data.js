// ============================================================
//  PORTFOLIO DATA: edit this file to update the site.
//  index.html, styles.css and app.js never need to change
//  for content updates.
// ============================================================

window.PORTFOLIO = {

  // ── Header / identity ──────────────────────────────────────
  name:   "RAKSHITHA CHERUKURI",
  fileId: "SV-0812-R",                       // shown in the title bar
  model:  "VARIANT TERMINAL · MODEL 2004",   // shown on boot screen + bezel

  // ── 1 VARIANT (home screen) ────────────────────────────────
  headline: "BACKEND ENGINEER WHO DESIGNS THE SYSTEM AND SHIPS IT.",
  dossier: [
    ["DESIGNATION",     "SOFTWARE DEVELOPMENT ENGINEER"],
    ["CURRENT POST",    "JUNIOR SDE"],
    // ["KNOWN ALIASES",   "BACKEND ENGINEER · API ARCHITECT · WIREFRAMER"],
    ["ACADEMIC RECORD", "B.TECH CSE · CGPA 9.1 / 10"],
    // ["CLEARANCE",       "GATE QUALIFIED, 2025"],
    // ["PREFERRED TOOLS", "TYPESCRIPT · GRAPHQL · MONGODB"],
    ["THREAT LEVEL",    "SHIPS AND TEST IN PRODUCTION"]
  ],
  telemetry: [
    // ["500K+",    "REQUESTS/DAY"],
    // ["15S → 3S", "API, 40K RECORDS"],
    ["25+",      "GRAPHQL APIS SHIPPED"],
    ["4",    "PROJECTS WORKED ON AT WORK"],
    ["5",      "LIVE PERSONAL PROJECTS"]
  ],
  fieldNotes: "Subject is prone to over thinking and over-engineering. Subject is known to ship and test in production and talk about movies uncontrollably.",
  // ── 2 PROJECTS ─────────────────────────────────────────────
  // To add a project: copy one { ... } block, paste it at the end
  // of the list (mind the comma), and edit the text.
  //
  //  links: [label, text, url]   → leave url "" to show it as "coming soon"
  //  shots: [caption, imagePath] → leave imagePath "" for a placeholder box.
  //         Put images in the images/ folder, e.g. "images/surakshit-1.png"
  projects: [
    {
      name: "SURAKSHIT",
      kind: "REAL-TIME SYSTEMS",
      line: "Anonymous chat where no message survives after the room closes.",
      points: [
        "7 core components: room lifecycle, Socket.IO horizontal scaling, nightly cleanup, E2EE key exchange, JWT + Argon2 auth",
        "The server never sees plaintext; only room metadata is stored",
        "Extended to group chat, scaling toward 20 participants"
      ],
      stack:  "Node.js · Socket.IO · Redis · MongoDB · TypeScript",
      result: "0 messages kept after close",
      repo:   "https://github.com/ChRakshitha/surakshit",
      links: [
        ["SOURCE CODE", "github.com/ChRakshitha/surakshit ↗", "https://github.com/ChRakshitha/surakshit"],
        ["LIVE SITE",   "[ ADD LIVE URL ]", ""]
      ],
      shots: [
        ["ROOM LOBBY", ""],
        ["EPHEMERAL CHAT ROOM", ""],
        ["ARCHITECTURE DIAGRAM", ""]
      ],
      problem:  "Chat apps keep your conversations long after you stop having them. Every stored message is something that can leak.",
      approach: "Assume the server is curious. It should route messages, never read them, and keep nothing but room metadata once a room closes.",
      built: [
        "Rooms ephemeral by default: nothing persists after close",
        "E2EE key exchange layered on JWT + Argon2 authentication",
        "Per-user rate limiting",
        "Socket.IO horizontal scaling across nodes, with automated nightly cleanup"
      ],
      outcome: "No message survives a closed room; only metadata is stored. The model was then extended to group chat, scaling toward 20 participants."
    },
    {
      name: "ARUVU KHATA",
      kind: "OFFLINE VOICE · ANDROID",
      line: "A shop's credit book you keep by talking to it in Telugu, fully offline.",
      points: [
        "A short spoken conversation (who → items → total), read back aloud and saved on \"అవును\"",
        "On-device Telugu speech recognition: int8 IndicConformer via sherpa-onnx, no internet needed",
        "Telugu-aware parser turns number words like నూట యాభై into 150 and fuzzy-matches customer names"
      ],
      stack:  "Expo · React Native · TypeScript · sherpa-onnx · IndicConformer · EAS",
      result: "0 internet needed, runs on budget phones",
      repo:   "",   // repo is private; add "https://github.com/ChRakshitha/voice-ledger" if you make it public
      links: [
        ["SOURCE CODE", "[ PRIVATE REPO ]", ""],
        ["DOWNLOAD (APK)", "[ ADD DOWNLOAD LINK ]", ""]
      ],
      shots: [
        ["VOICE ENTRY CONVERSATION", ""],
        ["CUSTOMER LEDGER", ""],
        ["OVERPAYMENT WARNING", ""]
      ],
      problem:  "Many small shops in Telugu-speaking regions still keep credit records in paper notebooks. Typing-based ledger apps are slow at a busy counter, and cloud speech services need reliable internet and don't handle mixed Telugu–English speech well.",
      approach: "Don't parse one long sentence. Hold a short spoken conversation instead: one question at a time, so each answer is short, single-purpose and far easier to recognise and parse reliably.",
      built: [
        "Conversational voice entry: customer name → items → total, then a spoken read-back and confirmation",
        "Hands-free turn-taking with energy-based end-of-speech detection and per-turn noise calibration",
        "Fully offline speech recognition: AI4Bharat's IndicConformer (Telugu, int8) on-device through sherpa-onnx",
        "Telugu-aware parser for Telugu and transliterated-English numbers (రెండు వేల ఐదు వందలు → 2500, థర్టీ → 30), separating quantities from prices",
        "Ledger accounting netted per customer, so one customer's advance never hides another's debt; overpayments trigger a warning",
        "Customer history, edit/delete, repayments by period, voice balance search and CSV export",
        "Over-the-air updates for testers via EAS Update, with fingerprint-based runtime versions"
      ],
      outcome: "A Telugu-first ledger that a shopkeeper can run by voice on a budget Android phone with no internet, built with Expo and EAS and no local Android Studio setup."
    },
    {
      name: "SUDOKU",
      kind: "MOBILE · OFFLINE-FIRST",
      line: "An ad-free puzzle app that rates you like a chess player.",
      points: [
        "Elo-inspired rating engine weighs mistakes against puzzle difficulty",
        "Difficulty graded by the solving techniques needed, not clue count",
        "Fully offline, with a daily streak system"
      ],
      stack:  "React Native · TypeScript · Tailwind CSS · Local storage",
      result: "0 ads, 100% offline",
      repo:   "https://github.com/ChRakshitha/sudoku",
      links: [
        ["SOURCE CODE",    "github.com/ChRakshitha/sudoku ↗", "https://github.com/ChRakshitha/sudoku"],
        ["DOWNLOAD (APK)", "[ ADD DOWNLOAD LINK ]", ""]
      ],
      shots: [
        ["PUZZLE BOARD", ""],
        ["RATING + STREAK", ""],
        ["DIFFICULTY SELECT", ""]
      ],
      problem:  "Mainstream Sudoku apps are ad-heavy and label difficulty by clue count, which says little about how hard a puzzle really is.",
      approach: "Grade puzzles by the solving techniques they require, and rate players the way chess does.",
      built: [
        "Elo-inspired rating engine using mistake count and puzzle difficulty",
        "Puzzle generator with technique-based difficulty grading",
        "Daily streak system",
        "Fully offline with local storage, no ads"
      ],
      outcome: "Difficulty labels that match real solve complexity, in an app that works anywhere and never interrupts you."
    },
    {
      name: "KINNECT",
      kind: "15-HOUR HACKATHON",
      line: "Finding missing children at large gatherings with facial recognition.",
      points: [
        "Matching pipeline reached 90% identification accuracy on test cases",
        "Wireframe to working, tested MVP inside a 15-hour hackathon",
        "Owned system design and testing; the demo ran a real upload-to-match flow"
      ],
      stack:  "Facial recognition · System design · Figma · Tailwind CSS",
      result: "90% accuracy on test cases",
      repo:   "https://github.com/ChRakshitha/kinnect",
      links: [
        ["SOURCE CODE", "github.com/ChRakshitha/kinnect ↗", "https://github.com/ChRakshitha/kinnect"],
        ["LIVE DEMO",   "[ ADD DEMO URL ]", ""]
      ],
      shots: [
        ["PHOTO UPLOAD", ""],
        ["MATCH RESULT", ""],
        ["FIGMA WIREFRAMES", ""]
      ],
      problem:  "At a large public gathering, a missing-child report kicks off a frantic manual search through faces and crowds.",
      approach: "Fifteen hours on the clock. She owned the system design and the testing and validation process end to end.",
      built: [
        "Facial recognition matching pipeline",
        "Figma wireframes translated into working HTML/CSS screens",
        "Screens wired to the recognition backend",
        "A demo that ran a real upload-to-match flow, not mockups"
      ],
      outcome: "A working, tested MVP inside the hackathon window, with 90% identification accuracy on test cases."
    },
    {
      name: "VIDYA",
      kind: "APPLIED AI",
      line: "One topic in, a ready-to-use study set out.",
      points: [
        "Backend workflows on the OpenAI API generate 20+ questions, flashcards and FAQs per session",
        "Structured prompt iteration lifted output relevance by 60% over a baseline set",
        "Built as a modular API, so the frontend needs no manual formatting"
      ],
      stack:  "Python · OpenAI API · React · Tailwind CSS",
      result: "+60% output relevance",
      repo:   "https://github.com/ChRakshitha/vidya",
      links: [
        ["SOURCE CODE", "github.com/ChRakshitha/vidya ↗", "https://github.com/ChRakshitha/vidya"],
        ["TEAM REPO",   "github.com/guna1526/TEAM-43 ↗", "https://github.com/guna1526/TEAM-43"],
        ["LIVE SITE",   "[ ADD LIVE URL ]", ""]
      ],
      shots: [
        ["TOPIC INPUT", ""],
        ["GENERATED FLASHCARDS", ""],
        ["QUESTION SET", ""]
      ],
      problem:  "Turning a topic into study material by hand is slow, and raw model output needs cleanup before a student can use it.",
      approach: "Ran structured prompt-iteration cycles and measured output relevance against a baseline prompt set.",
      built: [
        "Backend workflows on the OpenAI API",
        "Auto-generates 20+ questions, flashcards and FAQs per study session",
        "Packaged as a modular API: one topic returns a ready-to-use set",
        "No manual formatting needed on the frontend"
      ],
      outcome: "Output relevance up 60% over the baseline prompts, and a study set that arrives ready to use."
    },
    {
      name: "PROJECT WORKBENCH",
      kind: "FULL-STACK · MONOREPO",
      line: "A project tracker for every area of life, with a dashboard, checklists and a public read-only view.",
      points: [
        "Dashboard by status and priority, with current work, upcoming deadlines and overdue projects",
        "Enforced status lifecycle: idea → planning → planned → in progress → completed, plus blocked, paused and dropped",
        "Owner mode edits everything; visitors get a read-only public view"
      ],
      stack:  "React 19 · TypeScript · Fastify · PostgreSQL · Drizzle ORM · TanStack Query · Docker",
      result: "Checklist-driven progress, end to end",
      repo:   "https://github.com/ChRakshitha/workBench",
      links: [
        ["SOURCE CODE", "github.com/ChRakshitha/workBench ↗", "https://github.com/ChRakshitha/workBench"],
        ["LIVE SITE",   "[ NOT DEPLOYED · RUN LOCALLY ]", ""]
      ],
      shots: [
        ["DASHBOARD", ""],
        ["PROJECT DETAIL", ""],
        ["PROJECTS LIST + FILTERS", ""]
      ],
      problem:  "Side projects, goals and ideas end up scattered across notes, apps and memory, with no single place showing what's in progress, what's due and what's quietly overdue.",
      approach: "Treat personal projects like real work: a clear lifecycle with enforced transitions, checklists that drive progress, and a layered API (routes → services → repositories) on a typed stack.",
      built: [
        "Dashboard with status and priority breakdowns, current work, upcoming deadlines and overdue projects",
        "Project lifecycle with enforced status transitions",
        "Checklists that calculate each project's progress automatically",
        "Categories, tags, search, filters and sorting; links, comments and an activity log on each project",
        "Owner and public modes, with JWT sessions in HTTP-only cookies",
        "pnpm monorepo: Fastify + Drizzle ORM API, versioned PostgreSQL migrations, Docker for local development"
      ],
      outcome: "One place to see every personal project and where it stands, with a read-only view that can be shared publicly."
    }
  ],

  // ── 3 TIMELINE ─────────────────────────────────────────────
  // Oldest first. `branches` are optional sub-items. Mark the latest with current: true.
  timeline: [
    { when: "JUL 2026", what: "JUNIOR SDE · TILICHO LABS", current: true },
    { when: "JUN 2025", what: "SDE INTERN · TILICHO LABS" },
    { when: "2022", what: "B.TECH CSE (SYSTEMS ENGG.) · LENDI INSTITUTE", branches: [
      { when: "HACKATHON", what: "KINNECT: WIREFRAME TO MVP IN 15 HOURS" },
      { when: "2025",      what: "GATE QUALIFIED, IN THIRD YEAR" }
    ]},
    { when: "2020", what: "CLASS XII · KENDRIYA VIDYALAYA, VIZIANAGARAM" },
  ],
  // Newest first. Set past: true for a dimmer box.
  experience: [
    {
      title: "JUNIOR SDE · TILICHO LABS · JUL 2026 – NOW",
      points: [
        "Owned backend logic for the Customer Support module: tickets, escalations, cron jobs and email digests for 5,000–10,000 tickets/day",
        "Cut a data API from 15s to 3s on 40k records by redesigning MongoDB indexing",
        "Wireframed 3 core flows (~20 screens) and turned PRDs into implementation-ready specs",
      ]
    },
    {
      title: "SDE INTERN · TILICHO LABS · JUN 2025 – JUN 2026",
      past: true,
      points: [
        "Designed and shipped 12+ production GraphQL APIs for a system handling 500k+ requests/day",
        "Worked on the frontend for an educational mobile app supporting dual languages, with React Native and Gluestack UI",
        "Worked on the frontend for a mental health web app, to analyze user data and generate reports with React, Tailwind CSS, Tanstack query and Chart.js",
      ]
    }
  ],

  // ── 4 SKILLS ───────────────────────────────────────────────
  // Anything listed in `dailySkills` gets highlighted.
  dailySkills: ["TypeScript", "GraphQL", "Node.js", "Express", "MongoDB", "Mongoose", "RBAC"],
  skills: [
    ["LANGUAGES",      ["TypeScript", "Python", "JavaScript", "C"]],
    ["BACKEND & APIS", ["Node.js", "Express", "GraphQL", "REST", "Socket.IO", "JWT", "RBAC", "Rate limiting"]],
    ["FRONTEND",       ["React", "React Native", "Redux", "Tailwind CSS", "Gluestack UI"]],
    ["DATA & INFRA",   ["MongoDB", "Mongoose", "Redis", "Git", "Postman", "NGROK", "Tableau"]],
    ["CORE CS",        ["DSA", "OOP", "DBMS", "Operating Systems", "System Design", "SDLC"]]
  ],

  // ── 5 CONTACT ──────────────────────────────────────────────
  // [label, text, url]. Leave url "" until you have it.
  contact: [
    ["EMAIL",    "rakshithacherukuri8124@gmail.com", "mailto:rakshithacherukuri8124@gmail.com"],
    ["GITHUB",   "github.com/ChRakshitha ↗",         "https://github.com/ChRakshitha"],
    ["LINKEDIN", "linkedin.com/in/rakshitha-ch ↗",   "https://www.linkedin.com/in/rakshitha-ch-104364414/"],
    ["RÉSUMÉ",   "[ DOWNLOAD FULL DOSSIER ↓ ]",      ""]   // e.g. "resume.pdf" once you add the file
  ],
  status: [
    "STATUS: ACTIVE · JUNIOR SDE, TILICHO LABS",
    "OPEN TO: BACKEND / FULL-STACK ROLES AND INTERESTING PROBLEMS"
  ]
};
