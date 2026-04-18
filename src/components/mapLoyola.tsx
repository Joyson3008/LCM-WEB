// ✅ ICONS (FIX PATHS - no @ alias unless configured)
import BasketballIcon from "../assets/icons/basket.svg";
import JesuitsIcon from "../assets/icons/building.svg";
import CanteenIcon from "../assets/icons/canteen.svg";
import ChurchIcon from "../assets/icons/church.svg";
import CricketIcon from "../assets/icons/cricket11.svg";
import EntryIcon from "../assets/icons/entry.svg";
import ExitIcon from "../assets/icons/exit.svg";
import FootIcon1 from "../assets/icons/foot1.svg";
import FootIcon from "../assets/icons/GROUND.svg";
import HostelIcon from "../assets/icons/H.svg";
import H1 from "../assets/icons/h1.svg";
import H2 from "../assets/icons/h2.svg";
import H3 from "../assets/icons/h3.svg";
import H4 from "../assets/icons/H4.svg";
import H5 from "../assets/icons/h5.svg";
import H6 from "../assets/icons/h6.svg";
import H7 from "../assets/icons/h7.svg";
import H8 from "../assets/icons/h8.svg";
import H9 from "../assets/icons/h9.svg";
import H10 from "../assets/icons/h10.svg";
import H11 from "../assets/icons/h11.svg";
import H12 from "../assets/icons/h12.svg";
import H13 from "../assets/icons/h13.svg";
import H14 from "../assets/icons/h14.svg";
import H15 from "../assets/icons/h15.svg";
import H16 from "../assets/icons/h16.svg";
import H17 from "../assets/icons/h17.svg";
import AD from "../assets/icons/ad.svg";
import HockeyIcon from "../assets/icons/HOCKEY_GROUND.svg";
import TennisIcon from "../assets/icons/tennis.svg";
import TennisIcon1 from "../assets/icons/tennis1.svg";
import VolleyballIcon from "../assets/icons/volley.svg";

// ✅ DATA + LOGIC (these are fine)
import { BUILDINGS, type Building } from "../data/buildings";

// ✅ REACT
import { useMemo, useState } from "react";

export type NavNode = { id: string; x: number; y: number };
export type NavEdge = { from: string; to: string };

export type UserPosition = { x: number; y: number };

interface MapLoyolaProps {
  width?: number;
  height?: number;
  userPosition?: UserPosition | null;
  navigationPath?: string[];
  onBuildingPress?: (building: Building, index: number) => void;
  highlightType?: "canteen" | "restroom" | null;
  selectedBuildingIndex?: number | null;
  buildings?: Building[];
  navNodes?: Record<string, NavNode>;
  findNearestNode?: (x: number, y: number) => string | null;
  findShortestPath?: (start: string, end: string) => string[];
}

// ─── Component ───────────────────────────────────────────────────────────────

