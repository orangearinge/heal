'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const blocksRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const blocks = blocksRef.current
      const text = textRef.current

      // posisi awal kotak - dari luar layar
      gsap.set(blocks[0], { x: '-120vw', y: '-20vh', opacity: 0 }) // kiri atas
      gsap.set(blocks[1], { x: '120vw', y: '-20vh', opacity: 0 })  // kanan atas
      gsap.set(blocks[2], { x: '-120vw', y: '20vh', opacity: 0 })  // kiri bawah
      gsap.set(blocks[3], { x: '120vw', y: '20vh', opacity: 0 })   // kanan bawah

      // teks mulai besar lalu mengecil
      gsap.set(text, { scale: 2, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // teks dari besar ke kecil (zoom out)
      tl.to(text, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: 'power2.out',
      })

      // kotak muncul dari samping satu-satu
      tl.to(
        blocks,
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 2,
          ease: 'power3.out',
          stagger: 0.3,
        },
        '-=0.5'
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
      className="relative flex items-center justify-center h-screen overflow-hidden bg-[#fffdfc]"
    >
      {/* TEKS */}
      <h2
        ref={textRef}
        className="text-7xl font-bold text-center text-gray-800 z-10 font-[Comic_Neue] leading-tight"
      >
        Understand <br /> your body.
      </h2>

      {/* 4 KOTAK */}
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
