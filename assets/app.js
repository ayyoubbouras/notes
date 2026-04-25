const entries = [
  {
    id: "structure-ai",
    type: "essay",
    date: "April 2026",
    title: "Why structure still matters in AI systems",
    summary: "A working argument for why ontologies, graphs, and policy layers are not old artifacts from a previous AI era, but active components of reliable modern systems.",
    tags: ["knowledge graphs", "ontology", "reliable AI"],
    mode: "dialog",
    body: [
      "A lot of AI discussion still assumes that better models eventually dissolve the need for explicit structure. I think the opposite is closer to the truth in enterprise settings. As systems move from demonstrations to decisions, structure becomes more important, not less.",
      "The value of structure is not just that it documents the domain. It changes what the system can do safely. A graph, ontology, or typed policy layer gives the system a way to reuse meaning, constrain behavior, and route uncertainty without pretending the model is more reliable than it is.",
      "That is why I keep coming back to the same question: not how to make models sound smarter, but how to make intelligent systems more legible under pressure."
    ]
  },
  {
    id: "deterministic-scaffolding",
    type: "essay",
    date: "April 2026",
    title: "Deterministic layers inside probabilistic workflows",
    summary: "Notes on why I’m increasingly interested in agents that do not make the final call everywhere, but operate inside systems with clearer boundaries and escalation paths.",
    tags: ["agents", "determinism", "workflow design"],
    mode: "dialog",
    body: [
      "I do not think the interesting future is a model deciding everything on its own. The more useful pattern is often the opposite: let the model contribute where ambiguity is real, but place deterministic layers around classification, routing, eligibility, policy, and final authority.",
      "This is not an anti-model stance. It is a systems stance. Once you care about governance, repeatability, trust, and debugging, unconstrained model freedom stops looking impressive and starts looking expensive.",
      "The question becomes architectural: where should intelligence stay flexible, and where should it be made explicit? That boundary is one of the most important design choices in applied AI."
    ]
  },
  {
    id: "career-opinion",
    type: "opinion",
    date: "April 2026",
    title: "The kind of AI builder I want to become",
    summary: "Not a pure researcher and not a generic prompt engineer. I’m more interested in becoming the person who makes intelligent systems trustworthy in real environments.",
    tags: ["career", "applied AI", "systems thinking"],
    mode: "dialog",
    body: [
      "The more I look at the market, the clearer my own direction becomes. I do not want to spend my career optimizing only the model side, and I do not want to become another generalist whose value disappears as the tools improve.",
      "What feels more durable is the intersection: structure, evaluation, orchestration, and reliability. The builder who understands both meaning and operations is still comparatively rare.",
      "That is the direction this site is meant to document."
    ]
  },
  {
    id: "market-map",
    type: "experiment",
    date: "April 2026",
    title: "Job Market Skill Map",
    summary: "An interactive map of where my current profile sits, where the premium zone is, and which skills move me closer to it.",
    tags: ["career map", "market positioning", "interactive"],
    mode: "link",
    href: "experiments/job_market_skill_map.html"
  },
  {
    id: "hexagon",
    type: "experiment",
    date: "April 2026",
    title: "Skill Hexagon Comparison",
    summary: "A six-axis visual comparing my current profile, a production AI operator, and the hybrid profile that seems to command the most value.",
    tags: ["skills", "visualization", "agentic AI"],
    mode: "link",
    href: "experiments/skill_hexagon_comparison.html"
  },
  {
    id: "workflow",
    type: "experiment",
    date: "April 2026",
    title: "AI Agent System Workflow",
    summary: "A workflow view of how my current skills add value inside an agent system and where orchestration, evals, and production layers enter.",
    tags: ["workflow", "agents", "structured AI"],
    mode: "link",
    href: "experiments/agent_system_skill_workflow.html"
  },
  {
    id: "opinions-over-demos",
    type: "opinion",
    date: "April 2026",
    title: "Why I trust evaluation more than AI demos",
    summary: "A short opinion on why the real separating skill in applied AI is not building a cool first run, but building systems that stay coherent when the novelty wears off.",
    tags: ["evaluation", "LLMs", "production"],
    mode: "dialog",
    body: [
      "A demo mostly proves that the system worked once. It does not prove that it can keep working when input quality drops, when the domain shifts, when the wrong user asks the wrong question, or when the model behaves differently next week.",
      "The more I think about applied AI, the more evaluation feels like the real dividing line between clever and useful.",
      "If I had to pick one growth area with the highest practical return right now, it would be building better judgment around measurement."
    ]
  }
];

const grid = document.getElementById("writingGrid");
const filters = document.getElementById("filters");
const dialog = document.getElementById("entryDialog");
const dialogClose = document.getElementById("dialogClose");
const dialogType = document.getElementById("dialogType");
const dialogTitle = document.getElementById("dialogTitle");
const dialogMeta = document.getElementById("dialogMeta");
const dialogTags = document.getElementById("dialogTags");
const dialogBody = document.getElementById("dialogBody");

function renderEntries(filter = "all") {
  grid.innerHTML = "";

  entries
    .filter(entry => filter === "all" || entry.type === filter)
    .forEach(entry => {
      const article = document.createElement("article");
      article.className = "entry-card";

      const tags = entry.tags
        .map(tag => `<span class="tag">${tag}</span>`)
        .join("");

      const action =
        entry.mode === "link"
          ? `<a class="entry-link" href="${entry.href}">Open experiment</a>`
          : `<button class="entry-open" type="button" data-id="${entry.id}">Read entry</button>`;

      article.innerHTML = `
        <div class="entry-meta">
          <span class="entry-type" data-type="${entry.type}">${entry.type}</span>
          <span>${entry.date}</span>
        </div>
        <div>
          <h3>${entry.title}</h3>
          <p class="entry-summary">${entry.summary}</p>
        </div>
        <div class="entry-tags">${tags}</div>
        <div class="entry-actions">
          ${action}
        </div>
      `;

      grid.appendChild(article);
    });
}

function openEntry(id) {
  const entry = entries.find(item => item.id === id);
  if (!entry || entry.mode !== "dialog") return;

  dialogType.textContent = entry.type;
  dialogTitle.textContent = entry.title;
  dialogMeta.textContent = entry.date;
  dialogTags.innerHTML = entry.tags.map(tag => `<span class="tag">${tag}</span>`).join("");
  dialogBody.innerHTML = entry.body.map(paragraph => `<p>${paragraph}</p>`).join("");
  dialog.showModal();
}

filters.addEventListener("click", event => {
  const button = event.target.closest("button[data-filter]");
  if (!button) return;

  filters.querySelectorAll("button").forEach(item => {
    item.classList.toggle("active", item === button);
  });

  renderEntries(button.dataset.filter);
});

grid.addEventListener("click", event => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;
  openEntry(button.dataset.id);
});

dialogClose.addEventListener("click", () => dialog.close());

dialog.addEventListener("click", event => {
  const rect = dialog.getBoundingClientRect();
  const isOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (isOutside) dialog.close();
});

renderEntries();
