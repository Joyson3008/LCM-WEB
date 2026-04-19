import { useEffect, useMemo, useRef, useState } from "react";
import { NAV_NODES } from "../data/navigationNodes";
import { type Building } from "../data/buildings";

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

/* ─── SMOOTHING ───────────────────────────────────────── */

const LERP = 0.18;

function Home() {
  const { location, error: gpsError } = useLiveLocation();

  const [userMapPosition, setUserMapPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const targetRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number | null>(null);

  /* 📍 Convert GPS → Map */
  useEffect(() => {
    if (!location) return;

    const mapped = gpsToSvg(location.latitude, location.longitude);
    targetRef.current = mapped;

    setUserMapPosition((prev) => prev ?? mapped);
  }, [location]);

  /* 🎯 Smooth animation */
  useEffect(() => {
    const tick = () => {
      setUserMapPosition((prev) => {
        const target = targetRef.current;
        if (!target) return prev;
        if (!prev) return target;

        const dx = target.x - prev.x;
        const dy = target.y - prev.y;

        if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05) return prev;

        return {
          x: prev.x + dx * LERP,
          y: prev.y + dy * LERP,
        };
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ─── STATES ───────────────────────────────────────── */

  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(
    null,
  );

  const [route, setRoute] = useState<{
    start: Building | null;
    dest: Building | null;
  }>({
    start: null,
    dest: null,
  });

  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [highlightType, setHighlightType] = useState<
    "canteen" | "restroom" | null
  >(null);

  /* ─── ROUTE LOGIC ───────────────────────────────────── */

  const startNode = useMemo(() => {
    if (route.start && route.start.nodeId !== "USER_NODE") {
      return route.start.nodeId;
    }

    if (userMapPosition) {
      return findNearestNode(userMapPosition.x, userMapPosition.y);
    }

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

  /* 📍 Step tracking */
  useEffect(() => {
    if (!userMapPosition || path.length === 0) return;

    let closestIndex = 0;
    let minDist = Infinity;

    path.forEach((nodeId, i) => {
      const node = NAV_NODES[nodeId];

      const dist = Math.hypot(
        node.x - userMapPosition.x,
        node.y - userMapPosition.y,
      );

      if (dist < minDist) {
        minDist = dist;
        closestIndex = i;
      }
    });

    setCurrentStepIndex(closestIndex);
  }, [userMapPosition, path]);

  /* ─── HANDLERS ───────────────────────────────────── */

  const handleBuildingPress = (building: Building) =>
    setSelectedBuilding(building);

  const handleSearchSelect = (building: Building) =>
    setSelectedBuilding(building);

  const handleNavigate = (building: Building) => {
    setRoute({ start: null, dest: building });
    setSelectedBuilding(null);
    setCurrentStepIndex(0);
  };

  const handleRouteSelect = (start: Building, dest: Building) => {
    setRoute({ start, dest });
    setCurrentStepIndex(0);
  };

  const handleCloseRoute = () => {
    setRoute({ start: null, dest: null });
  };

  /* ─── UI ───────────────────────────────────────── */
  return (
    <div className="min-h-[125vh] w-full relative overflow-hidden bg-gradient-to-br from-blue-100 via-white to-purple-100">
      {/* 🌈 ANIMATED BACKGROUND BLOBS */}
      <div className="absolute w-[400px] h-[400px] bg-blue-400/30 rounded-full blur-3xl top-[-100px] left-[-100px] animate-pulse" />
      <div className="absolute w-[300px] h-[300px] bg-purple-400/30 rounded-full blur-3xl bottom-[-80px] right-[-80px] animate-pulse" />

      {/* 📍 GPS ERROR */}
      {gpsError && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 animate-slideDown">
          <div className="bg-red-500 text-white px-5 py-2 rounded-full text-sm shadow-lg">
            ⚠️ {gpsError}
          </div>
        </div>
      )}

      {/* 🗺️ MAP AREA */}
     <div className="absolute inset-0 pt-16 md:flex md:items-center md:justify-center">
        <div
          className="
      relative 
      w-full 
      h-[calc(140vh-64px)]   /* 🔥 FULL HEIGHT minus navbar */
      md:max-w-5xl 
      md:h-[110vh] 
      bg-white 
      md:rounded-3xl 
      md:shadow-2xl 
      overflow-hidden 
      md:border
    "
        >
          <div className="w-full h-full transition-transform duration-500 hover:scale-[1.01]">
            <MapLoyola
              navNodes={NAV_NODES}
              userPosition={userMapPosition ?? undefined}
              navigationPath={path}
              onBuildingPress={handleBuildingPress}
              highlightType={highlightType}
            />
          </div>

          {/* 🌈 TOP FADE */}
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />

          {/* 🌈 BOTTOM FADE */}
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white/60 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* 🔍 SEARCH BAR */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-40 px-4">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 p-2 transition hover:shadow-2xl">
          <SearchBar
            onSelect={handleSearchSelect}
            onRouteSelect={handleRouteSelect}
            onHighlightChange={setHighlightType}
          />
        </div>
      </div>

      {/* 📍 ROUTE PANEL */}
      {path.length > 0 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl z-50 px-4 animate-slideUp">
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-gray-200 p-3 transition hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)]">
            <RoutePanel
              directions={directions}
              currentStepIndex={currentStepIndex}
              destinationName={route.dest?.name}
              onClose={handleCloseRoute}
            />
          </div>
        </div>
      )}

      {/* 🏢 MODAL */}
      <BuildingModal
        building={selectedBuilding}
        onClose={() => setSelectedBuilding(null)}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

export default Home;
