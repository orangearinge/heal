"use client"
import * as React from "react"
import { Plus, Search, PanelLeft, PlusCircle, BadgePlus } from "lucide-react"


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
import { Logo } from "./logo"
import { Button } from "../ui/button"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { open: sidebarOpen, toggleSidebar } = useSidebar();
    const [isHovered, setIsHovered] = React.useState(false);

    // reset hover ketika sidebar kebuka
    React.useEffect(() => {
        if (sidebarOpen) setIsHovered(false);
    }, [sidebarOpen]);

    return (
        <Sidebar {...props} collapsible="offcanvas">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem className="flex justify-between items-center">
                        {sidebarOpen ? (
                            <SidebarMenuButton className="w-fit">
                                <Logo className="text-md" />
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
                                <SidebarMenuButton asChild>
                                    <Button variant={"outline"} className="flex justify-start rounded-full py-5" >
                                        <Search />
                                        <span className="text-base  hover">Search<kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                                            <span className="text-xs">⌘</span>K
                                        </kbd>
                                        </span>
                                    </Button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Button variant={"secondary"} className="flex justify-start py-5">
                                        <BadgePlus />
                                        <span className="text-base  hover">New Chat<kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                                            <span className="text-xs">⌘</span>J
                                        </kbd>
                                        </span>
                                    </Button>
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
