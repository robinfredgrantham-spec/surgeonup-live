/* FILE: home-btf.jsx
   VERSION: 5 — accept animate prop; wrap in div with .animated class when true
   DATE: 20-Apr-26
   ============================================================================ */

import React from "react";

/* — Scoped CSS module — */
import styles from "./home-btf.module.css";

export default function HomeBtf({ animate })
{
    return (

        <div className={animate ? styles.animated : ""}>

            {/* — PINK PLACEHOLDER — */}
            <div className={styles.pinkSection}></div>

            {/* — WHITE PLACEHOLDERS x4 — */}
            <div className={styles.whiteSection}></div>
            <div className={styles.whiteSection2}></div>
            <div className={styles.whiteSection3}></div>
            <div className={styles.whiteSection4}></div>

            {/* — CYAN PLACEHOLDERS x4 — */}
            <div className={styles.cyanSection}></div>
            <div className={styles.cyanSection2}></div>
            <div className={styles.cyanSection3}></div>
            <div className={styles.cyanSection4}></div>

        </div>

    );
}
