import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Index from "./pages/index";
import Home from "./pages/Home";
import Buildings from "./pages/Buildings";
import About from "./pages/About";
import Navbar from "./components/Navbar";

/* 🔥 PAGE ANIMATION WRAPPER */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* ✅ FIRST PAGE (INDEX) */}
        <Route
          path="/"
          element={
            <PageWrapper>
              <Index />
            </PageWrapper>
          }
        />

        {/* ✅ HOME (MAP PAGE) */}
        <Route
          path="/home"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />

        {/* ✅ BUILDINGS */}
        <Route
          path="/buildings"
          element={
            <PageWrapper>
              <Buildings />
            </PageWrapper>
          }
        />

        {/* ✅ ABOUT */}
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

/* 🔥 PAGE TRANSITION */
function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen bg-[#f8fafc]"
    >
      <Navbar />
      {children}
    </motion.div>
  );
}

/* 🔥 MAIN APP */
function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
