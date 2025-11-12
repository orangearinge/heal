'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const blocksRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = blocksRef.current

      // Set posisi awal: keluar dari layar
      gsap.set(blocks[0], { x: '-150%', y: '-150%', opacity: 0 })
      gsap.set(blocks[1], { x: '150%', y: '-150%', opacity: 0 })
      gsap.set(blocks[2], { x: '-150%', y: '150%', opacity: 0 })
      gsap.set(blocks[3], { x: '150%', y: '150%', opacity: 0 })

      // Timeline interaktif saat scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom top',
          scrub: 1,
          toggleActions: 'play none none reverse',
        },
      })

      tl.to(blocks, {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: 'power3.out',
        stagger: 0.2,
      }).to(
        blocks,
        {
          scale: 1.3,
          duration: 1,
          ease: 'power2.inOut',
        },
        '+=0.5'
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !blocksRef.current.includes(el)) {
      blocksRef.current.push(el)
    }
  }

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center h-screen bg-[#f8f8f8] overflow-hidden"
    >
      <h2 className="text-3xl font-semibold text-center z-10 font-[Comic_Neue] relative">
        Understand <br /> your body.
      </h2>

      {/* 4 blok */}
      <div
        ref={addToRefs}
        className="absolute w-24 h-24 bg-[#f9dcdc] border-[3px] border-[#e54b4b] rounded-xl"
      />
      <div
        ref={addToRefs}
        className="absolute w-24 h-24 bg-[#f9dcdc] border-[3px] border-[#e54b4b] rounded-xl"
      />
      <div
        ref={addToRefs}
        className="absolute w-24 h-24 bg-[#f9dcdc] border-[3px] border-[#e54b4b] rounded-xl"
      />
      <div
        ref={addToRefs}
        className="absolute w-24 h-24 bg-[#f9dcdc] border-[3px] border-[#e54b4b] rounded-xl"
      />
    </section>
  )
}
