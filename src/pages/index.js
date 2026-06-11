'use client'

import Head from "next/head";
import Landing from "@/components/landing/landing";
import Teaser from "@/components/teaser/Teaser";
import useScrollToTeaser from "@/hooks/useScrollToTeaser";

export default function Home() {

  const { ref: teaserRef, scrollTo: scrollToTeaser } = useScrollToTeaser(100);

  return (
    <>
      <Head>
        <title>SurgeonUp - AI-SEO & Google AI Overviews Optimization for Aesthetic Surgeons</title>
        <meta name="description" content="SurgeonUp specializes in AI-SEO and Google AI Overviews (AI-OO) optimization for Aesthetic Surgeons. Guaranteed 10 new clients in 30 days with no upfront cost. Expert SEO services from Beverly Hills to Barcelona." />
        <meta name="keywords" content="AI-SEO, Google AI Overviews, Aesthetic Surgeons SEO, AI-OO optimization, surgeon marketing, medical SEO, client acquisition, SEO for surgeons" />
        <meta property="og:title" content="SurgeonUp - AI-SEO & Google AI Overviews Optimization for Aesthetic Surgeons" />
        <meta property="og:description" content="Guaranteed 10 new clients in 30 days. Specializing in AI-SEO and Google AI Overviews optimization for Aesthetic Surgeons. No upfront cost." />
        <meta property="og:url" content="https://surgeonup.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="SurgeonUp" />
        <meta name="twitter:title" content="SurgeonUp - AI-SEO & Google AI Overviews Optimization for Aesthetic Surgeons" />
        <meta name="twitter:description" content="Guaranteed 10 new clients in 30 days. Specializing in AI-SEO and Google AI Overviews optimization for Aesthetic Surgeons." />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://surgeonup.com/" />
      </Head>

      <div style={{ width: "100vw", position: "relative", left: "50%", right: "50%", marginLeft: "-50vw", marginRight: "-50vw", marginTop: "17px" }}>
        <Landing scrollToTeaser={scrollToTeaser} />

        <div ref={teaserRef}>
          <Teaser />
        </div>
      </div>
    </>
  );
}
