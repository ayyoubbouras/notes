const entries = [
  {
    id: "profile-core",
    type: "profile",
    date: "LinkedIn profile",
    title: "Knowledge, AI, and structured systems",
    summary: "A profile centered on abstract and open-ended problems, systems thinking, and the organization of messy information into usable frameworks.",
    tags: ["knowledge", "AI", "structured systems", "semantic technologies"],
    mode: "dialog",
    body: [
      "I’m drawn to abstract and open-ended problems, where defining the right questions is just as important as finding the answers.",
      "I enjoy working through complexity using systems and analogical thinking, connecting ideas across domains to better understand and solve challenges.",
      "I’m particularly interested in the intersection of knowledge, AI, and structured systems, and in how messy, unstructured information can be organized into frameworks that support clearer thinking and more effective problem-solving."
    ]
  },
  {
    id: "amazon-ontology",
    type: "profile",
    date: "Current role",
    title: "Ontology-driven systems at Amazon",
    summary: "Work centered on large-scale product knowledge modeling, validation workflows, and LLM-powered tools that assist in schema creation, validation, and request triage.",
    tags: ["Amazon", "ontologies", "validation", "AI agents"],
    mode: "dialog",
    body: [
      "At Amazon, I contribute to the development and evaluation of ontology-driven systems supporting large-scale product knowledge modeling.",
      "The work includes designing and implementing validation workflows to improve the quality and consistency of schemas used in product data models.",
      "It also includes supporting LLM-powered tools and AI agents that assist in schema creation, validation, and request triage, while analyzing the limitations of automated schema generation systems."
    ]
  },
  {
    id: "llm-trust",
    type: "post",
    date: "LinkedIn post",
    title: "We trust LLMs too much",
    summary: "If reasoning is the issue, maybe the problem is not only the model, but how we structure thinking for it.",
    tags: ["LLMs", "reasoning", "graph-based thinking"],
    mode: "dialog",
    body: [
      "We have started treating LLMs as if they were deterministic systems, like machines that can reliably resolve complex problems, even problems humans themselves struggle to solve.",
      "But in practice we feed them unstructured knowledge, fragmented context, and linear instructions, then expect human-like reasoning outcomes.",
      "That is why I keep coming back to better representations of logic: reasoning maps, graph-based thinking, and interconnected decisions that guide how the model thinks, not only what it sees."
    ]
  },
  {
    id: "llm-limits",
    type: "post",
    date: "LinkedIn post",
    title: "The limits are structural, not cosmetic",
    summary: "Hallucination, context compression, reasoning degradation, retrieval fragility, and multimodal misalignment point to architectural limits, not just prompt mistakes.",
    tags: ["LLM limits", "complexity", "architecture"],
    mode: "dialog",
    body: [
      "One of the papers I highlighted reframes scaling not as an unbounded engineering challenge, but as a process constrained by computational and epistemic limits.",
      "The recurring failures are familiar: hallucination, context compression, reasoning degradation, retrieval fragility, and multimodal misalignment.",
      "For me, the important conclusion is that not every failure is a prompt problem. Some are structural, and they push us toward architectures that are more explicit about scope, retrieval, and control."
    ]
  },
  {
    id: "systems-thinking",
    type: "opinion",
    date: "LinkedIn post",
    title: "Systems thinking over execution",
    summary: "Learning systems thinking matters more than only learning to execute faster, especially in an AI-shaped world.",
    tags: ["systems thinking", "AI", "decision-making"],
    mode: "dialog",
    body: [
      "One of the shortest ideas I posted is still one of the clearest: learn systems thinking instead of only learning to execute.",
      "In a world where AI can accelerate execution, the lasting edge is often the ability to see patterns, dependencies, bottlenecks, and second-order effects.",
      "That is part of why I keep returning to structure, not as bureaucracy, but as a way to reason about complexity."
    ]
  },
  {
    id: "structured-skills",
    type: "post",
    date: "LinkedIn post",
    title: "Fewer agents, better structured cognition",
    summary: "A compelling direction is not necessarily more agents, but better organization of skills, memory, and context inside the system.",
    tags: ["agents", "skills", "context optimization"],
    mode: "dialog",
    body: [
      "I highlighted work showing that many multi-agent pipelines can be compiled into a single agent with a structured skill library.",
      "What stayed with me is the broader direction: not scaling by adding more agents that communicate through the context window, but optimizing how a system manages and structures its context.",
      "Hierarchical skills, semantic clustering, and other context-organization mechanisms feel like a more durable path than multiplying agents without stronger internal structure."
    ]
  },
  {
    id: "user-perspective",
    type: "opinion",
    date: "LinkedIn profile",
    title: "Building with user perspective",
    summary: "Turning ideas into practical solutions means keeping empathy and real-world experience inside the design process.",
    tags: ["user perspective", "empathy", "practical solutions"],
    mode: "dialog",
    body: [
      "I’m developing my ability to turn ideas into practical solutions, with a strong focus on user perspective.",
      "Empathy plays a key role in how I think about building, helping me imagine how concepts translate into real-world experiences.",
      "That tension between abstract structure and practical usefulness is part of what gives the work its shape."
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
          ? `<a class="entry-link" href="${entry.href}">Open link</a>`
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
