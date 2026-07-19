const STORAGE_KEY = "ledger.tasks.v1";

let tasks = [];
let editingId = null;
let filters = { search: "", status: "all", priority: "all" };

// ---------- DOM refs ----------

const listTodo = document.getElementById("listTodo");
const listInProgress = document.getElementById("listInProgress");
const listDone = document.getElementById("listDone");
const countTodo = document.getElementById("countTodo");
const countInProgress = document.getElementById("countInProgress");
const countDone = document.getElementById("countDone");
const summaryBar = document.getElementById("summaryBar");
const emptyState = document.getElementById("emptyState");
const board = document.getElementById("board");

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const priorityFilter = document.getElementById("priorityFilter");

const newTaskBtn = document.getElementById("newTaskBtn");
const taskModal = document.getElementById("taskModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const taskForm = document.getElementById("taskForm");
const cancelBtn = document.getElementById("cancelBtn");
const deleteTaskBtn = document.getElementById("deleteTaskBtn");
const saveBtn = document.getElementById("saveBtn");

const taskIdInput = document.getElementById("taskId");
const titleInput = document.getElementById("titleInput");
const descInput = document.getElementById("descInput");
const priorityInput = document.getElementById("priorityInput");
const statusInput = document.getElementById("statusInput");
const dueInput = document.getElementById("dueInput");

// ---------- Storage ----------

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    tasks = raw ? JSON.parse(raw) : seedTasks();
  } catch (e) {
    console.error("Failed to read saved tasks, starting fresh.", e);
    tasks = seedTasks();
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks — local storage may be full or blocked.", e);
  }
}

function seedTasks() {
  const today = new Date();
  const inDays = n => {
    const d = new Date(today);
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  };
  return [
    { id: crypto.randomUUID(), title: "Set up sprint board", description: "Create columns for todo, in progress, and done.", priority: "medium", status: "done", due: inDays(-2) },
    { id: crypto.randomUUID(), title: "Design task card UI", description: "Priority tags, due date, and status.", priority: "high", status: "in-progress", due: inDays(1) },
    { id: crypto.randomUUID(), title: "Wire up local storage", description: "Persist tasks between sessions.", priority: "high", status: "todo", due: inDays(2) },
    { id: crypto.randomUUID(), title: "Write sprint retro notes", description: "", priority: "low", status: "todo", due: inDays(5) }
  ];
}

// ---------- Rendering ----------

function formatDue(dateStr) {
  if (!dateStr) return "No due date";
  const due = new Date(dateStr + "T00:00:00");
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diffDays = Math.round((due - today) / 86400000);
  const label = due.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  if (diffDays < 0) return { text: `${label} · overdue`, overdue: true };
  if (diffDays === 0) return { text: `${label} · today`, overdue: false };
  return { text: label, overdue: false };
}

function matchesFilters(task) {
  const searchOk = task.title.toLowerCase().includes(filters.search.toLowerCase());
  const statusOk = filters.status === "all" || task.status === filters.status;
  const priorityOk = filters.priority === "all" || task.priority === filters.priority;
  return searchOk && statusOk && priorityOk;
}

function render() {
  const filtered = tasks.filter(matchesFilters);

  listTodo.innerHTML = "";
  listInProgress.innerHTML = "";
  listDone.innerHTML = "";

  const buckets = { todo: listTodo, "in-progress": listInProgress, done: listDone };
  const counts = { todo: 0, "in-progress": 0, done: 0 };

  filtered.forEach(task => {
    counts[task.status]++;
    buckets[task.status].appendChild(renderCard(task));
  });

  countTodo.textContent = counts.todo;
  countInProgress.textContent = counts["in-progress"];
  countDone.textContent = counts.done;

  const total = tasks.length;
  const doneCount = tasks.filter(t => t.status === "done").length;
  summaryBar.textContent = total === 0
    ? "No tasks yet — add your first one."
    : `${doneCount}/${total} complete · showing ${filtered.length} of ${total}`;

  const noResults = filtered.length === 0 && total > 0;
  emptyState.classList.toggle("hidden", !noResults);
  board.classList.toggle("hidden", noResults);
}

function renderCard(task) {
  const card = document.createElement("div");
  card.className = `task-card priority-${task.priority}${task.status === "done" ? " done" : ""}`;
  card.dataset.id = task.id;

  const due = formatDue(task.due);
  const dueText = typeof due === "string" ? due : due.text;
  const dueClass = typeof due === "string" ? "" : (due.overdue ? " overdue" : "");

  card.innerHTML = `
    <h3 class="task-title">${escapeHtml(task.title)}</h3>
    ${task.description ? `<p class="task-desc">${escapeHtml(task.description)}</p>` : ""}
    <div class="task-meta">
      <span class="tag priority-${task.priority}">${task.priority}</span>
      <span class="due-date${dueClass}">${dueText}</span>
    </div>
  `;

  card.addEventListener("click", () => openEditModal(task));
  return card;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

// ---------- Modal open/close ----------

function openAddModal() {
  editingId = null;
  modalTitle.textContent = "New Task";
  saveBtn.textContent = "Add Task";
  deleteTaskBtn.classList.add("hidden");
  taskForm.reset();
  priorityInput.value = "medium";
  statusInput.value = "todo";
  taskModal.classList.remove("hidden");
  titleInput.focus();
}

function openEditModal(task) {
  editingId = task.id;
  modalTitle.textContent = "Edit Task";
  saveBtn.textContent = "Save Changes";
  deleteTaskBtn.classList.remove("hidden");

  titleInput.value = task.title;
  descInput.value = task.description || "";
  priorityInput.value = task.priority;
  statusInput.value = task.status;
  dueInput.value = task.due || "";

  taskModal.classList.remove("hidden");
  titleInput.focus();
}

function closeModal() {
  taskModal.classList.add("hidden");
  editingId = null;
}

// ---------- CRUD ----------

function handleSubmit(e) {
  e.preventDefault();
  const title = titleInput.value.trim();
  if (!title) return;

  if (editingId) {
    tasks = tasks.map(t => t.id === editingId ? {
      ...t,
      title,
      description: descInput.value.trim(),
      priority: priorityInput.value,
      status: statusInput.value,
      due: dueInput.value
    } : t);
  } else {
    tasks.unshift({
      id: crypto.randomUUID(),
      title,
      description: descInput.value.trim(),
      priority: priorityInput.value,
      status: statusInput.value,
      due: dueInput.value
    });
  }

  saveTasks();
  render();
  closeModal();
}

function handleDelete() {
  if (!editingId) return;
  tasks = tasks.filter(t => t.id !== editingId);
  saveTasks();
  render();
  closeModal();
}

// ---------- Events ----------

newTaskBtn.addEventListener("click", openAddModal);
modalClose.addEventListener("click", closeModal);
modalBackdrop.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
taskForm.addEventListener("submit", handleSubmit);
deleteTaskBtn.addEventListener("click", handleDelete);

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !taskModal.classList.contains("hidden")) closeModal();
});

searchInput.addEventListener("input", e => {
  filters.search = e.target.value;
  render();
});

statusFilter.addEventListener("change", e => {
  filters.status = e.target.value;
  render();
});

priorityFilter.addEventListener("change", e => {
  filters.priority = e.target.value;
  render();
});

// ---------- Init ----------

loadTasks();
render();
