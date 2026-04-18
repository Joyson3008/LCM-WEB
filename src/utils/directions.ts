import { NAV_NODES } from "../data/navigationNodes";

/* ⭐ Direction Step Type */
export type DirectionStep = {
  text: string;
  from: string;
  to: string;
  distance: number;
};

/* ⭐ Angle Helper */
function getAngle(ax: number, ay: number, bx: number, by: number) {
  return Math.atan2(by - ay, bx - ax) * (180 / Math.PI);
}

/* ⭐ Distance Helper */
function getDistance(ax: number, ay: number, bx: number, by: number) {
  return Math.hypot(bx - ax, by - ay);
}

/* ⭐ Turn Logic */
function getTurnInstruction(prevAngle: number, nextAngle: number) {
  let diff = nextAngle - prevAngle;

  // normalize (-180 → 180)
  diff = ((diff + 540) % 360) - 180;

  if (Math.abs(diff) < 20) return "straight";

  if (diff > 0) return "right";

  return "left";
}

/* 🚀 MAIN SMART NAVIGATION ENGINE */
export function buildDirections(path: string[]): DirectionStep[] {
  if (path.length < 2) return [];

  const steps: DirectionStep[] = [];

  let prevAngle: number | null = null;
  let straightDistance = 0;
  let straightStart = path[0];

  for (let i = 0; i < path.length - 1; i++) {
    const fromNode = NAV_NODES[path[i]];
    const toNode = NAV_NODES[path[i + 1]];

    if (!fromNode || !toNode) continue;

    const angle = getAngle(fromNode.x, fromNode.y, toNode.x, toNode.y);
    const distance = getDistance(fromNode.x, fromNode.y, toNode.x, toNode.y);

    if (prevAngle === null) {
      straightDistance += distance;
    } else {
      const turn = getTurnInstruction(prevAngle, angle);

      if (turn === "straight") {
        straightDistance += distance;
      } else {
        // flush straight distance
        steps.push({
          text: `Go straight for ${Math.round(straightDistance)} meters`,
          from: straightStart,
          to: fromNode.id,
          distance: straightDistance,
        });

        // add turn step
        steps.push({
          text: `Turn ${turn} and continue`,
          from: fromNode.id,
          to: toNode.id,
          distance: distance,
        });

        straightDistance = distance;
        straightStart = fromNode.id;
      }
    }

    prevAngle = angle;
  }

  // flush remaining straight
  if (straightDistance > 0) {
    steps.push({
      text: `Go straight for ${Math.round(straightDistance)} meters`,
      from: straightStart,
      to: path[path.length - 1],
      distance: straightDistance,
    });
  }

  /* ⭐ Destination */
  steps.push({
    text: "You have arrived at your destination",
    from: path[path.length - 2],
    to: path[path.length - 1],
    distance: 0,
  });

  return steps;
}
