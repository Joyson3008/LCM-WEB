import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { NAV_NODES } from "../data/navigationNodes";
import { type Building, BUILDINGS } from "../data/buildings";

import { findNearestNode } from "../data/findNearestNode";
import { findShortestPath } from "../utils/pathfinding";
import { buildDirections } from "../utils/directions";

import MapLoyola from "../components/mapLoyola";
import BuildingModal from "../components/BuildingModal";
import RoutePanel from "../components/RoutePanel";
import SearchBar from "../components/SearchBar";
import { useLiveLocation } from "../hooks/useUserLocation";

/* ─── GPS → SVG ───────────────────────────────────────── */
const MAP_BOUNDS = {
  topLeft: { lat: 13.066446339495542, lon: 80.23173587232634 },
  bottomRight: { lat: 13.057462579668526, lon: 80.23785435219153 },
};
const MAP_WIDTH = 412;
const MAP_HEIGHT = 690;

function gpsToSvg(lat: number, lon: number) {
  const x =
    ((lon - MAP_BOUNDS.topLeft.lon) /
      (MAP_BOUNDS.bottomRight.lon - MAP_BOUNDS.topLeft.lon)) *
    MAP_WIDTH;
  const y =
    ((MAP_BOUNDS.topLeft.lat - lat) /
      (MAP_BOUNDS.topLeft.lat - MAP_BOUNDS.bottomRight.lat)) *
    MAP_HEIGHT;
  return { x, y };
}

const LERP = 0.18;

