"use client"
import * as React from "react"
import { Plus, Search, PanelLeft } from "lucide-react"


import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
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
