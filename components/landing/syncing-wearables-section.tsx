'use client'

import Image from "next/image";
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Highlighter } from "../ui/highlighter";

gsap.registerPlugin(ScrollTrigger)

export default function SyncWearablesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const logoGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title with proper HTML handling
      if (titleRef.current) {
        // Function to wrap text nodes with spans while preserving HTML structure
        const wrapTextNodes = (element: HTMLElement) => {
          const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            null
          )

          const textNodes: Text[] = []
          let node

          while (node = walker.nextNode()) {
            if (node.textContent?.trim()) {
              textNodes.push(node as Text)
            }
          }

          textNodes.forEach(textNode => {
            const words = textNode.textContent?.split(' ').filter(word => word.trim()) || []
            if (words.length > 0) {
              const fragment = document.createDocumentFragment()

              words.forEach((word, index) => {
                const span = document.createElement('span')
                span.className = 'word-animate'
                span.textContent = word
                fragment.appendChild(span)

                if (index < words.length - 1) {
                  fragment.appendChild(document.createTextNode(' '))
                }
              })

              textNode.parentNode?.replaceChild(fragment, textNode)
            }
          })
        }

        wrapTextNodes(titleRef.current)

        const wordElements = titleRef.current.querySelectorAll('.word-animate')

        // Set initial state for words
        gsap.set(wordElements, {
          y: 30,
          opacity: 0,
        })

        // Animate words on scroll
        gsap.to(wordElements, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Animate logo grid
      if (logoGridRef.current) {
        const logoItems = logoGridRef.current.children

        gsap.set(logoItems, {
          y: 60,
          opacity: 0,
          scale: 0.8,
        })

        gsap.to(logoItems, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: logoGridRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="solution" className="z-10 relative py-16 md:py-32 bg-background">
      <div className="mx-auto  flex flex-col items-center gap-16 px-6">
        {/* Top content: title & description side by side */}
        <div ref={titleRef} className="flex flex-col md:flex-row justify-between items-start w-full gap-8 text-center">
          <h2 className="text-4xl font-normal lg:text-6xl w-full ">
            Menyinkronkan perangkat{" "}
            <span className="text-[#2d94b3]">
              wearable
            </span>
            , kami membantu Anda membuat keputusan kesehatan yang lebih cerdas.
          </h2>
        </div>


        {/* Bottom content: logo grid */}
        <div ref={logoGridRef} className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center w-full">
          {[
            { src: "/AppleWatchLogoFull.svg", alt: "Apple Watch" },
            { src: "/GarminLogoFull.svg", alt: "Garmin" },
            { src: "/OuraLogoFull.svg", alt: "Oura Ring" },
            { src: "/WhoopLogoFull.svg", alt: "Whoop" },
          ].map((logo, index) => (
            <div key={index} className="p-10 rounded-lg items-center flex justify-center bg-muted  ">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={160}
                height={160}
                className="object-contain dark:invert"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
