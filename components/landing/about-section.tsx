'use client'

import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          y: 40,
          opacity: 0,
        })

        gsap.to(titleRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Animate description
      if (descriptionRef.current) {
        gsap.set(descriptionRef.current, {
          y: 40,
          opacity: 0,
        })

        gsap.to(descriptionRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: descriptionRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Animate cards
      if (cardsRef.current) {
        const cards = cardsRef.current.children

        gsap.set(cards, {
          y: 60,
          opacity: 0,
          scale: 0.95,
        })

        gsap.to(cards, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

    return (
        <section ref={sectionRef} id='about' className="relative z-40 bg-background py-16 md:py-32">
            <div className="mx-auto  flex flex-col items-center gap-16 px-6">
                {/* Top content: title & description side by side */}
                <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8">
                    <h2 ref={titleRef} className="text-md font-normal lg:text-3xl max-w-xl">
                        About {" "}
                    </h2>
                    <p ref={descriptionRef} className="text-muted-foreground max-w-4xl">
                        TrueHealness was created for those who are done guessing. For those who&apos;ve felt unseen in a system that treats people like averages. We built a platform that listens deeply— to your biology, your habits, your goals, and your story. We translate scattered health data into clarity, connection, and care that actually fits.
                    </p>
                </div>


                {/* Bottom content: logo grid */}
                <div ref={cardsRef} className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 justify-items-start w-full">
                    {[
                        {
                            title: "Personalized Precision", desc: "We combine expert clinical insights with advanced technology, delivering health strategies uniquely tailored to your biology, goals, and daily rhythms—moving beyond generic solutions into truly personalized care."
                        },
                        {
                            title: "Adaptive Intelligence", desc: "Our closed loop Salus Framework continuously adapts to your evolving health signals, ensuring that every recommendation remains precise, relevant, and timely— backed by rigorous clinician oversight and state of the art AI."
                        },
                        {
                            title: "Trusted Transparency", desc: "Our commitment to security, clarity, and accountability means your health data remains private and your journey is supported by verifiable science and compassionate guidance."
                        }
                    ].map((content, index) => (
                        <Card key={index} className="w-full">
                            <CardHeader>

                                <CardTitle>
                                    {content.title}
                                </CardTitle>
                                <CardDescription>
                                    {content.desc}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
