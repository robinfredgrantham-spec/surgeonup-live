/* FILE: useScrollToTeaser.js
   DATE: 29-May-26
   ============================================================================
   SCROLL-TO-TEASER HOOK  —  Surge-on Up  —  surgeonup.com

   Returns a ref and a scroll function.
   Attach the ref to the Teaser screen on the Home page, then call scrollTo()
   to smooth-scroll down to it, pulled back by the fixed-header offset so the
   Teaser is not hidden behind the header.

   USAGE:
     const { ref, scrollTo } = useScrollToTeaser(100);
     <div ref={ref}>Teaser content</div>
     <div onClick={scrollTo}>Click here</div>

   offset (default 100px): compensates for the fixed header height.
   ============================================================================ */

import { useRef } from "react";

export default function useScrollToTeaser(offset = 100) {

  /* — Ref attached to the Teaser screen element — */
  const ref = useRef(null);

  /* — Smooth-scroll to the Teaser, pulled up by the header offset — */
  const scrollTo = () => {

    const teaser = ref.current;

    /* — Guard: exit if the ref is not yet attached to the DOM — */
    if (!teaser) return;

    /* — Absolute page position of the Teaser, minus the header height — */
    const y = teaser.getBoundingClientRect().top + window.scrollY - offset;

    /* — Scroll the window to the calculated position (offset now honoured) — */
    window.scrollTo({ top: y, behavior: "smooth" });

  };

  /* — Return both so the caller can attach the ref and trigger the scroll — */
  return { ref, scrollTo };

}
