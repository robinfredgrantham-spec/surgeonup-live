/* FILE: landing.jsx
   DATE: 09-Jun-26
   CHANGE: hero headline verb LOCK->OWN on TOP SPOT (both A/B render points)
   PREV (29-May-26): button now calls the scrollToTeaser() prop (was an inline DOM lookup + scroll)
   ============================================================================ */
import React, { useState, useEffect } from "react";

/*  Scoped CSS module  */
import styles from "./landing.module.css";

/*  BTF section component  */
import HomeBtf from "../home-btf/home-btf";

export default function Landing({ scrollToTeaser })
{
  // — A/B VARIANT — TopSpot boolean (true=Lock Your Top Spot, false=10 Clients)
  const [TopSpot, setTopSpot] = useState(null);

  useEffect(() => {
    // pick A/B variant immediately on load (live site has no consent popup)
    var n = Math.floor(Math.random() * 100) + 1;
    setTopSpot(n <= 50);
  }, []);

    /*  Tracks whether the CTA button has been clicked; triggers BTF fade-up sequence  */

    const [btfFired, setBtfFired] = useState(false);


    // ========== RENDER ==========

    return (
        <div className={styles.landingWrapper}>

            {/*  Outer blue wrapper  always visible  */}
            <div className={styles.mainLandingBody2}>

                {/*  Inner cyan container  always visible  */}
                <div className={styles.mainLandingContainer}>

                            {/* ========== PARA BLOCK ========== */}
            <div className={styles.paraBlock}>

              {/*  Para title  */}
                    <span className={styles.pFade1}>
                {TopSpot ? "OWN YOUR TOP SPOT - NOTHING UPFRONT" : "10 CLIENTS EACH MONTH - NOTHING UPFRONT"}
              </span>

              {/*  First paragraph  */}
              <span className={styles.pFade2}>
                <strong>WE NAVIGATE</strong> the AI-induced turmoil Aesthetic Surgeons face right now, to deliver results within weeks. The industry standard is a three- to six-month slow burn; {TopSpot === false ? "we'll provide you with 10 Clients" : "we'll render your fortress invincible"} within thirty days. No contracts, no tie-ins but if you stay, your Clients will likely increase as your Search Presence compounds. We won't work with your 3 closest rivals while you're with us.
              </span>

              {/*  Para 2  */}
              <span className={styles.pFade3}>
                <strong>ROBIN IS THE PILOT.</strong> 25 years establishing professional equality with Hollywood Legends, as a BAFTA-nominated Film Makeup Artist, taught him how to treat top Aesthetic Surgeons. With precision, discretion and no jargon. He is your strategic shield and Personal Consultant. Our offers don't include any tech-speak. {TopSpot === false ? 'You invest nothing upfront and nothing at all if we only produce 9.' : 'You only pay us (nothing upfront) while we keep you at the top.'}
              </span>

              {/*  Para 3  */}
              <span className={styles.pFade4}>
                <strong>TAM IS THE ENGINE.</strong> He's a Cambridge Computer Science graduate, an SEO Pioneer, a former IBM Data Engineer and now a registered Semrush AI and SEO Analyst. His relentless work ethic and exclusive focus on pre-eminent Plastic, Cosmetic and Hair Restoration Surgeons, from Beverly Hills to Barcelona, the UAE and beyond, for over 25 years, is what powers us. He integrates today's cutting-edge depth of AI-SEO and Google AI Overviews Optimisation (AI-OO) with decades of technical experience, to secure you {TopSpot === false ? '10 guaranteed Clients each month you stay.' : "at the top of your professional castle's keep or propel you there."} Severely challenged websites will need 1, 2 or more repair months.
              </span>

              {/*  Para 4  */}
              <span className={styles.pFade5}>
                <strong>IT IS DATA THAT GIVES US OUR LIFT.</strong> We soar above outdated models. Our business model is disruptively q2-21C and uncompromisingly ethical. We have the Engine and the Pilot to guarantee you lift off. Click the white button to discover more.
              </span>

            </div>

            {/* ========== HERO HEADLINE ========== */}
                            <div className={styles.heroHeadlineDiv} style={{ marginTop: "100px" }}>

                                {/*  Line 1: Lock Your Top Spot  */}
                    <p className={`${styles.fadeIn} ${styles.step1}`} style={{ textAlign: "center", fontSize: TopSpot === false ? "166px" : "193px", marginLeft: "-1px", letterSpacing: "0.25px", textTransform: "uppercase" }}>
                      {TopSpot === false ? "10 CLIENTS EACH MONTH" : "OWN YOUR TOP SPOT"}
                    </p>

                                {/*  Line 2: NOTHING UPFRONT  */}
                    <p className={`${styles.fadeIn} ${styles.step2}`} style={{ textAlign: "center", fontSize: "212px", fontWeight: 900, marginTop: "100px" }}>NOTHING UPFRONT</p>

                            </div>



                </div>

                            <div className={styles.mainLandingContainer3}>

                                <h2 className={styles.ctaHeading}>
                                    So, what we can do for <span className={styles.youSpan}>you</span>?
                                </h2>

                                {/*  CTA button  scrolls to services  */}
                                <div
                                    onClick={() => { scrollToTeaser(); setBtfFired(true); }}
                                    className={`${styles.ctaButton} ${styles.step4}`}
                                >
                                    <span>CLICK <em>HERE</em> TO FIND OUT!</span>
                                </div>

                            </div>

            </div>


        {/*  SCREEN 2 BTF  */}
        <HomeBtf animate={btfFired} />

        </div>
    );
}
