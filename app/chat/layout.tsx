import { AppSidebar } from "@/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
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
