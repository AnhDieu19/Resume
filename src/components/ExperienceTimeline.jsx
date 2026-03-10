import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, MapPin, ChevronRight, Clock } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import cvData from "../data/cvData";

const DOMAIN_COLORS = {
  platform: "from-violet-500/20 to-violet-400/10 text-violet-400 border-violet-500/30",
  healthcare: "from-emerald-500/20 to-emerald-400/10 text-emerald-400 border-emerald-500/30",
  retail: "from-amber-500/20 to-amber-400/10 text-amber-400 border-amber-500/30",
  hospitality: "from-rose-500/20 to-rose-400/10 text-rose-400 border-rose-500/30",
};

const DOMAIN_DOTS = {
  platform: "bg-violet-400 shadow-[0_0_8px_rgba(139,92,246,0.6)]",
  healthcare: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]",
  retail: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]",
  hospitality: "bg-rose-400 shadow-[0_0_8px_rgba(251,113,133,0.6)]",
};

export default function ExperienceTimeline() {
  const { locale } = useLanguage();
  const d = cvData[locale];
  const [filter, setFilter] = useState("all");

  const domains = ["all", ...new Set(d.experience.map((e) => e.domain))];
  const filtered = filter === "all" ? d.experience : d.experience.filter((e) => e.domain === filter);

  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 pt-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="mb-4 flex items-center gap-2">
          <Clock size={18} className="text-[var(--color-accent)]" />
          <h2 className="text-lg font-semibold text-[var(--color-accent)]">
            {locale === "en" ? "Professional Experience" : "Kinh nghiệm Làm việc"}
          </h2>
        </div>

        {/* Domain filter */}
        <div className="mb-5 flex flex-wrap gap-1.5">
          {domains.map((dom) => (
            <motion.button
              key={dom}
              onClick={() => setFilter(dom)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative rounded-full px-3 py-1 text-[11px] font-medium capitalize transition-all duration-300 ${
                filter === dom
                  ? "bg-[var(--color-accent)] text-white shadow-[0_0_12px_var(--color-neon-glow)]"
                  : "bg-[var(--color-card-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-card-bg)]/80"
              }`}
            >
              {dom === "all" ? (locale === "en" ? "All" : "Tất cả") : dom}
            </motion.button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative pl-6">
          {/* Animated timeline line */}
          <motion.div
            className="absolute left-0 top-0 w-0.5 bg-gradient-to-b from-[var(--color-accent)] via-[var(--color-accent-teal)] to-[var(--color-accent)]/20"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          <AnimatePresence mode="wait">
            <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {filtered.map((exp, i) => (
                <motion.div
                  key={`${exp.company}-${i}`}
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
                  className="relative mb-6 last:mb-0"
                >
                  {/* Glowing dot on timeline */}
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + 0.2, type: "spring", stiffness: 300 }}
                    className={`absolute -left-[27px] top-1.5 h-3 w-3 rounded-full border-2 border-[var(--color-dashboard-bg)] ${
                      DOMAIN_DOTS[exp.domain] || "bg-gray-400"
                    }`}
                  />
                  {/* Connector line */}
                  <div className="absolute -left-[15px] top-3 h-px w-[15px] bg-gradient-to-r from-[var(--color-accent)]/40 to-transparent" />

                  <motion.div
                    whileHover={{ x: 4, borderColor: "rgba(59,130,246,0.4)" }}
                    transition={{ duration: 0.2 }}
                    className="card-glow rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-4 transition-all duration-300 hover:shadow-[0_0_20px_var(--color-neon-glow)]"
                  >
                    {/* Top row */}
                    <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">{exp.role}</h3>
                        <p className="flex items-center gap-1 text-xs text-[var(--color-text-muted)]">
                          <Briefcase size={11} className="text-[var(--color-accent)]/60" /> {exp.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 rounded-md bg-[var(--color-accent-teal)]/10 px-2 py-0.5 text-xs font-medium text-[var(--color-accent-teal)]">
                          <Clock size={10} /> {exp.period}
                        </span>
                        {exp.location && (
                          <p className="mt-0.5 flex items-center justify-end gap-0.5 text-[10px] text-[var(--color-text-muted)]">
                            <MapPin size={9} /> {exp.location}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Domain badge */}
                    <span
                      className={`mb-2 inline-block rounded-full border bg-gradient-to-r px-2 py-0.5 text-[10px] font-medium capitalize ${
                        DOMAIN_COLORS[exp.domain] || ""
                      }`}
                    >
                      {exp.domain}
                    </span>

                    {/* Bullets */}
                    <ul className="space-y-1.5">
                      {exp.bullets.map((b, bi) => (
                        <motion.li
                          key={bi}
                          initial={{ opacity: 0, x: -8 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 + bi * 0.04 }}
                          className="flex items-start gap-1.5 text-xs leading-relaxed text-[var(--color-text-muted)]"
                        >
                          <ChevronRight size={10} className="mt-1 shrink-0 text-[var(--color-accent)]/60" />
                          {b}
                        </motion.li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className="mt-2.5 flex flex-wrap gap-1">
                      {exp.tags.map((tag, ti) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.05 + ti * 0.03 }}
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(59,130,246,0.15)" }}
                          className="rounded-md bg-[var(--color-accent)]/8 px-1.5 py-0.5 text-[10px] text-[var(--color-accent)] transition-colors cursor-default"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}
