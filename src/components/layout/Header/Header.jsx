/* FILE: Header.jsx
   VERSION: 5.0 - Profit bar: clean single-span structure
   DATE: 14-Mar-26
   CHANGES FROM v4.6:
   - Moved &nbsp; from end of PROFIT span to start of OR NO INVESTMENT span
   - Removes margin-right interference so all word gaps are now equal

   ============================================================================
   HEADER COMPONENT
   Surge-on Up ÃÂ¢ÃÂÃÂ surgeonup.com
   Location: src/components/layout/Header/Header.jsx
   ============================================================================ */

"use client";

/* ÃÂ¢ÃÂÃÂ React and useState hook ÃÂ¢ÃÂÃÂ */
import React, { useState, useEffect, useRef } from "react";

/* ÃÂ¢ÃÂÃÂ Next.js optimised image component ÃÂ¢ÃÂÃÂ */
import Image from "next/image";

/* ÃÂ¢ÃÂÃÂ Next.js client-side navigation ÃÂ¢ÃÂÃÂ */
import Link from "next/link";

/* ÃÂ¢ÃÂÃÂ Next.js router for active menu state ÃÂ¢ÃÂÃÂ */
import { useRouter } from "next/router";

/* ÃÂ¢ÃÂÃÂ Scoped CSS module ÃÂ¢ÃÂÃÂ */
import styles from "./Header.module.css";

/* ÃÂ¢ÃÂÃÂ Music context: enabled flag, preference prompt, player toggle ÃÂ¢ÃÂÃÂ */
import { useMusic } from "@/context/MusicContext";

/* ÃÂ¢ÃÂÃÂ Music player controls overlay ÃÂ¢ÃÂÃÂ */
import MusicControlPopup from "@/components/ui/MusicControlPopup/MusicControlPopup";

