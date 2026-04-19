import { useEffect, useRef, useState } from "react";

type ScreenState = "main" | "requesting" | "success" | "denied";

const pingKeyframes = `
  @keyframes ping-ring {
    0%   { transform: scale(0.5); opacity: 0.8; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-8px); }
  }
  @keyframes spin-compass {
    to { transform: rotate(360deg); transform-origin: 60px 60px; }
  }
  @keyframes card-in {
    from { opacity: 0; transform: translateY(60px) scale(0.9); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes slide-in {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fade-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .animate-card-in   { animation: card-in 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .animate-ping-1    { animation: ping-ring 2s ease-out infinite; }
  .animate-ping-2    { animation: ping-ring 2s ease-out 0.7s infinite; }
  .animate-bob-1     { animation: bob 3.2s ease-in-out infinite; }
  .animate-bob-2     { animation: bob 2.8s ease-in-out 0.4s infinite; }
  .animate-bob-3     { animation: bob 3.6s ease-in-out 0.8s infinite; }
  .animate-bob-4     { animation: bob 2.5s ease-in-out 1.2s infinite; }
  .animate-compass   { animation: spin-compass 12s linear infinite; transform-origin: 60px 60px; }
  .animate-feat-1    { animation: slide-in 0.5s cubic-bezier(0.34,1.3,0.64,1) 0.7s both; }
  .animate-feat-2    { animation: slide-in 0.5s cubic-bezier(0.34,1.3,0.64,1) 0.85s both; }
  .animate-feat-3    { animation: slide-in 0.5s cubic-bezier(0.34,1.3,0.64,1) 1s both; }
  .animate-privacy   { animation: slide-in 0.5s ease 1.1s both; }
  .animate-btn       { animation: slide-in 0.5s ease 1.2s both; }
  .animate-overlay   { animation: fade-in 0.3s ease; }
`;

