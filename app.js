// ============================================================
//  APP LOGIC: renders the content from data.js.
//  You normally only need to edit data.js.
// ============================================================

(function () {
  const D = window.PORTFOLIO;
  const $ = (id) => document.getElementById(id);

  // Escape text before putting it into HTML
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const bullets = (list) => list.map((t) => `<div class="bullet"><span>${esc(t)}</span></div>`).join("");
  const box = (head, body, cls = "") => `<div class="box ${cls}"><div class="box-head">${esc(head)}</div>${body}</div>`;
  const linkOrTodo = (text, url) =>
    url ? `<a href="${esc(url)}" target="${url.startsWith("http") ? "_blank" : "_self"}" rel="noopener">${esc(text)}</a>`
        : `<span class="dim">${esc(text)}</span>`;

  const TABS = [
    ["variant",  "VARIANT"],
    ["projects", "PROJECTS"],
    ["timeline", "TIMELINE"],
    ["skills",   "SKILLS"],
    ["contact",  "CONTACT"]
  ];

  let tab = "variant";
  let file = null;          // index of the open project, or null for the list

  // ── Screens ───────────────────────────────────────────────
  const screens = {
    variant() {
      const width = Math.max(...D.telemetry.map((t) => t[0].length)) + 6;
      const telemetry = D.telemetry
        .map(([v, label]) => `<div>${esc(v)} ${".".repeat(Math.max(2, width - v.length))} ${esc(label)}</div>`)
        .join("");
      return `
        <div class="stack-v">
          <div class="lead">&gt; ${esc(D.headline)}<span class="cursor">█</span></div>
          <div class="cols">
            <div class="wide">${D.dossier.map(([k, v]) => `<div class="row"><span class="k">${esc(k)}</span><span>${esc(v)}</span></div>`).join("")}</div>
            ${box("TELEMETRY", telemetry)}
          </div>
          <div class="dashed-top" style="max-width:900px">
            <div class="mid">FIELD NOTES:</div>
            <div>${esc(D.fieldNotes)}</div>
          </div>
          <div class="mid">USE THE MENU BELOW TO NAVIGATE. ▼</div>
        </div>`;
    },

    projects() {
      // CASE FILES (disabled for now): restore this line to turn them back on
      // return file === null ? projectList() : projectDetail(file);
      return projectList();
    },

    timeline() {
      const pad = " ".repeat(10);
      const lines = [];
      D.timeline.forEach((t, i) => {
        const last = i === D.timeline.length - 1;
        const prefix = i === 0 ? "MAIN " : pad + (last ? "└" : "├");
        const dot = t.current ? "◉" : "●";
        lines.push(`${prefix}──${dot}── ${t.when}  ${t.what}${t.current ? "   ◄ YOU ARE HERE" : ""}`);
        (t.branches || []).forEach((b, j) => {
          const bLast = j === t.branches.length - 1;
          lines.push(`${pad}│     ${bLast ? "└" : "├"}──●── ${b.when}  ${b.what}`);
        });
        if (!last) lines.push(pad + "│");
      });
      return `
        <div class="stack-v">
          <div class="mid">BRANCH MAP · MOST RECENT AT THE BOTTOM</div>
          <div class="tree">${esc(lines.join("\n"))}</div>
          ${D.experience.map((e) => box(e.title, bullets(e.points), e.past ? "past" : "")).join("")}
        </div>`;
    },

    skills() {
      const rows = D.skills.map(([group, items]) => `
        <div class="skill-row">
          <span class="k">${esc(group)}</span>
          <span class="items">${items.map((n) => D.dailySkills.includes(n) ? `<span class="hl">${esc(n)}</span>` : `<span>${esc(n)}</span>`).join("")}</span>
        </div>`).join("");
      return `
        <div class="stack-v" style="gap:16px">
          <div class="mid">EQUIPMENT CHECKED OUT TO SUBJECT · <span class="hl">HIGHLIGHT</span> = IN DAILY USE</div>
          ${rows}
        </div>`;
    },

    contact() {
      return `
        <div class="stack-v" style="gap:16px">
          <div style="font-size:34px">&gt; OPEN A CHANNEL TO THE VARIANT<span class="cursor">█</span></div>
          <div>${D.contact.map(([k, text, url]) => `<div class="kv"><span class="k">${esc(k)}</span>${linkOrTodo(text, url)}</div>`).join("")}</div>
          <div class="box" style="max-width:760px">
            ${D.status.map((s) => `<div>${esc(s)}</div>`).join("")}
            <div class="mid">THIS VARIANT IS NOT TO BE PRUNED.</div>
          </div>
        </div>`;
    }
  };

  const num = (i) => String(i + 1).padStart(2, "0");

  function projectList() {
    const n = D.projects.length;
    return D.projects.map((p, i) => `
      <section class="project">
        <div class="project-head">
          ${/* CASE FILES (disabled for now): swap the <span> below back for this button
          <button class="ptitle" data-open="${i}" aria-label="Open the full case file for ${esc(p.name)}">[${num(i)}] ${esc(p.name)} <small>OPEN FILE ▸</small></button>
          */ ""}<span class="ptitle" style="cursor:default;text-decoration:none">[${num(i)}] ${esc(p.name)}</span>
          <span>${esc(p.kind)} · ${i + 1}/${n}</span>
        </div>
        <div class="line">${esc(p.line)}</div>
        <div>${bullets(p.points)}</div>
        <div class="meta">
          <span class="k">STACK: <span style="color:var(--amber)">${esc(p.stack)}</span></span>
          <span class="k">RESULT: <span style="color:var(--amber)">${esc(p.result)}</span></span>
        </div>
        ${p.repo ? `<div><a href="${esc(p.repo)}" target="_blank" rel="noopener">[ VIEW SOURCE ↗ ]</a></div>` : ""}
        <div class="dim">${i < n - 1 ? "▼ SCROLL FOR NEXT FILE" : "■ END OF FILES"}</div>
      </section>`).join("");
  }

  /* CASE FILES (disabled for now): the full page for one project.
     To turn case files back on, remove this comment wrapper and restore
     the three other "CASE FILES" spots in this file.
  function projectDetail(i) {
    const n = D.projects.length;
    const p = D.projects[i];
    const prev = (i + n - 1) % n;
    const next = (i + 1) % n;
    const links = (p.links || []).map(([k, text, url]) => `<div class="kv"><span class="k">${esc(k)}</span>${linkOrTodo(text, url)}</div>`).join("");
    const shots = (p.shots || []).map(([cap, img], j) => `
      <figure>
        ${img ? `<img class="shot-img" src="${esc(img)}" alt="${esc(cap)}" loading="lazy">` : `<div class="shot">[ ADD SCREENSHOT ]</div>`}
        <figcaption>FIG. ${j + 1} · ${esc(cap)}</figcaption>
      </figure>`).join("");
    return `
      <div class="stack-v" style="padding-bottom:24px">
        <div class="spread">
          <button class="opt outlined" data-close>◄ BACK TO ALL PROJECTS</button>
          <span class="mid">CASE FILE ${i + 1}/${n}</span>
        </div>
        <div class="detail-head">
          <div class="t">[${num(i)}] ${esc(p.name)}</div>
          <div>${esc(p.kind)} · ${esc(p.line)}</div>
        </div>
        ${links ? box("ACCESS POINTS", links) : ""}
        ${shots ? `<div><div class="mid" style="margin-bottom:8px">VISUAL EVIDENCE</div><div class="shots">${shots}</div></div>` : ""}
        <div class="grid2">
          <div><div class="mid">01 · THE PROBLEM</div><div>${esc(p.problem || "")}</div></div>
          <div><div class="mid">02 · THE APPROACH</div><div>${esc(p.approach || "")}</div></div>
        </div>
        <div><div class="mid">03 · WHAT SHE BUILT</div>${bullets(p.built || [])}</div>
        ${box("04 · OUTCOME", `<div>${esc(p.outcome || "")}</div>`)}
        <div class="mid">STACK: <span style="color:var(--amber)">${esc(p.stack)}</span></div>
        <div class="spread footer-nav">
          <button class="opt" data-open="${prev}">◄ PREV: ${esc(D.projects[prev].name)}</button>
          <button class="opt" data-open="${next}">NEXT: ${esc(D.projects[next].name)} ►</button>
        </div>
      </div>`;
  }
  */

  // ── Rendering ─────────────────────────────────────────────
  const pane = $("pane");
  const menu = $("menu");

  function render() {
    pane.innerHTML = `<div class="power">${screens[tab]()}</div>`;
    pane.classList.toggle("snap", tab === "projects" && file === null);
    pane.scrollTop = 0;
    menu.innerHTML = TABS.map(([id, label], i) =>
      `<button class="menu-btn" data-tab="${id}" ${id === tab ? 'aria-current="page"' : ""}>${i + 1} ${label}</button>`
    ).join("");
  }

  function go(newTab) { tab = newTab; file = null; render(); }

  // One click handler for everything inside the screen
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-tab],[data-open],[data-close]");
    if (!t) return;
    if (t.dataset.tab) go(t.dataset.tab);
    // CASE FILES (disabled for now): open / close a project
    // else if (t.dataset.open !== undefined) { file = Number(t.dataset.open); render(); }
    // else if (t.hasAttribute("data-close")) { file = null; render(); }
  });

  // Keyboard: 1–5 switch tabs, Esc closes a project
  document.addEventListener("keydown", (e) => {
    if (e.target.closest("input, textarea") || e.metaKey || e.ctrlKey || e.altKey) return;
    const n = Number(e.key);
    if (n >= 1 && n <= TABS.length) go(TABS[n - 1][0]);
    // CASE FILES (disabled for now): Esc closes a project
    // if (e.key === "Escape" && file !== null) { file = null; render(); }
  });

  // ── Clock ─────────────────────────────────────────────────
  function tickClock() {
    const d = new Date();
    const p = (x) => String(x).padStart(2, "0");
    $("file-clock").textContent = `VARIANT FILE ${D.fileId} · ${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`;
  }

  // ── Boot sequence ─────────────────────────────────────────
  function boot() {
    const lines = [
      [0,  "> POWERING CATHODE TUBE .......... OK"],
      [25, "> LOCATING MAIN TIMELINE ......... OK"],
      [50, `> SCANNING FOR BRANCHES .......... ${D.projects.length} FOUND`],
      [75, "> VERIFYING VARIANT .............. OK"]
    ];
    const start = Date.now();
    const DURATION = 1900;
    const timer = setInterval(() => {
      const pct = Math.min(100, Math.round(((Date.now() - start) / DURATION) * 100));
      const filled = Math.round((pct / 100) * 28);
      $("boot-lines").innerHTML = lines.filter((l) => pct >= l[0]).map((l) => `<div>${esc(l[1])}</div>`).join("");
      $("boot-bar").textContent = `[${"█".repeat(filled)}${"░".repeat(28 - filled)}] ${pct}%`;
      if (pct >= 100) {
        clearInterval(timer);
        setTimeout(showMain, 100);
      }
    }, 80);
  }

  function showMain() {
    $("loader").classList.add("hidden");
    $("restore").classList.add("hidden");
    $("bg").classList.remove("full");
    const main = $("main");
    main.classList.remove("hidden", "pruning");
    main.classList.add("boot");
  }

  // ── Prune / restore ───────────────────────────────────────
  $("prune").addEventListener("click", () => {
    const main = $("main");
    main.classList.remove("boot");
    main.classList.add("pruning");
    $("bg").classList.add("full");
    setTimeout(() => {
      main.classList.add("hidden");
      $("restore").classList.remove("hidden");
    }, 800);
  });
  $("restore").addEventListener("click", () => { go("variant"); showMain(); });

  // ── Start ─────────────────────────────────────────────────
  $("name").textContent = D.name;
  $("loader-title").textContent = D.model;
  $("loader-file").textContent = D.fileId;
  $("badge-model").textContent = D.model;
  tickClock();
  setInterval(tickClock, 1000);
  render();
  boot();
})();
