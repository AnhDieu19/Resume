import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Linkedin, MapPin, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import cvData from "../data/cvData";

const NAV_ITEMS = [
  { id: "summary", en: "Summary", vi: "Tổng quan" },
  { id: "skills", en: "Skills", vi: "Kỹ năng" },
  { id: "projects", en: "Projects", vi: "Dự án" },
  { id: "experience", en: "Experience", vi: "Kinh nghiệm" },
  { id: "education", en: "Education", vi: "Học vấn" },
];

function useTyping(text, speed = 45) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const prev = useRef("");

  useEffect(() => {
    if (text === prev.current) return;
    prev.current = text;
    setDisplayed("");
    setDone(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) { clearInterval(id); setDone(true); }
    }, speed);
    return () => clearInterval(id);
  }, [text, speed]);

  return { displayed, done };
}

export default function Header() {
  const { locale, toggleLanguage } = useLanguage();
  const d = cvData[locale];
  const [activeNav, setActiveNav] = useState("summary");
  const { displayed: typedTitle, done: titleDone } = useTyping(d.title, 40);

  // IntersectionObserver for active section tracking
  useEffect(() => {
    const ids = NAV_ITEMS.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveNav(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-card-border)] bg-[var(--color-dashboard-bg)]/80 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-4">
        {/* Top row */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          {/* Name & Title */}
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold tracking-tight md:text-3xl"
            >
              <span className="text-shimmer">
                {d.name}
              </span>
            </motion.h1>
            <p className="h-5 text-sm text-[var(--color-text-muted)]">
              <span>{typedTitle}</span>
              {!titleDone && <span className="typing-cursor" />}
            </p>
          </div>

          {/* Contact + Lang toggle */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-2"
          >
            {[
              { href: `tel:${d.phone}`, icon: Phone, label: d.phone },
              { href: `mailto:${d.email}`, icon: Mail, label: d.email },
              { href: d.linkedin, icon: Linkedin, label: "LinkedIn", external: true },
            ].map(({ href, icon: Icon, label, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-card-border)] bg-[var(--color-card-bg)]/60 px-3 py-1.5 text-xs text-[var(--color-text-muted)] backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[0_0_12px_var(--color-neon-glow)]"
              >
                <Icon size={12} /> {label}
              </a>
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-card-border)] bg-[var(--color-card-bg)]/60 px-3 py-1.5 text-xs text-[var(--color-text-muted)]">
              <MapPin size={12} /> {d.location}
            </span>

            {/* Language toggle */}
            <motion.button
              onClick={toggleLanguage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neon-ring ml-1 inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)] px-3 py-1.5 text-xs font-semibold text-[var(--color-accent)] transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-[var(--color-dashboard-bg)]"
            >
              <Globe size={12} />
              {locale === "en" ? "VI" : "EN"}
            </motion.button>
          </motion.div>
        </div>

        {/* Navigation bar */}
        <nav className="mt-3 flex flex-wrap gap-1.5">
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.06 }}
              onClick={() => scrollTo(item.id)}
              className={`relative rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-300 ${
                activeNav === item.id
                  ? "border border-[var(--color-accent)] bg-[var(--color-accent)]/15 text-[var(--color-accent)] shadow-[0_0_12px_var(--color-neon-glow)]"
                  : "border border-[var(--color-card-border)] text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-text-primary)]"
              }`}
            >
              {item[locale]}
              {activeNav === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute -bottom-[1px] left-2 right-2 h-[2px] rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-teal)]"
                />
              )}
            </motion.button>
          ))}
        </nav>
      </div>
    </header>
  );
}
