import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Award, Globe } from "lucide-react";
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

export default function EducationTable() {
  const { locale } = useLanguage();
  const d = cvData[locale];
  const [tab, setTab] = useState("education");

  return (
    <section id="education" className="mx-auto max-w-6xl px-4 pt-8">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="mb-4 flex items-center gap-2">
          <GraduationCap size={18} className="text-[var(--color-accent)]" />
          <h2 className="text-lg font-semibold text-[var(--color-accent)]">
            {locale === "en" ? "Education & Certifications" : "Học vấn & Chứng chỉ"}
          </h2>
        </div>

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
              className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3"
            >
              {d.certifications.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.06, type: "spring", stiffness: 200 }}
                  whileHover={{ scale: 1.03, borderColor: "rgba(59,130,246,0.4)" }}
                  className="card-glow rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-3 transition-all duration-300 hover:shadow-[0_0_20px_var(--color-neon-glow)] cursor-default"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-accent-teal)]/15">
                      <Award size={12} className="text-[var(--color-accent-teal)]" />
                    </div>
                    <span className="text-xs font-medium text-[var(--color-text-primary)]">{cert.name}</span>
                  </div>
                  <p className="ml-8 text-[10px] text-[var(--color-text-muted)]">{cert.issuer}</p>
                </motion.div>
              ))}
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
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-xs font-medium text-[var(--color-text-primary)]">{lang.name}</span>
                    <span className="rounded-md bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] font-medium text-[var(--color-accent)]">
                      {lang.level}
                    </span>
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
    </section>
  );
}
