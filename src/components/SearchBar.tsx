import {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { BUILDINGS } from "../data/buildings";
import type { Building } from "../data/buildings";

type SearchItem = {
  type: "building" | "floor" | "place";
  name: string;
  subtitle?: string;
  building: Building;
};

type HighlightType = "canteen" | "restroom" | null;

type Props = {
  onSelect?: (building: Building) => void;
  onRouteSelect?: (start: Building, dest: Building) => void;
  onHighlightChange?: (type: HighlightType) => void;
};

const SearchBar = forwardRef<any, Props>(
  ({ onRouteSelect, onHighlightChange }, ref) => {
    const [expanded, setExpanded] = useState(false);
    const [start, setStart] = useState("");
    const [destination, setDestination] = useState("");
    const [selectedStart, setSelectedStart] = useState<Building | null>(null);
    const [selectedDest, setSelectedDest] = useState<Building | null>(null);
    const [activeField, setActiveField] = useState<
      "start" | "destination" | null
    >(null);
    const [highlightType, setHighlightType] = useState<HighlightType>(null);
    const [showLegend, setShowLegend] = useState(false);
    // Track whether a suggestion click is in progress to prevent blur from hiding dropdown
    const selectingRef = useRef(false);

    const destInputRef = useRef<HTMLInputElement>(null);
    const startInputRef = useRef<HTMLInputElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const voiceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevLengthRef = useRef(0);
    const lastNavTime = useRef(0);

    useImperativeHandle(ref, () => ({
      focusDestination: () => {
        if (!expanded) setExpanded(true);
        setTimeout(() => {
          destInputRef.current?.focus();
          setActiveField("destination");
        }, 250);
      },
    }));

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (
          wrapperRef.current &&
          !wrapperRef.current.contains(e.target as Node)
        ) {
          // Only close if we're not in the middle of selecting a suggestion
          if (!selectingRef.current) {
            setActiveField(null);
            setExpanded(false);
          }
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, []);

    const sanitize = (text: string) =>
      text.replace(/[^a-zA-Z0-9\s@.'"&/()\-]/g, "").slice(0, 60);

    const filterBuildings = (query: string): SearchItem[] => {
      if (!query.trim()) return [];
      const q = query.toLowerCase();
      const results: SearchItem[] = [];
      const seen = new Set<string>();

      BUILDINGS.forEach((building) => {
        const name = building.name.toLowerCase();

        if (name.includes(q)) {
          const key = "b-" + building.id;
          if (!seen.has(key)) {
            results.push({
              type: "building",
              name: building.name,
              subtitle: building.description,
              building,
            });
            seen.add(key);
          }
        }

        if ((building as any).aliases) {
          (building as any).aliases.forEach((alias: string) => {
            if (alias.toLowerCase().includes(q)) {
              const key = "a-" + building.id;
              if (!seen.has(key)) {
                results.push({
                  type: "building",
                  name: building.name,
                  subtitle: building.description,
                  building,
                });
                seen.add(key);
              }
            }
          });
        }

        if (building.floors) {
          building.floors.forEach((floor) => {
            if (floor.floor.toLowerCase().includes(q)) {
              const key = building.id + floor.floor;
              if (!seen.has(key)) {
                results.push({
                  type: "floor",
                  name: floor.floor,
                  subtitle: building.name,
                  building,
                });
                seen.add(key);
              }
            }
            floor.places.forEach((place) => {
              if (place.toLowerCase().includes(q)) {
                const key = building.id + place;
                if (!seen.has(key)) {
                  results.push({
                    type: "place",
                    name: place,
                    subtitle: `${floor.floor} – ${building.name}`,
                    building,
                  });
                  seen.add(key);
                }
              }
            });
          });
        }
      });

      results.sort((a, b) => {
        const aStarts = a.name.toLowerCase().startsWith(q);
        const bStarts = b.name.toLowerCase().startsWith(q);
        if (aStarts && !bStarts) return -1;
        if (!aStarts && bStarts) return 1;
        return a.name.localeCompare(b.name);
      });

      return results.slice(0, 8);
    };

    const suggestions =
      activeField === "start"
        ? filterBuildings(start)
        : activeField === "destination"
          ? filterBuildings(destination)
          : [];

    // BUG FIX: After selecting, keep expanded=true and just close the dropdown.
    // Also auto-focus the next empty field so the user can continue seamlessly.
    const handleSelect = (item: SearchItem) => {
      if (activeField === "start") {
        setStart(item.name);
        setSelectedStart(item.building);
        // Auto-advance to destination if it's empty
        setActiveField(null);
        setTimeout(() => {
          if (!destination) {
            setActiveField("destination");
            destInputRef.current?.focus();
          }
        }, 50);
      } else {
        setDestination(item.name);
        setSelectedDest(item.building);
        setActiveField(null);
      }
      // Do NOT call setExpanded(false) — keep the form open
    };

    const handleDestChange = (text: string) => {
      const safe = sanitize(text);
      setDestination(safe);
      const diff = text.length - prevLengthRef.current;
      prevLengthRef.current = text.length;

      if (voiceTimer.current) clearTimeout(voiceTimer.current);
      if (diff <= 3) return;

      voiceTimer.current = setTimeout(() => {
        const results = filterBuildings(text);
        if (results.length > 0) {
          const building = results[0].building;
          setSelectedDest(building);
          const resolvedStart =
            selectedStart ??
            ({
              id: "current-location",
              name: "Current Location",
              description: "",
              nodeId: "USER_NODE",
              images: [],
            } as Building);
          if (Date.now() - lastNavTime.current < 2000) return;
          lastNavTime.current = Date.now();
          onRouteSelect?.(resolvedStart, building);
          resetForm();
        }
      }, 2000);
    };

    const handleRoute = () => {
      if (!selectedDest) return;
      const resolvedStart =
        selectedStart ??
        ({
          id: "current-location",
          name: "Current Location",
          description: "",
          nodeId: "USER_NODE",
          images: [],
        } as Building);
      onRouteSelect?.(resolvedStart, selectedDest);
      resetForm();
    };

    const handleSwap = () => {
      const tempText = start;
      const tempObj = selectedStart;
      setStart(destination);
      setSelectedStart(selectedDest);
      setDestination(tempText);
      setSelectedDest(tempObj);
    };

    const resetForm = () => {
      setExpanded(false);
      setStart("");
      setDestination("");
      setSelectedStart(null);
      setSelectedDest(null);
      setActiveField(null);
      prevLengthRef.current = 0;
      if (voiceTimer.current) clearTimeout(voiceTimer.current);
    };

    const handleHighlight = (type: "canteen" | "restroom") => {
      const newType = highlightType === type ? null : type;
      setHighlightType(newType);
      onHighlightChange?.(newType);
      setShowLegend(newType !== null);
    };

    const getTypeIcon = (type: string) => {
      if (type === "floor") return "🏬";
      if (type === "place") return "📍";
      return "🏛️";
    };

    return (
      <div
        ref={wrapperRef}
        style={{
          position: "absolute",
          top: -40, // better spacing from top
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "800px", // 🔥 control size here
          zIndex: 999,
        }}
      >
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-12px) scaleY(0.96); }
            to   { opacity: 1; transform: translateY(0) scaleY(1); }
          }
          @keyframes suggestionIn {
            from { opacity: 0; transform: translateX(-8px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes chipPop {
            0%   { opacity: 0; transform: scale(0.8); }
            60%  { transform: scale(1.06); }
            100% { opacity: 1; transform: scale(1); }
          }
          @keyframes pulseGlow {
            0%, 100% { box-shadow: 0 4px 14px rgba(47,70,147,0.35); }
            50%       { box-shadow: 0 4px 22px rgba(47,70,147,0.6); }
          }
          .sb-card-expanded {
            animation: slideDown 0.22s cubic-bezier(0.34,1.56,0.64,1);
          }
          .sb-suggestion-item {
            animation: suggestionIn 0.18s ease both;
          }
          .sb-chip {
            animation: chipPop 0.25s cubic-bezier(0.34,1.56,0.64,1) both;
          }
          .sb-go-btn:not(:disabled):hover {
            animation: pulseGlow 1.4s ease-in-out infinite;
            transform: translateY(-1px);
          }
          .sb-go-btn {
            transition: background 0.15s, box-shadow 0.15s, transform 0.15s;
          }
          .sb-quick-btn {
            transition: background 0.15s, transform 0.12s, box-shadow 0.15s;
          }
          .sb-quick-btn:hover {
            transform: scale(1.07);
          }
          .sb-quick-btn:active {
            transform: scale(0.95);
          }
          .sb-swap-btn {
            transition: transform 0.2s, background 0.15s;
          }
          .sb-swap-btn:hover {
            background: #eef2ff !important;
            transform: translateY(-50%) rotate(180deg);
          }
          input:focus { border-color: #2f4693 !important; box-shadow: 0 0 0 3px rgba(47,70,147,0.12); }
          input::placeholder { color: #9ca3af; }
          ::-webkit-scrollbar { width: 4px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 4px; }
        `}</style>

        {/* Main search card */}
        <div
          style={{
            background: "var(--sb-bg, #fff)",
            borderRadius: expanded ? 22 : 40,
            boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
            padding: expanded ? "14px 16px" : "0",
            transition:
              "border-radius 0.25s ease, padding 0.2s ease, box-shadow 0.2s ease",
          }}
          className={expanded ? "sb-card-expanded" : ""}
        >
          {/* Collapsed state */}
          {!expanded && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "10px 16px",
              }}
            >
              <button
                onClick={() => setExpanded(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  flex: 1,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                <span style={{ fontSize: 20, color: "#6b7280" }}>🔍</span>
                <span
                  style={{ fontSize: 15, color: "#9ca3af", fontWeight: 400 }}
                >
                  Tap to search…
                </span>
              </button>

              <div style={{ display: "flex", gap: 8 }}>
                <button
                  className="sb-quick-btn"
                  onClick={() => handleHighlight("canteen")}
                  title="Show canteens"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background:
                      highlightType === "canteen" ? "#2f4693" : "#f3f4f6",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    boxShadow:
                      highlightType === "canteen"
                        ? "0 2px 8px rgba(47,70,147,0.35)"
                        : "none",
                  }}
                >
                  🍽️
                </button>
                <button
                  className="sb-quick-btn"
                  onClick={() => handleHighlight("restroom")}
                  title="Show restrooms"
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background:
                      highlightType === "restroom" ? "#2f4693" : "#f3f4f6",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    boxShadow:
                      highlightType === "restroom"
                        ? "0 2px 8px rgba(47,70,147,0.35)"
                        : "none",
                  }}
                >
                  🚻
                </button>
              </div>
            </div>
          )}

          {/* Expanded state */}
          {expanded && (
            <div>
              {/* Header row */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#6b7280",
                    letterSpacing: 0.3,
                    textTransform: "uppercase",
                  }}
                >
                  Navigation
                </span>
                <button
                  onClick={resetForm}
                  style={{
                    background: "#f3f4f6",
                    border: "none",
                    borderRadius: "50%",
                    width: 28,
                    height: 28,
                    cursor: "pointer",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6b7280",
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

              {/* Input fields */}
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {/* Start field */}
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 14,
                      color: "#9ca3af",
                      pointerEvents: "none",
                    }}
                  >
                    📍
                  </span>
                  <input
                    ref={startInputRef}
                    value={start}
                    placeholder="Your location (optional)"
                    onFocus={() => setActiveField("start")}
                    // BUG FIX: Use onBlur to close dropdown only when not selecting
                    onBlur={() => {
                      if (!selectingRef.current) setActiveField(null);
                    }}
                    onChange={(e) => {
                      setStart(sanitize(e.target.value));
                      setSelectedStart(null);
                    }}
                    style={{
                      width: "100%",
                      paddingLeft: 36,
                      paddingRight: start ? 36 : 14,
                      paddingBlock: 11,
                      borderRadius: 14,
                      background: "#f9fafb",
                      border: `1px solid ${activeField === "start" ? "#2f4693" : "#e5e7eb"}`,
                      fontSize: 14,
                      color: "#111827",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                  />
                  {start && (
                    <button
                      onClick={() => {
                        setStart("");
                        setSelectedStart(null);
                        startInputRef.current?.focus();
                        setActiveField("start");
                      }}
                      style={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "#e5e7eb",
                        border: "none",
                        borderRadius: "50%",
                        width: 20,
                        height: 20,
                        cursor: "pointer",
                        fontSize: 11,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#374151",
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Swap button */}
                <button
                  className="sb-swap-btn"
                  onClick={handleSwap}
                  title="Swap start and destination"
                  style={{
                    position: "absolute",
                    right: -8,
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 10,
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "50%",
                    width: 28,
                    height: 28,
                    cursor: "pointer",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2f4693",
                    fontWeight: 700,
                    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  }}
                >
                  ⇅
                </button>

                {/* Destination field */}
                <div style={{ position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 12,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: 14,
                      color: "#9ca3af",
                      pointerEvents: "none",
                    }}
                  >
                    🏁
                  </span>
                  <input
                    ref={destInputRef}
                    value={destination}
                    placeholder="Destination"
                    onFocus={() => setActiveField("destination")}
                    onBlur={() => {
                      if (!selectingRef.current) setActiveField(null);
                    }}
                    onChange={(e) => {
                      handleDestChange(e.target.value);
                      setSelectedDest(null);
                    }}
                    style={{
                      width: "100%",
                      paddingLeft: 36,
                      paddingRight: destination ? 36 : 14,
                      paddingBlock: 11,
                      borderRadius: 14,
                      background: "#f9fafb",
                      border: `1px solid ${activeField === "destination" ? "#2f4693" : "#e5e7eb"}`,
                      fontSize: 14,
                      color: "#111827",
                      outline: "none",
                      boxSizing: "border-box",
                      transition: "border-color 0.15s, box-shadow 0.15s",
                    }}
                  />
                  {destination && (
                    <button
                      onClick={() => {
                        setDestination("");
                        setSelectedDest(null);
                        destInputRef.current?.focus();
                        setActiveField("destination");
                      }}
                      style={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "#e5e7eb",
                        border: "none",
                        borderRadius: "50%",
                        width: 20,
                        height: 20,
                        cursor: "pointer",
                        fontSize: 11,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#374151",
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Route status chips */}
              {(selectedStart || selectedDest) && (
                <div
                  style={{
                    display: "flex",
                    gap: 6,
                    marginTop: 10,
                    flexWrap: "wrap",
                  }}
                >
                  {selectedStart && (
                    <span
                      className="sb-chip"
                      style={{
                        background: "#f0fdf4",
                        border: "1px solid #bbf7d0",
                        color: "#15803d",
                        borderRadius: 20,
                        fontSize: 12,
                        padding: "3px 10px",
                        fontWeight: 500,
                      }}
                    >
                      From:{" "}
                      {selectedStart.name.length > 22
                        ? selectedStart.name.slice(0, 22) + "…"
                        : selectedStart.name}
                    </span>
                  )}
                  {selectedDest && (
                    <span
                      className="sb-chip"
                      style={{
                        background: "#eff6ff",
                        border: "1px solid #bfdbfe",
                        color: "#1d4ed8",
                        borderRadius: 20,
                        fontSize: 12,
                        padding: "3px 10px",
                        fontWeight: 500,
                      }}
                    >
                      To:{" "}
                      {selectedDest.name.length > 22
                        ? selectedDest.name.slice(0, 22) + "…"
                        : selectedDest.name}
                    </span>
                  )}
                </div>
              )}

              {/* Go button */}
              <button
                className="sb-go-btn"
                onClick={handleRoute}
                disabled={!selectedDest}
                style={{
                  marginTop: 12,
                  width: "100%",
                  background: selectedDest ? "#2f4693" : "#d1d5db",
                  color: "#fff",
                  border: "none",
                  borderRadius: 16,
                  paddingBlock: 13,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: selectedDest ? "pointer" : "not-allowed",
                  letterSpacing: 0.4,
                  boxShadow: selectedDest
                    ? "0 4px 14px rgba(47,70,147,0.35)"
                    : "none",
                }}
              >
                🧭 Get Directions
              </button>

              {/* Quick access shortcuts */}
              <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                <button
                  className="sb-quick-btn"
                  onClick={() => {
                    handleHighlight("canteen");
                    setExpanded(false);
                  }}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "9px 0",
                    borderRadius: 12,
                    background:
                      highlightType === "canteen" ? "#2f4693" : "#f3f4f6",
                    color: highlightType === "canteen" ? "#fff" : "#374151",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  🍽️ Canteens
                </button>
                <button
                  className="sb-quick-btn"
                  onClick={() => {
                    handleHighlight("restroom");
                    setExpanded(false);
                  }}
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    padding: "9px 0",
                    borderRadius: 12,
                    background:
                      highlightType === "restroom" ? "#2f4693" : "#f3f4f6",
                    color: highlightType === "restroom" ? "#fff" : "#374151",
                    border: "none",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  🚻 Restrooms
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions dropdown */}
        {expanded && suggestions.length > 0 && (
          <div
            style={{
              marginTop: 8,
              background: "#fff",
              borderRadius: 18,
              maxHeight: 300,
              overflowY: "auto",
              boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
              border: "1px solid #f3f4f6",
              animation: "slideDown 0.2s cubic-bezier(0.34,1.2,0.64,1)",
              transformOrigin: "top center",
            }}
          >
            {suggestions.map((item, i) => (
              <button
                key={i}
                className="sb-suggestion-item"
                // BUG FIX: Use onPointerDown + preventDefault to intercept before
                // the input's onBlur fires, then handle selection in onPointerUp.
                // This ensures the dropdown stays open during the interaction.
                onPointerDown={(e) => {
                  e.preventDefault(); // prevent input blur
                  selectingRef.current = true; // flag we're selecting
                }}
                onPointerUp={() => {
                  handleSelect(item);
                  selectingRef.current = false;
                }}
                onPointerCancel={() => {
                  selectingRef.current = false;
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  width: "100%",
                  padding: "13px 16px",
                  background: "none",
                  border: "none",
                  borderBottom:
                    i < suggestions.length - 1 ? "0.5px solid #f3f4f6" : "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "background 0.1s",
                  animationDelay: `${i * 0.03}s`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f9fafb")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "none")
                }
              >
                <span
                  style={{
                    fontSize: 20,
                    width: 36,
                    height: 36,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background:
                      item.type === "place"
                        ? "#eff6ff"
                        : item.type === "floor"
                          ? "#f0fdf4"
                          : "#f5f3ff",
                    borderRadius: 10,
                    flexShrink: 0,
                  }}
                >
                  {getTypeIcon(item.type)}
                </span>
                <div style={{ minWidth: 0 }}>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#111827",
                    }}
                  >
                    {item.name}
                  </p>
                  {item.subtitle && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: 12,
                        color: "#6b7280",
                        marginTop: 1,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.subtitle.length > 50
                        ? item.subtitle.slice(0, 50) + "…"
                        : item.subtitle}
                    </p>
                  )}
                </div>
                <span
                  style={{
                    marginLeft: "auto",
                    fontSize: 12,
                    color: "#d1d5db",
                    flexShrink: 0,
                  }}
                >
                  {item.type === "place"
                    ? "Place"
                    : item.type === "floor"
                      ? "Floor"
                      : "Building"}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Legend popup */}
        {showLegend && highlightType && !expanded && (
          <div
            style={{
              position: "absolute",
              top: 70,
              right: 0,
              background: "#2f4693",
              borderRadius: 16,
              padding: "10px 14px",
              minWidth: 160,
              boxShadow: "0 4px 16px rgba(47,70,147,0.3)",
              animation: "fadeIn 0.2s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "#fff" }}>
                {highlightType === "canteen" ? "🍽️ Canteens" : "🚻 Restrooms"}
              </span>
              <button
                onClick={() => {
                  setHighlightType(null);
                  onHighlightChange?.(null);
                  setShowLegend(false);
                }}
                style={{
                  background: "none",
                  border: "none",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 14,
                  padding: 0,
                }}
              >
                ✕
              </button>
            </div>
            {highlightType === "restroom" && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 5,
                  }}
                >
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#2563eb",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 12, color: "#e0e7ff" }}>
                    Male Restroom
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      background: "#ec4899",
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 12, color: "#fce7f3" }}>
                    Female Restroom
                  </span>
                </div>
              </>
            )}
            {highlightType === "canteen" && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 16 }}>🍽️</span>
                <span style={{ fontSize: 12, color: "#fef9c3" }}>
                  Campus Canteen
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);

SearchBar.displayName = "SearchBar";
export default SearchBar;
