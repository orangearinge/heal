'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FAQsFour() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descriptionRef = useRef<HTMLParagraphElement>(null)
  const accordionRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLParagraphElement>(null)

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
          y: 30,
          opacity: 0,
        })

        gsap.to(descriptionRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.7,
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

      // Animate accordion
      if (accordionRef.current) {
        gsap.set(accordionRef.current, {
          y: 50,
          opacity: 0,
        })

        gsap.to(accordionRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: accordionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Animate footer
      if (footerRef.current) {
        gsap.set(footerRef.current, {
          y: 20,
          opacity: 0,
        })

        gsap.to(footerRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const faqItems = [
    {
      id: 'item-1',
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-5 business days, depending on your location. Express shipping options are available at checkout for 1-2 business day delivery.',
    },
    {
      id: 'item-2',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, and Google Pay. For enterprise customers, we also offer invoicing options.',
    },
    {
      id: 'item-3',
      question: 'Can I change or cancel my order?',
      answer: 'You can modify or cancel your order within 1 hour of placing it. After this window, please contact our customer support team who will assist you with any changes.',
    },
    {
      id: 'item-4',
      question: 'Do you ship internationally?',
      answer: "Yes, we ship to over 50 countries worldwide. International shipping typically takes 7-14 business days. Additional customs fees may apply depending on your country's import regulations.",
    },
    {
      id: 'item-5',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some specialty items may have different return terms, which will be noted on the product page.',
    },
  ]

  return (
    <section ref={sectionRef} className="relative z-50 bg-background py-16 md:py-24">
      <div className="mx-auto px-6 md:px-6">
        <div className="">
          <h2 ref={titleRef} className="text-balance font-normal text-3xl  lg:text-3xl">Frequently Asked Questions</h2>
          <p ref={descriptionRef} className="text-muted-foreground mt-4 text-balance">Discover quick and comprehensive answers to common questions about our platform, services, and features.</p>
        </div>

        <div className="mt-12">
          <Accordion
            ref={accordionRef}
            type="single"
            collapsible
            className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1">
            {faqItems.map((item) => (
              <div
                className="group"
                key={item.id}>
                <AccordionItem
                  value={item.id}
                  className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm">
                  <AccordionTrigger className="cursor-pointer text-base hover:no-underline">{item.question}</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-base">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
              </div>
            ))}
          </Accordion>

          <p ref={footerRef} className="text-muted-foreground mt-6 px-8">
            Can&apos;t find what you&apos;re looking for? Contact our{' '}
            <Link
              href="#"
              className="text-primary font-medium hover:underline">
              customer support team
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}