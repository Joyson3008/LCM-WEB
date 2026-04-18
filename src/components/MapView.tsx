import { NAV_NODES } from "../data/navigationNodes";

type Props = {
  path: string[];
};

export default function MapView({ path }: Props) {
  const points = path.map((id) => NAV_NODES[id]).filter(Boolean);

  return (
    <div className="flex justify-center mt-6">
      <svg
        viewBox="0 0 300 300"
        className="w-[700px] h-[500px] bg-white border rounded-xl"
      >
        {/* 🗺️ BACKGROUND MAP IMAGE */}
        <image
          href="/map.png" // 👉 put map image in public folder
          x="0"
          y="0"
          width="300"
          height="300"
        />

        {/* 🔵 DRAW PATH */}
        {points.map((p, i) => {
          if (i === points.length - 1) return null;
          const next = points[i + 1];

          return (
            <line
              key={i}
              x1={p.x}
              y1={p.y}
              x2={next.x}
              y2={next.y}
              stroke="blue"
              strokeWidth="2"
            />
          );
        })}

        {/* 🔴 NODES */}
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3" fill="red" />
        ))}
      </svg>
    </div>
  );
}
