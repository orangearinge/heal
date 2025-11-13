'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowUp, Globe, Play, Plus, Signature } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const MESCHAC_AVATAR = 'https://avatars.githubusercontent.com/u/47919550?v=4'
const BERNARD_AVATAR = 'https://avatars.githubusercontent.com/u/31113941?v=4'
const THEO_AVATAR = 'https://avatars.githubusercontent.com/u/68236786?v=4'
const GLODIE_AVATAR = 'https://avatars.githubusercontent.com/u/99137927?v=4'

export default function FeatureSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

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
          y: 25,
          opacity: 0,
        })

        // Animate words on scroll
        gsap.to(wordElements, {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Animate feature cards
      if (cardsRef.current) {
        const cards = cardsRef.current.children

        gsap.set(cards, {
          y: 80,
          opacity: 0,
          scale: 0.95,
        })

        gsap.to(cards, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.2,
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        })

        // Add hover animations for cards
        Array.from(cards).forEach((card) => {
          const cardElement = card as HTMLElement

          cardElement.addEventListener('mouseenter', () => {
            gsap.to(cardElement, {
              y: -8,
              scale: 1.02,
              duration: 0.3,
              ease: 'power2.out',
            })
          })

          cardElement.addEventListener('mouseleave', () => {
            gsap.to(cardElement, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: 'power2.out',
            })
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id='features' className="relative z-30 bg-background">
      <div className="py-24">
        <div className="mx-auto w-full  px-6">
          <div>
            <h2 ref={titleRef} className="text-foreground  text-center items-center  text-balance text-4xl font-normal">Empowering developers with{" "} <span className='text-[#2d94b3]'>AI-driven solutions</span></h2>
          </div>
          <div ref={cardsRef} className="mt-16 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card
              className="overflow-hidden p-6">
              <h3 className="text-foreground mt-5 text-lg font-semibold">Context-Aware Response</h3>
              <p className="text-muted-foreground mt-3 text-balance">Chatbot menyesuaikan respons berdasarkan data kesehatan pengguna — misalnya menyarankan istirahat ketika data menunjukkan kelelahan.</p>

              <MeetingIllustration />
            </Card>

            <Card
              className="group overflow-hidden px-6 pt-6">
              <h3 className="text-foreground mt-5 text-lg font-semibold">Simulated Wearable Integration</h3>
              <p className="text-muted-foreground mt-3 text-balance">Menampilkan data simulasi dari smartwatch (detak jantung, langkah, dan durasi tidur) sebelum percakapan dimulai.</p>

              <CodeReviewIllustration />
            </Card>
            <Card
              className="group overflow-hidden px-6 pt-6">
              <h3 className="text-foreground mt-5 text-lg font-semibold">Smart Health Chatbot</h3>
              <p className="text-muted-foreground mt-3 text-balance">Chatbot AI yang memberikan saran dan edukasi kesehatan personal berdasarkan kondisi pengguna.</p>

              <div className="mask-b-from-50 -mx-2 -mt-2 px-2 pt-2">
                <AIAssistantIllustration />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

const MeetingIllustration = () => {
  return (
    <Card
      aria-hidden
      className="mt-9 aspect-video p-4">
      <div className="mb-0.5 text-sm font-semibold">AI Strategy Meeting</div>
      <div className="mb-4 flex gap-2 text-sm">
        <span className="text-muted-foreground">2:30 - 3:45 PM</span>
      </div>
      <div className="mb-2 flex -space-x-1.5">
        <div className="flex -space-x-1.5">
          {[
            { src: MESCHAC_AVATAR, alt: 'Méschac Irung' },
            { src: BERNARD_AVATAR, alt: 'Bernard Ngandu' },
            { src: THEO_AVATAR, alt: 'Théo Balick' },
            { src: GLODIE_AVATAR, alt: 'Glodie Lukose' },
          ].map((avatar, index) => (
            <div
              key={index}
              className="bg-background size-7 rounded-full border p-0.5 shadow shadow-zinc-950/5">
              <Image
                className="aspect-square rounded-full object-cover"
                src={avatar.src}
                alt={avatar.alt}
                height="460"
                width="460"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="text-muted-foreground text-sm font-medium">ML Pipeline Discussion</div>
    </Card>
  )
}

const CodeReviewIllustration = () => {
  return (
    <div
      aria-hidden
      className="relative mt-6">
      <Card className="aspect-video w-4/5 translate-y-4 p-3 transition-transform duration-200 ease-in-out group-hover:-rotate-3">
        <div className="mb-3 flex items-center gap-2">
          <div className="bg-background size-6 rounded-full border p-0.5 shadow shadow-zinc-950/5">
            <Image
              className="aspect-square rounded-full object-cover"
              src={MESCHAC_AVATAR}
              alt="M Irung"
              height="460"
              width="460"
            />
          </div>
          <span className="text-muted-foreground text-sm font-medium">Méschac Irung</span>

          <span className="text-muted-foreground/75 text-xs">2m</span>
        </div>

        <div className="ml-8 space-y-2">
          <div className="bg-foreground/10 h-2 rounded-full"></div>
          <div className="bg-foreground/10 h-2 w-3/5 rounded-full"></div>
          <div className="bg-foreground/10 h-2 w-1/2 rounded-full"></div>
        </div>

        <Signature className="ml-8 mt-3 size-5" />
      </Card>
      <Card className="aspect-3/5 absolute -top-4 right-0 flex w-2/5 translate-y-4 p-2 transition-transform duration-200 ease-in-out group-hover:rotate-3">
        <div className="bg-foreground/5 m-auto flex size-10 rounded-full">
          <Play className="fill-foreground/50 stroke-foreground/50 m-auto size-4" />
        </div>
      </Card>
    </div>
  )
}

const AIAssistantIllustration = () => {
  return (
    <Card
      aria-hidden
      className="mt-6 aspect-video translate-y-4 p-4 pb-6 transition-transform duration-200 group-hover:translate-y-0">
      <div className="w-fit">
        <p className="mt-2 line-clamp-2 text-sm">How can I optimize my neural network to reduce inference time while maintaining accuracy?</p>
      </div>
      <div className="bg-foreground/5 -mx-3 -mb-3 mt-3 space-y-3 rounded-lg p-3">
        <div className="text-muted-foreground text-sm">Ask AI Assistant</div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="size-7 rounded-2xl bg-transparent shadow-none">
              <Plus />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="size-7 rounded-2xl bg-transparent shadow-none">
              <Globe />
            </Button>
          </div>

          <Button
            size="icon"
            className="size-7 rounded-2xl bg-black">
            <ArrowUp strokeWidth={3} />
          </Button>
        </div>
      </div>
    </Card >
  )
}
