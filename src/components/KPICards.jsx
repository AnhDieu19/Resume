import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Layers, Database, Plug } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import cvData from "../data/cvData";

const ICONS = { Calendar, Layers, Database, Plug };

function AnimatedValue({ value, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const num = parseInt(value);
    const suffix = value.replace(/[\d]/g, "");
    if (isNaN(num)) { setDisplay(value); return; }

    let start = 0;
    const duration = 1200;
    const startTime = performance.now() + delay;

    const tick = (now) => {
      const elapsed = now - startTime;
      if (elapsed < 0) { requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      start = Math.round(eased * num);
      setDisplay(`${start}${suffix}`);
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, value, delay]);

  return <span ref={ref}>{display}</span>;
}

export default function KPICards() {
  const { locale } = useLanguage();
  const d = cvData[locale];

  return (
    <section id="summary" className="mx-auto max-w-6xl px-4 pt-8">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {d.kpis.map((kpi, i) => {
          const Icon = ICONS[kpi.icon];
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, type: "spring", stiffness: 200 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="card-glow group relative rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 transition-all duration-300 hover:border-[var(--color-accent)]/50 hover:shadow-[0_0_30px_var(--color-neon-glow)]"
            >
              <div className="mb-2 flex items-center gap-2">
                {Icon && (
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                  >
                    <Icon size={16} className="text-[var(--color-accent-teal)]" />
                  </motion.div>
                )}
                <span className="text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
                  {kpi.label}
                </span>
              </div>
              <div className="bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-teal)] bg-clip-text text-3xl font-bold text-transparent">
                <AnimatedValue value={kpi.value} delay={i * 150} />
              </div>
              {/* Glow accent line at bottom */}
              <div className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[var(--color-accent)]/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          );
        })}
      </div>

      {/* Summary text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="mt-4 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5"
      >
        <p className="text-sm leading-relaxed text-[var(--color-text-muted)]">
          {d.summary}
        </p>
      </motion.div>
    </section>
  );
}
