const API_BASE = "https://localhost:7269/api/tasks";

async function fetchTasks() {
  const res = await fetch(`${API_BASE}/getalltaskapi`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function createTask(local) {
  const res = await fetch(`${API_BASE}/createtaskapi`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(local),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function updateTask(local) {
  const res = await fetch(`${API_BASE}/updatetaskapi/${local.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(local),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (res.status === 204) return null;
  return res.json();
}

async function deleteTask(taskId) {
  const res = await fetch(`${API_BASE}/deletetaskapi/${taskId}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return true;
}

export { fetchTasks, createTask, updateTask, deleteTask };
