import React from "react";

export function ConfirmDialog({ taskTitle, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" style={{ maxWidth: 420 }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ color: "#ef4444" }}>🗑 Delete Task</h3>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>
        <div className="modal-body" style={{ paddingBottom: 8 }}>
          <p style={{ margin: "8px 0 4px", color: "#475569", fontSize: 15 }}>
            Are you sure you want to delete:
          </p>
          <p style={{
            margin: "8px 0",
            padding: "10px 14px",
            borderRadius: 8,
            background: "#fef2f2",
            color: "#dc2626",
            fontWeight: 600,
            fontSize: 15,
            border: "1px solid #fecaca",
          }}>
            "{taskTitle}"
          </p>
          <p style={{ color: "#94a3b8", fontSize: 13, margin: "4px 0 0" }}>
            This action cannot be undone.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={onCancel}>Cancel</button>
          <button
            className="btn-add-task"
            style={{ background: "#ef4444", borderColor: "#ef4444" }}
            onClick={onConfirm}
          >
            🗑 Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}
