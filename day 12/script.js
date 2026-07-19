let tasks = [
  { id: 1, text: "Review pull request from teammate", done: false },
  { id: 2, text: "Set up project repository", done: true },
  { id: 3, text: "Design the homepage layout", done: false },
  { id: 4, text: "Write unit tests for login form", done: false },
  { id: 5, text: "Fix navbar bug on mobile", done: true }
];
let searchTerm = "";

const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const searchInput = document.getElementById("searchInput");
const taskList = document.getElementById("taskList");
const emptyState = document.getElementById("emptyState");
const taskCount = document.getElementById("taskCount");

function addTask(text) {
  tasks.unshift({ id: Date.now(), text, done: false });
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  render();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  render();
}

function render() {
  const filtered = tasks.filter(t =>
    t.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  taskList.innerHTML = "";

  filtered.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item" + (task.done ? " done" : "");

    const check = document.createElement("button");
    check.className = "task-check" + (task.done ? " checked" : "");
    check.setAttribute("aria-label", "Toggle complete");
    check.onclick = () => toggleTask(task.id);

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    const del = document.createElement("button");
    del.className = "task-delete";
    del.textContent = "✕";
    del.setAttribute("aria-label", "Delete task");
    del.onclick = () => deleteTask(task.id);

    li.append(check, text, del);
    taskList.appendChild(li);
  });

  const total = tasks.length;
  const doneCount = tasks.filter(t => t.done).length;
  taskCount.textContent = total === 0
    ? "No tasks yet"
    : `${doneCount} of ${total} complete`;

  emptyState.classList.toggle("visible", filtered.length === 0);
}

taskForm.addEventListener("submit", e => {
  e.preventDefault();
  const value = taskInput.value.trim();
  if (!value) return;
  addTask(value);
  taskInput.value = "";
});

searchInput.addEventListener("input", e => {
  searchTerm = e.target.value;
  render();
});

render();

