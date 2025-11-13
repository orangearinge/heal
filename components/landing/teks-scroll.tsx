'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Plus, Send, Shuffle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function TeksScroll() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const textsRef = useRef<HTMLDivElement[]>([])

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !textsRef.current.includes(el)) {
      textsRef.current.push(el)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=1500',       // 🧠 makin besar makin lambat
          scrub: 1.5,          // nilai >1 bikin transisi lebih halus
          pin: true,
          anticipatePin: 1,
        },
      })

      // animasi muncul satu per satu, halus
      tl.from(textsRef.current, {
        y: 120,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        ease: 'power1.out',
        stagger: {
          amount: 2.2, // lebih panjang agar tiap teks muncul lebih lembut
          from: 'start',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex flex-col justify-center items-center h-screen space-y-10 overflow-hidden bg-white"
    >
      {/* Add */}
      <div ref={addToRefs} className="flex items-center space-x-4">
        <div className="bg-green-500 text-white p-5 rounded-2xl flex items-center justify-center shadow-lg">
          <Plus size={30} />
        </div>
        <h2 className="text-6xl font-bold text-green-500">Add</h2>
      </div>

      {/* Send */}
      <div ref={addToRefs} className="flex items-center space-x-4">
        <div className="bg-blue-500 text-white p-5 rounded-2xl flex items-center justify-center shadow-lg">
          <Send size={30} />
        </div>
        <h2 className="text-6xl font-bold text-blue-500">Send</h2>
      </div>

      {/* Exchange */}
      <div ref={addToRefs} className="flex items-center space-x-4">
        <div className="bg-red-500 text-white p-5 rounded-2xl flex items-center justify-center shadow-lg">
          <Shuffle size={30} />
        </div>
        <h2 className="text-6xl font-bold text-red-500">Exchange</h2>
      </div>
    </section>
  )
}