function Home() {
  const { location: gpsLocation, error: gpsError } = useLiveLocation();
  const routerLocation = useLocation();

  const [userMapPosition, setUserMapPosition] = useState<{ x: number; y: number } | null>(null);
  const targetRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!gpsLocation) return;
    const mapped = gpsToSvg(gpsLocation.latitude, gpsLocation.longitude);
    targetRef.current = mapped;
    setUserMapPosition((prev) => prev ?? mapped);
  }, [gpsLocation]);

  useEffect(() => {
    const tick = () => {
      setUserMapPosition((prev) => {
        const target = targetRef.current;
        if (!target) return prev;
        if (!prev) return target;
        const dx = target.x - prev.x;
        const dy = target.y - prev.y;
        if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) return prev;
        return { x: prev.x + dx * LERP, y: prev.y + dy * LERP };
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  /* ─── STATES ── */
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  const [route, setRoute] = useState<{ start: Building | null; dest: Building | null }>({ start: null, dest: null });
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [highlightType, setHighlightType] = useState<"canteen" | "restroom" | null>(null);
  const [gpsToast, setGpsToast] = useState(false);

  /* ─── AUTO-NAVIGATE from Buildings page ── */
  useEffect(() => {
    const state = routerLocation.state as {
      navigateTo?: string;
      building?: { id: string | number; name: string; nodeId?: string; description?: string };
    } | null;
    if (!state?.building?.nodeId) return;
    const fullBuilding = BUILDINGS.find((b) => String(b.id) === String(state.building!.id));
    const destBuilding: Building = fullBuilding ?? {
      id: state.building.id,
      name: state.building.name,
      nodeId: state.building.nodeId,
      description: state.building.description,
    };
    setRoute({ start: null, dest: destBuilding });
    setCurrentStepIndex(0);
    setSelectedBuilding(destBuilding);
    window.history.replaceState({}, document.title);
  }, [routerLocation.state]);

  /* ─── GPS ping animation ── */
  useEffect(() => {
    if (gpsLocation) { setGpsToast(true); setTimeout(() => setGpsToast(false), 2000); }
  }, []);

  /* ─── ROUTE LOGIC ── */
  const startNode = useMemo(() => {
    if (route.start && route.start.nodeId !== "USER_NODE") return route.start.nodeId;
    if (userMapPosition) return findNearestNode(userMapPosition.x, userMapPosition.y);
    return null;
  }, [route.start, userMapPosition]);

  const destinationNode = route.dest?.nodeId ?? null;

  const path = useMemo(() => {
    if (!startNode || !destinationNode) return [];
    return findShortestPath(startNode, destinationNode);
  }, [startNode, destinationNode]);

  const directions = useMemo(() => {
    if (!path.length) return [];
    return buildDirections(path);
  }, [path]);

  useEffect(() => {
    if (!userMapPosition || path.length === 0) return;
    let closestIndex = 0, minDist = Infinity;
    path.forEach((nodeId, i) => {
      const node = NAV_NODES[nodeId];
      const dist = Math.hypot(node.x - userMapPosition.x, node.y - userMapPosition.y);
      if (dist < minDist) { minDist = dist; closestIndex = i; }
    });
    setCurrentStepIndex(closestIndex);
  }, [userMapPosition, path]);

  /* ─── HANDLERS ── */
  const handleBuildingPress = (building: Building) => setSelectedBuilding(building);
  const handleSearchSelect = (building: Building) => setSelectedBuilding(building);
  const handleNavigate = (building: Building) => {
    setRoute({ start: null, dest: building });
    setSelectedBuilding(null);
    setCurrentStepIndex(0);
  };
  const handleRouteSelect = (start: Building, dest: Building) => {
    setRoute({ start, dest });
    setCurrentStepIndex(0);
  };
  const handleCloseRoute = () => setRoute({ start: null, dest: null });

  /* ─── UI ── */
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      overflow: "hidden",
      background: "#0a0f1e",
      fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif",
    }}>
      <style>{`
        @keyframes fadeDown {
          from { opacity: 0; transform: translateY(-12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes ripple {
          0%   { transform: scale(0.8); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes pulse-dot {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,122,255,0.5); }
          50%       { box-shadow: 0 0 0 8px rgba(0,122,255,0); }
        }
        @keyframes shimmer {
          from { background-position: -200% center; }
          to   { background-position: 200% center; }
        }
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(-50%) translateY(8px) scale(0.92); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
        .map-container { transition: filter 0.3s ease; }
        .map-container.blurred { filter: blur(2px) brightness(0.85); }
        .search-wrapper { animation: fadeDown 0.5s cubic-bezier(0.34,1.56,0.64,1) both; }
        .route-panel-wrapper { animation: fadeUp 0.45s cubic-bezier(0.34,1.56,0.64,1) both; }
        .nav-toast { animation: toast-in 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
        .gps-dot { animation: pulse-dot 2s ease-in-out infinite; }
      `}</style>

      {/* ═══ FULL-SCREEN MAP ═══ */}
      <div
        className={`map-container ${(selectedBuilding || path.length > 0) ? "" : ""}`}
        style={{
          position: "absolute",
          inset: 0,
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch" as any,
        }}
      >
        {/* Subtle vignette overlay */}
        <div style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 2,
          background: "radial-gradient(ellipse at center, transparent 55%, rgba(10,15,30,0.35) 100%)",
        }} />

        {/* Top scrim for readability */}
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          height: 140,
          pointerEvents: "none",
          zIndex: 2,
          background: "linear-gradient(to bottom, rgba(10,15,30,0.7) 0%, transparent 100%)",
        }} />

        {/* Bottom scrim */}
        <div style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          height: 200,
          pointerEvents: "none",
          zIndex: 2,
          background: "linear-gradient(to top, rgba(10,15,30,0.65) 0%, transparent 100%)",
        }} />

        <MapLoyola
          navNodes={NAV_NODES}
          userPosition={userMapPosition ?? undefined}
          navigationPath={path}
          onBuildingPress={handleBuildingPress}
          highlightType={highlightType}
          width={window.innerWidth}
          height={window.innerHeight * 1.4}
        />
      </div>

      {/* ═══ TOP HEADER BAR ═══ */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 30,
        padding: "52px 16px 0",
      }}>
        {/* Brand pill */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 24,
            padding: "6px 14px 6px 10px",
          }}>
            <div style={{
              width: 28, height: 28,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #1e40af, #3b82f6)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14,
              boxShadow: "0 2px 8px rgba(59,130,246,0.5)",
            }}>🏛️</div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", letterSpacing: 0.3, lineHeight: 1 }}>
                Loyola
              </div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", letterSpacing: 0.8, textTransform: "uppercase" }}>
                Campus Map
              </div>
            </div>
          </div>

          {/* GPS status badge */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `1px solid ${userMapPosition ? "rgba(34,197,94,0.4)" : "rgba(255,255,255,0.12)"}`,
            borderRadius: 20,
            padding: "6px 12px",
          }}>
            <div
              className={userMapPosition ? "gps-dot" : ""}
              style={{
                width: 7, height: 7, borderRadius: "50%",
                background: userMapPosition ? "#22c55e" : "#6b7280",
                flexShrink: 0,
              }}
            />
            <span style={{ fontSize: 11, color: userMapPosition ? "#86efac" : "#9ca3af", fontWeight: 600 }}>
              {userMapPosition ? "Live" : "GPS Off"}
            </span>
          </div>
        </div>

        {/* ─── SEARCH BAR ─── */}
        <div className="search-wrapper">
          <SearchBar
            onSelect={handleSearchSelect}
            onRouteSelect={handleRouteSelect}
            onHighlightChange={setHighlightType}
          />
        </div>
      </div>

      {/* ═══ GPS ERROR TOAST ═══ */}
      {gpsError && (
        <div style={{
          position: "fixed",
          top: 170,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          background: "rgba(239,68,68,0.95)",
          backdropFilter: "blur(12px)",
          color: "#fff",
          padding: "9px 18px",
          borderRadius: 999,
          fontSize: 12,
          fontWeight: 600,
          boxShadow: "0 4px 20px rgba(239,68,68,0.4)",
          whiteSpace: "nowrap",
          animation: "fadeDown 0.3s ease",
        }}>
          ⚠️ {gpsError}
        </div>
      )}

      {/* ═══ NAVIGATION ACTIVE BANNER ═══ */}
      {route.dest && path.length > 0 && (
        <div
          className="nav-toast"
          style={{
            position: "fixed",
            top: 170,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
            background: "linear-gradient(135deg, rgba(15,23,60,0.97), rgba(47,70,147,0.97))",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(99,130,255,0.4)",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: 18,
            fontSize: 13,
            fontWeight: 600,
            boxShadow: "0 8px 32px rgba(47,70,147,0.5)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            whiteSpace: "nowrap",
            maxWidth: "calc(100vw - 40px)",
          }}
        >
          {/* Animated nav indicator */}
          <div style={{ position: "relative", width: 20, height: 20, flexShrink: 0 }}>
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "rgba(99,130,255,0.3)",
              animation: "ripple 1.6s ease-out infinite",
            }} />
            <div style={{
              position: "absolute", inset: 4, borderRadius: "50%",
              background: "#6382ff",
            }} />
          </div>

          <span style={{
            overflow: "hidden", textOverflow: "ellipsis",
            background: "linear-gradient(90deg, #fff, #a5b4fc)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            To {route.dest.name.split(" ").slice(0, 4).join(" ")}
          </span>

          <button
            onClick={handleCloseRoute}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              borderRadius: "50%",
              width: 22, height: 22,
              cursor: "pointer",
              fontSize: 11,
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.15s",
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* ═══ QUICK ACTION CHIPS (when no route) ═══ */}
      {path.length === 0 && !selectedBuilding && (
        <div style={{
          position: "fixed",
          bottom: 36,
          left: 0, right: 0,
          zIndex: 20,
          display: "flex",
          justifyContent: "center",
          gap: 10,
          padding: "0 16px",
          animation: "fadeUp 0.5s ease 0.3s both",
        }}>
          {[
            { label: "Canteen", icon: "🍽️", type: "canteen" as const },
            { label: "Restroom", icon: "🚻", type: "restroom" as const },
          ].map(({ label, icon, type }) => (
            <button
              key={type}
              onClick={() => setHighlightType(highlightType === type ? null : type)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "10px 18px",
                borderRadius: 28,
                background: highlightType === type
                  ? "linear-gradient(135deg, #2f4693, #4f6fd4)"
                  : "rgba(10,15,30,0.75)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: highlightType === type
                  ? "1px solid rgba(99,130,255,0.6)"
                  : "1px solid rgba(255,255,255,0.14)",
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                boxShadow: highlightType === type
                  ? "0 4px 20px rgba(47,70,147,0.5)"
                  : "0 4px 16px rgba(0,0,0,0.3)",
                transition: "all 0.2s ease",
              }}
            >
              <span style={{ fontSize: 16 }}>{icon}</span>
              {label}
              {highlightType === type && (
                <span style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: "#86efac",
                  marginLeft: 2,
                }} />
              )}
            </button>
          ))}
        </div>
      )}

      {/* ═══ ROUTE PANEL ═══ */}
      {path.length > 0 && (
        <div
          className="route-panel-wrapper"
          style={{
            position: "fixed",
            bottom: 0, left: 0, right: 0,
            zIndex: 40,
          }}
        >
          <RoutePanel
            directions={directions}
            currentStepIndex={currentStepIndex}
            destinationName={route.dest?.name}
            onClose={handleCloseRoute}
          />
        </div>
      )}

      {/* ═══ BUILDING MODAL ═══ */}
      <BuildingModal
        building={selectedBuilding}
        onClose={() => setSelectedBuilding(null)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default Home;