export default function Header()
{
    // ========== STATE MANAGEMENT ==========

    /* ÃÂ¢ÃÂÃÂ Destructure music context values ÃÂ¢ÃÂÃÂ */
    const { musicEnabled, askForMusicPreference, setShowPlayer } = useMusic();

    /* ÃÂ¢ÃÂÃÂ Controls visibility of music control popup ÃÂ¢ÃÂÃÂ */
    const [showMusicControl, setShowMusicControl] = useState(false);

    /* ÃÂ¢ÃÂÃÂ Tracks if music icon is in active/selected (green) state ÃÂ¢ÃÂÃÂ */
    const [isMusicSelected, setIsMusicSelected] = useState(false);

    /* ÃÂ¢ÃÂÃÂ Tracks if music icon is being hovered (cyan) state ÃÂ¢ÃÂÃÂ */
    const [isQuaverHovered, setIsQuaverHovered] = useState(false);

    /* ÃÂ¢ÃÂÃÂ Router instance for current pathname ÃÂ¢ÃÂÃÂ */
    const router = useRouter();

    /* — auto-shrink the header to fit the screen width (keeps proportions) — */
    const wrapRef = useRef(null);
    const innerRef = useRef(null);
    useEffect(() => {
      const fit = () => {
        const wrap = wrapRef.current, inner = innerRef.current;
        if (!wrap || !inner) return;
        inner.style.zoom = "1";
        const natural = inner.scrollWidth;
        const avail = wrap.clientWidth - 40;
        const k = Math.min(1, avail / natural);
        inner.style.zoom = String(k);
      };
      fit();
      window.addEventListener("resize", fit);
      const t1 = setTimeout(fit, 300);
      const t2 = setTimeout(fit, 1000);
      return () => { window.removeEventListener("resize", fit); clearTimeout(t1); clearTimeout(t2); };
    }, []);

    // ========== EVENT HANDLERS ==========

    /* ÃÂ¢ÃÂÃÂ Click handler for music note icon ÃÂ¢ÃÂÃÂ */
    const handleMusicIconClick = () =>
    {
        /* ÃÂ¢ÃÂÃÂ Switch quaver to green, clear menu active states ÃÂ¢ÃÂÃÂ */
        setIsMusicSelected(true);

        /* ÃÂ¢ÃÂÃÂ If music already enabled, show player controls ÃÂ¢ÃÂÃÂ */
        if (musicEnabled)
        {
            /* ÃÂ¢ÃÂÃÂ Show music control popup ÃÂ¢ÃÂÃÂ */
            setShowMusicControl(true);
        }
        else
        {
            /* ÃÂ¢ÃÂÃÂ Prompt user for music preference ÃÂ¢ÃÂÃÂ */
            askForMusicPreference();
        }
    };

    /* ÃÂ¢ÃÂÃÂ Returns true if this menu item matches current page and music not selected ÃÂ¢ÃÂÃÂ */
    const isMenuItemActive = (path) =>
    {
        return !isMusicSelected && router.pathname === path;
    };

    // ========== QUAVER IMAGE SELECTOR ==========

    /* ÃÂ¢ÃÂÃÂ Returns correct quaver image based on interaction state ÃÂ¢ÃÂÃÂ */
    const getQuaverSrc = () =>
    {
        /* ÃÂ¢ÃÂÃÂ Green: music icon active/selected ÃÂ¢ÃÂÃÂ */
        if (isMusicSelected) return "/allpics/PURPLE QUAVER-PHD5.jpg";

        /* ÃÂ¢ÃÂÃÂ Cyan: mouse hovering over icon ÃÂ¢ÃÂÃÂ */
        if (isQuaverHovered) return "/allpics/CYAN QUAVER-PHD4.jpg";

        /* ÃÂ¢ÃÂÃÂ Blue: default unhovered state ÃÂ¢ÃÂÃÂ */
        return "/allpics/BLUE QUAVER-PHD2.jpg";
    };

    // ========== RENDER ==========

    return (
        <>
            {/* ÃÂ¢ÃÂÃÂ Outer header wrapper: sticky, white background, padding ÃÂ¢ÃÂÃÂ */}
            <div ref={wrapRef} className={styles.headerWrapper}>

                {/* ÃÂ¢ÃÂÃÂ Three-column flex container ÃÂ¢ÃÂÃÂ */}
                <div ref={innerRef} className={styles.headerContainer}>

                    {/* ========== LEFT SECTION: LOGO ========== */}

                    {/* ÃÂ¢ÃÂÃÂ Left column: logo linking to /about ÃÂ¢ÃÂÃÂ */}
                    <div className={styles.logoSection}>

                        {/* ÃÂ¢ÃÂÃÂ Navigate to about page on click ÃÂ¢ÃÂÃÂ */}
                        <Link href="/about">

                            {/* ÃÂ¢ÃÂÃÂ Logo image: 300x200px, optimised, priority loaded ÃÂ¢ÃÂÃÂ */}
                            <Image
                                src       = "/allpics/LOGO-PHD1.jpg"
                                alt       = "Surge-on Up Logo"
                                width     = {300}
                                height    = {200}
                                className = {styles.logo}
                                priority
                            />

                        </Link>

                    </div>

                    {/* ========== CENTER SECTION: MENU + PROFIT BAR ========== */}

                    {/* ÃÂ¢ÃÂÃÂ Center column: menu top, profit bar bottom ÃÂ¢ÃÂÃÂ */}
                    <div className={styles.centerSection}>

                        {/* ÃÂ¢ÃÂÃÂ Horizontal navigation menu ÃÂ¢ÃÂÃÂ */}
                        <nav className={styles.menuRow}>

                            {/* ÃÂ¢ÃÂÃÂ Menu item list ÃÂ¢ÃÂÃÂ */}
                            <ul className={styles.menuList}>

                                {/* ÃÂ¢ÃÂÃÂ HOME: active if on homepage and music not selected ÃÂ¢ÃÂÃÂ */}
                                <li className={isMenuItemActive("/") ? styles.active : ""}>

                                    {/* ÃÂ¢ÃÂÃÂ Link to homepage, clears music selection ÃÂ¢ÃÂÃÂ */}
                                    <Link href="/" onClick={() => setIsMusicSelected(false)}>
                                        HOME
                                    </Link>

                                </li>

                                {/* ÃÂ¢ÃÂÃÂ SERVICES: active if on services page ÃÂ¢ÃÂÃÂ */}
                                <li className={isMenuItemActive("/services") ? styles.active : ""}>

                                    {/* ÃÂ¢ÃÂÃÂ Link to services page, clears music selection ÃÂ¢ÃÂÃÂ */}
                                    <Link href="/services" onClick={() => setIsMusicSelected(false)}>
                                        SERVICES
                                    </Link>

                                </li>

                                {/* ÃÂ¢ÃÂÃÂ ABOUT: active if on about page ÃÂ¢ÃÂÃÂ */}
                                <li className={isMenuItemActive("/about") ? styles.active : ""}>

                                    {/* ÃÂ¢ÃÂÃÂ Link to about page, clears music selection ÃÂ¢ÃÂÃÂ */}
                                    <Link href="/about" onClick={() => setIsMusicSelected(false)}>
                                        ABOUT
                                    </Link>

                                </li>

                                {/* ÃÂ¢ÃÂÃÂ BLOG: active if on blog page ÃÂ¢ÃÂÃÂ */}
                                <li className={isMenuItemActive("/blog") ? styles.active : ""}>

                                    {/* ÃÂ¢ÃÂÃÂ Link to blog page, clears music selection ÃÂ¢ÃÂÃÂ */}
                                    <Link href="/blog" onClick={() => setIsMusicSelected(false)}>
                                        BLOG
                                    </Link>

                                </li>

                                {/* ÃÂ¢ÃÂÃÂ CONTACT: active if on contact page ÃÂ¢ÃÂÃÂ */}
                                <li className={isMenuItemActive("/contact") ? styles.active : ""}>

                                    {/* ÃÂ¢ÃÂÃÂ Link to contact page, clears music selection ÃÂ¢ÃÂÃÂ */}
                                    <Link href="/contact" onClick={() => setIsMusicSelected(false)}>
                                        CONTACT
                                    </Link>

                                </li>

                                {/* ÃÂ¢ÃÂÃÂ Music note icon: swaps between blue/cyan/green quaver ÃÂ¢ÃÂÃÂ */}
                                <li>

                                    {/* ÃÂ¢ÃÂÃÂ Quaver image: state-driven src, click and hover handlers ÃÂ¢ÃÂÃÂ */}
                                    <Image
                                        src          = {getQuaverSrc()}
                                        alt          = "Music Player"
                                        className    = {styles.musicIcon}
                                        width        = {24}
                                        height       = {24}
                                        onClick      = {handleMusicIconClick}
                                        onMouseEnter = {() => setIsQuaverHovered(true)}
                                        onMouseLeave = {() => setIsQuaverHovered(false)}
                                        style        = {{ cursor: "pointer" }}
                                    />

                                </li>

                            </ul>

                        </nav>

                        {/* ÃÂ¢ÃÂÃÂ PROFIT OR NO FEE bar linking to /services ÃÂ¢ÃÂÃÂ */}
                        <Link href="/services" className={styles.profitLink}>

                            {/* ÃÂ¢ÃÂÃÂ Cyan bar: rounded corners, hover scale ÃÂ¢ÃÂÃÂ */}
                            <div className={styles.profitBar}>

                                {/* — Uniform letter-spacing: outer span styles all, inner span colours PROFIT only — */}
                                <span className={styles.profitTextBlue}>

                                <span className={styles.profitText}>PROFIT</span>&nbsp;OR&nbsp;NO&nbsp;INVESTMENT

                                </span>

                                </div>

                        </Link>

                    </div>

                    {/* ========== RIGHT SECTION: CHAT BUTTON ========== */}

                    {/* ÃÂ¢ÃÂÃÂ Right column: chat button linking to /contact ÃÂ¢ÃÂÃÂ */}
                    <div className={styles.chatSection}>

                        {/* ÃÂ¢ÃÂÃÂ Link to contact page, no underline ÃÂ¢ÃÂÃÂ */}
                        <Link href="/contact" className={styles.chatLink}>

                            {/* ÃÂ¢ÃÂÃÂ Outer wrapper: blue background acts as 14px border, radius 14px ÃÂ¢ÃÂÃÂ */}
                            <div className={styles.chatButton}>

                                {/* ÃÂ¢ÃÂÃÂ Inner box: cyan background, radius 6px ÃÂ¢ÃÂÃÂ */}
                                <div className={styles.chatButtonInner}>

                                    {/* ÃÂ¢ÃÂÃÂ CHAT: 64px, Poppins 800 italic ÃÂ¢ÃÂÃÂ */}
                                    <span className={styles.chatTextTop}>
                                        CHAT
                                    </span>

                                    {/* ÃÂ¢ÃÂÃÂ WITH: 34px, Poppins 900 italic ÃÂ¢ÃÂÃÂ */}
                                    <span className={styles.chatTextMid}>
                                        WITH
                                    </span>

                                    {/* ÃÂ¢ÃÂÃÂ ROBIN: 60px, Poppins 900 italic ÃÂ¢ÃÂÃÂ */}
                                    <span className={styles.chatTextBot}>
                                        ROBIN
                                    </span>

                                </div>

                            </div>

                        </Link>

                    </div>

                </div>

            </div>

            {/* ========== MUSIC CONTROL POPUP ========== */}

            {/* ÃÂ¢ÃÂÃÂ Modal overlay for music player controls ÃÂ¢ÃÂÃÂ */}
            <MusicControlPopup
                show   = {showMusicControl}
                onHide = {() =>
                {
                    /* ÃÂ¢ÃÂÃÂ Hide popup on close ÃÂ¢ÃÂÃÂ */
                    setShowMusicControl(false);
                }}
            />

        </>
    );
}
