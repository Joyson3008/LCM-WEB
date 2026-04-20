import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiX,
  FiStar,
  FiChevronDown,
  FiChevronUp,
  FiNavigation,
  FiLayers,
  FiArrowUp,
  FiZoomIn,
} from "react-icons/fi";
import {
  MdSchool,
  MdBusiness,
  MdSportsSoccer,
  MdHotel,
  MdRestaurant,
  MdMiscellaneousServices,
  MdChurch,
  MdSearchOff,
} from "react-icons/md";
import { BUILDINGS } from "../data/buildings";
import type { Building } from "../data/buildings";

type Category =
  | "all"
  | "academic"
  | "admin"
  | "sports"
  | "hostel"
  | "canteen"
  | "services"
  | "worship";
type SortMode = "priority" | "alpha" | "floors";

const CATEGORY_META: Record<
  Exclude<Category, "all">,
  { label: string; icon: React.ReactNode; color: string; bg: string }
> = {
  academic: {
    label: "Academic",
    icon: <MdSchool />,
    color: "#2f4693",
    bg: "rgba(47,70,147,0.1)",
  },
  admin: {
    label: "Admin",
    icon: <MdBusiness />,
    color: "#1a2744",
    bg: "rgba(26,39,68,0.1)",
  },
  sports: {
    label: "Sports",
    icon: <MdSportsSoccer />,
    color: "#1d9e75",
    bg: "rgba(29,158,117,0.1)",
  },
  hostel: {
    label: "Hostel",
    icon: <MdHotel />,
    color: "#7952b3",
    bg: "rgba(121,82,179,0.1)",
  },
  canteen: {
    label: "Food",
    icon: <MdRestaurant />,
    color: "#d97706",
    bg: "rgba(217,119,6,0.1)",
  },
  services: {
    label: "Services",
    icon: <MdMiscellaneousServices />,
    color: "#0891b2",
    bg: "rgba(8,145,178,0.1)",
  },
  worship: {
    label: "Worship",
    icon: <MdChurch />,
    color: "#c9943a",
    bg: "rgba(201,148,58,0.1)",
  },
};

const BUILDING_CATEGORY: Record<string, Exclude<Category, "all">> = {
  main: "academic",
  chemistry: "academic",
  library: "academic",
  Administration: "admin",
  "Licet hostel": "hostel",
  Jub_mess: "canteen",
  "Centenary building": "academic",
  "Jesuit's building": "services",
  "data-science": "academic",
  "bank-post": "services",
  "commerce-economics": "academic",
  "B.Ed college building": "academic",
  "liba-building": "academic",
  "Women's Hostel building": "hostel",
  "Eat Right Canteen": "canteen",
  "Club building": "services",
  "Men's Hostel building": "hostel",
  "Parking ": "services",
  "Jesuit Residence": "services",
  "Cricket ground": "sports",
  "Football ground(Main)": "sports",
  "Loyola church": "worship",
  "Church of St. Joseph the Worker": "worship",
  Licet: "academic",
  "Loyola hoste(main gate)": "hostel",
  "Sauliere hall": "services",
  "Loyola hostel(veg mess)": "canteen",
  "Loyola hostel(non veg mess)": "canteen",
  "Loyola hostel( metro mess)": "canteen",
  "Shop@1925": "services",
  WCR: "services",
  "eat@1925": "canteen",
  "centenary park": "services",
  "LIBA park (Arts Gallery)": "services",
  "viscom building": "academic",
  "Jubilee building": "academic",
  "LIBA Hostel building": "hostel",
  "Old LIBA": "academic",
  "Entomology Research Building": "academic",
  "Berchmans Illam": "hostel",
  "Sports building": "sports",
  "Parking(LIBA)": "services",
  Gallery: "services",
  "LICET CANTEEN": "canteen",
  "Loho Administrative": "admin",
  "Teakwood Garden": "services",
  "Inigo Kiosk": "services",
  "LIBA Canteen": "canteen",
  "Basketball - Volleyball court": "sports",
  "LCS-SIGA PRESS": "services",
  "Loyola Statue": "services",
  "Loyola Science Building": "academic",
  "LIBA Entrance Gate": "services",
  "Loyola College Main Gate": "services",
  "Railway Gate": "services",
  "Tennis Courts": "sports",
  "Hockey Ground": "sports",
  "Football ground(licet)": "sports",
  "Football ground(BE.d)": "sports",
  "RestRoom(Mens)": "services",
  "RestRoom(Women)": "services",
  "Loyola College Exit Gate": "services",
};

