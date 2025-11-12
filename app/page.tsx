import CTASection from "@/components/landing/cta-section";
import FAQSection from "@/components/landing/faq-section";
import FeatureBlokSection from "@/components/landing/feature-blok-section";
import FooterSection from "@/components/landing/footer-section.tsx";
import HeroSection from "@/components/landing/hero-section";
import LogoCloud from "@/components/landing/logo-cloud";
import ProblemSolutionSection from "@/components/landing/problem-solution-section";
import TestimoniSection from "@/components/landing/testimoni-section";
import { HeroHeader } from "@/components/layout/hero-header";
import SyncWearablesSection from "@/components/landing/syncing-wearables-section";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <HeroHeader />
      <HeroSection />
      <LogoCloud />
      <div className="flex flex-col space-y-10">
        <FeatureBlokSection />
        <SyncWearablesSection />
        <ProblemSolutionSection />
        <FAQSection />
        <TestimoniSection />
      </div>
      <CTASection />
      <FooterSection />
    </main>
  )
}