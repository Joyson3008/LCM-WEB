import React, { useEffect, useRef, useState } from "react";

type ScreenState = "main" | "requesting" | "success" | "denied";

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f1e4a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: "24px 16px",
  },
  orb: {
    position: "absolute",
    borderRadius: "50%",
    pointerEvents: "none",
  },
  orb1: {
    width: 350,
    height: 350,
    backgroundColor: "rgba(47,70,147,0.4)",
    top: -100,
    left: -100,
  },
  orb2: {
    width: 250,
    height: 250,
    backgroundColor: "rgba(240,165,0,0.15)",
    bottom: -60,
    right: -60,
  },
  orb3: {
    width: 200,
    height: 200,
    backgroundColor: "rgba(47,70,147,0.2)",
    top: "40%",
    right: -80,
  },
  card: {
    width: "min(400px, 93%)",
    backgroundColor: "rgba(255,255,255,0.94)",
    borderRadius: 32,
    border: "1px solid rgba(255,255,255,0.5)",
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
    maxHeight: "93vh",
  },
  hero: {
    backgroundColor: "#0f1e4a",
    paddingTop: 36,
    paddingLeft: 28,
    paddingRight: 28,
    paddingBottom: 28,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  pin: {
    position: "absolute",
    fontSize: 20,
  },
  crest: {
    position: "absolute",
    bottom: 14,
    right: 18,
    color: "rgba(255,255,255,0.2)",
    fontSize: 10,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    margin: 0,
  },
  compassWrap: {
    width: 120,
    height: 120,
    marginBottom: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  pingRing: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: "50%",
    border: "2px solid rgba(240,165,0,0.5)",
  },
  badge: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(240,165,0,0.2)",
    border: "1px solid rgba(240,165,0,0.4)",
    borderRadius: 100,
    paddingLeft: 14,
    paddingRight: 14,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 10,
    gap: 6,
  },
  badgeDot: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    backgroundColor: "#f0c04a",
    flexShrink: 0,
  },
  badgeText: {
    color: "#f0c04a",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: 1,
    margin: 0,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: 900,
    color: "#fff",
    textAlign: "center",
    lineHeight: "1.25",
    letterSpacing: -0.5,
    marginBottom: 8,
    marginTop: 0,
  },
  heroSub: {
    fontSize: 13,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    lineHeight: "1.55",
    margin: 0,
  },
  body: {
    padding: 24,
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 20,
  },
  feat: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 14,
    backgroundColor: "rgba(47,70,147,0.04)",
    border: "1px solid rgba(47,70,147,0.1)",
    borderRadius: 16,
    padding: 14,
  },
  featIcon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: 18,
  },
  featText: {
    flex: 1,
  },
  featTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: "#0f1e4a",
    marginBottom: 2,
    marginTop: 0,
  },
  featDesc: {
    fontSize: 12,
    color: "#6b7280",
    lineHeight: "1.5",
    margin: 0,
  },
  privacy: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(29,158,117,0.06)",
    border: "1px solid rgba(29,158,117,0.15)",
    borderRadius: 12,
    padding: 10,
    marginBottom: 20,
  },
  privacyDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "#1d9e75",
    flexShrink: 0,
  },
  privacyText: {
    flex: 1,
    fontSize: 12,
    color: "#1d9e75",
    fontWeight: 500,
    lineHeight: "1.45",
    margin: 0,
  },
  btnAllow: {
    width: "100%",
    backgroundColor: "#0f1e4a",
    paddingTop: 16,
    paddingBottom: 16,
    borderRadius: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
  },
  btnAllowText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 600,
    letterSpacing: 0.3,
    margin: 0,
  },
  btnSkip: {
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  btnSkipText: {
    color: "#6b7280",
    fontSize: 13,
    margin: 0,
  },
  overlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 32,
    paddingRight: 32,
    paddingTop: 40,
    paddingBottom: 40,
    zIndex: 20,
  },
  overlayIcon: {
    fontSize: 60,
    marginBottom: 16,
    display: "block",
  },
  overlayTitle: {
    fontSize: 22,
    fontWeight: 800,
    color: "#0f1e4a",
    marginBottom: 8,
    marginTop: 0,
    textAlign: "center",
  },
  overlaySub: {
    fontSize: 14,
    color: "#6b7280",
    lineHeight: "1.6",
    textAlign: "center",
    maxWidth: 280,
    margin: 0,
    whiteSpace: "pre-line",
  },
  gpsBarBg: {
    width: 200,
    height: 4,
    backgroundColor: "rgba(47,70,147,0.1)",
    borderRadius: 100,
    overflow: "hidden",
    marginTop: 24,
  },
  gpsBarFill: {
    height: "100%",
    backgroundColor: "#2f4693",
    borderRadius: 100,
    transition: "width 0.1s linear",
  },
  launchText: {
    marginTop: 20,
    fontSize: 13,
    color: "#1d9e75",
    fontWeight: 600,
    letterSpacing: 0.5,
    margin: 0,
  },
  btnRetry: {
    marginTop: 24,
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: "#0f1e4a",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
  },
  btnRetryText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
    margin: 0,
  },
};

