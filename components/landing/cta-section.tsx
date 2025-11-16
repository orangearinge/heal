'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title with scale effect
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          y: 50,
          opacity: 0,
          scale: 0.9,
        })

        gsap.to(titleRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Animate button with bounce effect
      if (buttonRef.current) {
        gsap.set(buttonRef.current, {
          y: 40,
          opacity: 0,
          scale: 0.8,
        })

        gsap.to(buttonRef.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.3,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })

        // Add hover animation for button
        const button = buttonRef.current.querySelector('button, a')
        if (button) {
          button.addEventListener('mouseenter', () => {
            gsap.to(button, {
              scale: 1.05,
              duration: 0.2,
              ease: 'power2.out',
            })
          })

          button.addEventListener('mouseleave', () => {
            gsap.to(button, {
              scale: 1,
              duration: 0.2,
              ease: 'power2.out',
            })
          })
        }
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 bg-background min-h-screen py-16">
      <div className="mx-5 rounded-3xl  px-6 py-12 md:py-20 lg:py-32">
        <div className="text-center">
          <h2 ref={titleRef} className="text-balance text-4xl font-normal lg:text-5xl">Siap untuk meningkatkan kesehatanmu?</h2>

          <div ref={buttonRef} className="mt-12 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className='rounded-full'
            >
              <Link href="/">
                <span>Coba sekarang</span>
              </Link>
            </Button>


          </div>
        </div>
      </div>
    </section>
  )
}