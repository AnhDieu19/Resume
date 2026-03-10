import { motion } from "framer-motion";
import { Mail, Linkedin, Phone, Heart } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import cvData from "../data/cvData";

export default function Footer() {
  const { locale } = useLanguage();
  const d = cvData[locale];
  const now = new Date().toLocaleDateString(locale === "en" ? "en-US" : "vi-VN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const links = [
    { href: `mailto:${d.email}`, icon: Mail, label: d.email },
    { href: `tel:${d.phone}`, icon: Phone, label: d.phone },
    { href: d.linkedin, icon: Linkedin, label: "LinkedIn", external: true },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="mt-12 border-t border-[var(--color-card-border)] bg-[var(--color-card-bg)]/50 backdrop-blur-sm"
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-6 sm:flex-row sm:justify-between">
        {/* Data refreshed */}
        <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(52,211,153,0.6)]" />
          </span>
          {locale === "en" ? "Data refreshed" : "Dữ liệu cập nhật"}: {now}
        </div>

        {/* Contact row */}
        <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
          {links.map(({ href, icon: Icon, label, external }) => (
            <motion.a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              whileHover={{ y: -2, color: "var(--color-accent)" }}
              className="flex items-center gap-1 transition-colors"
            >
              <Icon size={12} /> {label}
            </motion.a>
          ))}
        </div>

        {/* Built with */}
        <p className="flex items-center gap-1 text-[10px] text-[var(--color-text-muted)]/60">
          Built with <Heart size={9} className="text-rose-400" /> React & D3.js
        </p>
      </div>
    </motion.footer>
  );
}
