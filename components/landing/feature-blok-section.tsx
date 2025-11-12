'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FeatureBlokSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textsRef = useRef<HTMLHeadingElement[]>([])

  const addToRefs = (el: HTMLHeadingElement | null) => {
    if (el && !textsRef.current.includes(el)) {
      textsRef.current.push(el)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%', // mulai muncul saat section masuk viewport
          end: 'bottom top',
          scrub: false,
          toggleActions: 'play none none reverse',
        },
      })

      tl.from(textsRef.current, {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.4, // muncul satu-satu
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex flex-col justify-center items-center space-y-10 overflow-hidden"
    >
      <h2
        ref={addToRefs}
        className="text-4xl font-bold text-green-600"
      >
        Track
      </h2>
      <h2
        ref={addToRefs}
        className="text-4xl font-bold text-blue-500"
      >
        Talk
      </h2>
      <h2
        ref={addToRefs}
        className="text-4xl font-bold text-red-500"
      >
        Recover
      </h2>
    </section>
  )
}
