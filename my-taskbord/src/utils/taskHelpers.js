const VALID_PRIORITIES = ["LOW", "MEDIUM", "HIGH"];
const VALID_STATUSES = ["todo", "inprogress", "inreview", "hold", "done"];
const STATUS_TITLE_MAP = {
  todo: "To Do",
  inprogress: "In Progress",
  inreview: "In Review",
  hold: "On Hold",
  done: "Done",
};

const PRIORITY_COLORS = {
  LOW:    { bg: "#dcfce7", text: "#16a34a" },
  MEDIUM: { bg: "#fef9c3", text: "#ca8a04" },
  HIGH:   { bg: "#fee2e2", text: "#dc2626" },
};

const COLUMN_COLORS = [
  "#3b82f6", "#f59e0b", "#a78bfa", "#22c55e",
  "#ef4444", "#06b6d4", "#ec4899", "#14b8a6",
];

const AVATAR_COLORS = ["#3b82f6", "#f59e0b", "#a78bfa", "#22c55e", "#ef4444", "#06b6d4"];

function getAvatarColor(name) {
  let hash = 0;
  for (let i = 0; i < (name || "").length; i += 1) hash += name.charCodeAt(i);
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function getInitials(name) {
  return (name || "ME")
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function normalizeStatus(raw) {
  const cleaned = (raw || "todo").toLowerCase().replace(/[^a-z]/g, "");
  return VALID_STATUSES.includes(cleaned) ? cleaned : "todo";
}

function normalizePriority(raw) {
  const value = (raw || "MEDIUM").toString().trim().toUpperCase();
  return VALID_PRIORITIES.includes(value) ? value : "MEDIUM";
}

function statusToTitle(raw) {
  const status = normalizeStatus(raw);
  return STATUS_TITLE_MAP[status] || "Unknown";
}

function normalizeTask(task) {
  return {
    id: task.id,
    title: task.title || "(no title)",
    description: task.description || "",
    priority: normalizePriority(task.priority),
    assignee: task.assignee || "ME",
    dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
    status: normalizeStatus(task.status),
  };
}

function toApiPayload(local) {
  return {
    id: local.id,
    title: local.title,
    description: local.description,
    priority: normalizePriority(local.priority),
    assignee: local.assignee,
    dueDate: local.dueDate ? new Date(local.dueDate).toISOString() : new Date().toISOString(),
    status: normalizeStatus(local.status),
  };
}

function buildColumns(tasks) {
  return VALID_STATUSES.map((id, index) => ({
    id,
    title: STATUS_TITLE_MAP[id],
    color: COLUMN_COLORS[index % COLUMN_COLORS.length],
  }));
}

const today = new Date().toISOString().split("T")[0];

export {
  VALID_PRIORITIES,
  VALID_STATUSES,
  PRIORITY_COLORS,
  getAvatarColor,
  getInitials,
  normalizeStatus,
  statusToTitle,
  normalizeTask,
  toApiPayload,
  buildColumns,
  today,
};
