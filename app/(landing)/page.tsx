import CTASection from "@/components/landing/cta-section";
import FAQSection from "@/components/landing/faq-section";
import HeroSection from "@/components/landing/hero-section";
import LogoCloud from "@/components/landing/logo-cloud";
import TestimoniSection from "@/components/landing/testimoni-section";
import SyncWearablesSection from "@/components/landing/syncing-wearables-section";
import FeatureSection from "@/components/landing/feature-section";
import AboutSection from "@/components/landing/about-section";
import TeksScroll from "@/components/landing/teks-scroll";

export default function Home() {
  return (
    <main className="flex flex-col ">
      <HeroSection />
      <LogoCloud />
      <div className="flex flex-col space-y-10">
        <SyncWearablesSection />
        <TeksScroll />
        <FeatureSection />
        <TestimoniSection />
        <AboutSection />
        <FAQSection />
      </div>
      <CTASection />
    </main>
  )
}