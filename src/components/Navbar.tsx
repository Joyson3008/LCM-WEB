import { useNavigate, useLocation } from "react-router-dom";
import { MdMap, MdInfo, MdApartment } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full bg-blue-950 text-white pb-6 shadow-xl">
      {/* ── Top badge ── */}
      <div className="px-5 pt-4">
        <div className="inline-flex items-center gap-1.5 bg-yellow-400/20 border border-yellow-400/40 rounded-full px-3.5 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 shrink-0" />
          <span className="text-yellow-300 text-[11px] font-semibold tracking-wide">
            Loyola College · Chennai · Est. 1925
          </span>
        </div>
      </div>

      {/* ── Title block ── */}
      <div className="px-5 mt-3">
        <h1 className="text-2xl font-black tracking-tight mb-0.5 mt-0">
          Campus Navigation
        </h1>
        <p className="text-sm text-blue-200 m-0">
          Explore every building, department &amp; facility
        </p>
      </div>

      {/* ── Nav cards ── */}
      <div className="px-5 mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <NavCard
          title="Map View"
          desc="Interactive campus map"
          icon={<MdMap />}
          iconBg="bg-yellow-400"
          active={location.pathname === "/"}
          onClick={() => navigate("/")}
        />

        <NavCard
          title="Buildings"
          desc="Explore all buildings"
          icon={<MdApartment />}
          iconBg="bg-purple-400"
          active={location.pathname === "/buildings"}
          onClick={() => navigate("/buildings")}
        />

        <NavCard
          title="About"
          desc="Project details"
          icon={<MdInfo />}
          iconBg="bg-emerald-400"
          active={location.pathname === "/about"}
          onClick={() => navigate("/about")}
        />
      </div>
    </div>
  );
}

/* ── NavCard ── */
function NavCard({
  title,
  desc,
  icon,
  iconBg,
  active,
  onClick,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  iconBg: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`
        cursor-pointer rounded-2xl p-4
        border border-white/20
        backdrop-blur-md
        transition-all duration-200
        ${
          active
            ? "bg-white/20 shadow-lg scale-[1.02]"
            : "bg-white/10 hover:bg-white/20 hover:scale-[1.02]"
        }
      `}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div
          className={`
            w-10 h-10 flex items-center justify-center
            rounded-xl text-white text-xl shadow-md shrink-0
            ${iconBg}
          `}
        >
          {icon}
        </div>

        {/* Text */}
        <div>
          <h2 className="font-semibold text-sm text-white m-0 mb-0.5">
            {title}
          </h2>
          <p className="text-xs text-blue-200 m-0">{desc}</p>
        </div>
      </div>

      {/* Active indicator */}
      {active && (
        <div className="mt-3 h-0.5 w-full bg-yellow-400/70 rounded-full" />
      )}
    </div>
  );
}

export default Navbar;