export default function LocationPermissionScreen() {
  const [screen, setScreen] = useState<ScreenState>("main");
  const [gpsBarWidth, setGpsBarWidth] = useState(0);
  const gpsIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (gpsIntervalRef.current) clearInterval(gpsIntervalRef.current);
    };
  }, []);

  const requestLocation = async () => {
    setScreen("requesting");
    setGpsBarWidth(0);

    gpsIntervalRef.current = setInterval(() => {
      setGpsBarWidth((prev) => {
        if (prev >= 95) {
          clearInterval(gpsIntervalRef.current!);
          return prev;
        }
        return prev + 1.5;
      });
    }, 33);

    try {
      const result = await navigator.permissions.query({ name: "geolocation" });
      if (result.state === "denied") {
        clearInterval(gpsIntervalRef.current!);
        setScreen("denied");
        return;
      }
    } catch {
      // permissions API not supported
    }

    navigator.geolocation.getCurrentPosition(
      () => {
        if (gpsIntervalRef.current) clearInterval(gpsIntervalRef.current);
        setScreen("success");
        setTimeout(() => {
          window.location.href = "/home";
        }, 2000);
      },
      () => {
        if (gpsIntervalRef.current) clearInterval(gpsIntervalRef.current);
        setScreen("denied");
      },
      { timeout: 10000 },
    );
  };

  const skipLocation = () => {
    window.location.href = "/home";
  };

  return (
    <>
      <style>{pingKeyframes}</style>

      {/* Page background */}

      <div className="min-h-[90vh] bg-blue-950 flex items-center justify-center relative overflow-hidden px-4 py-6">
        {/* Background orbs */}
        <div className="absolute w-80 h-80 rounded-full bg-blue-800/40 -top-24 -left-24 pointer-events-none" />
        <div className="absolute w-64 h-64 rounded-full bg-yellow-400/15 -bottom-16 -right-16 pointer-events-none" />
        <div className="absolute w-48 h-48 rounded-full bg-blue-800/20 top-1/2 -right-20 pointer-events-none" />

        {/* Card */}
       <div className="animate-card-in w-full max-w-sm bg-white/95 rounded-3xl border border-white/50 overflow-visible relative z-10">
          <div className="bg-blue-950 pt-9 px-7 pb-7 flex flex-col items-center relative overflow-hidden">
            {/* Floating pin decorations */}
            <span className="animate-bob-1 absolute top-4 left-7 text-xl">
              📍
            </span>
            <span className="animate-bob-2 absolute top-7 right-6 text-xl">
              🏛️
            </span>
            <span className="animate-bob-3 absolute bottom-5 left-5 text-xl">
              🗺️
            </span>
            <span className="animate-bob-4 absolute bottom-4 right-8 text-xl">
              📡
            </span>

            {/* Est label bottom-right */}
            <p className="absolute bottom-3 right-4 text-white/20 text-[10px] tracking-widest uppercase m-0">
              Est. 1925
            </p>

            {/* Compass graphic */}
            <div className="w-28 h-28 mb-5 flex items-center justify-center relative">
              {/* Ping rings */}
              <div className="animate-ping-1 absolute w-28 h-28 rounded-full border-2 border-yellow-400/50" />
              <div className="animate-ping-2 absolute w-28 h-28 rounded-full border-2 border-yellow-400/50" />

              <svg width={120} height={120} viewBox="0 0 120 120">
                <circle
                  cx={60}
                  cy={60}
                  r={54}
                  fill="none"
                  stroke="rgba(240,165,0,0.3)"
                  strokeWidth={1.5}
                />
                <circle
                  cx={60}
                  cy={60}
                  r={40}
                  fill="rgba(15,30,74,0.6)"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth={1}
                />
                <circle
                  className="animate-compass"
                  cx={60}
                  cy={60}
                  r={54}
                  fill="none"
                  stroke="rgba(240,165,0,0.6)"
                  strokeWidth={1.5}
                  strokeDasharray="8 6"
                />
                {/* N/S/E/W petals */}
                <polygon
                  points="60,22 56,52 60,54 64,52"
                  fill="rgba(240,165,0,0.9)"
                />
                <polygon
                  points="60,98 56,68 60,66 64,68"
                  fill="rgba(255,255,255,0.4)"
                />
                <polygon
                  points="22,60 52,56 54,60 52,64"
                  fill="rgba(255,255,255,0.4)"
                />
                <polygon
                  points="98,60 68,56 66,60 68,64"
                  fill="rgba(255,255,255,0.4)"
                />
                {/* Centre dot */}
                <circle cx={60} cy={60} r={6} fill="rgba(240,165,0,1)" />
                <circle cx={60} cy={60} r={3} fill="#fff" />
                <text
                  x={60}
                  y={17}
                  fill="rgba(240,165,0,0.9)"
                  fontSize={9}
                  fontWeight={700}
                  textAnchor="middle"
                >
                  N
                </text>
              </svg>
            </div>

            {/* College badge */}
            <div className="flex items-center gap-1.5 bg-yellow-400/20 border border-yellow-400/40 rounded-full px-3.5 py-1 mb-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-300 shrink-0" />
              <span className="text-yellow-300 text-[11px] font-semibold tracking-wide">
                Loyola College · Chennai
              </span>
            </div>

            <h1 className="text-[26px] font-black text-white text-center leading-tight tracking-tight mb-2 mt-0">
              Campus Navigation
              <br />
              System
            </h1>
            <p className="text-[13px] text-blue-200 text-center leading-relaxed m-0">
              Real-time indoor &amp; outdoor wayfinding
              <br />
              across all 60+ buildings
            </p>
          </div>

          {/* ── Body section ── */}
          <div className="p-6">
            {/* Feature cards */}
            <div className="flex flex-col gap-3 mb-5">
              <div className="animate-feat-1 flex items-start gap-3.5 bg-blue-950/5 border border-blue-950/10 rounded-2xl p-3.5">
                <div className="w-11 h-11 rounded-xl bg-blue-950/10 flex items-center justify-center shrink-0 text-lg">
                  📍
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-950 mb-0.5 mt-0">
                    Live GPS Positioning
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed m-0">
                    See your exact location on the campus map in real time
                  </p>
                </div>
              </div>

              <div className="animate-feat-2 flex items-start gap-3.5 bg-blue-950/5 border border-blue-950/10 rounded-2xl p-3.5">
                <div className="w-11 h-11 rounded-xl bg-yellow-400/15 flex items-center justify-center shrink-0 text-lg">
                  🧭
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-950 mb-0.5 mt-0">
                    Turn-by-Turn Directions
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed m-0">
                    Smart routing between any two buildings on campus
                  </p>
                </div>
              </div>

              <div className="animate-feat-3 flex items-start gap-3.5 bg-blue-950/5 border border-blue-950/10 rounded-2xl p-3.5">
                <div className="w-11 h-11 rounded-xl bg-emerald-600/10 flex items-center justify-center shrink-0 text-lg">
                  🏛️
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-blue-950 mb-0.5 mt-0">
                    60+ Buildings Mapped
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed m-0">
                    Detailed floor plans, departments &amp; facilities
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy note */}
            <div className="animate-privacy flex items-center gap-2 bg-emerald-600/6 border border-emerald-600/15 rounded-xl p-2.5 mb-5">
              <div className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
              <p className="flex-1 text-xs text-emerald-700 font-medium leading-snug m-0">
                Your location is used only within the app &amp; never stored on
                our servers
              </p>
            </div>

            {/* CTA buttons */}
            <div className="animate-btn">
              <button
                onClick={requestLocation}
                className="w-full bg-blue-950 text-white py-4 rounded-[18px] text-base font-semibold tracking-wide border-none cursor-pointer transition-all duration-150 hover:opacity-90 active:scale-[0.97]"
              >
                Enable Location Access
              </button>
              <button
                onClick={skipLocation}
                className="w-full py-3 mt-1.5 flex items-center justify-center bg-transparent border-none cursor-pointer"
              >
                <span className="text-gray-400 text-sm">
                  Continue without location
                </span>
              </button>
            </div>
          </div>

          {/* ── Requesting overlay ── */}
          {screen === "requesting" && (
            <div className="animate-overlay absolute inset-0 bg-white/96 rounded-3xl flex flex-col items-center justify-center px-8 py-10 z-20">
              <span className="text-6xl mb-4 block">📡</span>
              <h2 className="text-[22px] font-extrabold text-blue-950 mb-2 mt-0 text-center">
                Acquiring Signal
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed text-center max-w-[280px] m-0">
                Connecting to GPS satellites. Please allow location access when
                prompted.
              </p>
              <div className="w-48 h-1 bg-blue-950/10 rounded-full overflow-hidden mt-6">
                <div
                  className="h-full bg-blue-950 rounded-full transition-all duration-100 ease-linear"
                  style={{ width: `${gpsBarWidth}%` }}
                />
              </div>
            </div>
          )}

          {/* ── Success overlay ── */}
          {screen === "success" && (
            <div className="animate-overlay absolute inset-0 bg-white/96 rounded-3xl flex flex-col items-center justify-center px-8 py-10 z-20">
              <span className="text-6xl mb-4 block">✅</span>
              <h2 className="text-[22px] font-extrabold text-blue-950 mb-2 mt-0 text-center">
                Location Locked!
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed text-center max-w-[280px] m-0">
                You're all set. Loading the Loyola campus map with your live
                position.
              </p>
              <p className="mt-5 text-[13px] text-emerald-600 font-semibold tracking-wide">
                LAUNCHING MAP...
              </p>
            </div>
          )}

          {/* ── Denied overlay ── */}
          {screen === "denied" && (
            <div className="animate-overlay absolute inset-0 bg-white/96 rounded-3xl flex flex-col items-center justify-center px-8 py-10 z-20">
              <span className="text-6xl mb-4 block">🔒</span>
              <h2 className="text-[22px] font-extrabold text-blue-950 mb-2 mt-0 text-center">
                Location Blocked
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed text-center max-w-[280px] m-0 whitespace-pre-line">
                {`You've denied location access. You can still explore the map manually, but live tracking won't be available.\n\nTo enable later, open your device settings and allow location for this app.`}
              </p>
              <button
                onClick={skipLocation}
                className="mt-6 px-7 py-3 bg-blue-950 text-white text-sm font-semibold rounded-[14px] border-none cursor-pointer transition-opacity hover:opacity-90"
              >
                Continue to Map →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
