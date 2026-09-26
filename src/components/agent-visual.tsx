"use client";

import { useEffect, useId, useRef } from "react";
import styles from "./agent-visual.module.css";

const LINES = 18;

// A flat line composition: the brand's oblique edges repeated around an open centre.
// All movement stays in the plane; there is no camera, extrusion or material shading.
function contour(index: number, x: number, y: number) {
  const t = index / (LINES - 1);
  const width = 310 - t * 206;
  const height = 400 - t * 232;
  const envelope = Math.sin(t * Math.PI);
  const cx = 325 + t * 8 + x * envelope * 8;
  const cy = 265 - t * 4 + y * envelope * 10;
  const shear = Math.tan(12 * Math.PI / 180);
  const left = cx - width / 2;
  const right = cx + width / 2;
  const top = cy - height / 2;
  const bottom = cy + height / 2;
  const slant = (right - left) / 2 * shear;
  const a = top + slant, b = top - slant;
  const c = bottom - slant, d = bottom + slant;
  return `M${left},${a}L${right},${b}L${right},${c}L${left},${d}Z`;
}

export function AgentVisual() {
  const frameRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<SVGGElement>(null);
  const instructionId = useId();

  useEffect(() => {
    const frame = frameRef.current, group = pathsRef.current;
    if (!frame || !group) return;
    const paths = Array.from(group.querySelectorAll("path"));
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = motion.matches, visible = true, raf = 0, last = 0;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    const paint = () => {
      paths.forEach((path, i) => path.setAttribute("d", contour(i, x, y)));
    };
    const active = () => visible && !document.hidden && !reduced && (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.0001);
    const tick = (time: number) => {
      if (!active()) { raf = 0; last = 0; return; }
      const dt = last ? Math.min(time - last, 64) : 16;
      last = time;
      const ease = 1 - Math.exp(-dt / 200);
      x += (targetX - x) * ease; y += (targetY - y) * ease;
      paint(); raf = requestAnimationFrame(tick);
    };
    const refresh = () => {
      if (reduced) { x = targetX; y = targetY; }
      paint(); if (!raf && active()) raf = requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const bounds = frame.getBoundingClientRect();
      targetX = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      targetY = (event.clientY - bounds.top) / bounds.height * 2 - 1;
      refresh();
    };
    const reset = () => { targetX = targetY = 0; refresh(); };
    const onKey = (event: KeyboardEvent) => {
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home"].includes(event.key)) return;
      event.preventDefault();
      if (event.key === "Home") { reset(); return; }
      if (event.key === "ArrowLeft") targetX = Math.max(-1, targetX - 0.3);
      if (event.key === "ArrowRight") targetX = Math.min(1, targetX + 0.3);
      if (event.key === "ArrowUp") targetY = Math.max(-1, targetY - 0.3);
      if (event.key === "ArrowDown") targetY = Math.min(1, targetY + 0.3);
      refresh();
    };
    const onMotion = () => { reduced = motion.matches; refresh(); };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; refresh(); });
    observer.observe(frame);
    motion.addEventListener("change", onMotion); document.addEventListener("visibilitychange", refresh);
    frame.addEventListener("pointermove", onMove); frame.addEventListener("pointerleave", reset); frame.addEventListener("keydown", onKey); frame.addEventListener("blur", reset);
    refresh();
    return () => {
      cancelAnimationFrame(raf); observer.disconnect();
      motion.removeEventListener("change", onMotion); document.removeEventListener("visibilitychange", refresh);
      frame.removeEventListener("pointermove", onMove); frame.removeEventListener("pointerleave", reset); frame.removeEventListener("keydown", onKey); frame.removeEventListener("blur", reset);
    };
  }, []);

  return <div className={styles.visual}>
    <div className={styles.frame} ref={frameRef} tabIndex={0} role="img" aria-label="Interactive geometric line composition" aria-describedby={instructionId}>
      <svg className={styles.canvas} viewBox="0 0 650 530" aria-hidden="true">
        <g ref={pathsRef} fill="none" strokeLinejoin="miter">{Array.from({length: LINES}, (_, i) => <path key={i} style={{ animationDelay: `${120 + i * 80}ms` }} d={contour(i, 0, 0)} className={i >= 6 && i < 14 ? styles.signal : styles.line} strokeWidth={i >= 6 && i < 14 ? 1.65 : 0.8} />)}</g>
      </svg>
    </div>
    <span className={styles.srOnly} id={instructionId}>Move the pointer or use arrow keys to shift the line composition. Home restores its initial position.</span>
  </div>;
}
