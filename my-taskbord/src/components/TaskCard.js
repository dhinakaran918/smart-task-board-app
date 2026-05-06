import React from "react";
import { PRIORITY_COLORS, getAvatarColor, getInitials } from "../utils/taskHelpers";

export function TaskCard({ task, columns, onDelete, onMove, onEdit }) {
  const colIndex = columns.findIndex((column) => column.id === task.status);
  const priorityStyle = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.MEDIUM;

  return (
    <div className="card">
      <div className="card-top">
        <span className="priority-badge" style={{ backgroundColor: priorityStyle.bg, color: priorityStyle.text }}>
          {task.priority}
        </span>
        <div className="card-actions">
          <button className="icon-btn" title="Move left" onClick={() => onMove(task.id, -1)} disabled={colIndex <= 0}>◀</button>
          <button className="icon-btn" title="Move right" onClick={() => onMove(task.id, 1)} disabled={colIndex >= columns.length - 1}>▶</button>
          <button className="icon-btn edit" title="Edit" onClick={() => onEdit(task)}>✏️</button>
          <button className="icon-btn trash" title="Delete" onClick={() => onDelete(task)}>🗑</button>
        </div>
      </div>

      <div className="card-title">{task.title}</div>
      {task.description && <div className="card-desc">{task.description}</div>}
      <div className="card-footer">
        <div className="avatar" style={{ backgroundColor: getAvatarColor(task.assignee) }} title={task.assignee}>
          {getInitials(task.assignee)}
        </div>
        <div className="card-date">
          <span className="calendar-icon">📅</span>
          {task.dueDate || "—"}
        </div>
      </div>
    </div>
  );
}
