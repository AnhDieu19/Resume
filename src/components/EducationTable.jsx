import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, Globe, ChevronDown, ExternalLink, X, Download } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import cvData from "../data/cvData";

const TABS = [
  { key: "education", icon: GraduationCap },
  { key: "certifications", icon: Award },
  { key: "languages", icon: Globe },
];

const TAB_LABELS = {
  en: { education: "Education", certifications: "Certifications", languages: "Languages" },
  vi: { education: "Học vấn", certifications: "Chứng chỉ", languages: "Ngôn ngữ" },
};

const GROUP_ORDER = ["data", "tech", "strategy", "leadership", "retail"];

const GROUP_META = {
  data:       { en: "Data & Analytics",         vi: "Dữ liệu & Phân tích",      color: "var(--color-accent)" },
  tech:       { en: "Technology & IT",           vi: "Công nghệ & IT",           color: "var(--color-accent-teal)" },
  strategy:   { en: "Strategy & Business",       vi: "Chiến lược & Kinh doanh",  color: "#a855f7" },
  leadership: { en: "Leadership & Management",   vi: "Lãnh đạo & Quản lý",       color: "#f59e0b" },
  retail:     { en: "Retail & Operations",       vi: "Bán lẻ & Vận hành",        color: "#10b981" },
};

