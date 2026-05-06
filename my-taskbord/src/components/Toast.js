import React, { useState, useCallback } from "react";

export function ToastContainer({ toasts, onRemove }) {
  return (
    <div style={{
      position: "fixed",
      top: 20,
      right: 20,
      zIndex: 9999,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      pointerEvents: "none",
    }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => onRemove(toast.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px",
            borderRadius: 10,
            minWidth: 260,
            maxWidth: 360,
            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
            pointerEvents: "all",
            cursor: "pointer",
            animation: "slideIn 0.25s ease",
            backgroundColor:
              toast.type === "success" ? "#f0fdf4" :
              toast.type === "error" ? "#fef2f2" :
              toast.type === "info" ? "#eff6ff" : "#fefce8",
            borderLeft: `4px solid ${
              toast.type === "success" ? "#22c55e" :
              toast.type === "error" ? "#ef4444" :
              toast.type === "info" ? "#3b82f6" : "#f59e0b"
            }`,
          }}
        >
          <span style={{ fontSize: 18 }}>
            {toast.type === "success" ? "✅" : toast.type === "error" ? "❌" : toast.type === "info" ? "ℹ️" : "⚠️"}
          </span>
          <span style={{ fontSize: 14, color: "#1e293b", flex: 1, fontWeight: 500 }}>
            {toast.message}
          </span>
          <span style={{ fontSize: 12, color: "#94a3b8" }}>✕</span>
        </div>
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const show = useCallback((message, type = "info", duration = 3500) => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, type }]);
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, duration);
  }, []);

  const remove = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  return { toasts, show, remove };
}
