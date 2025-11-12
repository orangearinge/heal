import CTASection from "@/components/landing/cta-section";
import FAQSection from "@/components/landing/faq-section";
import FeatureSection from "@/components/landing/feature-section";
import FooterSection from "@/components/landing/footer-section.tsx";
import HeroSection from "@/components/landing/hero-section";
import ProblemSolutionSection from "@/components/landing/problem-solution-section";
import TestimoniSection from "@/components/landing/testimoni-section";
import { HeroHeader } from "@/components/layout/hero-header";

export default function Home() {
  return (
    <main className="flex flex-col gap-4 ">
      <HeroHeader />
      <HeroSection />
      <FeatureSection />
      <ProblemSolutionSection />
      <FAQSection />
      <TestimoniSection />
      <CTASection />
      <FooterSection />
    </main>
  )
}