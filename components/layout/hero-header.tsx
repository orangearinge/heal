// components/header-client.tsx
'use client'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React from 'react'
import { cn } from '@/lib/utils'
import {
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs'
import { ModeToggle } from './mode-toggle'
import { usePathname } from 'next/navigation'
import { HyperText } from '../ui/hyper-text'

const menuItems = [
    { name: 'Solusi', href: '/#solution' },
    { name: 'Fitur', href: '/#features' },
    // { name: 'Harga', href: '#pricing' },
    { name: 'Tentang', href: '/about' },
    { name: 'Kontak', href: '/contact' },
]


export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const pathname = usePathname()
    const isNotLanding = pathname !== '/'


    return (
        <header className='z-50'>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full ">
                <div className={cn(' transition-all duration-300 lg:px-12 px-7 pt-2', isScrolled && 'bg-background pt-0    backdrop-blur-lg lg:px-5', isNotLanding && "px-5 lg:px-5")}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-2 lg:gap-0 lg:py-2">
                        <div className="flex w-full justify-between lg:w-auto">

                            <Link
                                href="/"
                                aria-label="home"
                            >

                                <HyperText className={cn(isScrolled ? "flex items-center space-x-2 text-xl" : "flex items-center space-x-2 text-white text-xl", isNotLanding ? "text-foreground" : "")}>
                                    Heal
                                </HyperText>
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className={cn("relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden",
                                    isScrolled ? "text-foreground" : "text-white"
                                )}>

                                <Menu className={cn("in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200")}
                                />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className={cn(isScrolled ? "text-foreground hover:text-accent-foreground block duration-150" : "text-white", isNotLanding && "text-foreground")}>
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl  p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                href={item.href}
                                                className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                <span>{item.name}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <ModeToggle className={cn("hidden md:flex", !isScrolled && "text-white", isNotLanding && "text-foreground ")} />
                                <ModeToggle className="md:hidden" />
                                <SignedOut>
                                    <SignInButton mode='modal'>
                                        <Button
                                            size="lg"
                                            className={cn("hidden md:flex", isScrolled ? 'rounded-full  ' : 'rounded-full  bg-white/20 hover:bg-white/30 text-white ', isNotLanding && "bg-foreground text-background hover:bg-foreground/90")}>
                                            Masuk
                                        </Button>

                                    </SignInButton>
                                    <SignInButton mode='modal'>
                                        <Button
                                            size="lg"
                                            className="rounded-full md:hidden">
                                            Masuk
                                        </Button>
                                    </SignInButton>
                                </SignedOut>
                                <SignedIn>
                                    <Button
                                        size="lg"
                                        asChild
                                        className={cn("hidden md:flex", isScrolled ? 'rounded-full ' : 'rounded-full  bg-white/20 hover:bg-white/30 text-white ', isNotLanding && "bg-foreground text-background hover:bg-foreground/90")}>
                                        <Link href="/chat">
                                            Konsultasi
                                        </Link>
                                    </Button>
                                    <Button
                                        size="lg"
                                        asChild
                                        className={cn(" rounded-full md:hidden")}>
                                        <Link href="/chat">
                                            Konsultasi
                                        </Link>
                                    </Button>
                                    <UserButton />
                                </SignedIn>
                                {/* <Select>
                                    <SelectTrigger showChevron={false} size="sm">
                                        <Languages className={cn(isScrolled ? 'text-foreground' : 'text-white')} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="id">Bahasa Indonesia</SelectItem>
                                    </SelectContent>
                                </Select> */}
                            </div>
                        </div>
                    </div>
                </div>
            </nav >
        </header >
    )



}

