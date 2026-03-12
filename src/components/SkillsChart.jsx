import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import cvData from "../data/cvData";

export default function SkillsChart() {
  const { locale } = useLanguage();
  const d = cvData[locale];
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [tooltip, setTooltip] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    if (!svgRef.current || !isInView) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = Math.min(containerRef.current?.clientWidth || 400, 400);
    const height = width;
    const margin = 55;
    const radius = (width - margin * 2) / 2;
    const center = width / 2;
    const levels = 5;
    const skills = d.skills;
    const angleSlice = (2 * Math.PI) / skills.length;

    svg.attr("viewBox", `0 0 ${width} ${height}`);

    const defs = svg.append("defs");

    // Radial gradient background for radar area
    const radialGrad = defs.append("radialGradient").attr("id", "radarBgGrad");
    radialGrad.append("stop").attr("offset", "0%").attr("stop-color", "#1e293b").attr("stop-opacity", 0.8);
    radialGrad.append("stop").attr("offset", "100%").attr("stop-color", "#0f172a").attr("stop-opacity", 0.3);

    // Fill gradient
    const gradient = defs.append("linearGradient").attr("id", "radarGrad")
      .attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "100%");
    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#3b82f6").attr("stop-opacity", 0.2);
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#2dd4bf").attr("stop-opacity", 0.2);

    // Stroke gradient
    const strokeGrad = defs.append("linearGradient").attr("id", "radarStroke")
      .attr("x1", "0%").attr("y1", "0%").attr("x2", "100%").attr("y2", "100%");
    strokeGrad.append("stop").attr("offset", "0%").attr("stop-color", "#3b82f6");
    strokeGrad.append("stop").attr("offset", "100%").attr("stop-color", "#2dd4bf");

    // Glow filter
    const glowFilter = defs.append("filter").attr("id", "glow");
    glowFilter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur");
    const merge = glowFilter.append("feMerge");
    merge.append("feMergeNode").attr("in", "coloredBlur");
    merge.append("feMergeNode").attr("in", "SourceGraphic");

    const g = svg.append("g").attr("transform", `translate(${center},${center})`);

    // Background circle
    g.append("circle").attr("r", radius).attr("fill", "url(#radarBgGrad)");

    // Grid circles with animation
    for (let lvl = 1; lvl <= levels; lvl++) {
      const r = (radius * lvl) / levels;
      g.append("circle")
        .attr("r", 0)
        .attr("fill", "none")
        .attr("stroke", "#334155")
        .attr("stroke-width", 0.6)
        .attr("stroke-dasharray", "4,4")
        .transition()
        .duration(600)
        .delay(lvl * 80)
        .attr("r", r);

      if (lvl % 2 === 0) {
        g.append("text")
          .attr("x", 4).attr("y", -r - 3)
          .text(`${(100 * lvl) / levels}`)
          .attr("fill", "#475569")
          .attr("font-size", "9px")
          .attr("opacity", 0)
          .transition().delay(lvl * 80 + 300).duration(300).attr("opacity", 1);
      }
    }

    // Axis lines with animated draw-on
    skills.forEach((_, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      g.append("line")
        .attr("x1", 0).attr("y1", 0)
        .attr("x2", 0).attr("y2", 0)
        .attr("stroke", "#334155")
        .attr("stroke-width", 0.6)
        .transition()
        .duration(500)
        .delay(400 + i * 60)
        .attr("x2", radius * Math.cos(angle))
        .attr("y2", radius * Math.sin(angle));
    });

    // Axis labels
    skills.forEach((skill, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const labelRadius = radius + 30;
      g.append("text")
        .attr("x", labelRadius * Math.cos(angle))
        .attr("y", labelRadius * Math.sin(angle))
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "middle")
        .attr("fill", "#94a3b8")
        .attr("font-size", "10px")
        .attr("font-weight", "600")
        .text(skill.name)
        .attr("opacity", 0)
        .transition().duration(400).delay(600 + i * 60).attr("opacity", 1);
    });

    // Data polygon - animated draw-on
    const lineGen = d3.lineRadial()
      .radius((sk) => (sk.value / 100) * radius)
      .angle((_, i) => i * angleSlice)
      .curve(d3.curveLinearClosed);

    const dataPoints = [...skills, skills[0]];
    const pathData = lineGen(dataPoints);

    // Fill area (fade in)
    g.append("path")
      .datum(dataPoints)
      .attr("d", pathData)
      .attr("fill", "url(#radarGrad)")
      .attr("stroke", "none")
      .attr("opacity", 0)
      .transition().duration(600).delay(1000)
      .attr("opacity", 1);

    // Stroke line (draw-on animation)
    const strokePath = g.append("path")
      .attr("d", pathData)
      .attr("fill", "none")
      .attr("stroke", "url(#radarStroke)")
      .attr("stroke-width", 2.5)
      .attr("filter", "url(#glow)");

    const totalLength = strokePath.node().getTotalLength();
    strokePath
      .attr("stroke-dasharray", totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .delay(700)
      .ease(d3.easeCubicInOut)
      .attr("stroke-dashoffset", 0);

    // Data dots with pulse animation
    skills.forEach((skill, i) => {
      const angle = angleSlice * i - Math.PI / 2;
      const r = (skill.value / 100) * radius;
      const cx = r * Math.cos(angle);
      const cy = r * Math.sin(angle);

      // Outer pulse ring
      g.append("circle")
        .attr("cx", cx).attr("cy", cy)
        .attr("r", 0).attr("fill", "none")
        .attr("stroke", "#2dd4bf")
        .attr("stroke-width", 1)
        .attr("opacity", 0)
        .transition().duration(400).delay(1200 + i * 80)
        .attr("r", 8).attr("opacity", 0.3)
        .transition().duration(1000)
        .attr("r", 12).attr("opacity", 0)
        .on("end", function repeat() {
          d3.select(this)
            .attr("r", 6).attr("opacity", 0.3)
            .transition().duration(1500)
            .attr("r", 14).attr("opacity", 0)
            .on("end", repeat);
        });

      // Main dot
      g.append("circle")
        .attr("cx", cx).attr("cy", cy)
        .attr("r", 0)
        .attr("fill", "#3b82f6")
        .attr("stroke", "#2dd4bf")
        .attr("stroke-width", 2)
        .attr("filter", "url(#glow)")
        .style("cursor", "pointer")
        .transition().duration(300).delay(1200 + i * 80)
        .attr("r", 5)
        .on("end", function () {
          d3.select(this)
            .on("mouseenter", function (event) {
              d3.select(this).transition().duration(200).attr("r", 8);
              setTooltip({ x: event.offsetX, y: event.offsetY, name: skill.name, value: skill.value, sub: skill.sub });
              setSelectedSkill(i);
            })
            .on("mouseleave", function () {
              d3.select(this).transition().duration(200).attr("r", 5);
              setTooltip(null);
              setSelectedSkill(null);
            });
        });
    });
  }, [d.skills, locale, isInView]);

  return (
    <section id="skills" ref={sectionRef} className="mx-auto max-w-6xl px-4 pt-8">
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
            {locale === "en" ? "Core Skills Distribution" : "Phân bố Kỹ năng Chính"}
          </h2>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={20} className="text-[var(--color-accent)]" />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="skills-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
        <div className="flex flex-col items-center gap-6 lg:flex-row">
          {/* Radar Chart */}
          <div ref={containerRef} className="relative w-full max-w-[400px]">
            <svg ref={svgRef} className="radar-svg w-full" />
            {tooltip && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="pointer-events-none absolute z-10 rounded-lg border border-[var(--color-accent)]/30 bg-[var(--color-dashboard-bg)]/95 px-4 py-3 text-xs shadow-[0_0_20px_var(--color-neon-glow)] backdrop-blur-sm"
                style={{ left: tooltip.x + 15, top: tooltip.y - 15 }}
              >
                <div className="font-semibold text-[var(--color-accent)]">{tooltip.name}</div>
                <div className="mt-0.5 text-lg font-bold text-[var(--color-accent-teal)]">{tooltip.value}%</div>
                <div className="mt-1 text-[var(--color-text-muted)]">{tooltip.sub}</div>
              </motion.div>
            )}
          </div>

          {/* Skill bars */}
          <div className="w-full flex-1 space-y-3">
            {d.skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }}
                className={`rounded-lg p-2 transition-all duration-300 ${
                  selectedSkill === i ? "bg-[var(--color-accent)]/10 ring-1 ring-[var(--color-accent)]/30" : ""
                }`}
              >
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-[var(--color-text-muted)]">{skill.name}</span>
                  <span className="font-mono text-[var(--color-accent-teal)]">{skill.value}%</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[var(--color-dashboard-bg)] border border-[var(--color-card-border)]">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-teal)] shadow-[0_0_8px_var(--color-neon-glow)]"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.value}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: i * 0.12, ease: "easeOut" }}
                  />
                </div>
                <p className="mt-0.5 text-[10px] text-[var(--color-text-muted)]/60">{skill.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>

            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
