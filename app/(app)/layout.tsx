"use client";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuth } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { isLoaded, isSignedIn } = useAuth();

    if (!isLoaded) {
        return <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin " />
            <p className="text-sm">Loading...</p>
        </div>
    }   
    if (!isSignedIn) {
        redirect("/");
    }

    return (
        <div>
            <SidebarProvider >
                <AppSidebar variant="sidebar" />
                <SidebarInset >
                    <div className="@container/main ">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </div>
    );
}