const cssAnimations = `
  @keyframes cardIn {
    from { opacity: 0; transform: translateY(60px) scale(0.9); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes ping {
    0%   { transform: scale(0.5); opacity: 0.8; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes bob {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-8px); }
  }
  @keyframes spinCompass {
    to { transform: rotate(360deg); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-20px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  .card-enter { animation: cardIn 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards; }
  .ping1      { animation: ping 2s ease-out infinite; }
  .ping2      { animation: ping 2s ease-out 0.7s infinite; }
  .pin1       { animation: bob 3.2s ease-in-out infinite; }
  .pin2       { animation: bob 2.8s ease-in-out 0.4s infinite; }
  .pin3       { animation: bob 3.6s ease-in-out 0.8s infinite; }
  .pin4       { animation: bob 2.5s ease-in-out 1.2s infinite; }
  .compass-ring { animation: spinCompass 12s linear infinite; transform-origin: 60px 60px; }
  .feat1      { animation: slideIn 0.5s cubic-bezier(0.34,1.3,0.64,1) 0.7s both; }
  .feat2      { animation: slideIn 0.5s cubic-bezier(0.34,1.3,0.64,1) 0.85s both; }
  .feat3      { animation: slideIn 0.5s cubic-bezier(0.34,1.3,0.64,1) 1s both; }
  .privacy-anim { animation: slideIn 0.5s ease 1.1s both; }
  .btn-anim   { animation: slideIn 0.5s ease 1.2s both; }
  .overlay-anim { animation: fadeIn 0.3s ease; }
  .btn-allow:hover { opacity: 0.9; }
  .btn-allow:active { transform: scale(0.97); }
  .btn-retry:hover  { opacity: 0.9; }
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
      // permissions API not supported — fall through to getCurrentPosition
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
      <style>{cssAnimations}</style>

      <div style={styles.container}>
        {/* Orbs */}
        <div style={{ ...styles.orb, ...styles.orb1 }} />
        <div style={{ ...styles.orb, ...styles.orb2 }} />
        <div style={{ ...styles.orb, ...styles.orb3 }} />

        {/* Card */}
        <div className="card-enter" style={styles.card}>
          {/* Hero */}
          <div style={styles.hero}>
            {/* Floating pins */}
            <span className="pin1" style={{ ...styles.pin, top: 18, left: 28 }}>
              📍
            </span>
            <span
              className="pin2"
              style={{ ...styles.pin, top: 30, right: 24 }}
            >
              🏛️
            </span>
            <span
              className="pin3"
              style={{ ...styles.pin, bottom: 20, left: 20 }}
            >
              🗺️
            </span>
            <span
              className="pin4"
              style={{ ...styles.pin, bottom: 16, right: 32 }}
            >
              📡
            </span>

            <p style={styles.crest}>Est. 1925</p>

            {/* Compass */}
            <div style={styles.compassWrap}>
              <div className="ping1" style={styles.pingRing} />
              <div className="ping2" style={styles.pingRing} />
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
                  className="compass-ring"
                  cx={60}
                  cy={60}
                  r={54}
                  fill="none"
                  stroke="rgba(240,165,0,0.6)"
                  strokeWidth={1.5}
                  strokeDasharray="8 6"
                />
                {/* Rose petals */}
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
                {/* Center */}
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

            {/* Badge */}
            <div style={styles.badge}>
              <div style={styles.badgeDot} />
              <p style={styles.badgeText}>Loyola College · Chennai</p>
            </div>

            <h1 style={styles.heroTitle}>
              Campus Navigation
              <br />
              System
            </h1>
            <p style={styles.heroSub}>
              Real-time indoor &amp; outdoor wayfinding
              <br />
              across all 60+ buildings
            </p>
          </div>

          {/* Body */}
          <div style={styles.body}>
            {/* Features */}
            <div style={styles.features}>
              <div className="feat1" style={styles.feat}>
                <div
                  style={{
                    ...styles.featIcon,
                    backgroundColor: "rgba(47,70,147,0.12)",
                  }}
                >
                  📍
                </div>
                <div style={styles.featText}>
                  <p style={styles.featTitle}>Live GPS Positioning</p>
                  <p style={styles.featDesc}>
                    See your exact location on the campus map in real time
                  </p>
                </div>
              </div>

              <div className="feat2" style={styles.feat}>
                <div
                  style={{
                    ...styles.featIcon,
                    backgroundColor: "rgba(240,165,0,0.12)",
                  }}
                >
                  🧭
                </div>
                <div style={styles.featText}>
                  <p style={styles.featTitle}>Turn-by-Turn Directions</p>
                  <p style={styles.featDesc}>
                    Smart routing between any two buildings on campus
                  </p>
                </div>
              </div>

              <div className="feat3" style={styles.feat}>
                <div
                  style={{
                    ...styles.featIcon,
                    backgroundColor: "rgba(29,158,117,0.12)",
                  }}
                >
                  🏛️
                </div>
                <div style={styles.featText}>
                  <p style={styles.featTitle}>60+ Buildings Mapped</p>
                  <p style={styles.featDesc}>
                    Detailed floor plans, departments &amp; facilities
                  </p>
                </div>
              </div>
            </div>

            {/* Privacy */}
            <div className="privacy-anim" style={styles.privacy}>
              <div style={styles.privacyDot} />
              <p style={styles.privacyText}>
                Your location is used only within the app &amp; never stored on
                our servers
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="btn-anim">
              <button
                className="btn-allow"
                style={styles.btnAllow}
                onClick={requestLocation}
              >
                <span style={styles.btnAllowText}>Enable Location Access</span>
              </button>
              <button style={styles.btnSkip} onClick={skipLocation}>
                <span style={styles.btnSkipText}>
                  Continue without location
                </span>
              </button>
            </div>
          </div>

          {/* Requesting overlay */}
          {screen === "requesting" && (
            <div className="overlay-anim" style={styles.overlay}>
              <span style={styles.overlayIcon}>📡</span>
              <h2 style={styles.overlayTitle}>Acquiring Signal</h2>
              <p style={styles.overlaySub}>
                Connecting to GPS satellites. Please allow location access when
                prompted.
              </p>
              <div style={styles.gpsBarBg}>
                <div
                  style={{ ...styles.gpsBarFill, width: `${gpsBarWidth}%` }}
                />
              </div>
            </div>
          )}

          {/* Success overlay */}
          {screen === "success" && (
            <div className="overlay-anim" style={styles.overlay}>
              <span style={styles.overlayIcon}>✅</span>
              <h2 style={styles.overlayTitle}>Location Locked!</h2>
              <p style={styles.overlaySub}>
                You're all set. Loading the Loyola campus map with your live
                position.
              </p>
              <p style={{ ...styles.launchText, marginTop: 20 }}>
                LAUNCHING MAP...
              </p>
            </div>
          )}

          {/* Denied overlay */}
          {screen === "denied" && (
            <div className="overlay-anim" style={styles.overlay}>
              <span style={styles.overlayIcon}>🔒</span>
              <h2 style={styles.overlayTitle}>Location Blocked</h2>
              <p style={styles.overlaySub}>
                {`You've denied location access. You can still explore the map manually, but live tracking won't be available.\n\nTo enable later, open your device settings and allow location for this app.`}
              </p>
              <button
                className="btn-retry"
                style={styles.btnRetry}
                onClick={skipLocation}
              >
                <span style={styles.btnRetryText}>Continue to Map →</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
