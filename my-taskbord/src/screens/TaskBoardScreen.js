import React, { useState, useEffect } from "react";
import { TaskCard } from "../components/TaskCard";
import { TaskModal } from "../components/TaskModal";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { ToastContainer, useToast } from "../components/Toast";
import { fetchTasks as fetchTasksApi, createTask as createTaskApi, updateTask as updateTaskApi, deleteTask as deleteTaskApi } from "../api/taskApi";
import { normalizeTask, buildColumns, toApiPayload, VALID_PRIORITIES } from "../utils/taskHelpers";
import "./TaskBoardScreen.css";

function TaskBoardScreen() {
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState([]);
  const [priorities, setPriorities] = useState(VALID_PRIORITIES);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [confirmTask, setConfirmTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { toasts, show: showToast, remove: removeToast } = useToast();

  useEffect(() => {
    fetchTaskList();
  }, []);

  async function fetchTaskList() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchTasksApi();
      const normalized = data.map(normalizeTask);
      setTasks(normalized);
      setColumns(buildColumns(normalized));
      setPriorities(VALID_PRIORITIES);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addTask(local) {
    try {
      const created = await createTaskApi(toApiPayload(local));
      const newTask = normalizeTask(created);
      setTasks((prev) => {
        const updated = [...prev, newTask];
        setColumns(buildColumns(updated));
        return updated;
      });
      showToast(`✅ Task "${newTask.title}" added!`, "success");
    } catch (err) {
      showToast("Error adding task: " + err.message, "error");
    }
  }

  async function updateTask(local) {
    const snapshot = [...tasks];
    const optimistic = tasks.map((task) => (task.id === local.id ? { ...task, ...local } : task));
    setTasks(optimistic);
    setColumns(buildColumns(optimistic));

    try {
      const result = await updateTaskApi(toApiPayload(local));
      if (result) {
        const updated = normalizeTask(result);
        setTasks((prev) => {
          const next = prev.map((task) => (task.id === updated.id ? updated : task));
          setColumns(buildColumns(next));
          return next;
        });
      }
      showToast(`✅ Task "${local.title}" updated!`, "success");
    } catch (err) {
      setTasks(snapshot);
      setColumns(buildColumns(snapshot));
      showToast("Error updating task: " + err.message, "error");
    }
  }

  function requestDelete(task) {
    setConfirmTask(task);
  }

  async function confirmDelete() {
    const task = confirmTask;
    if (!task) return;

    setConfirmTask(null);
    const snapshot = [...tasks];
    setTasks((prev) => {
      const updated = prev.filter((item) => item.id !== task.id);
      setColumns(buildColumns(updated));
      return updated;
    });

    try {
      await deleteTaskApi(task.id);
      showToast(`🗑 Task "${task.title}" deleted.`, "info");
    } catch (err) {
      setTasks(snapshot);
      setColumns(buildColumns(snapshot));
      showToast("Error deleting task: " + err.message, "error");
    }
  }

  async function moveTask(taskId, direction) {
    const task = tasks.find((item) => item.id === taskId);
    if (!task) return;
    const currentIndex = columns.findIndex((column) => column.id === task.status);
    const nextIndex = currentIndex + direction;
    if (nextIndex < 0 || nextIndex >= columns.length) return;
    await updateTask({ ...task, status: columns[nextIndex].id });
  }

  function openEdit(task) {
    setEditTask(task);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
    setEditTask(null);
  }

  function handleModalSubmit(data) {
    if (editTask) updateTask(data);
    else addTask(data);
  }

  const filtered = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase()) ||
    task.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <ToastContainer toasts={toasts} onRemove={removeToast} />
      {confirmTask && (
        <ConfirmDialog
          taskTitle={confirmTask.title}
          onConfirm={confirmDelete}
          onCancel={() => setConfirmTask(null)}
        />
      )}

      <div className="header">
        <div className="logo">
          <span className="logo-icon">📋</span>
          <span className="logo-text">Task Board</span>
        </div>
        <div className="header-right">
          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="btn-add-task" onClick={() => { setEditTask(null); setShowModal(true); }}>
            + Add Task
          </button>
        </div>
      </div>

      {loading && <div className="status-banner">⏳ Loading tasks...</div>}
      {error && (
        <div className="status-banner error">
          ⚠️ {error}&nbsp;<button onClick={fetchTaskList}>Retry</button>
        </div>
      )}

      {!loading && !error && (
        <div className="board">
          {columns.length === 0 ? (
            <div className="status-banner">No tasks yet. Add your first task!</div>
          ) : (
            columns.map((column) => {
              const columnTasks = filtered.filter((task) => task.status === column.id);
              return (
                <div key={column.id} className="column">
                  <div className="column-header">
                    <div className="column-title">
                      <span className="col-dot" style={{ backgroundColor: column.color }} />
                      {column.title}
                    </div>
                    <span className="col-count">{columnTasks.length}</span>
                  </div>
                  <div className="column-body">
                    {columnTasks.length === 0 ? (
                      <div className="empty-col">No tasks</div>
                    ) : (
                      columnTasks.map((task) => (
                        <TaskCard
                          key={task.id}
                          task={task}
                          columns={columns}
                          onDelete={requestDelete}
                          onMove={moveTask}
                          onEdit={openEdit}
                        />
                      ))
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {showModal && (
        <TaskModal
          columns={columns}
          priorities={priorities}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
          initialTask={editTask}
        />
      )}
    </div>
  );
}

export default TaskBoardScreen;
