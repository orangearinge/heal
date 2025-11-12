import CTASection from "@/components/landing/cta-section";
import FAQSection from "@/components/landing/faq-section";
import FooterSection from "@/components/landing/footer-section.tsx";
import HeroSection from "@/components/landing/hero-section";
import LogoCloud from "@/components/landing/logo-cloud";
import TestimoniSection from "@/components/landing/testimoni-section";
import { HeroHeader } from "@/components/layout/hero-header";
import SyncWearablesSection from "@/components/landing/syncing-wearables-section";
import FeatureSection from "@/components/landing/feature-section";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <HeroHeader />
      <HeroSection />
      <LogoCloud />
      <div className="flex flex-col space-y-10">
        <SyncWearablesSection />
        <FeatureSection />
        <TestimoniSection />
        <FAQSection />
      </div>
      <CTASection />
      <FooterSection />
    </main>
  )
}