const PRIORITY_IDS = [
  "Loyola church",
  "main",
  "Jubilee building",
  "commerce-economics",
  "data-science",
  "Administration",
  "viscom building",
  "chemistry",
  "library",
  "Centenary building",
  "liba-building",
  "Licet",
  "B.Ed college building",
  "Loyola Statue",
  "Sauliere hall",
  "Jesuit's building",
  "centenary park",
];

// ─── Image Preview Modal ──────────────────────────────────────────────────────
const ImagePreviewModal = ({
  images,
  initialIndex,
  onClose,
}: {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}) => {
  const [idx, setIdx] = useState(initialIndex);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight")
        setIdx((i) => Math.min(i + 1, images.length - 1));
      if (e.key === "ArrowLeft") setIdx((i) => Math.max(i - 1, 0));
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [images.length, onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.93)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 16,
        padding: 20,
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
          border: "none",
          color: "#fff",
          fontSize: 18,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        ✕
      </button>

      <img
        src={images[idx]}
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw",
          maxHeight: "72vh",
          objectFit: "contain",
          borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
        }}
      />

      {images.length > 1 && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => setIdx(i)}
              style={{
                width: 56,
                height: 40,
                objectFit: "cover",
                borderRadius: 8,
                cursor: "pointer",
                border: i === idx ? "2px solid #fff" : "2px solid transparent",
                opacity: i === idx ? 1 : 0.5,
                transition: "all 0.15s",
              }}
            />
          ))}
        </div>
      )}
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, margin: 0 }}>
        {idx + 1} / {images.length} · Press ← → or Esc
      </p>
    </div>
  );
};

