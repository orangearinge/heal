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
    if (el && !textsRef.current.includes(el)) {
      textsRef.current.push(el)
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state for all text elements
      gsap.set(textsRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.8,
      })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=2000', // Increased for more control
          scrub: 1, // Smoother scrub value
          pin: true,
          anticipatePin: 1,
          pinSpacing: true, // Ensures proper spacing after pin
          invalidateOnRefresh: true,
        },
      })

      // Improved animation sequence
      tl.to(textsRef.current, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
        stagger: {
          amount: 1.5, // Optimized stagger timing
          from: 'start',
        },
      })
        // Add a pause at the end to ensure animation completes
        .to({}, { duration: 0.5 })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="flex flex-col justify-center h-screen space-y-10 overflow-hidden px-6 items-center"
    >
      {/* Add */}
      <div ref={addToRefs} className="flex items-center space-x-4 rounded-full ">
        <div className=' w-full relative h-full flex'>
          <div className=' w-full relative h-full flex gap-4 border p-2 rounded '>
            <Image
              src={"/track.png"}
              className='object-cover rounded rotate-6'
              height={100}
              width={100}
              alt='ok'
            />
          </div>
          <h2 className="text-8xl  text-balance text-[#af9150]">Track</h2>
        </div >
      </div>

      {/* Send */}
      <div ref={addToRefs} className="flex items-center space-x-4 ">
        <div className=' w-full relative h-full flex gap-4 border p-2 rounded '>
          <Image
            src={"/talk.png"}
            className='object-cover rounded -rotate-6'
            height={100}
            width={100}
            alt='ok'
          />
        </div>
        <h2 className="text-8xl text-balance">Talk</h2>

      </div>

      {/* Exchange */}
      <div ref={addToRefs} className="flex items-center space-x-4 ">
        <div className=' w-full relative h-full flex gap-4 border p-2 rounded '>
          <Image
            src={"/recover.png"}
            className='object-cover rounded rotate-6'
            height={100}
            width={100}
            alt='ok'
          />
        </div>
        <h2 className="text-8xl text-balance  text-[#2d94b3]">Recover</h2>

      </div>

    </section>
  )
}
