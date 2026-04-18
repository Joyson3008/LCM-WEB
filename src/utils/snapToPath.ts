type Point = { x: number; y: number };

export function snapToPath(
  user: Point,
  pathPoints: Point[],
  threshold = 15,
): Point {
  let closestPoint: Point | null = null;
  let minDistance = Infinity;

  for (let i = 0; i < pathPoints.length - 1; i++) {
    const a = pathPoints[i];
    const b = pathPoints[i + 1];

    const abx = b.x - a.x;
    const aby = b.y - a.y;

    const apx = user.x - a.x;
    const apy = user.y - a.y;

    const abLengthSq = abx * abx + aby * aby;

    const t = Math.max(0, Math.min(1, (apx * abx + apy * aby) / abLengthSq));

    const projX = a.x + abx * t;
    const projY = a.y + aby * t;

    const dx = user.x - projX;
    const dy = user.y - projY;

    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < minDistance) {
      minDistance = dist;
      closestPoint = { x: projX, y: projY };
    }
  }

  if (closestPoint && minDistance < threshold) {
    return closestPoint;
  }

  return user;
}
