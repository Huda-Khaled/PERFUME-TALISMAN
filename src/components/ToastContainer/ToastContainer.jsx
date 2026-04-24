import { useEffect, useRef, useState } from "react";
import useNotificationStore from "../../store/NotificationStore";

const ICONS = {
  success: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M3 8.5L6.5 12L13 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  error: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 4L12 12M12 4L4 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="1.5" fill="currentColor" />
      <path
        d="M8 10.5V7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
};

const COLORS = {
  success: {
    icon: "#D4AC64", // primary (gold)
    iconBg: "rgba(212, 172, 100, 0.18)",
    bar: "#D4AC64",
  },
  error: {
    icon: "#e43426", // matches `text-error`
    iconBg: "rgba(228, 52, 38, 0.14)",
    bar: "#e43426",
  },
  info: {
    icon: "#164863", // brand
    iconBg: "rgba(22, 72, 99, 0.14)",
    bar: "#164863",
  },
};

function Toast({ toast, onRemove }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
    timerRef.current = setTimeout(() => handleClose(), 3500);
    return () => clearTimeout(timerRef.current);
  }, []);

  const handleClose = () => {
    setLeaving(true);
    setTimeout(() => onRemove(toast.id), 350);
  };

  const c = COLORS[toast.type] || COLORS.success;

  return (
    <div
      onClick={handleClose}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 14px 0 14px",
        borderRadius: "14px",
        border: "1px solid rgba(22, 72, 99, 0.14)",
        background: "rgba(255,255,255,0.98)",
        boxShadow: "0 12px 30px rgba(0,0,0,0.14)",
        minWidth: "260px",
        maxWidth: "320px",
        cursor: "pointer",
        overflow: "hidden",
        opacity: visible && !leaving ? 1 : 0,
        transform: visible && !leaving ? "translateX(0)" : "translateX(40px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          width: "100%",
          paddingBottom: "10px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: c.iconBg,
            color: c.icon,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {ICONS[toast.type]}
        </div>

        <div style={{ flex: 1 }}>
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: 500,
              color: "#0B0B0B",
              lineHeight: 1.3,
            }}
          >
            {toast.message}
          </p>
          {toast.sub && (
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#6B7280" }}>
              {toast.sub}
            </p>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#9CA3AF",
            fontSize: "18px",
            lineHeight: 1,
            padding: "0",
            flexShrink: 0,
          }}
        >
          ×
        </button>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: "3px",
          background: c.bar,
          borderRadius: "0 0 14px 14px",
          width: "100%",
          animation: "shrinkBar 3.5s linear forwards",
          transformOrigin: "left",
        }}
      />
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, removeToast } = useNotificationStore();

  return (
    <>
      <style>{`
        @keyframes shrinkBar {
          from { transform: scaleX(1); }
          to   { transform: scaleX(0); }
        }
      `}</style>
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        {toasts.map((t) => (
          <div key={t.id} style={{ pointerEvents: "auto" }}>
            <Toast toast={t} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </>
  );
}
