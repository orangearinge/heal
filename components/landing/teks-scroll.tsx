'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

gsap.registerPlugin(ScrollTrigger)

export default function TeksScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textsRef = useRef<HTMLDivElement[]>([])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !textsRef.current.includes(el)) textsRef.current.push(el)
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(textsRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.8,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2000',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          pinSpacing: true,
          invalidateOnRefresh: true,
        },
      })

      tl.to(textsRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: {
          amount: 1.5,
          from: 'start',
        },
      }).to({}, { duration: 0.5 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex flex-col justify-center items-left items-center h-screen px-6 space-y-10 overflow-hidden "
    >
      {/* Track */}
      <div ref={addToRefs} className="flex items-center space-x-4">
        <div className="relative flex w-full h-full gap-4 bg-muted p-2 rounded-2xl items-center">
          <Image
            src="/track.png"
            className="object-cover rounded-lg"
            height={100}
            width={100}
            alt="Track"
          />
          <h2 className="text-5xl pr-4 md:text-8xl text-[#af9150] text-balance">Track</h2>
        </div>
      </div>

      {/* Talk */}
      <div ref={addToRefs} className="flex items-center space-x-4">
        <div className="relative flex w-full h-full gap-4 bg-muted p-2 rounded-2xl items-center">
          <Image
            src="/talk.png"
            className="object-cover rounded-lg"
            height={100}
            width={100}
            alt="Talk"
          />
          <h2 className="text-5xl pr-4 md:text-8xl text-balance">Talk</h2>
        </div>
      </div>

      {/* Recover */}
      <div ref={addToRefs} className="flex items-center space-x-4">
        <div className="relative flex w-full h-full gap-4 bg-muted p-2 rounded-2xl items-center">
          <Image
            src="/recover.png"
            className="object-cover rounded-lg"
            height={100}
            width={100}
            alt="Recover"
          />
          <h2 className="text-5xl pr-4 md:text-8xl text-[#2d94b3] text-balance">Recover</h2>
        </div>
      </div>
    </section>
  )
}
