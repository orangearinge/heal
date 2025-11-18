"use client"
import * as React from "react"
import { Search, PanelLeft, BadgePlus, Trash2, MoreVertical } from "lucide-react"


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
// import { NavUser } from "./user-button"
import { cn } from "@/lib/utils"
import { Logo } from "./logo"
import { Button } from "../ui/button"
import { useChatStore } from "@/lib/store"
import { ScrollArea } from "../ui/scroll-area"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "../ui/command"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Kbd } from "../ui/kbd"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { open: sidebarOpen, toggleSidebar } = useSidebar();
    const [isHovered, setIsHovered] = React.useState(false);
    const [searchOpen, setSearchOpen] = React.useState(false);
    const { chats, currentChatId, setCurrentChat, deleteChat } = useChatStore();

    // reset hover ketika sidebar kebuka
    React.useEffect(() => {
        if (sidebarOpen) setIsHovered(false);
    }, [sidebarOpen]);

    // Keyboard shortcut for search (Cmd+K)
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setSearchOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const handleNewChat = () => {
        setCurrentChat(null);
    };

    const handleLoadChat = (chatId: string) => {
        setCurrentChat(chatId);
        setSearchOpen(false);
    };

    const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        deleteChat(chatId);
    };


    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return "Baru saja";
        if (diffMins < 60) return `${diffMins}m lalu`;
        if (diffHours < 24) return `${diffHours}j lalu`;
        if (diffDays < 7) return `${diffDays}d lalu`;
        return date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
    };

    return (
        <>
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
                                    className="w-fit group/item relative transition-all duration-200 flex items-center"
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
                                        <Button
                                            variant={"outline"}
                                            className="flex justify-start rounded-full py-5"
                                            onClick={() => setSearchOpen(true)}
                                        >
                                            <Search />
                                            <span className="text-base flex items-center gap-2">Search<Kbd >
                                                ⌘ K
                                            </Kbd>
                                            </span>
                                        </Button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild>
                                        <Button
                                            variant={"secondary"}
                                            className="flex justify-start py-5 "
                                            onClick={handleNewChat}
                                        >
                                            <BadgePlus />
                                            <span className="text-base items-center flex gap-2">New Chat
                                                <Kbd>⌘ J</Kbd>
                                            </span>
                                        </Button>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                    {/* Chat History */}
                    <SidebarGroup>
                        <SidebarGroupContent>
                            {chats.length > 0 ? (
                                <ScrollArea className="h-[calc(100vh-300px)]">
                                    <SidebarMenu>
                                        {chats.map((chat) => (
                                            <SidebarMenuItem key={chat.id}>
                                                <div className="group relative">
                                                    <SidebarMenuButton
                                                        isActive={currentChatId === chat.id}
                                                        onClick={() => handleLoadChat(chat.id)}
                                                        size={"lg"}
                                                        className={cn(
                                                            "w-full justify-start rounded-lg pr-8",
                                                            currentChatId === chat.id && "bg-muted"
                                                        )}
                                                    >
                                                        <div className="flex-1 min-w-0 ml-2 text-left ">
                                                            <p className="text-sm font-medium truncate ">
                                                                {chat.title.length > 25
                                                                    ? chat.title.slice(0, 25) + "…"
                                                                    : chat.title}
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                {formatDate(chat.updatedAt)}
                                                            </p>
                                                        </div>
                                                    </SidebarMenuButton>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <button
                                                                onClick={(e) => e.stopPropagation()}
                                                                className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity shrink-0 p-1 hover:bg-muted rounded"
                                                            >
                                                                <MoreVertical className="size-3 text-muted-foreground" />
                                                            </button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" side="right">
                                                            <DropdownMenuItem
                                                                variant="destructive"
                                                                onClick={(e) => handleDeleteChat(chat.id, e)}
                                                            >
                                                                <Trash2 className="size-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </ScrollArea>
                            ) : (
                                <div className="px-2 py-4 text-sm text-muted-foreground text-center">
                                    Belum ada chat history
                                </div>
                            )}
                        </SidebarGroupContent>
                    </SidebarGroup>

                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                {/* <NavUser  /> */}
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
                <SidebarRail />
            </Sidebar>
            <CommandDialog open={searchOpen} onOpenChange={setSearchOpen}>
                <CommandInput placeholder="Cari chat history..." />
                <CommandList>
                    <CommandEmpty>Tidak ada chat yang ditemukan.</CommandEmpty>
                    <CommandGroup heading="Chat History">
                        {chats.map((chat) => (
                            <CommandItem
                                key={chat.id}
                                value={chat.title}
                                onSelect={() => handleLoadChat(chat.id)}
                                className={cn(
                                    "flex items-center gap-2 cursor-pointer",
                                    currentChatId === chat.id && "bg-muted"
                                )}
                            >
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {chat.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        {formatDate(chat.updatedAt)}
                                    </p>
                                </div>
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
