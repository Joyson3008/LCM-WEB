import type { Building } from "../data/buildings";
import { useState, useEffect, useRef } from "react";
import { useBottomSheet } from "../hooks/useBottomSheet";

interface Props {
  building: Building | null;
  onClose: () => void;
  onNavigate: (building: Building) => void;
}

export default function BuildingModal({
  building,
  onClose,
  onNavigate,
}: Props) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const sheet = useBottomSheet(onClose);
  const modalRef = useRef<HTMLDivElement>(null);

  // Smooth mount animation
  useEffect(() => {
    if (building) {
      setMounted(false);
      const t = requestAnimationFrame(() => {
        requestAnimationFrame(() => setMounted(true));
      });
      return () => cancelAnimationFrame(t);
    } else {
      setMounted(false);
    }
  }, [building]);

  if (!building) return null;

  const images = building.images ?? [];

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(2px)",
          zIndex: 40,
          opacity: mounted ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Modal sheet */}
      <div
        ref={modalRef}
        style={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          height: "90vh",
          background: "#fff",
          borderRadius: "28px 28px 0 0",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.12), 0 -1px 0 rgba(0,0,0,0.05)",
          border: "0.5px solid rgba(0,0,0,0.08)",
          transform: `translateY(${mounted ? sheet.baseY + sheet.translateY : "100%"}px)`,
          transition: mounted
            ? "transform 0.3s cubic-bezier(0.32,0.72,0,1)"
            : "transform 0.42s cubic-bezier(0.32,0.72,0,1)",
          overflow: "hidden",
        }}
      >
        {/* Drag handle */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
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
            padding: "4px 20px 14px",
            flexShrink: 0,
            borderBottom: "0.5px solid #f3f4f6",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 14,
            }}
          >
            <div style={{ flex: 1, minWidth: 0, paddingRight: 12 }}>
              {/* Building icon + name */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "#f0f4ff",
                    border: "1px solid #c7d7f8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                  }}
                >
                  🏛️
                </div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#111827",
                    letterSpacing: -0.4,
                    lineHeight: 1.2,
                  }}
                >
                  {building.name}
                </h2>
              </div>
              {building.description && (
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: "#6b7280",
                    lineHeight: 1.5,
                    paddingLeft: 46,
                  }}
                >
                  {building.description}
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#e5e7eb")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f3f4f6")
              }
            >
              ✕
            </button>
          </div>

          {/* Expand / Collapse — matching RoutePanel layout */}
          <div style={{ display: "flex", gap: 8 }}>
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#dde7ff")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f0f4ff")
              }
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
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#f3f4f6")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#f9fafb")
              }
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.97)")
              }
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <span style={{ fontSize: 12 }}>↓</span> Collapse
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "16px 20px 32px",
            touchAction: "pan-y",
          }}
        >
          {/* Images carousel */}
          {images.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: 10,
                overflowX: "auto",
                marginBottom: 16,
                paddingBottom: 4,
              }}
            >
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setPreviewImage(img)}
                  style={{
                    width: 200,
                    height: 130,
                    borderRadius: 16,
                    objectFit: "cover",
                    flexShrink: 0,
                    cursor: "pointer",
                    border: "0.5px solid #f3f4f6",
                    transition: "transform 0.15s, box-shadow 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.02)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(0,0,0,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
              ))}
            </div>
          )}

          {/* Get Directions CTA */}
          <button
            onClick={() => onNavigate(building)}
            style={{
              width: "100%",
              padding: "14px 0",
              borderRadius: 16,
              background: "#2f4693",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: 600,
              letterSpacing: 0.3,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 14px rgba(47,70,147,0.3)",
              transition: "background 0.15s, transform 0.1s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#243a80";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(47,70,147,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#2f4693";
              e.currentTarget.style.boxShadow =
                "0 4px 14px rgba(47,70,147,0.3)";
            }}
            onMouseDown={(e) =>
              (e.currentTarget.style.transform = "scale(0.98)")
            }
            onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            🧭 Get Directions
          </button>

          {/* Floor plans */}
          {building.floors && building.floors.length > 0 && (
            <div>
              <p
                style={{
                  margin: "0 0 10px",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#9ca3af",
                  textTransform: "uppercase",
                  letterSpacing: 0.8,
                }}
              >
                Floors & Places
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {building.floors.map((floor, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "#f9fafb",
                      border: "0.5px solid #f0f2f8",
                      borderRadius: 16,
                      padding: "12px 14px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 8,
                      }}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 7,
                          background: "#f0f4ff",
                          border: "1px solid #c7d7f8",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 10,
                          fontWeight: 700,
                          color: "#2f4693",
                        }}
                      >
                        {idx + 1}
                      </div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#2f4693",
                        }}
                      >
                        {floor.floor}
                      </p>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      {floor.places.map((p, i) => (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                          }}
                        >
                          <div
                            style={{
                              width: 5,
                              height: 5,
                              borderRadius: "50%",
                              background: "#d1d5db",
                              flexShrink: 0,
                            }}
                          />
                          <p
                            style={{
                              margin: 0,
                              fontSize: 13,
                              color: "#374151",
                              lineHeight: 1.5,
                            }}
                          >
                            {p}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image full-screen preview */}
      {previewImage && (
        <div
          onClick={() => setPreviewImage(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <button
            onClick={() => setPreviewImage(null)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "#fff",
              fontSize: 16,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
          <img
            src={previewImage}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              borderRadius: 12,
            }}
          />
        </div>
      )}

      <style>{`
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 2px; }
      `}</style>
    </>
  );
}
