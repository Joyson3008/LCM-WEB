import { NAV_NODES } from "./navigationNodes";

export function findNearestNode(x: number, y: number): string | null {
  let nearestNodeId: string | null = null;
  let minDistance = Infinity;

  Object.values(NAV_NODES).forEach((node) => {
    const dx = node.x - x;
    const dy = node.y - y;

    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDistance) {
      minDistance = distance;
      nearestNodeId = node.id;
    }
  });

  return nearestNodeId;
}
