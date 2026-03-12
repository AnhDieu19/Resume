import { useState, useMemo } from "react";
import ReactECharts from "echarts-for-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import cvData from "../data/cvData";

// mappping toolGroup.category → skill name from d.skills
const SKILL_MAP = {
  "BI & Analytics":  "Data & BI",
  "CRM & Messaging": "CRM/CDP Analysis",
  "Integration":     "Integration & API",
  "Databases":       "SQL & Python",
  "Programming":     "SQL & Python",
  "Documentation":   "Data Quality & MDM",
  "Platforms":       "Collaboration",
};

// Category index aligns with CATEGORIES array below
const SKILL_TO_CAT = {
  "Data & BI":           1,
  "CRM/CDP Analysis":    2,
  "Integration & API":   3,
  "SQL & Python":        4,
  "Data Quality & MDM":  5,
  "Collaboration":       6,
};

const CATEGORIES = [
  { name: "Center",             itemStyle: { color: "#f59e0b" } },
  { name: "Data & BI",          itemStyle: { color: "#3b82f6" } },
  { name: "CRM/CDP Analysis",   itemStyle: { color: "#a855f7" } },
  { name: "Integration & API",  itemStyle: { color: "#2dd4bf" } },
  { name: "SQL & Python",       itemStyle: { color: "#f97316" } },
  { name: "Data Quality & MDM", itemStyle: { color: "#10b981" } },
  { name: "Collaboration",      itemStyle: { color: "#ec4899" } },
];

export default function SkillsNetwork() {
  const { locale } = useLanguage();
  const [expanded, setExpanded] = useState(true);
  const d = cvData[locale] || cvData.en;

  const { nodes, links } = useMemo(() => {
    const nodes = [];
    const links = [];

    // Center node
    nodes.push({
      id: "center",
      name: "Jason",
      symbolSize: 52,
      category: 0,
      value: 100,
      label: { show: true, color: "#fff", fontWeight: "bold", fontSize: 13 },
    });

    // Skill nodes
    d.skills.forEach((skill) => {
      const catIdx = SKILL_TO_CAT[skill.name] ?? 1;
      nodes.push({
        id: skill.name,
        name: skill.name,
        symbolSize: 28 + (skill.value - 80) * 1.6,
        category: catIdx,
        value: skill.value,
        label: { show: true, fontSize: 10, color: "#e2e8f0" },
      });
      links.push({ source: "center", target: skill.name, lineStyle: { width: 2 } });
    });

    // Tool nodes
    d.toolGroups.forEach((group) => {
      const skillName = SKILL_MAP[group.category];
      const catIdx = SKILL_TO_CAT[skillName] ?? 1;
      group.tools.forEach((tool) => {
        const nodeId = `${group.category}::${tool}`;
        nodes.push({
          id: nodeId,
          name: tool,
          symbolSize: 13,
          category: catIdx,
          value: tool,
          label: { show: true, fontSize: 9, color: "#94a3b8" },
        });
        if (skillName) links.push({ source: skillName, target: nodeId });
      });
    });

    return { nodes, links };
  }, [d]);

  const option = useMemo(
    () => ({
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(15,23,42,0.95)",
        borderColor: "rgba(59,130,246,0.35)",
        borderWidth: 1,
        textStyle: { color: "#e2e8f0", fontSize: 12 },
        formatter: (params) => {
          if (params.dataType === "node") {
            const pct =
              typeof params.data.value === "number"
                ? `<br/><span style="color:#2dd4bf;font-size:16px;font-weight:bold;">${params.data.value}%</span>`
                : "";
            return `<strong style="color:#f8fafc;">${params.data.name}</strong>${pct}`;
          }
          return "";
        },
      },
      legend: [
        {
          type: "plain",
          orient: "horizontal",
          top: 0,
          left: "center",
          data: CATEGORIES.slice(1).map((c) => ({
            name: c.name,
            itemStyle: c.itemStyle,
          })),
          textStyle: { color: "#94a3b8", fontSize: 10 },
          icon: "circle",
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 10,
        },
      ],
      series: [
        {
          type: "graph",
          layout: "force",
          data: nodes,
          links: links,
          categories: CATEGORIES,
          roam: true,
          draggable: true,
          focusNodeAdjacency: true,
          force: {
            repulsion: 200,
            edgeLength: [70, 150],
            gravity: 0.12,
            friction: 0.65,
            layoutAnimation: true,
          },
          lineStyle: {
            color: "source",
            opacity: 0.35,
            curveness: 0.15,
            width: 1,
          },
          emphasis: {
            focus: "adjacency",
            lineStyle: { width: 2.5, opacity: 0.85 },
            itemStyle: { shadowBlur: 12, shadowColor: "rgba(255,255,255,0.3)" },
          },
          label: {
            show: true,
            position: "right",
          },
          itemStyle: {
            borderColor: "#0f172a",
            borderWidth: 1.5,
          },
          animationDurationUpdate: 1200,
          animationEasingUpdate: "quinticInOut",
        },
      ],
    }),
    [nodes, links]
  );

  return (
    <section className="mx-auto max-w-6xl px-4 pt-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-xl border border-[var(--color-card-border)] bg-[var(--color-card-bg)] p-5"
      >
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mb-2 flex w-full items-center justify-between text-left"
        >
          <h2 className="text-lg font-semibold text-[var(--color-accent)]">
            {locale === "en" ? "Skills & Tools Network" : "Mạng lưới Kỹ năng & Công cụ"}
          </h2>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={20} className="text-[var(--color-accent)]" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="network-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="mb-3 text-[11px] text-[var(--color-text-muted)]/60">
                {locale === "en"
                  ? "Drag or scroll to explore. Hover a node to highlight connections."
                  : "Kéo hoặc cuộn để khám phá. Di chuột lên node để xem liên kết."}
              </p>
              <ReactECharts
                option={option}
                style={{ height: "520px", width: "100%" }}
                opts={{ renderer: "canvas" }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
