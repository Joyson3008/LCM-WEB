import { MdMap, MdGpsFixed, MdSearch, MdRoute } from "react-icons/md";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-x-hidden">
      {/* 🔝 NAVBAR */}


      {/* 🔥 HERO SECTION */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-purple-800 pt-14 pb-1 px-5 relative overflow-hidden">
        {/* Glow effects */}
        <div className="absolute w-80 h-80 bg-blue-400/20 blur-3xl top-10 left-0" />
        <div className="absolute w-80 h-80 bg-purple-400/20 blur-3xl bottom-0 right-0" />

        <div className="max-w-6xl mx-auto text-white relative z-10">
          <div className="bg-yellow-400/20 text-yellow-300 inline-block px-4 py-1 rounded-full text-xs mb-4">
            Loyola College · Smart Campus System
          </div>

          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Campus Navigation <br />
            <span className="text-blue-300">Reimagined</span>
          </h1>

          <p className="text-gray-200 text-sm md:text-base max-w-2xl mb-6">
            Experience seamless campus exploration with real-time GPS tracking,
            intelligent routing, and interactive maps designed for modern
            students.
          </p>
        </div>
      </div>

      {/* 🔥 MAIN CONTENT WRAPPER (FIXED ALIGNMENT) */}
      <div className="max-w-6xl mx-auto px-5">
        {/* 🚀 FEATURES */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-0">
          <FeatureCard
            icon={<MdMap />}
            title="Interactive Map"
            desc="Visual campus navigation with real-time routes"
            color="from-blue-500 to-blue-700"
          />
          <FeatureCard
            icon={<MdGpsFixed />}
            title="Live Tracking"
            desc="Accurate GPS-based positioning"
            color="from-green-500 to-green-700"
          />
          <FeatureCard
            icon={<MdSearch />}
            title="Smart Search"
            desc="Find buildings instantly"
            color="from-purple-500 to-purple-700"
          />
          <FeatureCard
            icon={<MdRoute />}
            title="AI Routing"
            desc="Optimized shortest path navigation"
            color="from-orange-500 to-orange-700"
          />
        </div>

        {/* 📌 PROJECT OVERVIEW */}
        <SectionCard title="📌 Project Overview">
          This system is designed to solve navigation challenges inside large
          campuses. By combining map visualization, GPS tracking, and
          intelligent pathfinding, it provides a seamless and efficient
          navigation experience.
        </SectionCard>

        {/* ⚙️ TECH STACK */}
        <div className="bg-white rounded-2xl shadow p-6 mt-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">
            ⚙️ Technology Stack
          </h2>

         
        </div>

        {/* 👨‍💻 DEVELOPER */}
        <SectionCard title="👨‍💻 Developer">
          Developed by a Computer Science student passionate about full-stack
          development, real-world problem solving, and building intelligent
          applications.
        </SectionCard>
      </div>

      {/* 🔻 FOOTER */}
      <div className="text-center text-gray-500 text-xs mt-10 pb-6">
        © 2026 Loyola Campus Navigation System
      </div>
    </div>
  );
}

/* 🔥 FEATURE CARD */
function FeatureCard({
  icon,
  title,
  desc,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
      <div
        className={`w-12 h-12 flex items-center justify-center rounded-lg text-white mb-3 bg-gradient-to-r ${color}`}
      >
        {icon}
      </div>

      <h3 className="font-semibold text-gray-800 text-sm mb-1">{title}</h3>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
}

/* 🔥 SECTION CARD */
function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 mt-6 hover:shadow-lg transition">
      <h2 className="text-lg font-bold text-gray-800 mb-3">{title}</h2>
      <p className="text-gray-600 text-sm leading-relaxed">{children}</p>
    </div>
  );
}

export default About;
