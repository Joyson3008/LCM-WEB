import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

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
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />

        <Route
          path="/buildings"
          element={
            <PageWrapper>
              <Buildings />
            </PageWrapper>
          }
        />

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

/* 🔥 PAGE TRANSITION (PREMIUM FEEL) */
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
