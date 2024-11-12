"use client";

import CharacteristicsLanding from "@/components/Landing/CharacteristicsLanding";
import FooterLanding from "@/components/Landing/FooterLanding";
import HeroLanding from "@/components/Landing/HeroLanding";
import NavbarLanding from "@/components/Landing/NavbarLanding";
import NewsletterLanding from "@/components/Landing/NewsletterLanding";
import TestimonialsLanding from "@/components/Landing/TestimonialsLanding";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <NavbarLanding />

      <main className="pt-24">
        <HeroLanding />
        <CharacteristicsLanding />
        <NewsletterLanding />
        <TestimonialsLanding />
      </main>

      <FooterLanding />
    </div>
  );
}
