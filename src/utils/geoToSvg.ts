// STEP 6A: Campus GPS boundary
const CAMPUS = {
  topLeft: { lat: 13.06637905150759, lon: 80.23165765644175 },
  bottomRight: { lat: 13.057871875736884, lon: 80.23773837639881 },
};

// STEP 6B: Convert GPS → SVG coordinates
export function geoToSvg(
  lat: number,
  lon: number,
  mapWidth: number,
  mapHeight: number,
) {
  // Total GPS span of campus
  const latRange = CAMPUS.topLeft.lat - CAMPUS.bottomRight.lat;
  const lonRange = CAMPUS.bottomRight.lon - CAMPUS.topLeft.lon;

  // Convert longitude → X
  const x = ((lon - CAMPUS.topLeft.lon) / lonRange) * mapWidth;

  // Convert latitude → Y (top-down)
  const y = ((CAMPUS.topLeft.lat - lat) / latRange) * mapHeight;

  return { x, y };
}
