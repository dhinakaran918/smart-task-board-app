import React, { useState } from "react";
import { today } from "../utils/taskHelpers";

export function TaskModal({ columns, priorities, onClose, onSubmit, initialTask }) {
  const isEdit = !!initialTask;
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [priority, setPriority] = useState(initialTask?.priority || priorities[0] || "MEDIUM");
  const [assignee, setAssignee] = useState(initialTask?.assignee || "");
  const [dueDate, setDueDate] = useState(initialTask?.dueDate || today);
  const [status, setStatus] = useState(initialTask?.status || columns[0]?.id || "todo");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onSubmit({
      ...(isEdit ? { id: initialTask.id } : {}),
      title: title.trim(),
      description: description.trim(),
      priority,
      assignee: assignee.trim() || "ME",
      dueDate,
      status,
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{isEdit ? "✏️ Edit Task" : "➕ Add New Task"}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <label>Title *</label>
          <input className="modal-input" placeholder="Task title..." value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Description</label>
          <input className="modal-input" placeholder="Short description..." value={description} onChange={(e) => setDescription(e.target.value)} />
          <div className="modal-row">
            <div className="modal-field">
              <label>Priority</label>
              <select className="modal-input" value={priority} onChange={(e) => setPriority(e.target.value)}>
                {priorities.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <div className="modal-field">
              <label>Column</label>
              <select className="modal-input" value={status} onChange={(e) => setStatus(e.target.value)}>
                {columns.map((column) => <option key={column.id} value={column.id}>{column.title}</option>)}
              </select>
            </div>
          </div>
          <div className="modal-row">
            <div className="modal-field">
              <label>Assignee</label>
              <input className="modal-input" placeholder="Name (e.g. Alice)" value={assignee} onChange={(e) => setAssignee(e.target.value)} />
            </div>
            <div className="modal-field">
              <label>Due Date</label>
              <input className="modal-input" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-add-task" onClick={handleSubmit}>
            {isEdit ? "💾 Save Changes" : "+ Add Task"}
          </button>
        </div>
      </div>
    </div>
  );
}
