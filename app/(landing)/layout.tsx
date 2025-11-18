import FooterSection from "@/components/landing/footer-section";
import { HeroHeader } from "@/components/layout/hero-header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div >
            <HeroHeader />
            {children}
            <FooterSection />
        </div>
    );
}
