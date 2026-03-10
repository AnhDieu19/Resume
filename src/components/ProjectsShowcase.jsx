import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Target, Zap, TrendingUp, BarChart3 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import cvData from "../data/cvData";

function TiltCard({ children, className }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease",
    });
  };
  const handleLeave = () => setStyle({ transform: "perspective(800px) rotateY(0) rotateX(0) scale3d(1,1,1)", transition: "transform 0.4s ease" });

  return (
    <div ref={ref} style={style} onMouseMove={handleMove} onMouseLeave={handleLeave} className={className}>
      {children}
    </div>
  );
}

export default function ProjectsShowcase() {
  const { locale } = useLanguage();
  const d = cvData[locale];
  const [expanded, setExpanded] = useState(null);
  const [sectionExpanded, setSectionExpanded] = useState(true);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <button
          onClick={() => setSectionExpanded((v) => !v)}
          className="mb-4 flex w-full items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <BarChart3 size={18} className="text-[var(--color-accent)]" />
            <h2 className="text-lg font-semibold text-[var(--color-accent)]">
              {locale === "en" ? "Selected Projects" : "Dự án Tiêu biểu"}
            </h2>
          </div>
          <motion.div animate={{ rotate: sectionExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={20} className="text-[var(--color-accent)]" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {sectionExpanded && (
            <motion.div
              key="projects-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
        <div className="grid gap-4 md:grid-cols-2">
          {d.projects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 150 }}
            >
              <TiltCard className="card-glow group relative rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5 transition-all duration-300 hover:border-[var(--color-accent)]/40 hover:shadow-[0_0_30px_var(--color-neon-glow)]">
                {/* Project number badge */}
                <div className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-teal)] text-[10px] font-bold text-white shadow-lg">
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Header */}
                <div className="mb-3">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {project.company} {project.scope && `· ${project.scope}`}
                  </p>
                  <span className="mt-1 inline-block rounded-md bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--color-accent)]">
                    {project.role}
                  </span>
                </div>

                {/* Metrics with animated badges */}
                <div className="mb-3 flex flex-wrap gap-1.5">
                  {project.metrics.map((m, mi) => (
                    <motion.span
                      key={mi}
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + mi * 0.08 }}
                      className="inline-flex items-center gap-1 rounded-full border border-[var(--color-accent-teal)]/20 bg-gradient-to-r from-[var(--color-accent)]/10 to-[var(--color-accent-teal)]/10 px-2.5 py-0.5 text-[10px] font-medium text-[var(--color-accent-teal)]"
                    >
                      <TrendingUp size={10} /> {m}
                    </motion.span>
                  ))}
                </div>

                {/* Challenge */}
                <div className="mb-3 flex items-start gap-2 rounded-lg bg-[var(--color-dashboard-bg)]/50 p-2.5">
                  <Target size={13} className="mt-0.5 shrink-0 text-amber-400/70" />
                  <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                    {project.challenge}
                  </p>
                </div>

                {/* Expand toggle */}
                <motion.button
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  whileHover={{ x: 4 }}
                  className="mt-1 flex items-center gap-1.5 text-[11px] font-medium text-[var(--color-accent)] transition hover:text-[var(--color-accent-teal)]"
                >
                  <motion.div animate={{ rotate: expanded === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                    <ChevronDown size={14} />
                  </motion.div>
                  {expanded === i
                    ? locale === "en" ? "Collapse" : "Thu gọn"
                    : locale === "en" ? "Actions & Impact" : "Hành động & Kết quả"}
                </motion.button>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-3 space-y-2 border-l-2 border-[var(--color-accent)]/30 pl-3">
                        {project.actions.map((action, ai) => (
                          <motion.li
                            key={ai}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: ai * 0.08 }}
                            className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]"
                          >
                            <Zap size={10} className="mt-0.5 shrink-0 text-[var(--color-accent-teal)]" />
                            {action}
                          </motion.li>
                        ))}
                      </ul>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-3 rounded-lg border border-[var(--color-accent-teal)]/20 bg-[var(--color-accent-teal)]/5 px-3 py-2.5 text-xs text-[var(--color-accent-teal)]"
                      >
                        <strong className="text-[var(--color-accent-teal)]">{locale === "en" ? "Impact:" : "Kết quả:"}</strong>{" "}
                        {project.impact}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </TiltCard>
            </motion.div>
          ))}
        </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
