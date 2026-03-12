import { useState, useEffect, useMemo } from "react";
import Header from "./components/Header";
import KPICards from "./components/KPICards";
import SkillsNetwork from "./components/SkillsNetwork";
import ProjectsShowcase from "./components/ProjectsShowcase";
import ExperienceTimeline from "./components/ExperienceTimeline";
import EducationTable from "./components/EducationTable";
import Footer from "./components/Footer";

function Particles() {
  const items = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 1,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
        color: Math.random() > 0.5 ? "var(--color-accent)" : "var(--color-accent-teal)",
        opacity: Math.random() * 0.3 + 0.1,
      })),
    []
  );
  return (
    <>
      {items.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </>
  );
}

function App() {
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setScrollPct(pct || 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="grid-pattern relative min-h-screen bg-[var(--color-dashboard-bg)] text-[var(--color-text-primary)]">
      <div className="mx-auto max-w-[1400px]">
      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* Floating particles */}
      <Particles />

      <Header />
      <main className="relative z-10 pb-8">
        <KPICards />
        <SkillsNetwork />
        <ProjectsShowcase />
        <ExperienceTimeline />
        <EducationTable />
      </main>
      <Footer />
      </div>
    </div>
  );
}

export default App
