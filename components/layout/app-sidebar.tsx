"use client"
import * as React from "react"
import { ChevronRight, Plus, Search, PanelLeft } from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
    useSidebar,
} from "@/components/ui/sidebar"
import { UserButton } from "./user-button"
import { cn } from "@/lib/utils"

// This is sample data.
const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain: [
        {
            title: "Getting Started",
            url: "#",
            items: [
                {
                    title: "Installation",
                    url: "#",
                },
                {
                    title: "Project Structure",
                    url: "#",
                },
            ],
        },
        {
            title: "Building Your Application",
            url: "#",
            items: [
                {
                    title: "Routing",
                    url: "#",
                },
                {
                    title: "Data Fetching",
                    url: "#",
                    isActive: true,
                },
                {
                    title: "Rendering",
                    url: "#",
                },
                {
                    title: "Caching",
                    url: "#",
                },
                {
                    title: "Styling",
                    url: "#",
                },
                {
                    title: "Optimizing",
                    url: "#",
                },
                {
                    title: "Configuring",
                    url: "#",
                },
                {
                    title: "Testing",
                    url: "#",
                },
                {
                    title: "Authentication",
                    url: "#",
                },
                {
                    title: "Deploying",
                    url: "#",
                },
                {
                    title: "Upgrading",
                    url: "#",
                },
                {
                    title: "Examples",
                    url: "#",
                },
            ],
        },
        {
            title: "API Reference",
            url: "#",
            items: [
                {
                    title: "Components",
                    url: "#",
                },
                {
                    title: "File Conventions",
                    url: "#",
                },
                {
                    title: "Functions",
                    url: "#",
                },
                {
                    title: "next.config.js Options",
                    url: "#",
                },
                {
                    title: "CLI",
                    url: "#",
                },
                {
                    title: "Edge Runtime",
                    url: "#",
                },
            ],
        },
        {
            title: "Architecture",
            url: "#",
            items: [
                {
                    title: "Accessibility",
                    url: "#",
                },
                {
                    title: "Fast Refresh",
                    url: "#",
                },
                {
                    title: "Next.js Compiler",
                    url: "#",
                },
                {
                    title: "Supported Browsers",
                    url: "#",
                },
                {
                    title: "Turbopack",
                    url: "#",
                },
            ],
        },
        {
            title: "Community",
            url: "#",
            items: [
                {
                    title: "Contribution Guide",
                    url: "#",
                },
            ],
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { open: sidebarOpen, toggleSidebar } = useSidebar();
    const [isHovered, setIsHovered] = React.useState(false);

    // reset hover ketika sidebar kebuka
    React.useEffect(() => {
        if (sidebarOpen) setIsHovered(false);
    }, [sidebarOpen]);

    return (
        <Sidebar {...props} collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex justify-between items-center">
                        {sidebarOpen ? (
                            <SidebarMenuButton className="w-fit">
                                <span>H.</span>
                            </SidebarMenuButton>
                        ) : (
                            <SidebarMenuButton
                                className="w-fit group relative transition-all duration-200 flex items-center"
                                // aktifkan hover cuma saat sidebar closed
                                onMouseEnter={() => !sidebarOpen && setIsHovered(true)}
                                onMouseLeave={() => !sidebarOpen && setIsHovered(false)}
                                onClick={toggleSidebar}
                            >
                                <div className="relative flex items-center justify-center w-5 h-5">
                                    <span
                                        className={cn(
                                            "absolute transition-all duration-200",
                                            isHovered
                                                ? "opacity-0 scale-75"
                                                : "opacity-100 scale-100"
                                        )}
                                    >
                                        H.
                                    </span>

                                    <PanelLeft
                                        className={cn(
                                            "absolute w-4 h-4 transition-all duration-200",
                                            isHovered
                                                ? "opacity-100 scale-100"
                                                : "opacity-0 scale-125"
                                        )}
                                    />
                                </div>

                            </SidebarMenuButton>
                        )}

                        {sidebarOpen && <SidebarTrigger />}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="gap-0">
                {/* We create a collapsible SidebarGroup for each parent. */}
                <SidebarGroup>
                    <SidebarGroupContent className="flex flex-col gap-4">
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton variant={"outline"}>
                                    < Plus />
                                    <span className="text-base  hover">New Chat</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    < Search />
                                    <span className="text-base  hover">Search</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    < Plus />
                                    <span className="text-base  hover">New Chat</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>

                    </SidebarGroupContent>
                </SidebarGroup>

            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <UserButton />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar >
    )
}