const MapLoyola: React.FC<MapLoyolaProps> = ({
  width = 440,
  height = 1027,
  userPosition = null,
  navigationPath = [],
  onBuildingPress,
  highlightType,
  selectedBuildingIndex,

  navNodes = {},
  findNearestNode,
  findShortestPath,
}) => {
  const [clickRoute] = useState<Building | null>(null);

  // Click-based route calculation
  const clickNavigationPath = useMemo(() => {
    if (!userPosition || !clickRoute?.nodeId) return [];
    if (!findNearestNode || !findShortestPath) return [];
    const startNode = findNearestNode(userPosition.x, userPosition.y);
    if (!startNode) return [];
    return findShortestPath(startNode, clickRoute.nodeId);
  }, [userPosition, clickRoute, findNearestNode, findShortestPath]);

  // Replace the handler block (keep everything else the same)

  const handleBuildingClick = (index: number) => () => {
    onBuildingPress?.(BUILDINGS[index], index);
  };

  const buildingHandlers = (index: number) => ({
    onClick: handleBuildingClick(index),
    style: { cursor: "pointer" } as React.CSSProperties,
  });
  // Stroke color helpers
  const selStroke = (idx: number) =>
    selectedBuildingIndex === idx ? "black" : "none";
  const selWidth = (idx: number) => (selectedBuildingIndex === idx ? 2 : 0);
  const selStroke2 = (idx: number) =>
    selectedBuildingIndex === idx ? "black" : "none";
  const selWidth2 = (_idx: number) => 2;

  const restroomStroke = (male: boolean) =>
    highlightType === "restroom"
      ? male
        ? "#ff00dd"
        : "#2f4693"
      : "transparent";
  const canteenStroke = highlightType === "canteen" ? "#2f4693" : "transparent";

  return (
    <div style={{ flex: 1, width: "100%", height: "100%" }}>
      <svg
        width={width}
        height={height}
        viewBox="30 -90 405 1170"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Start marker */}
          <marker
            id="startMarker"
            markerWidth="24"
            markerHeight="24"
            refX="12"
            refY="12"
            orient="auto"
          >
            <circle cx="12" cy="12" r="6" fill="#2563eb" />
            <circle cx="12" cy="12" r="4" fill="#ffffff" />
          </marker>
          {/* End marker */}
          <marker
            id="endMarker"
            markerWidth="10"
            markerHeight="10"
            refX="5"
            refY="5"
          >
            <circle cx="5" cy="5" r="4" fill="#e34444" />
          </marker>
        </defs>

        {/* ── Background ── */}
        <rect width="415" height="917" fill="#F9F9F9" />
        <rect x={2.4401} width="412" height="917" fill="#F9F9F9" />

        {/* ── Outer boundary roads ── */}
        <path
          d="M206.94 617.714L350.246 630.9L374.44 629"
          stroke="#020202"
          strokeWidth={10}
          strokeLinecap="round"
        />
        <path
          d="M208.387 618.287 L5.73225 598.323 L89.4401 45.5"
          fill="none"
          stroke="#030303"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M89.9401 44L139.44 64"
          stroke="#020202"
          strokeWidth={10}
          strokeLinecap="round"
        />
        <path
          d="M238.401 214.5L216.94 173.5L179.846 103.646L141.94 65"
          stroke="#020202"
          strokeWidth={10}
          strokeLinecap="round"
        />
        <path
          d="M238.401 214.5L250.44 237.5L279.94 284"
          stroke="#020202"
          strokeWidth={10}
          strokeLinecap="round"
        />
        <path
          d="M328.19 341.25L309.94 324L279.94 284"
          stroke="#020202"
          strokeWidth={10}
          strokeLinecap="round"
        />
        <path
          d="M328.19 341.25 L346.44 358.5 L386.44 394.5 L389.94 405.5 L389.94 427.5 L377.44 522 L373.94 624.5"
          fill="none"
          stroke="#020202"
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ── Inner roads (blue-grey) ── */}
        <path
          d="M140.94 62.5L140.94 142.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M140.94 142.5L142.97 185"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M142.97 185L142.97 217.194"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M141.94 216.104L143.754 283.409"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M145.44 362.25L143.781 284.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M172.421 216.963 L168.838 168.933 L144.997 161.555"
          fill="none"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M169.498 211.128L142.919 208.491"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M142.97 211.194L90.377 212.194"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M204.813 281.397L143.468 283.397"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="square"
        />
        <path
          d="M143.752 280.957L87.4494 282.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M90.4401 215L93.4401 187L97.4401 158"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M97.097 159.469L95.0887 124.025"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M96.4401 123.5L139.94 120.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M87.407 282.713L89.4466 215.347"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M156.495 369.462C156.495 369.462 179.21 369.159 183.141 369.11C187.072 369.06 191.44 369 191.44 369"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <line
          x1="329.94"
          y1="583.5"
          x2="329.94"
          y2="556.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M203.127 234L236.94 215.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M187.127 241.397L203.127 234"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M187.127 241.397L187.127 242.397L187.627 251.397L186.127 252.897M178.627 255.897L182.127 255.397L186.127 252.897M204.138 263.372L186.127 252.897"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M205.451 262.476L220.44 269.5L235.44 275.5L259.44 280L277.94 282.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <line
          x1="236.295"
          y1="281.589"
          x2="225.029"
          y2="308.145"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M177.127 238.897L187.127 241.397"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M186.44 253.478 C188.813 252.978 176.567 255 176.567 255 L170.567 252.022 C169.882 250.152 169.525 249.013 169.567 247.022 C169.606 245.222 169.537 243.998 170.567 242.522 C172.02 240.44 177.439 239.566 179.94 240"
          fill="none"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M204.776 281.378L204.138 263.372"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M204.138 263.372L203.127 234"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M207.127 362.397L204.813 283.397"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M174.44 216L203.44 231.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M177.127 238.897L177.946 218.091"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M145.44 361C148.642 363.674 150.94 368 150.94 368"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M190.44 369V501.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M212.94 362.5C202.591 362.5 189.44 369.5 189.44 369.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M193.94 502.5L279.901 501.539"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M208.227 361.708 C208.227 361.708 234.27 362.855 250.751 365.347 C260.234 366.781 264.472 367.578 270.94 374.5 C272.95 376.651 274.354 382.887 274.586 387.37 C274.817 391.853 278.94 501 278.94 501"
          fill="none"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M283.402 478.511L359.756 478.551"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M279.895 506.545L279.895 581.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M278.44 583H353.94"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M203.94 604V615"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M206.44 604.5 C258.337 597.982 267.3 593.043 276.972 584.27"
          fill="none"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M173.617 575.975 C173.617 575.975 174.804 584.363 175.774 591.22 C176.744 598.076 191.611 601.876 191.611 601.876 L203.24 604.342 L204.199 604.471"
          fill="none"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M171.44 503.5L173.44 578.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M174.44 502.67L192.778 502.67"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M173.94 503.5L138.44 503.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M138.44 503.5L86.4401 503.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M137.44 502L137.44 479.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M171.94 520 L161.44 526 L153.94 541.5 L157.44 554.5 L171.94 566"
          fill="none"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M138.894 365.065 C138.894 365.065 136.272 369.052 136.491 372.039 C136.713 375.071 138.028 376.695 139.957 378.344 C141.736 379.864 143.115 380.192 145.221 380.004 C147.173 379.829 148.297 379.176 149.932 377.753 C151.285 376.576 152.241 375.877 152.896 373.91 C153.364 372.506 153.472 371.546 153.335 370.019"
          fill="none"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="285.022"
          y1="540.584"
          x2="320.024"
          y2="541.418"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M110.44 386.5L133.099 385.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M153.787 369L156.757 368.85L156.757 385.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M94.4401 578.5C87.4401 573 89.9401 503 89.9401 503"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M174.94 578.5C174.94 578.5 101.44 584 94.4401 578.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M282.44 520C282.44 520 339.44 517.001 337.94 520C336.44 523 327.491 529.086 341.94 528.5C356.39 527.914 353.491 527.586 367.94 527"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M361.321 479.207 C361.321 479.207 366.759 488.469 365.828 493.531 C364.759 499.348 354.094 506.042 354.094 506.042"
          fill="none"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="100.761"
          y1="90.3296"
          x2="133.77"
          y2="88.6791"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <line
          x1="100.761"
          y1="100.33"
          x2="133.77"
          y2="98.6791"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M48.4401 505L67.9401 508L90.4401 505"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M323.547 342.673 C323.547 342.673 315.94 346 312.926 353.576 C301.379 382.605 309.772 436.004 309.772 436.004"
          fill="none"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M136.666 476L112.44 475"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M136.94 474L134.94 383.463"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M62.9401 383.5L62.9401 475"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M89.4401 473.5L87.4401 384.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M90.4401 475L112.44 475"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M90.4401 506L90.4401 478"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M61.3317 475.117L90.4401 475"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M59.9401 361.5L62.4401 383"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M132.94 381.463L139.44 361"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M139.444 361.213L60.4441 362.463"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M62.9401 383.5L87.4401 384.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M87.4401 384.5L111.44 384.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M113.44 472.5L111.44 384.5"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
        />
        <path
          d="M156.757 382.5 L158.94 432 L160.44 472.5 L139.44 472.5"
          fill="none"
          stroke="#B4C8D5"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* ── Navigation path (search result) ── */}
        {navigationPath && navigationPath.length > 1 && (
          <polyline
            points={navigationPath
              .map((id) => {
                const node = navNodes[id];
                return node ? `${node.x},${node.y}` : "";
              })
              .filter(Boolean)
              .join(" ")}
            fill="none"
            stroke="#ca1c1c"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            markerStart="url(#startMarker)"
            markerEnd="url(#endMarker)"
          />
        )}

        {/* ═══════════════════════════════════════════════════
            BUILDINGS
        ═══════════════════════════════════════════════════ */}

        {/* Jubilee Building (index 35) */}
        <g {...buildingHandlers(35)}>
          <rect
            x="101.44"
            y="218"
            width="38"
            height="16"
            fill="#FFD862"
            stroke={selStroke(35)}
            strokeWidth={selWidth(35)}
          />
          <rect
            x="101.44"
            y="262"
            width="39"
            height="15"
            fill="#FFD862"
            stroke={selStroke(36)}
            strokeWidth={selWidth(36)}
          />
          <rect
            x="94.4401"
            y="218"
            width="12"
            height="59"
            fill="#FFD862"
            stroke={selStroke(36)}
            strokeWidth={selWidth(36)}
          />
          <text
            x={119.44}
            y={273}
            fontSize={10}
            fill="black"
            fontWeight="600"
            textAnchor="middle"
          >
            JUBILEE
          </text>
        </g>

        {/* Main Building (index 0) */}
        <g {...buildingHandlers(0)}>
          <rect
            x="149.44"
            y="220"
            width="25"
            height="7"
            fill="#D9D9D9"
            stroke={selStroke(0)}
            strokeWidth={selWidth(0)}
          />
          <rect
            x="156.44"
            y="227"
            width="13"
            height="41"
            fill="#D9D9D9"
            stroke={selStroke(36)}
            strokeWidth={selectedBuildingIndex === 0 ? 2 : 0}
          />
          <rect
            x="149.44"
            y="266"
            width="27"
            height="11"
            fill="#D9D9D9"
            stroke={selStroke(0)}
            strokeWidth={selWidth(0)}
          />
          <text
            x={163}
            y={275}
            fontSize={9}
            fill="black"
            fontWeight="600"
            textAnchor="middle"
          >
            MAIN
          </text>
        </g>

        {/* Chemistry Building (index 1) */}
        <g {...buildingHandlers(1)}>
          <rect
            x="99.4401"
            y="186"
            width="39"
            height="13"
            rx={3}
            fill="#FFB2B2"
            stroke={selStroke2(1)}
            strokeWidth={selWidth2(1)}
          />
          <rect
            x="-39.4401"
            y="179"
            width="59"
            height="13"
            rx={3}
            fill="#FFB2B2"
            transform="rotate(-92.18607 53.261 108.633)"
            stroke={selStroke2(1)}
            strokeWidth={selWidth2(1)}
          />
          <text
            x="119"
            y="194"
            fill="black"
            fontSize="6.8"
            fontWeight="600"
            textAnchor="middle"
          >
            CHEMISTRY
          </text>
        </g>

        {/* Library (index 2) */}
        <g {...buildingHandlers(2)}>
          <rect x="89.4401" y="294" width="40" height="25" fill="#875252" />
          <text
            x={109.44}
            y={308}
            fontSize={9}
            fill="white"
            fontWeight="600"
            textAnchor="middle"
          >
            LIBRARY
          </text>
        </g>

        {/* Building index 51 */}
        <g {...buildingHandlers(51)}>
          <rect
            x="149.44"
            y="180"
            width="13"
            height="22"
            fill="#9BBEFA"
            stroke={selStroke2(51)}
            strokeWidth={selWidth2(51)}
          />
        </g>

        {/* Building index 4 */}
        <g {...buildingHandlers(4)}>
          <rect
            x="95.9401"
            y="510.5"
            width="11"
            height="66"
            fill="#D9D9D9"
            stroke={selStroke2(4)}
            strokeWidth={selWidth2(4)}
          />
        </g>

        {/* Viscom (index 34) */}
        <g {...buildingHandlers(34)}>
          <rect
            x="103.261"
            y="128.633"
            width="33"
            height="10"
            transform="rotate(-2.18607 103.261 128.633)"
            fill="#FFD52B"
            stroke={selStroke2(34)}
            strokeWidth={selWidth2(34)}
          />
          <text
            x={119.44}
            y={136}
            fontSize={8}
            fill="black"
            fontWeight="600"
            textAnchor="middle"
          >
            VISCOM
          </text>
        </g>

        {/* Centenary / Law Building (index 6) */}
        <g {...buildingHandlers(6)}>
          <rect
            x="100.44"
            y="142"
            width="24"
            height="41"
            fill="#D9D9D9"
            stroke={selStroke2(6)}
            strokeWidth={selWidth2(6)}
          />
          <text
            x={112.44}
            y={168}
            fontSize={4}
            fill="black"
            fontWeight="600"
            textAnchor="middle"
          >
            CENTINARY
          </text>
        </g>

        {/* Jesuits Building (index 7) */}
        <g {...buildingHandlers(7)}>
          <rect
            x="124.44"
            y="104"
            width="9"
            height="14"
            fill="#D8C1FF"
            stroke={selStroke2(7)}
            strokeWidth={selWidth2(7)}
          />
        </g>

        {/* Data Science / MCA (index 8) */}
        <g {...buildingHandlers(8)}>
          <rect
            x="147.44"
            y="120.77"
            width="20"
            height="42"
            transform="rotate(-1.01454 147.44 125.77)"
            fill="#FFD294"
            stroke={selStroke2(8)}
            strokeWidth={selWidth2(8)}
          />
        </g>

        {/* Bank & Post Office (index 9) */}
        <g {...buildingHandlers(9)}>
          <rect
            x="186.44"
            y="185"
            width="9"
            height="20"
            fill="#F2A6F4"
            stroke={selStroke2(9)}
            strokeWidth={selWidth2(9)}
          />
        </g>

        {/* Administration (index 3) */}
        <g {...buildingHandlers(3)}>
          <rect
            x="173.44"
            y="185"
            width="9"
            height="20"
            fill="#a6dff4"
            stroke={selStroke2(3)}
            strokeWidth={selWidth2(3)}
          />
        </g>

        {/* Commerce & Economics (index 10) */}
        <g {...buildingHandlers(10)}>
          <rect
            x="84.4401"
            y="340"
            width="52"
            height="15"
            fill="#D9D9D9"
            stroke={selStroke2(10)}
            strokeWidth={selWidth2(10)}
          />
          <rect
            x="81.4401"
            y="323"
            width="22"
            height="25"
            fill="#D9D9D9"
            stroke={selStroke2(10)}
            strokeWidth={selWidth2(10)}
          />
          <text
            x={109.44}
            y={350}
            fontSize={9}
            fill="black"
            fontWeight="600"
            textAnchor="middle"
          >
            COM &amp; ECO
          </text>
        </g>

        {/* B.Ed (index 11) */}
        <g {...buildingHandlers(11)}>
          <rect
            x="283.44"
            y="451"
            width="42"
            height="22"
            fill="#D9D9D9"
            stroke={selStroke2(11)}
            strokeWidth={selWidth2(11)}
          />
          <text
            x={307}
            y={465}
            fontSize={9}
            fill="black"
            fontWeight="600"
            textAnchor="middle"
          >
            BE.d
          </text>
        </g>

        {/* LIBA Building (index 12) */}
        <g {...buildingHandlers(12)}>
          <rect
            x="284.44"
            y="545"
            width="42"
            height="26"
            fill="#D9D9D9"
            stroke={selStroke2(12)}
            strokeWidth={selWidth2(12)}
          />
          <rect x="291.44" y="522" width="39" height="24" fill="#D9D9D9" />
          <text
            x={307}
            y={560}
            fontSize={9}
            fill="black"
            fontWeight="600"
            textAnchor="middle"
          >
            LIBA
          </text>
        </g>
        {/* Women's Hostel (index 13) */}
        <g transform="translate(289.94, 586.5)" {...buildingHandlers(13)}>
          <rect
            x={-10}
            y={-10}
            width={48}
            height={50}
            fill="transparent"
            stroke={selStroke2(13)}
            strokeWidth={selWidth2(13)}
          />

          <image href={HostelIcon} x={4} y={4} width={30} height={30} />
        </g>

        {/* LIBA Entry (index 52) */}
        <g transform="translate(189.94, 600.5)" {...buildingHandlers(52)}>
          <rect
            width={48}
            height={50}
            fill="transparent"
            stroke={selStroke2(52)}
            strokeWidth={selWidth2(52)}
          />

          <image href={EntryIcon} width={20} height={20} />
        </g>

        {/* Railway Gate Entry (index 54) */}
        <g transform="translate(130.94, 46.5)" {...buildingHandlers(54)}>
          <rect
            x={-10}
            y={-10}
            width={48}
            height={50}
            fill="transparent"
            stroke={selStroke2(54)}
            strokeWidth={selWidth2(54)}
          />

          <image href={EntryIcon} x={0} y={0} width={20} height={20} />
        </g>

        {/* Main Gate Entry (index 53) */}
        <g transform="translate(228.94, 195)">
          <rect
            x={-10}
            y={-10}
            width={58}
            height={60}
            fill="transparent"
            {...buildingHandlers(53)}
            stroke={selStroke2(53)}
            strokeWidth={selWidth2(53)}
          />

          <image href={EntryIcon} x={0} y={0} width={25} height={25} />
        </g>

        {/* Exit Gate (index 61) */}
        <g transform="translate(279.94, 265)" {...buildingHandlers(61)}>
          <rect
            x={-10}
            y={-10}
            width={58}
            height={60}
            fill="transparent"
            stroke={selStroke2(61)}
            strokeWidth={selWidth2(61)}
          />

          <image href={ExitIcon} x={0} y={0} width={20} height={20} />
        </g>

        {/* Jesuits Residence (index 18) */}
        <g transform="translate(206, 316.5)" {...buildingHandlers(18)}>
          <rect
            x={5}
            y={-10}
            width={48}
            height={50}
            fill="transparent"
            stroke={selStroke2(18)}
            strokeWidth={selWidth2(18)}
          />

          <image href={JesuitsIcon} x={8} y={5} width={32} height={32} />
        </g>

        {/* LIBA Canteen building (index 38) */}
        <g {...buildingHandlers(38)}>
          <rect
            x="330.44"
            y="587"
            width="33"
            height="10"
            fill="#D9D9D9"
            stroke={selStroke2(38)}
            strokeWidth={selWidth2(38)}
          />
        </g>

        {/* Old LIBA (index 37) */}
        <g {...buildingHandlers(37)}>
          <rect
            x="335.44"
            y="564"
            width="35"
            height="12"
            fill="#D9D9D9"
            stroke={selStroke2(37)}
            strokeWidth={selWidth2(37)}
          />
        </g>

        {/* Eat Right Canteen (index 47) */}
        <g transform="translate(336.44, 536)" {...buildingHandlers(47)}>
          <rect
            x={-3}
            y={-10}
            width={35}
            height={35}
            fill="transparent"
            stroke={canteenStroke}
            strokeWidth={highlightType === "canteen" ? 4 : 0}
          />

          <image href={CanteenIcon} x={0} y={0} width={22} height={22} />
        </g>
        {/* LIBA parking */}
        <path d="M335.44 452H377.44V472H335.44V452Z" fill="#D9D9D9" />

        {/* Jubilee Canteen (index 14) */}
        <g transform="translate(64.4401, 293)" {...buildingHandlers(14)}>
          <rect
            x={-6}
            y={-4}
            width={30}
            height={30}
            fill="transparent"
            stroke={canteenStroke}
            strokeWidth={highlightType === "canteen" ? 4 : 0}
          />

          <image href={CanteenIcon} x={0} y={0} width={20} height={20} />
        </g>

        {/* Clubs Building (index 15) */}
        <g {...buildingHandlers(15)}>
          <rect
            x="84.2955"
            y="141"
            width="10"
            height="68.2746"
            transform="rotate(7.47903 84.2955 141)"
            fill="#D9D9D9"
            stroke={selStroke2(15)}
            strokeWidth={selWidth2(15)}
          />
          <rect
            x="86.4311"
            y="143.7"
            width="4.48612"
            height="10.8154"
            transform="rotate(10.5232 86.4311 143.7)"
            fill="#ed1f1f"
            stroke={selStroke2(15)}
            strokeWidth={selWidth2(15)}
          />
          <rect
            x="81.4745"
            y="171"
            width="5.02942"
            height="12.8091"
            transform="rotate(9.13876 81.4745 171)"
            fill="#59B051"
            stroke={selStroke2(15)}
            strokeWidth={selWidth2(15)}
          />
          <rect
            x="79.478"
            y="186"
            width="4"
            height="15.8405"
            transform="rotate(6.88492 79.478 186)"
            fill="#CECB18"
            stroke={selStroke2(15)}
            strokeWidth={selWidth2(15)}
          />
        </g>

        {/* Hostel A Block (index 16) */}
        <g {...buildingHandlers(16)}>
          <rect
            x="69.9401"
            y="366.5"
            width="59"
            height="12"
            fill="#DDDDDD"
            stroke={selStroke2(16)}
            strokeWidth={selWidth2(16)}
          />
        </g>

        {/* Parking (index 17) */}
        <g {...buildingHandlers(17)}>
          <rect
            x="176.434"
            y="141.258"
            width="11.1058"
            height="51.7316"
            transform="rotate(-28.0874 176.434 141.258)"
            fill="#D9D9D9"
            stroke={selStroke2(17)}
            strokeWidth={selWidth2(17)}
          />
        </g>

        {/* Cricket Ground (index 19) */}
        <g transform="translate(190, 507)" {...buildingHandlers(19)}>
          <rect
            x={13}
            y={-8}
            width={70}
            height={96}
            fill="transparent"
            stroke={selStroke2(19)}
            strokeWidth={selWidth2(19)}
          />
          <image href={CricketIcon} width={88} height={80} />
        </g>

        {/* Football Ground Area 1 (index 57) */}
        <g transform="translate(22.4401, 504)" {...buildingHandlers(57)}>
          <rect
            x={7}
            y={7}
            width={55}
            height={79}
            fill="transparent"
            stroke={selStroke2(57)}
            strokeWidth={selWidth2(57)}
          />
          <image href={FootIcon1} width={69} height={86} />
        </g>

        {/* Football Ground Area rotate (index 58) */}
        <g transform="translate(345.4401, 308) rotate(-90.18 70.5315 137.894)">
          <rect
            x={-8}
            y={0}
            width={50}
            height={50}
            fill="transparent"
            {...buildingHandlers(58)}
            stroke={selStroke2(58)}
            strokeWidth={selWidth2(58)}
          />
          <image href={FootIcon} width={37} height={60} />
        </g>

        {/* Football Ground Area 2 (index 20) */}
        <g
          transform="translate(216, 368) rotate(-1.18 70.5315 137.894)"
          {...buildingHandlers(20)}
        >
          <rect
            x={6}
            y={-8}
            width={51}
            height={134}
            fill="transparent"
            stroke={selStroke2(20)}
            strokeWidth={selWidth2(20)}
          />
          <image href={FootIcon} width={60} height={130} />
        </g>

        {/* Football Ground Area 3 (index 58) */}
        <g transform="translate(315.44, 383)" {...buildingHandlers(58)}>
          <rect
            x={-8}
            y={-8}
            width={71}
            height={72}
            fill="transparent"
            stroke={selStroke2(58)}
            strokeWidth={selWidth2(58)}
          />
          <image href={FootIcon1} width={55} height={55} />
        </g>

        {/* Basketball Court 1 (index 48) */}
        <g transform="translate(196.74, 466)" {...buildingHandlers(48)}>
          <rect
            x={-6}
            y={-6}
            width={32}
            height={37}
            fill="transparent"
            stroke={selStroke2(48)}
            strokeWidth={selWidth2(48)}
          />
          <image href={BasketballIcon} x={2} y={8} width={20} height={20} />
        </g>

        {/* Basketball Court 2 (index 48) */}
        <g transform="translate(196.44, 440)" {...buildingHandlers(48)}>
          <rect
            x={-6}
            y={-6}
            width={32}
            height={37}
            fill="transparent"
            stroke={selStroke2(48)}
            strokeWidth={selWidth2(48)}
          />
          <image href={BasketballIcon} x={2} y={8} width={20} height={20} />
        </g>

        {/* Volleyball Court (index 48) */}
        <g transform="translate(196.44, 409)" {...buildingHandlers(48)}>
          <rect
            x={-6}
            y={-6}
            width={32}
            height={38}
            fill="transparent"
            stroke={selStroke2(48)}
            strokeWidth={selWidth2(48)}
          />
          <image href={VolleyballIcon} x={2} y={8} width={20} height={20} />
        </g>

        {/* Church (index 21) */}
        <g transform="translate(190, 370)" {...buildingHandlers(21)}>
          <rect
            x={1}
            y={3}
            width={30}
            height={38}
            fill="transparent"
            stroke={selStroke2(21)}
            strokeWidth={selWidth2(21)}
          />
          <image href={ChurchIcon} width={32} height={32} />
        </g>

        {/* Church 2 (index 22) */}
        <g transform="translate(337, 598)" {...buildingHandlers(22)}>
          <rect
            x={1}
            y={3}
            width={30}
            height={38}
            fill="transparent"
            stroke={selStroke2(22)}
            strokeWidth={selWidth2(22)}
          />
          <image href={ChurchIcon} width={32} height={28} />
        </g>

        {/* Hockey Ground (index 56) */}
        <g
          transform="translate(168.44, 286) rotate(-1.18 70.5315 137.894)"
          {...buildingHandlers(56)}
        >
          <rect
            x={5}
            y={1}
            width={33}
            height={78}
            fill="transparent"
            stroke={selStroke2(56)}
            strokeWidth={selWidth2(56)}
          />
          <image href={HockeyIcon} width={38} height={76} />
        </g>

        {/* Tennis Court 1 (index 55) */}
        <g transform="translate(150.44, 337)" {...buildingHandlers(55)}>
          <rect
            x={-3}
            y={-45}
            width={19}
            height={70}
            fill="transparent"
            stroke={selStroke2(55)}
            strokeWidth={selWidth2(55)}
          />
          <image href={TennisIcon} width={15} height={20} />
        </g>

        {/* Tennis Court 2 (index 55) */}
        <g
          transform="translate(143.44, 307) rotate(-1.18 70.5315 137.894)"
          {...buildingHandlers(55)}
        >
          <rect
            x={8}
            y={1}
            width={12}
            height={20}
            fill="transparent"
            stroke={selStroke2(55)}
            strokeWidth={selWidth2(55)}
          />
          <image href={TennisIcon1} width={35} height={30} />
        </g>
        {/* ── Restrooms ── */}
        <g>
          {/* Male restrooms */}
          <rect
            x="83.5315"
            y="157.894"
            width="5"
            height="11"
            transform="rotate(7.18014 83.5315 157.894)"
            fill="#57ADEA"
            stroke={restroomStroke(false)}
            strokeWidth={highlightType === "restroom" ? 4 : 0}
            {...buildingHandlers(59)}
            style={{ cursor: "pointer" }}
          />
          <rect
            x="47.4401"
            y="402"
            width="10"
            height="17"
            fill="#65C6FB"
            stroke={restroomStroke(false)}
            strokeWidth={highlightType === "restroom" ? 4 : 0}
            {...buildingHandlers(59)}
            style={{ cursor: "pointer" }}
          />
          <rect
            x="138.44"
            y="408"
            width="17"
            height="15"
            fill="#65C6FB"
            stroke={restroomStroke(false)}
            strokeWidth={highlightType === "restroom" ? 4 : 0}
            {...buildingHandlers(59)}
            style={{ cursor: "pointer" }}
          />
          <rect
            x="178.44"
            y="525"
            width="13"
            height="10"
            fill="#65C6FB"
            stroke={restroomStroke(false)}
            strokeWidth={highlightType === "restroom" ? 4 : 0}
            {...buildingHandlers(59)}
            style={{ cursor: "pointer" }}
          />
          <rect
            x="174"
            y="171"
            width="12"
            height="13"
            fill="#57ADEA"
            stroke={restroomStroke(false)}
            strokeWidth={highlightType === "restroom" ? 4 : 0}
            {...buildingHandlers(59)}
            style={{ cursor: "pointer" }}
          />
          <rect
            x="70.4401"
            y="243"
            width="9"
            height="11"
            fill="#57ADEA"
            stroke={restroomStroke(false)}
            strokeWidth={highlightType === "restroom" ? 4 : 0}
            {...buildingHandlers(59)}
            style={{ cursor: "pointer" }}
          />

          {/* Female restrooms */}
          <rect
            x="99.4401"
            y="201"
            width="12"
            height="7"
            fill="#57ADEA"
            stroke={restroomStroke(true)}
            strokeWidth={highlightType === "restroom" ? 4 : 0}
            {...buildingHandlers(60)}
            style={{ cursor: "pointer" }}
          />
          <rect
            x="99.4401"
            y="221"
            width="12"
            height="7"
            fill="#57ADEA"
            stroke={restroomStroke(true)}
            strokeWidth={highlightType === "restroom" ? 4 : 0}
            {...buildingHandlers(60)}
            style={{ cursor: "pointer" }}
          />
          <rect
            x="145"
            y="213"
            width="12"
            height="7"
            fill="#57ADEA"
            stroke={restroomStroke(true)}
            strokeWidth={highlightType === "restroom" ? 4 : 0}
            {...buildingHandlers(60)}
            style={{ cursor: "pointer" }}
          />
          <rect
            x="145"
            y="213"
            width="12"
            height="7"
            fill="#57ADEA"
            stroke={restroomStroke(true)}
            strokeWidth={highlightType === "restroom" ? 4 : 0}
            {...buildingHandlers(60)}
            style={{ cursor: "pointer" }}
          />
          <rect
            x="84.4401"
            y="326"
            width="5"
            height="10"
            fill="#57ADEA"
            stroke={restroomStroke(true)}
            strokeWidth={highlightType === "restroom" ? 4 : 0}
            {...buildingHandlers(60)}
            style={{ cursor: "pointer" }}
          />
        </g>

        {/* LICET College (index 23) */}
        <g {...buildingHandlers(23)}>
          <rect
            x="117.671"
            y="522.666"
            width="7.93938"
            height="14.5672"
            transform="rotate(26.6203 114.671 520.666)"
            fill="#D9D9D9"
            stroke={selStroke2(23)}
            strokeWidth={selWidth2(23)}
          />
          <rect
            x="107.213"
            y="549.834"
            width="7.37931"
            height="16.3897"
            transform="rotate(-35.5297 108.213 547.834)"
            fill="#D9D9D9"
            stroke={selStroke2(23)}
            strokeWidth={selWidth2(23)}
          />
          <rect
            x="121.747"
            y="519.574"
            width="7.8"
            height="16.3897"
            transform="rotate(-95.8998 127.747 519.574)"
            fill="#D9D9D9"
            stroke={selStroke2(23)}
            strokeWidth={selWidth2(23)}
          />
          <rect
            x="126"
            y="566.499"
            width="8"
            height="16.3897"
            transform="rotate(-95.3236 129.704 565.499)"
            fill="#D9D9D9"
            stroke={selStroke2(23)}
            strokeWidth={selWidth2(23)}
          />
          <rect
            x="107.94"
            y="538.5"
            width="42"
            height="9"
            fill="#D9D9D9"
            stroke={selStroke2(23)}
            strokeWidth={selWidth2(23)}
          />
          <rect
            x="148.752"
            y="515.68"
            width="9"
            height="55"
            transform="rotate(28.9619 144.752 511.68)"
            fill="#D9D9D9"
          />
          <rect
            x="114.138"
            y="522.988"
            width="9"
            height="55"
            transform="rotate(-35.9942 116.138 518.988)"
            fill="#D9D9D9"
          />
          <text
            x={137}
            y={546}
            fontSize={8}
            fill="black"
            fontWeight="600"
            textAnchor="middle"
          >
            LICET
          </text>
        </g>
        {/* Hostel Buildings cluster (index 44 area) */}
        <g transform="translate(164.44, 372)" {...buildingHandlers(44)}>
          <rect x={-6} y={-13} width={30} height={35} fill="transparent" />

          <image href={AD} width={18} height={18} />
        </g>

        {/* Multiple hostel blocks (index 24) */}
        {[
          { tx: 164.94, ty: 389, icon: H1 },
          { tx: 165, ty: 407, icon: H2 },
          { tx: 164.94, ty: 426, icon: H3 },
          { tx: 165.9, ty: 442, icon: H4 },
          { tx: 164.94, ty: 458, icon: H5 },
          { tx: 138, ty: 445, icon: H6 },

          { tx: 91, ty: 408, icon: H12 },
          { tx: 91, ty: 427, icon: H11 },

          { tx: 66.3, ty: 385.5, icon: H17 },
          { tx: 115, ty: 445, icon: H7 },
          { tx: 67, ty: 445, icon: H14 },
          { tx: 67, ty: 427, icon: H15 },
          { tx: 67, ty: 409, icon: H16 },

          { tx: 115, ty: 386.5, icon: H9 },
          { tx: 90.3, ty: 386.5, icon: H13 },
          { tx: 91, ty: 445, icon: H10 },

          { tx: 115, ty: 427, icon: H8 },
        ].map(({ tx, ty, icon }, i) => (
          <g
            key={`hostel-${i}`}
            transform={`translate(${tx}, ${ty})`}
            {...buildingHandlers(24)}
          >
            <rect x={-12} y={-12} width={40} height={40} fill="transparent" />

            <image href={icon} width={20} height={20} />
          </g>
        ))}

        {/* Building 46 */}
        <g {...buildingHandlers(46)}>
          <rect
            x="139.94"
            y="434.5"
            width="16"
            height="8"
            fill="#D9D9D9"
            stroke={selStroke2(46)}
            strokeWidth={selWidth2(46)}
          />
        </g>

        {/* Building 45 */}
        <g {...buildingHandlers(45)}>
          <rect
            x="115.94"
            y="408.5"
            width="16"
            height="19"
            fill="#D9D9D9"
            stroke={selStroke2(45)}
            strokeWidth={selWidth2(45)}
          />
        </g>

        {/* Sauliere Hall (index 25) */}
        <g {...buildingHandlers(25)}>
          <rect
            x="138.44"
            y="387"
            width="17"
            height="19"
            fill="#d88f8f"
            stroke={selStroke2(25)}
            strokeWidth={selWidth2(25)}
          />
        </g>

        {/* Berchmans (index 39) */}
        <g {...buildingHandlers(39)}>
          <rect
            x="156.44"
            y="479"
            width="33"
            height="19"
            fill="#d8d8d8"
            stroke={selStroke2(39)}
            strokeWidth={selWidth2(39)}
          />
        </g>

        {/* Sports Building (index 40) */}
        <g {...buildingHandlers(40)}>
          <rect
            x="181.44"
            y="510"
            width="17"
            height="13"
            fill="#e0d4d4"
            stroke={selStroke2(40)}
            strokeWidth={selWidth2(40)}
          />
        </g>

        {/* LICET Canteen (index 43) */}
        <g transform="translate(153.44, 507)" {...buildingHandlers(43)}>
          <rect
            x={-2}
            y={-5}
            width={20}
            height={20}
            fill="transparent"
            stroke={canteenStroke}
            strokeWidth={highlightType === "canteen" ? 4 : 0}
          />

          <image href={CanteenIcon} x={-1} y={-2} width={16} height={16} />
        </g>

        {/* Jubilee Mess (index 5) */}
        <g {...buildingHandlers(5)}>
          <rect
            x="141.44"
            y="479"
            width="13"
            height="17"
            fill="#e0d4d4"
            stroke={selStroke2(5)}
            strokeWidth={selWidth2(5)}
          />
        </g>

        {/* Veg Mess (index 26) */}
        <g {...buildingHandlers(26)}>
          <rect
            x="115.44"
            y="478"
            width="19"
            height="8"
            fill="#D9D9D9"
            stroke={selStroke2(26)}
            strokeWidth={selWidth2(26)}
          />
        </g>

        {/* Non-Veg Mess (index 27) */}
        <g {...buildingHandlers(27)}>
          <rect
            x="94.4401"
            y="478"
            width="18"
            height="8"
            fill="#D9D9D9"
            stroke={selStroke2(27)}
            strokeWidth={selWidth2(27)}
          />
        </g>

        {/* Metro Mess (index 28) */}
        <g {...buildingHandlers(28)}>
          <rect
            x="63.4401"
            y="479"
            width="21"
            height="7"
            fill="#D9D9D9"
            stroke={selStroke2(28)}
            strokeWidth={selWidth2(28)}
          />
        </g>

        {/* Metro mess extra */}
        <rect x="57.4401" y="488" width="27" height="9" fill="#cdb0b0" />

        {/* Shop@1925 (index 29) */}
        <g {...buildingHandlers(29)}>
          <rect
            x="64.4401"
            y="274"
            width="14"
            height="15"
            fill="#D9D9D9"
            stroke={selStroke2(29)}
            strokeWidth={selWidth2(29)}
          />
        </g>

        {/* WCR (index 30) */}
        <g {...buildingHandlers(30)}>
          <rect
            x="68.4401"
            y="256"
            width="10"
            height="13"
            fill="#D9D9D9"
            stroke={selStroke2(30)}
            strokeWidth={selWidth2(30)}
          />
        </g>

        {/* eat@1925 (index 31) */}
        <g {...buildingHandlers(31)}>
          <rect
            x="89.4291"
            y="285"
            width="15"
            height="8"
            fill="#5A00F6"
            stroke={selStroke2(31)}
            strokeWidth={selWidth2(31)}
          />
        </g>

        {/* Misc rect */}
        <rect x="47.4401" y="374" width="11" height="23" fill="#D9D9D9" />

        {/* Centenary Park (index 32) */}
        <g {...buildingHandlers(32)}>
          <ellipse
            cx="190.44"
            cy="270.5"
            rx="8"
            ry="6.5"
            fill="#CFDEC3"
            stroke={selStroke2(32)}
            strokeWidth={selWidth2(32)}
          />
        </g>

        {/* Loyola Statue (index 50) */}
        <g {...buildingHandlers(50)}>
          <ellipse
            cx="179"
            cy="247"
            rx="8"
            ry="6.5"
            fill="#CFDEC3"
            stroke={selStroke2(50)}
            strokeWidth={selWidth2(50)}
          />
        </g>

        {/* Building 41 */}
        <g {...buildingHandlers(41)}>
          <rect
            x="234.013"
            y="609.582"
            width="47"
            height="6.27563"
            transform="rotate(5.89224 234.013 609.582)"
            fill="#928383"
            stroke={selStroke2(41)}
            strokeWidth={selWidth2(41)}
          />
        </g>

        {/* Building 36 */}
        <g {...buildingHandlers(36)}>
          <rect
            x="121.179"
            y="584.471"
            width="48.3549"
            height="8.26581"
            fill="#ddddd8"
            stroke={selStroke2(36)}
            strokeWidth={selWidth2(36)}
          />
        </g>

        {/* Building 42 */}
        <g {...buildingHandlers(42)}>
          <rect
            x="188.307"
            y="566"
            width="35"
            height="16.446"
            transform="rotate(36.8669 188.307 566)"
            fill="#c2b5b5"
            stroke={selStroke2(42)}
            strokeWidth={selWidth2(42)}
          />
        </g>

        {/* Lover's Park (index 33) */}
        <g {...buildingHandlers(33)}>
          <path
            d="M284.44 415H305.44V456H284.44V415Z"
            fill="#D9D9D9"
            stroke={selectedBuildingIndex === 34 ? "black" : "none"}
            strokeWidth={selectedBuildingIndex === 37 ? 2 : 2}
          />
          <path
            d="M286.44 441H295.44V448H286.44V441Z"
            fill="#5A00F6"
            stroke={selectedBuildingIndex === 34 ? "black" : "none"}
            strokeWidth={selectedBuildingIndex === 37 ? 2 : 2}
          />
          <path
            d="M286.44 451H295.44V456H286.44V451Z"
            fill="#180042"
            stroke={selectedBuildingIndex === 34 ? "black" : "none"}
            strokeWidth={selectedBuildingIndex === 37 ? 2 : 2}
          />
          <path
            d="M285.44 421H301.44V437H285.44V421Z"
            fill="#BE3CAD"
            stroke={selectedBuildingIndex === 34 ? "black" : "none"}
            strokeWidth={selectedBuildingIndex === 37 ? 2 : 2}
          />
        </g>

        {/* Building 49 */}
        <g {...buildingHandlers(49)}>
          <rect
            x="338.44"
            y="454"
            width="6"
            height="9"
            fill="#97D72F"
            stroke={selStroke2(49)}
            strokeWidth={selWidth2(49)}
          />
        </g>

        {/* ── Main navigation path (from search) ── */}
        {navigationPath.length > 1 &&
          navigationPath.map((nodeId, index) => {
            if (index === 0) return null;
            const prevNode = navNodes[navigationPath[index - 1]];
            const currNode = navNodes[nodeId];
            if (!prevNode || !currNode) return null;
            return (
              <line
                key={"main-" + prevNode.id + "-" + currNode.id}
                x1={prevNode.x}
                y1={prevNode.y}
                x2={currNode.x}
                y2={currNode.y}
                stroke="red"
                strokeWidth={4}
                strokeLinecap="round"
              />
            );
          })}

        {/* ── Click route path ── */}
        {clickNavigationPath.length > 1 &&
          clickNavigationPath.map((nodeId, index) => {
            if (index === 0) return null;
            const prevNode = navNodes[clickNavigationPath[index - 1]];
            const currNode = navNodes[nodeId];
            if (!prevNode || !currNode) return null;
            return (
              <line
                key={"click-" + prevNode.id + "-" + currNode.id}
                x1={prevNode.x}
                y1={prevNode.y}
                x2={currNode.x}
                y2={currNode.y}
                stroke="#2bb673"
                strokeWidth={4}
              />
            );
          })}

        {/* ── User position dot ── */}
        {userPosition && (
          <g>
            <circle
              cx={userPosition.x}
              cy={userPosition.y}
              r={12}
              fill="rgba(0,122,255,0.18)"
            />
            <circle
              cx={userPosition.x}
              cy={userPosition.y}
              r={6}
              fill="#007AFF"
              stroke="white"
              strokeWidth={2}
            />
          </g>
        )}
      </svg>
    </div>
  );
};

export default MapLoyola;
