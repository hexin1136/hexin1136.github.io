const CATALOG = [
  {
    id: "writing",
    label: "AI writing assistants",
    goals: ["writing", "marketing"],
    budgets: ["free", "low", "mid"],
    privacy: ["cloud"],
    summary: "Draft blogs, emails, and campaigns faster with guided prompts and editing workflows.",
    href: "/articles/best-ai-writing-tools.html",
    linkLabel: "Best AI writing tools guide"
  },
  {
    id: "chat",
    label: "General AI chat (ChatGPT / Claude class)",
    goals: ["writing", "research", "coding", "productivity"],
    budgets: ["free", "low", "mid", "high"],
    privacy: ["cloud"],
    summary: "Flexible assistants for brainstorming, analysis, and everyday knowledge work.",
    href: "/articles/chatgpt-vs-claude.html",
    linkLabel: "ChatGPT vs Claude comparison"
  },
  {
    id: "image",
    label: "AI image generators",
    goals: ["image", "marketing"],
    budgets: ["low", "mid", "high"],
    privacy: ["cloud", "local"],
    summary: "Create concept art, social creatives, and product visuals from text prompts.",
    href: "/articles/best-ai-image-generators.html",
    linkLabel: "Best AI image generators"
  },
  {
    id: "coding",
    label: "AI coding assistants",
    goals: ["coding"],
    budgets: ["free", "mid", "high"],
    privacy: ["cloud", "local"],
    summary: "Autocomplete, refactors, and repo-aware help inside your editor.",
    href: "/articles/ai-coding-assistants-compared.html",
    linkLabel: "AI coding assistants compared"
  },
  {
    id: "free",
    label: "Strong free-tier AI tools",
    goals: ["writing", "image", "research", "productivity", "coding"],
    budgets: ["free"],
    privacy: ["cloud"],
    summary: "Useful starting points when you need capability before a paid plan.",
    href: "/articles/best-free-ai-tools.html",
    linkLabel: "Best free AI tools"
  },
  {
    id: "smb",
    label: "AI for small business ops",
    goals: ["marketing", "productivity", "writing"],
    budgets: ["low", "mid"],
    privacy: ["cloud"],
    summary: "Lightweight stacks for support drafts, content, and meeting follow-ups.",
    href: "/articles/ai-tools-for-small-business.html",
    linkLabel: "AI tools for small business"
  },
  {
    id: "midjourney-alt",
    label: "Midjourney-style image options",
    goals: ["image"],
    budgets: ["low", "mid"],
    privacy: ["cloud", "local"],
    summary: "Web UIs and alternatives if Discord-based workflows are a blocker.",
    href: "/articles/midjourney-alternatives.html",
    linkLabel: "Midjourney alternatives"
  },
  {
    id: "pricing",
    label: "Understand ChatGPT plan pricing",
    goals: ["writing", "research", "coding", "productivity"],
    budgets: ["free", "low", "mid", "high"],
    privacy: ["cloud"],
    summary: "Match Free / Plus / Team-style tiers to how often your team actually prompts.",
    href: "/articles/chatgpt-pricing-explained.html",
    linkLabel: "ChatGPT pricing explained"
  },
  {
    id: "students",
    label: "AI study & research helpers",
    goals: ["research", "writing", "productivity"],
    budgets: ["free", "low"],
    privacy: ["cloud"],
    summary: "Explainers and outline help—with clear academic integrity boundaries.",
    href: "/articles/best-ai-tools-for-students.html",
    linkLabel: "Best AI tools for students"
  },
  {
    id: "productivity",
    label: "AI productivity suite pieces",
    goals: ["productivity"],
    budgets: ["free", "low", "mid"],
    privacy: ["cloud"],
    summary: "Notes, meeting summaries, and task drafting that cut admin time.",
    href: "/articles/ai-productivity-tools.html",
    linkLabel: "AI productivity tools"
  },
  {
    id: "chooser",
    label: "Decision framework first",
    goals: ["writing", "image", "coding", "marketing", "research", "productivity"],
    budgets: ["free", "low", "mid", "high"],
    privacy: ["cloud", "local", "either"],
    summary: "If you are early, start with criteria—not another random free trial.",
    href: "/articles/how-to-choose-an-ai-tool.html",
    linkLabel: "How to choose an AI tool"
  },
  {
    id: "detection",
    label: "AI content detection tools",
    goals: ["writing", "research"],
    budgets: ["free", "low", "mid"],
    privacy: ["cloud"],
    summary: "Use detectors as signals, not verdicts—especially for education and publishing.",
    href: "/articles/ai-content-detection-tools.html",
    linkLabel: "AI content detection tools"
  }
];

function scoreItem(item, goal, budget, privacy) {
  let score = 0;
  if (item.goals.includes(goal)) score += 5;
  if (item.budgets.includes(budget)) score += 3;
  if (privacy === "either" || item.privacy.includes(privacy) || item.privacy.includes("either")) score += 2;
  if (item.id === "chooser") score += 1; // gentle nudge toward framework article
  return score;
}

function renderResults(matches) {
  const root = document.getElementById("results");
  if (!root) return;
  if (!matches.length) {
    root.innerHTML = "<p>No strong matches. Try a broader goal or budget, or read <a href=\"/articles/how-to-choose-an-ai-tool.html\">how to choose an AI tool</a>.</p>";
    root.classList.add("visible");
    return;
  }
  root.innerHTML = matches
    .map(
      (m, i) => `
      <div class="result-card">
        <h3>${i + 1}. ${m.label}</h3>
        <p>${m.summary}</p>
        <p class="result-meta">Match score: ${m._score} · estimates only—verify pricing and data policies on the vendor site.</p>
        <p><a href="${m.href}">${m.linkLabel}</a></p>
      </div>`
    )
    .join("");
  root.classList.add("visible");
}

function runPicker() {
  const goal = document.getElementById("goal").value;
  const budget = document.getElementById("budget").value;
  const privacy = document.getElementById("privacy").value;
  const ranked = CATALOG.map((item) => ({
    ...item,
    _score: scoreItem(item, goal, budget, privacy)
  }))
    .filter((item) => item._score >= 5)
    .sort((a, b) => b._score - a._score)
    .slice(0, 4);
  renderResults(ranked);
}

function resetPicker() {
  document.getElementById("goal").selectedIndex = 0;
  document.getElementById("budget").selectedIndex = 0;
  document.getElementById("privacy").selectedIndex = 0;
  const root = document.getElementById("results");
  root.classList.remove("visible");
  root.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const runBtn = document.getElementById("run-picker");
  const resetBtn = document.getElementById("reset-picker");
  if (runBtn) runBtn.addEventListener("click", runPicker);
  if (resetBtn) resetBtn.addEventListener("click", resetPicker);
});