export default function EducationTable() {
  const { locale } = useLanguage();
  const d = cvData[locale];
  const [tab, setTab] = useState("education");
  const [sectionExpanded, setSectionExpanded] = useState(true);
  const [pdfModal, setPdfModal] = useState(null); // { url, name }

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setPdfModal(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
    <section id="education" className="mx-auto max-w-6xl px-4 pt-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <button
          onClick={() => setSectionExpanded((v) => !v)}
          className="mb-4 flex w-full items-center justify-between text-left"
        >
          <div className="flex items-center gap-2">
            <GraduationCap size={18} className="text-[var(--color-accent)]" />
            <h2 className="text-lg font-semibold text-[var(--color-accent)]">
              {locale === "en" ? "Education & Certifications" : "Học vấn & Chứng chỉ"}
            </h2>
          </div>
          <motion.div animate={{ rotate: sectionExpanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={20} className="text-[var(--color-accent)]" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {sectionExpanded && (
            <motion.div
              key="education-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
        {/* Tabs */}
        <div className="mb-5 flex gap-1 rounded-lg bg-[var(--color-card-bg)] p-1 w-fit border border-[var(--color-card-border)]">
          {TABS.map(({ key, icon: Icon }) => (
            <motion.button
              key={key}
              onClick={() => setTab(key)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                tab === key
                  ? "bg-[var(--color-accent)] text-white shadow-[0_0_12px_var(--color-neon-glow)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <Icon size={13} />
              {TAB_LABELS[locale][key]}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Education tab */}
          {tab === "education" && (
            <motion.div
              key="education"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="overflow-x-auto rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)]"
            >
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-[var(--color-card-border)] text-left text-[var(--color-text-muted)]">
                    <th className="px-4 py-3 font-medium">{locale === "en" ? "Program" : "Chương trình"}</th>
                    <th className="px-4 py-3 font-medium">{locale === "en" ? "Institution" : "Tổ chức"}</th>
                    <th className="px-4 py-3 font-medium">{locale === "en" ? "Year" : "Năm"}</th>
                    <th className="px-4 py-3 font-medium">{locale === "en" ? "Note" : "Ghi chú"}</th>
                    {d.education.some((e) => e.pdf) && (
                      <th className="px-4 py-3 font-medium">PDF</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {d.education.map((edu, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="border-b border-[var(--color-card-border)]/50 last:border-0 transition-colors hover:bg-[var(--color-accent)]/5"
                    >
                      <td className="px-4 py-3 font-medium text-[var(--color-text-primary)]">{edu.degree}</td>
                      <td className="px-4 py-3 text-[var(--color-text-muted)]">{edu.institution}</td>
                      <td className="px-4 py-3">
                        <span className="rounded-md bg-[var(--color-accent-teal)]/10 px-2 py-0.5 text-[var(--color-accent-teal)]">{edu.year}</span>
                      </td>
                      <td className="px-4 py-3 text-[var(--color-text-muted)]">{edu.note || "—"}</td>
                      {d.education.some((e) => e.pdf) && (
                        <td className="px-4 py-3">
                          {edu.pdf && (
                            <button
                              onClick={() => setPdfModal({ url: edu.pdf, name: edu.degree })}
                              className="flex items-center gap-1 rounded-md border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--color-accent)] transition-all duration-200 hover:bg-[var(--color-accent)]/20 hover:shadow-[0_0_8px_var(--color-neon-glow)]"
                            >
                              <ExternalLink size={9} />
                              {locale === "en" ? "View" : "Xem"}
                            </button>
                          )}
                        </td>
                      )}
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {/* Certifications tab */}
          {tab === "certifications" && (
            <motion.div
              key="certifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-3"
            >
              {GROUP_ORDER.map((gKey) => {
                const certs = d.certifications.filter((c) => c.group === gKey);
                if (!certs.length) return null;
                const meta = GROUP_META[gKey];
                return (
                  <div key={gKey}>
                    {/* Group header */}
                    <div className="mb-1 flex items-center gap-2">
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest shrink-0"
                        style={{ background: `color-mix(in srgb, ${meta.color} 15%, transparent)`, color: meta.color }}
                      >
                        {meta[locale]}
                      </span>
                      <div className="h-px flex-1" style={{ background: `color-mix(in srgb, ${meta.color} 25%, transparent)` }} />
                    </div>
                    {/* Compact cert list – 2 columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[0, 1].map((col) =>
                        certs.filter((_, i) => i % 2 === col).length > 0 ? (
                          <div key={col} className="overflow-hidden rounded-lg border border-[var(--color-card-border)] bg-[var(--color-card-bg)] divide-y divide-[var(--color-card-border)]/50">
                            {certs
                              .filter((_, i) => i % 2 === col)
                              .map((cert, i) => (
                                <motion.div
                                  key={cert.name}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.04 }}
                                  className="flex items-center gap-2.5 px-3 py-1.5 transition-colors hover:bg-[var(--color-accent)]/5"
                                >
                                  <Award size={11} className="shrink-0" style={{ color: meta.color }} />
                                  <span className="min-w-0 flex-1 text-[11px] font-medium text-[var(--color-text-primary)] leading-snug">
                                    {cert.name}
                                  </span>
                                  {cert.issuer && (
                                    <span className="shrink-0 text-[10px] text-[var(--color-text-muted)] hidden lg:inline">
                                      {cert.issuer}
                                    </span>
                                  )}
                                  {cert.pdf && (
                                    <button
                                      onClick={() => setPdfModal({ url: cert.pdf, name: cert.name })}
                                      className="flex shrink-0 items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium transition-all duration-200 hover:shadow-[0_0_8px_var(--color-neon-glow)]"
                                      style={{ borderColor: `color-mix(in srgb, ${meta.color} 40%, transparent)`, background: `color-mix(in srgb, ${meta.color} 10%, transparent)`, color: meta.color }}
                                    >
                                      <ExternalLink size={9} />
                                      {locale === "en" ? "View" : "Xem"}
                                    </button>
                                  )}
                                </motion.div>
                              ))}
                          </div>
                        ) : null
                      )}
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}

          {/* Languages tab */}
          {tab === "languages" && (
            <motion.div
              key="languages"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-4 rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5"
            >
              {d.languages.map((lang, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="mb-1.5 flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-[var(--color-text-primary)]">{lang.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--color-accent)]">
                        {lang.level}
                      </span>
                      {lang.pdf && (
                        <button
                          onClick={() => setPdfModal({ url: lang.pdf, name: lang.name + " – " + lang.level })}
                          className="flex items-center gap-1 rounded-md border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--color-accent)] transition-all duration-200 hover:bg-[var(--color-accent)]/20 hover:shadow-[0_0_8px_var(--color-neon-glow)]"
                        >
                          <ExternalLink size={9} />
                          {locale === "en" ? "View" : "Xem"}
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="relative h-2.5 overflow-hidden rounded-full bg-[var(--color-card-border)]">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${lang.percent}%` }}
                      transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
                      className="relative h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-teal)]"
                    >
                      <div className="shimmer-bar absolute inset-0 rounded-full" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>

    {/* PDF Modal – rendered via portal to escape header stacking context */}
    {createPortal(
    <AnimatePresence>
      {pdfModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm p-2"
          onClick={() => setPdfModal(null)}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="relative flex w-full h-full flex-col rounded-2xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] shadow-[0_0_80px_rgba(59,130,246,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between border-b border-[var(--color-card-border)] px-4 py-3">
              <div className="flex items-center gap-2">
                <Award size={15} className="text-[var(--color-accent-teal)]" />
                <span className="text-sm font-medium text-[var(--color-text-primary)] line-clamp-1">{pdfModal.name}</span>
              </div>
              <button
                onClick={() => setPdfModal(null)}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.6)] transition-all hover:bg-red-600 hover:shadow-[0_0_20px_rgba(239,68,68,0.8)] active:scale-95"
                title="Đóng (Esc)"
              >
                <X size={18} strokeWidth={2.5} />
              </button>
            </div>
            {/* PDF / Image viewer */}
            {/\.(png|jpg|jpeg|webp)$/i.test(pdfModal.url) ? (
              <div className="flex-1 overflow-auto flex items-center justify-center bg-[var(--color-bg-base)] rounded-b-2xl p-4">
                <img
                  src={pdfModal.url}
                  alt={pdfModal.name}
                  className="max-h-full max-w-full rounded-xl object-contain shadow-lg"
                />
              </div>
            ) : /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? (
              /* Mobile: Chrome blocks PDF iframe — open in new tab instead */
              <div className="flex flex-1 flex-col items-center justify-center gap-5 rounded-b-2xl bg-[var(--color-dashboard-bg)] p-8 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--color-accent)]/10 ring-1 ring-[var(--color-accent)]/30">
                  <Award size={36} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="mb-1 text-base font-semibold text-[var(--color-text-primary)]">{pdfModal.name}</p>
                  <p className="text-xs text-[var(--color-text-muted)]">
                    {locale === "en" ? "Tap below to view the certificate" : "Nhấn bên dưới để xem chứng chỉ"}
                  </p>
                </div>
                <a
                  href={pdfModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_16px_var(--color-neon-glow)] transition-all active:scale-95"
                >
                  <ExternalLink size={16} />
                  {locale === "en" ? "Open Certificate" : "Mở chứng chỉ"}
                </a>
              </div>
            ) : (
              <iframe
                src={`${pdfModal.url}#toolbar=0&navpanes=0&scrollbar=0`}
                className="h-full w-full rounded-b-2xl"
                title={pdfModal.name}
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    , document.body)}
    </>
  );
}