// ─── Image Gallery Component ──────────────────────────────────────────────────
const ImageGallery = ({
  images,
  buildingName,
}: {
  images: string[];
  buildingName: string;
}) => {
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  if (images.length === 0) return null;

  return (
    <>
      {previewIndex !== null && (
        <ImagePreviewModal
          images={images}
          initialIndex={previewIndex}
          onClose={() => setPreviewIndex(null)}
        />
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: images.length === 1 ? "1fr" : "repeat(2, 1fr)",
          gap: 8,
          padding: "12px 16px 4px",
        }}
      >
        {images.slice(0, 4).map((img, i) => {
          const isMoreOverlay = i === 3 && images.length > 4;
          return (
            <div
              key={i}
              onClick={() => setPreviewIndex(i)}
              style={{
                position: "relative",
                borderRadius: 14,
                overflow: "hidden",
                cursor: "pointer",
                background: "#f0f2f8",
                aspectRatio: images.length === 1 ? "16/7" : "4/3",
              }}
            >
              <img
                src={img}
                alt={`${buildingName} ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1.08)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1)")
                }
              />
              {/* Hover zoom icon */}
              <div
                className="img-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(0,0,0,0.22)";
                  const icon = (
                    e.currentTarget as HTMLDivElement
                  ).querySelector("svg");
                  if (icon)
                    (
                      icon as SVGElement & { style: CSSStyleDeclaration }
                    ).style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    "rgba(0,0,0,0)";
                  const icon = (
                    e.currentTarget as HTMLDivElement
                  ).querySelector("svg");
                  if (icon)
                    (
                      icon as SVGElement & { style: CSSStyleDeclaration }
                    ).style.opacity = "0";
                }}
              >
                <FiZoomIn
                  size={22}
                  color="#fff"
                  style={{ opacity: 0, transition: "opacity 0.2s" }}
                />
              </div>
              {/* "+N more" overlay */}
              {isMoreOverlay && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(0,0,0,0.58)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#fff",
                  }}
                >
                  +{images.length - 4}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

// ─── Category Badge ───────────────────────────────────────────────────────────
const CategoryBadge = ({ category }: { category: string }) => {
  const meta = CATEGORY_META[category as Exclude<Category, "all">];
  if (!meta) return null;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: 999,
        fontSize: 11,
        fontWeight: 600,
        backgroundColor: meta.bg,
        color: meta.color,
      }}
    >
      <span style={{ fontSize: 11 }}>{meta.icon}</span>
      {meta.label}
    </span>
  );
};

// ─── Floor Section ────────────────────────────────────────────────────────────
const FloorSection = ({
  floor,
  places,
}: {
  floor: string;
  places: string[];
}) => (
  <div
    style={{
      background: "#f8faff",
      borderRadius: 12,
      padding: "12px 14px",
      marginBottom: 8,
    }}
  >
    <p
      style={{
        fontSize: 10,
        fontWeight: 800,
        textTransform: "uppercase",
        letterSpacing: 1.2,
        color: "#2f4693",
        margin: "0 0 8px",
      }}
    >
      {floor}
    </p>
    {places.map((place, i) => (
      <div
        key={i}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 8,
          padding: "5px 0",
          borderBottom: i < places.length - 1 ? "1px solid #eef0f8" : "none",
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#f0a500",
            marginTop: 6,
            flexShrink: 0,
          }}
        />
        <p
          style={{ fontSize: 13, color: "#374151", lineHeight: 1.5, margin: 0 }}
        >
          {place}
        </p>
      </div>
    ))}
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Buildings() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [sortMode, setSortMode] = useState<SortMode>("priority");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showTopBtn, setShowTopBtn] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onScroll = () => setShowTopBtn(el.scrollTop > 400);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });

  const filteredBuildings = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    let list = BUILDINGS.filter((b) => {
      const cat = BUILDING_CATEGORY[String(b.id)] ?? "services";
      if (activeCategory !== "all" && cat !== activeCategory) return false;
      if (!q) return true;
      if (b.name.toLowerCase().includes(q)) return true;
      if (b.description?.toLowerCase().includes(q)) return true;
      if ((b as any).aliases?.some((a: string) => a.toLowerCase().includes(q)))
        return true;
      if (b.floors) {
        for (const f of b.floors) {
          if (f.floor.toLowerCase().includes(q)) return true;
          if (f.places.some((p) => p.toLowerCase().includes(q))) return true;
        }
      }
      return false;
    });

    if (sortMode === "alpha") {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortMode === "floors") {
      list = [...list].sort(
        (a, b) => (b.floors?.length ?? 0) - (a.floors?.length ?? 0),
      );
    } else {
      list = [...list].sort((a, b) => {
        const ai = PRIORITY_IDS.indexOf(String(a.id));
        const bi = PRIORITY_IDS.indexOf(String(b.id));
        if (ai !== -1 && bi !== -1) return ai - bi;
        if (ai !== -1) return -1;
        if (bi !== -1) return 1;
        return 0;
      });
    }
    return list;
  }, [searchQuery, activeCategory, sortMode]);

  const toggleExpand = useCallback((id: string | number) => {
    setExpandedId((prev) => (prev === String(id) ? null : String(id)));
  }, []);

  const toggleFav = useCallback((id: string | number) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(String(id))) next.delete(String(id));
      else next.add(String(id));
      return next;
    });
  }, []);

  // ✅ KEY FIX: Pass building data in router state so Home.tsx can start navigation
  const navigateToMap = useCallback(
    (building: Building) => {
      navigate("/home", {
        state: {
          destination: building,
        },
      });
    },
    [navigate],
  );

  const stats = useMemo(() => {
    let academic = 0,
      sports = 0,
      hostels = 0,
      canteens = 0;
    BUILDINGS.forEach((b) => {
      const cat = BUILDING_CATEGORY[String(b.id)];
      if (cat === "academic") academic++;
      if (cat === "sports") sports++;
      if (cat === "hostel") hostels++;
      if (cat === "canteen") canteens++;
    });
    return { academic, sports, hostels, canteens, total: BUILDINGS.length };
  }, []);

  const renderBuilding = (building: Building) => {
    const isOpen = expandedId === String(building.id);
    const isFav = favorites.has(String(building.id));
    const category = BUILDING_CATEGORY[String(building.id)] ?? "services";
    const meta = CATEGORY_META[category];
    const accentColor = meta?.color ?? "#2f4693";
    const images = building.images ?? [];
    const hasFloors = (building.floors?.length ?? 0) > 0;

    return (
      <div
        key={String(building.id)}
        style={{
          background: "#fff",
          borderRadius: 20,
          marginBottom: 14,
          overflow: "hidden",
          boxShadow: isOpen
            ? "0 10px 40px rgba(47,70,147,0.15)"
            : "0 2px 12px rgba(0,0,0,0.06)",
          border: isOpen ? "1.5px solid #c7d7f8" : "1px solid #f0f2f8",
          transition: "box-shadow 0.25s ease, border-color 0.25s ease",
        }}
      >
        {/* Card Header */}
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            cursor: "pointer",
            minHeight: 96,
          }}
          onClick={() => toggleExpand(building.id)}
        >
          {/* Accent stripe */}
          <div
            style={{ width: 5, flexShrink: 0, backgroundColor: accentColor }}
          />

          {/* Thumbnail */}
          {images.length > 0 && (
            <div
              style={{
                width: 90,
                flexShrink: 0,
                overflow: "hidden",
                position: "relative",
              }}
            >
              <img
                src={images[0]}
                alt={building.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1.08)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1)")
                }
              />
              {images.length > 1 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                    background: "rgba(0,0,0,0.62)",
                    color: "#fff",
                    fontSize: 9,
                    fontWeight: 700,
                    padding: "2px 5px",
                    borderRadius: 6,
                  }}
                >
                  +{images.length - 1}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div
            style={{
              flex: 1,
              padding: "13px 14px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              minWidth: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <p
                style={{
                  flex: 1,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#111827",
                  lineHeight: 1.35,
                  margin: 0,
                  letterSpacing: -0.2,
                }}
              >
                {building.name}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFav(building.id);
                }}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 2,
                  flexShrink: 0,
                  marginTop: 1,
                }}
              >
                <FiStar
                  size={16}
                  fill={isFav ? "#c9943a" : "none"}
                  color={isFav ? "#c9943a" : "#d1d5db"}
                />
              </button>
            </div>

            {building.description && (
              <p
                style={{
                  fontSize: 12,
                  color: "#6b7280",
                  margin: "5px 0 0",
                  lineHeight: 1.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {building.description}
              </p>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 8,
              }}
            >
              <CategoryBadge category={category} />
              {hasFloors && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "2px 8px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 600,
                    background: "#eff6ff",
                    color: "#1d4ed8",
                  }}
                >
                  <FiLayers size={10} />
                  {building.floors!.length} Floor
                  {building.floors!.length > 1 ? "s" : ""}
                </span>
              )}
              <span style={{ flex: 1 }} />
              {/* Quick navigate chip */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToMap(building);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "4px 10px",
                  borderRadius: 8,
                  background: accentColor,
                  color: "#fff",
                  border: "none",
                  fontSize: 11,
                  fontWeight: 700,
                  cursor: "pointer",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.82")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <FiNavigation size={10} /> Go
              </button>
              <span style={{ color: "#9ca3af" }}>
                {isOpen ? (
                  <FiChevronUp size={17} />
                ) : (
                  <FiChevronDown size={17} />
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Expanded */}
        {isOpen && (
          <div style={{ borderTop: "1px solid #f3f4f6" }}>
            <ImageGallery images={images} buildingName={building.name} />

            {hasFloors && (
              <div style={{ padding: "12px 16px 4px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    marginBottom: 12,
                  }}
                >
                  <FiLayers size={13} color="#2f4693" />
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: 1.2,
                      color: "#2f4693",
                    }}
                  >
                    Floor Directory
                  </span>
                </div>
                {building.floors!.map((f, i) => (
                  <FloorSection key={i} floor={f.floor} places={f.places} />
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: "flex", gap: 10, padding: "8px 16px 16px" }}>
              <button
                onClick={() => navigateToMap(building)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "13px 0",
                  borderRadius: 14,
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#fff",
                  background: `linear-gradient(135deg, ${accentColor} 0%, #1a2f6e 100%)`,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: `0 4px 14px ${accentColor}55`,
                  letterSpacing: 0.3,
                  transition: "opacity 0.15s, transform 0.1s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseDown={(e) =>
                  (e.currentTarget.style.transform = "scale(0.97)")
                }
                onMouseUp={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <FiNavigation size={15} />
                Navigate Here
              </button>
              <button
                onClick={() => toggleFav(building.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "13px 16px",
                  borderRadius: 14,
                  flexShrink: 0,
                  border: isFav ? "1.5px solid #c9943a" : "1px solid #e5e7eb",
                  fontSize: 13,
                  fontWeight: 600,
                  color: isFav ? "#c9943a" : "#374151",
                  background: isFav ? "#fffbf0" : "#fff",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <FiStar
                  size={15}
                  fill={isFav ? "#c9943a" : "none"}
                  color={isFav ? "#c9943a" : "#374151"}
                />
                {isFav ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        height: "100vh",
        overflowY: "auto",
        background: "#f0f4ff",
        position: "relative",
      }}
    >
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .cat-chip { transition: all 0.15s ease; }
        .cat-chip:hover { transform: scale(1.05); }
        .sort-btn { transition: all 0.15s ease; }
        ::-webkit-scrollbar { width: 3px; height: 3px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #c7d7f8; border-radius: 2px; }
      `}</style>

      {/* Hero Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #0f1e4a 0%, #1a2f6e 60%, #2f4693 100%)",
          padding: "52px 20px 36px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -30,
            left: -40,
            width: 140,
            height: 140,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            pointerEvents: "none",
          }}
        />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          {/* LEFT SIDE */}
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-blue-200">
              Campus Buildings
            </h1>
            <p className="text-gray-200 text-sm md:text-base max-w-2xl mt-2">
              Explore every building, department & facility
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <p className="text-white/60 text-sm md:text-base">
              {stats.total} locations across campus
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 16px",
            borderRadius: 16,
            background: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)",
          }}
        >
          <FiSearch
            size={17}
            color="rgba(255,255,255,0.6)"
            style={{ flexShrink: 0 }}
          />
          <input
            type="text"
            placeholder="Search buildings, rooms, departments…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              fontSize: 14,
              fontWeight: 500,
              color: "#fff",
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "none",
                cursor: "pointer",
                padding: 4,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <FiX size={14} color="#fff" />
            </button>
          )}
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid #f0f2f8" }}>
        <div
          style={{
            display: "flex",
            gap: 8,
            padding: "12px 16px",
            overflowX: "auto",
          }}
        >
          {[
            { label: "Total", value: stats.total, color: "#2f4693" },
            { label: "Academic", value: stats.academic, color: "#1a2744" },
            { label: "Sports", value: stats.sports, color: "#1d9e75" },
            { label: "Hostels", value: stats.hostels, color: "#7952b3" },
            { label: "Food", value: stats.canteens, color: "#d97706" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "6px 14px",
                borderRadius: 999,
                border: `1px solid ${color}25`,
                background: `${color}08`,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: color,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 800, color }}>
                {value}
              </span>
              <span style={{ fontSize: 12, color: "#6b7280", fontWeight: 500 }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Category filters — sticky */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #f0f2f8",
          position: "sticky",
          top: 0,
          zIndex: 10,
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            padding: "10px 16px",
          }}
        >
          <button
            className="cat-chip"
            onClick={() => setActiveCategory("all")}
            style={{
              padding: "7px 16px",
              borderRadius: 999,
              border: "1px solid",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              background: activeCategory === "all" ? "#2f4693" : "#f8faff",
              borderColor: activeCategory === "all" ? "#2f4693" : "#e5e7eb",
              color: activeCategory === "all" ? "#fff" : "#374151",
            }}
          >
            All
          </button>
          {(Object.keys(CATEGORY_META) as Exclude<Category, "all">[]).map(
            (cat) => (
              <button
                key={cat}
                className="cat-chip"
                onClick={() => {
                  setActiveCategory(cat);
                  setExpandedId(null);
                }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "7px 14px",
                  borderRadius: 999,
                  border: "1px solid",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  background:
                    activeCategory === cat
                      ? CATEGORY_META[cat].color
                      : "#f8faff",
                  borderColor:
                    activeCategory === cat
                      ? CATEGORY_META[cat].color
                      : "#e5e7eb",
                  color: activeCategory === cat ? "#fff" : "#374151",
                }}
              >
                <span style={{ fontSize: 13 }}>{CATEGORY_META[cat].icon}</span>
                {CATEGORY_META[cat].label}
              </button>
            ),
          )}
        </div>
      </div>

      {/* Results header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
          background: "#f0f4ff",
        }}
      >
        <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>
          <span style={{ fontWeight: 800, color: "#111827" }}>
            {filteredBuildings.length}
          </span>
          {" locations"}
          {searchQuery ? ` · "${searchQuery}"` : ""}
        </p>
        <div style={{ display: "flex", gap: 6 }}>
          {(["priority", "alpha", "floors"] as SortMode[]).map((mode) => (
            <button
              key={mode}
              className="sort-btn"
              onClick={() => setSortMode(mode)}
              style={{
                padding: "6px 10px",
                borderRadius: 10,
                border: "1px solid",
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
                background: sortMode === mode ? "#2f4693" : "#fff",
                borderColor: sortMode === mode ? "#2f4693" : "#e5e7eb",
                color: sortMode === mode ? "#fff" : "#6b7280",
              }}
            >
              {mode === "priority"
                ? "Priority"
                : mode === "alpha"
                  ? "A → Z"
                  : "Floors"}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div style={{ padding: "4px 16px 100px" }}>
        {filteredBuildings.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "80px 32px",
              textAlign: "center",
            }}
          >
            <MdSearchOff size={56} color="#d1d5db" />
            <p
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: "#111827",
                margin: "16px 0 8px",
              }}
            >
              No results found
            </p>
            <p
              style={{
                fontSize: 14,
                color: "#6b7280",
                margin: "0 0 24px",
                lineHeight: 1.6,
              }}
            >
              Try a different search or category.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              style={{
                padding: "12px 28px",
                borderRadius: 14,
                fontSize: 14,
                fontWeight: 700,
                color: "#fff",
                background: "#2f4693",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(47,70,147,0.3)",
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          filteredBuildings.map(renderBuilding)
        )}
      </div>

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: 24,
            right: 20,
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#2f4693",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 6px 20px rgba(47,70,147,0.45)",
            zIndex: 50,
            transition: "transform 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          <FiArrowUp size={20} color="#fff" />
        </button>
      )}
    </div>
  );
}
