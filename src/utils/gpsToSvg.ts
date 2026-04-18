import { MAP_BOUNDS } from "./mapBounds";

const MAP_WIDTH = 412;   // MUST match SVG viewBox
const MAP_HEIGHT = 690;  // MUST match SVG viewBox

export function gpsToSvg(lat: number, lon: number) {
  // Normalize longitude → X
  const x =
    ((lon - MAP_BOUNDS.topLeft.lon) /
      (MAP_BOUNDS.bottomRight.lon - MAP_BOUNDS.topLeft.lon)) *
    MAP_WIDTH;

  // Normalize latitude → Y (inverted)
  const y =
    ((MAP_BOUNDS.topLeft.lat - lat) /
      (MAP_BOUNDS.topLeft.lat - MAP_BOUNDS.bottomRight.lat)) *
    MAP_HEIGHT;

  return { x, y };
}
