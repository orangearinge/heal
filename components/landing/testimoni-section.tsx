"use client";

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Marquee } from "../ui/marquee";
import { cn } from "@/lib/utils";
import Image from "next/image";

const reviews = [
  {
    name: "Dede Fernanda",
    title: "Data Analyst",
    img: "https://avatars.githubusercontent.com/ddfrnnd",
    quote:
      "Heal membantu saya membaca pola detak jantung harian yang sering naik waktu kerja. Aplikasi ini memudahkan saya memahami kapan tubuh butuh istirahat lewat analisis data wearable.",
  },
  {
    name: "Nissa Zahra",
    title: "Instruktur Kebugaran",
    img: "https://avatars.githubusercontent.com/nisszhra",
    quote:
      "Saya pakai Heal untuk memantau kualitas tidur dan pemulihan setelah ngajar kelas. Insight dari integrasi wearable bikin saya tahu kapan harus nurunin intensitas latihan.",
  },
  {
    name: "Ahmad Saif",
    title: "Kurir Logistik",
    img: "https://avatars.githubusercontent.com/ahmdsaif87",
    quote:
      "Dengan jam kerja yang berubah-ubah, Heal membantu saya menjaga stamina. Data langkah dan detak jantung dari wearable langsung diterjemahkan jadi saran yang mudah diikuti.",
  },
  {
    name: "Alifia Shasa",
    title: "Customer Service Bank",
    img: "https://avatars.githubusercontent.com/alifia-30",
    quote:
      "Kerjaan saya bikin duduk dalam waktu lama. Heal ngasih pengingat gerak, cek stress level, dan analisis tidur yang bikin ritme hidup saya lebih stabil.",
  },
  {
    name: "Fadil",
    title: "IT Operations Lead",
    img: "https://avatars.githubusercontent.com/fadilsflow",
    quote:
      "Heal membantu saya memahami pola stres saat menangani incident di jam tertentu. Integrasi data Apple Watch bikin monitoring kesehatan jauh lebih mudah.",
  },
  {
    name: "Abdel",
    title: "Mobile App Developer",
    img: "https://avatars.githubusercontent.com/muwaffaqnabdel",
    quote:
      "Jadwal coding sering ngacak, tapi Heal bikin saya sadar kapan tubuh mulai kelelahan. Insight dari wearable membantu saya tetap jaga produktivitas tanpa ngorbanin kesehatan.",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2)
const secondRow = reviews.slice(reviews.length / 2)

export default function TestimoniSection() {
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
    <section className="py-16 md:py-24 ">
      <div className="container mx-auto max-w-6xl px-4">
        <div>
          <h2 ref={titleRef} className="text-foreground  text-center items-center  text-balance text-5xl font-normal">Perjalanan kesehatan mereka{" "}
            <br />
            <span className='text-[#2d94b3]'>bersama Heal</span>
          </h2>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden pt-20">
          <Marquee pauseOnHover className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.title} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.title} {...review} />
            ))}
          </Marquee>
          <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r"></div>
          <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l"></div>
        </div>

      </div>
    </section>
  );
}

const ReviewCard = ({
  img,
  name,
  title,
  quote,
}: {
  img: string
  name: string
  title: string
  quote: string
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl  p-4  ",
        // light styles
        " bg-muted hover:bg-muted/90",
        // dark styles
        " dark:bg-muted dark:hover:bg-muted/90"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <Image className="rounded-full" width="32" height="32" alt={name} src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium ">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-muted-foreground dark:text-muted-foreground">{title}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{quote}</blockquote>
    </figure>
  )
}


