/* FILE: Teaser.jsx
   DATE: 09-Jun-26
   Screen 2 of the home page. Animated teaser from pixel-exact PSD slices
   (public/teaser/*). Fills the height below the fixed header (height-priority,
   never distorted, never overflowing width), centred on brand blue, and plays
   its sequence the first time it scrolls into view.
   v3: header measured via stickyHeader (was: tallest fixed element, which
       could grab overlays); window-resize instead of a self-triggering
       ResizeObserver on the section (fixes up/down jump loop).
   ============================================================================ */

"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Teaser.module.css";

const IMG = "/teaser";
const DESIGN_W = 1250;
const DESIGN_H = 600;

export default function Teaser() {
  const sectionRef = useRef(null);
  const holderRef  = useRef(null);
  const stageRef   = useRef(null);
  const [playing, setPlaying] = useState(false);

  /* measure the real fixed header only (ignore any overlays) */
  const headerHeight = () => {
    const h = document.querySelector('[class*="stickyHeader"]');
    return h ? h.getBoundingClientRect().height : 130;
  };

  /* fullest size below the header: fill height, never overflow width */
  useEffect(() => {
    const fit = () => {
      const sec = sectionRef.current, hold = holderRef.current, st = stageRef.current;
      if (!sec || !hold || !st) return;
      const top = headerHeight();
      sec.style.paddingTop = top + "px";
      const availW = sec.clientWidth;
      const availH = Math.max(220, window.innerHeight - top);
      const k = Math.min(availW / DESIGN_W, availH / DESIGN_H);
      st.style.transform = "scale(" + k + ")";
      hold.style.width   = (DESIGN_W * k) + "px";
      hold.style.height  = (DESIGN_H * k) + "px";
    };
    fit();
    /* re-fit only on viewport resize (not on the section's own size change) */
    window.addEventListener("resize", fit);
    const t = setTimeout(fit, 400); /* one settle pass after header paints */
    return () => { window.removeEventListener("resize", fit); clearTimeout(t); };
  }, []);

  /* play once, the first time it scrolls into view */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setPlaying(true); io.disconnect(); }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div ref={holderRef} className={styles.holder}>
        <div ref={stageRef} className={styles.stage + (playing ? " " + styles.playing : "")}>
          <img className={styles.htext}    src={IMG + "/h_text.png"}     alt="This is what we can do for you" />
          <img className={styles.toparrow} src={IMG + "/h_toparrow.png"} alt="" />
          <img className={styles.hpanel}   src={IMG + "/h_panel.png"}    alt="How fit is your web presence" />
          <img className={styles.barL}     src={IMG + "/h_barL.png"}     alt="A complimentary audit will bring you" />
          <img className={styles.barR}     src={IMG + "/h_barR.png"}     alt="Clarity and unrivalled offers" />
          <img className={styles.a1} src={IMG + "/a1.png"} alt="1st" />
          <img className={styles.a2} src={IMG + "/a2.png"} alt="2nd" />
          <img className={styles.a3} src={IMG + "/a3.png"} alt="" />
          <img className={styles.a4} src={IMG + "/a4.png"} alt="" />
          <img className={styles.p1} src={IMG + "/p1.png"} alt="Own your top spot" />
          <img className={styles.p2} src={IMG + "/p2.png"} alt="2nd to top in a month" />
          <img className={styles.p3} src={IMG + "/p3.png"} alt="Qualify straightaway" />
          <img className={styles.p4} src={IMG + "/p4.png"} alt="Severely compromised, repair first" />
        </div>
      </div>
    </section>
  );
}
