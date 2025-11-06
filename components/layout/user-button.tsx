// components/session?.user-button-client.tsx
'use client'
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "next-themes";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function UserButton() {
    const { setTheme, theme } = useTheme();
    // const { data: session } = authClient.useSession();
    // const router = useRouter()


    // const handleLogout = async () => {
    //     await authClient.signOut({
    //         fetchOptions: {
    //             onSuccess: () => {
    //                 router.push("/");
    //             },
    //         },
    //     });
    // };
    const handleLogout = () => {
        console.log("Logout");
    };



    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8 rounded-lg">
                        {/* {session?.user?.image ? (
                            <Image src={session.user.image} alt={session.user.name ?? ""} fill />
                        ) : (
                            <AvatarFallback className="rounded-lg">
                                {session?.user?.name?.[0]?.toUpperCase() ?? "K"}
                            </AvatarFallback>
                        )} */}
                        <AvatarFallback className="rounded-lg">
                            {"H"}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="p-2">
                    <p className="text-sm font-medium">{"Hafidz"}</p>
                    {/* {session?.user?.email && (
                        <p className="text-xs text-muted-foreground">{session?.user.email}</p>
                    )} */}
                </div>

                <DropdownMenuItem asChild>
                    <Link href="/studio/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="w-full text-left flex items-center" onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    );
}