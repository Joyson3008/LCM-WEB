import { useNavigate, useLocation } from "react-router-dom";
import { MdMap, MdInfo, MdApartment } from "react-icons/md";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white pb-6 shadow-xl">
      {/* 🔝 TOP LABEL */}
      <div className="px-5 pt-4">
        <span className="text-xs bg-yellow-400/20 text-yellow-300 px-3 py-1 rounded-full font-semibold tracking-wide">
          Loyola College · Chennai · Est. 1925
        </span>
      </div>

      {/* 🏫 TITLE */}
      <div className="px-5 mt-3">
        <h1 className="text-2xl font-bold">Campus Navigation</h1>
        <p className="text-sm text-blue-200">
          Explore every building, department & facility
        </p>
      </div>

      {/* 🔥 NAV CARDS */}
      <div className="px-5 mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 🗺️ MAP */}
        <NavCard
          title="Map View"
          desc="Interactive campus map"
          icon={<MdMap />}
          color="bg-yellow-400"
          active={location.pathname === "/"}
          onClick={() => navigate("/")}
        />

        {/* 🏢 BUILDINGS */}
        <NavCard
          title="Buildings"
          desc="Explore all buildings"
          icon={<MdApartment />}
          color="bg-purple-400"
          active={location.pathname === "/buildings"}
          onClick={() => navigate("/buildings")}
        />

        {/* ℹ️ ABOUT */}
        <NavCard
          title="About"
          desc="Project details"
          icon={<MdInfo />}
          color="bg-green-400"
          active={location.pathname === "/about"}
          onClick={() => navigate("/about")}
        />
      </div>
    </div>
  );
}

/* 🔥 NAV CARD COMPONENT */
function NavCard({
  title,
  desc,
  icon,
  color,
  active,
  onClick,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-2xl p-4 border border-white/20 backdrop-blur-md transition duration-300 ${
        active
          ? "bg-white/20 shadow-lg scale-[1.02]"
          : "bg-white/10 hover:bg-white/20 hover:scale-[1.02]"
      }`}
    >
      <div className="flex items-center gap-3">
        {/* ICON */}
        <div
          className={`w-10 h-10 flex items-center justify-center rounded-xl text-white text-lg shadow-md ${color}`}
        >
          {icon}
        </div>

        {/* TEXT */}
        <div>
          <h2 className="font-semibold text-sm">{title}</h2>
          <p className="text-xs text-blue-200">{desc}</p>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
 