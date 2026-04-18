// utils/pathfinding.ts

import { NAV_EDGES } from "../data/navigationEdges";
import { NAV_NODES } from "../data/navigationNodes";

type NodeId = keyof typeof NAV_NODES;

type Graph = Record<string, { to: string; cost: number }[]>;

/* ✅ Euclidean distance (perfect for SVG coordinates) */
function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/* ✅ Build weighted graph from nodes + edges */
function buildGraph(): Graph {
  const graph: Graph = {};

  for (const edge of NAV_EDGES) {
    const fromNode = NAV_NODES[edge.from];
    const toNode = NAV_NODES[edge.to];

    if (!fromNode || !toNode) continue;

    const cost = distance(fromNode, toNode);

    if (!graph[edge.from]) graph[edge.from] = [];
    if (!graph[edge.to]) graph[edge.to] = [];

    /* ✅ Undirected graph (roads work both ways) */
    graph[edge.from].push({ to: edge.to, cost });
    graph[edge.to].push({ to: edge.from, cost });
  }

  return graph;
}

/* ✅ Core Dijkstra Algorithm */
export function findShortestPath(start: NodeId, end: NodeId) {
  const graph = buildGraph();

  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const unvisited = new Set<string>();

  for (const nodeId in NAV_NODES) {
    distances[nodeId] = Infinity;
    previous[nodeId] = null;
    unvisited.add(nodeId);
  }

  distances[start] = 0;

  while (unvisited.size > 0) {
    /* ✅ Pick node with smallest distance */
    let current: string | null = null;

    for (const node of unvisited) {
      if (!current || distances[node] < distances[current]) {
        current = node;
      }
    }

    if (!current) break;
    if (current === end) break;

    unvisited.delete(current);

    const neighbors = graph[current] || [];

    for (const neighbor of neighbors) {
      const alt = distances[current] + neighbor.cost;

      if (alt < distances[neighbor.to]) {
        distances[neighbor.to] = alt;
        previous[neighbor.to] = current;
      }
    }
  }

  /* ✅ Reconstruct path */
  const path: string[] = [];
  let current: string | null = end;

  while (current) {
    path.unshift(current);
    current = previous[current];
  }

  return path;
}
