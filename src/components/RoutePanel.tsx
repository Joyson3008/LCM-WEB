import type { DirectionStep } from "../utils/directions";
import { useBottomSheet } from "../hooks/useBottomSheet";
import { useEffect, useRef } from "react";

interface Props {
  directions: DirectionStep[];
  destinationName?: string;
  currentStepIndex?: number;
  onClose: () => void;
}

function getIcon(text: string) {
  const t = text.toLowerCase();
  if (t.includes("left")) return "←";
  if (t.includes("right")) return "→";
  if (t.includes("destination")) return "⚑";
  return "↑";
}

export default function RoutePanel({
  directions,
  destinationName,
  currentStepIndex = 0,
  onClose,
}: Props) {
  const sheet = useBottomSheet(onClose);
  const panelRef = useRef<HTMLDivElement>(null);
  const prevDirections = useRef<DirectionStep[]>([]);

  // Animate in when directions are first set
  useEffect(() => {
    if (directions.length > 0 && prevDirections.current.length === 0) {
      if (panelRef.current) {
        panelRef.current.style.transition = "none";
        panelRef.current.style.opacity = "0";
        panelRef.current.style.transform = `translateY(100%)`;
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            if (panelRef.current) {
              panelRef.current.style.transition =
                "transform 0.42s cubic-bezier(0.32,0.72,0,1), opacity 0.3s ease";
              panelRef.current.style.opacity = "1";
              panelRef.current.style.transform = `translateY(${sheet.baseY + sheet.translateY}px)`;
            }
          });
        });
      }
    }
    prevDirections.current = directions;
  }, [directions]);

  const totalSteps = directions.length;
  const progress =
    totalSteps > 0 ? ((currentStepIndex + 1) / totalSteps) * 100 : 0;

  return (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        height: "92vh",
        background: "#fff",
        borderRadius: "28px 28px 0 0",
        display: "flex",
        flexDirection: "column",
        border: "0.5px solid rgba(0,0,0,0.08)",
        boxShadow: "0 -4px 40px rgba(0,0,0,0.12), 0 -1px 0 rgba(0,0,0,0.05)",
        transform: `translateY(${sheet.baseY + sheet.translateY}px)`,
        transition: "transform 0.3s cubic-bezier(0.32,0.72,0,1)",
        overflow: "hidden",
      }}
    >
      {/* Drag handle area */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 12,
          paddingBottom: 8,
          cursor: "grab",
          touchAction: "none",
          userSelect: "none",
          flexShrink: 0,
        }}
        onTouchStart={(e) => sheet.handleStart(e.touches[0].clientY)}
        onTouchMove={(e) => {
          e.preventDefault();
          sheet.handleMove(e.touches[0].clientY);
        }}
        onTouchEnd={sheet.handleEnd}
        onMouseDown={(e) => sheet.handleStart(e.clientY)}
        onMouseMove={(e) => sheet.handleMove(e.clientY)}
        onMouseUp={sheet.handleEnd}
        onMouseLeave={sheet.handleEnd}
      >
        <div
          style={{
            width: 40,
            height: 4,
            borderRadius: 2,
            background: "#e5e7eb",
          }}
        />
      </div>

      {/* Header */}
      <div
        style={{
          padding: "4px 20px 16px",
          flexShrink: 0,
          borderBottom: "0.5px solid #f3f4f6",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 3,
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: "#2f4693",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                  flexShrink: 0,
                }}
              >
                <span style={{ color: "#fff", fontSize: 13 }}>⬡</span>
              </div>
              <h2
                style={{
                  margin: 0,
                  fontSize: 17,
                  fontWeight: 600,
                  color: "#111827",
                  letterSpacing: -0.3,
                }}
              >
                Navigation
              </h2>
            </div>
            {destinationName ? (
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "#6b7280",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  maxWidth: 220,
                  paddingLeft: 36,
                }}
              >
                To: {destinationName}
              </p>
            ) : (
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "#9ca3af",
                  paddingLeft: 36,
                }}
              >
                Select a destination
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#f3f4f6",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: "#6b7280",
              flexShrink: 0,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#e5e7eb")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f3f4f6")}
          >
            ✕
          </button>
        </div>

        {/* Progress bar + step count */}
        {totalSteps > 0 && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 6,
              }}
            >
              <span style={{ fontSize: 12, color: "#9ca3af", fontWeight: 500 }}>
                Step {currentStepIndex + 1} of {totalSteps}
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: "#2f4693",
                  fontWeight: 600,
                }}
              >
                {Math.round(progress)}% complete
              </span>
            </div>
            <div
              style={{
                height: 4,
                borderRadius: 2,
                background: "#f3f4f6",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #2f4693, #4f70c4)",
                  borderRadius: 2,
                  transition: "width 0.4s cubic-bezier(0.4,0,0.2,1)",
                }}
              />
            </div>
          </div>
        )}

        {/* Expand / Collapse controls */}
        <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
          <button
            onClick={sheet.expand}
            style={{
              flex: 1,
              padding: "9px 0",
              borderRadius: 12,
              background: "#f0f4ff",
              color: "#2f4693",
              border: "1px solid #c7d7f8",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              transition: "background 0.15s, transform 0.1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#dde7ff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f0f4ff")}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.97)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span style={{ fontSize: 12 }}>↑</span> Expand
          </button>
          <button
            onClick={sheet.collapse}
            style={{
              flex: 1,
              padding: "9px 0",
              borderRadius: 12,
              background: "#f9fafb",
              color: "#6b7280",
              border: "1px solid #e5e7eb",
              cursor: "pointer",
              fontSize: 13,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
              transition: "background 0.15s, transform 0.1s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#f3f4f6")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#f9fafb")}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.97)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <span style={{ fontSize: 12 }}>↓</span> Collapse
          </button>
        </div>
      </div>

      {/* Steps list */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px 16px 24px",
          touchAction: "pan-y",
        }}
      >
        {directions.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              gap: 12,
              color: "#9ca3af",
            }}
          >
            <span style={{ fontSize: 40 }}>🗺️</span>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 500 }}>
              No route selected
            </p>
            <p style={{ margin: 0, fontSize: 13 }}>
              Search for a destination to start navigation
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {directions.map((step, i) => {
              const isActive = i === currentStepIndex;
              const isPast = i < currentStepIndex;

              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "13px 14px",
                    borderRadius: 16,
                    background: isActive
                      ? "#2f4693"
                      : isPast
                        ? "#f9fafb"
                        : "#fff",
                    border: isActive
                      ? "none"
                      : `0.5px solid ${isPast ? "#f3f4f6" : "#f0f2f8"}`,
                    transform: isActive ? "scale(1.01)" : "scale(1)",
                    transition:
                      "background 0.25s ease, transform 0.25s ease, border-color 0.2s",
                    opacity: isPast ? 0.55 : 1,
                  }}
                >
                  {/* Step icon */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: isActive
                        ? "rgba(255,255,255,0.2)"
                        : "#f0f4ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 16,
                      fontWeight: 700,
                      color: isActive ? "#fff" : "#2f4693",
                      flexShrink: 0,
                      transition: "background 0.25s",
                    }}
                  >
                    {getIcon(step.text)}
                  </div>

                  {/* Step text */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 14,
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? "#fff" : "#111827",
                        lineHeight: 1.4,
                      }}
                    >
                      {step.text}
                    </p>
                    <span
                      style={{
                        fontSize: 11,
                        color: isActive ? "rgba(255,255,255,0.6)" : "#9ca3af",
                        fontWeight: 500,
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                      }}
                    >
                      Step {i + 1}
                    </span>
                  </div>

                  {/* Active indicator dot */}
                  {isActive && (
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#fff",
                        flexShrink: 0,
                        animation: "pulse 1.6s ease-in-out infinite",
                      }}
                    />
                  )}

                  {/* Past checkmark */}
                  {isPast && (
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: "#d1fae5",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 11,
                        color: "#059669",
                        flexShrink: 0,
                      }}
                    >
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.75); }
        }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 2px; }
      `}</style>
    </div>
  );
}
