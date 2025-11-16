"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const links = [
    { title: "Solusi", href: "/#solution" },
    { title: "Fitur", href: "/#features" },
    { title: "Tentang", href: "/#about" },
    { title: "Kontak", href: "/contact" },
    { title: "Github", href: "https://github.com/orangearinge/heal" },
]

export default function FooterSection() {
    const healRef = useRef<HTMLParagraphElement | null>(null)

    useEffect(() => {
        const el = healRef.current
        if (!el) return

        const letters = el.querySelectorAll(".heal-letter")

        gsap.fromTo(
            letters,
            {
                y: 200,
                opacity: 0,
                rotateX: 30,
            },
            {
                y: 0,
                opacity: 1,
                rotateX: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                },
            }
        )
    }, [])


    return (
        <footer className="px-6   overflow-hidden  flex flex-col justify-between">
            <div className="flex border-b pb-4 flex-wrap justify-between gap-6 pt-6">
                <span className="text-muted-foreground order-last block text-center text-sm md:order-first">
                    © {new Date().getFullYear()} Heal by <a className="hover:underline" target="_blank" rel="noreferrer" href="https://github.com/orangearinge">orangearinge</a>
                </span>

                <div className="order-first flex flex-wrap justify-center gap-6 text-sm md:order-last">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary block duration-150"
                        >
                            {link.title}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="w-full flex flex-col">
                <p
                    ref={healRef}
                    className="
    w-full
    font-logo
    leading-[0.8]
    select-none
    whitespace-nowrap
    text-[clamp(8rem,35vw,60rem)]
    pointer-events-none
  "
                >
                    {"HEAL".split("").map((char, i) => (
                        <span key={i} className="heal-letter inline-block">
                            {char}
                        </span>
                    ))}
                </p>

            </div>
        </footer>

    )
}
