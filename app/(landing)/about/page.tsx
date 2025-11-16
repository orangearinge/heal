'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const descriptionRef = useRef<HTMLParagraphElement>(null)
    const cardsRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLDivElement>(null)

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

            // Animate image
            if (imageRef.current) {
                gsap.set(imageRef.current, {
                    y: 50,
                    opacity: 0,
                })

                gsap.to(imageRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.4,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: imageRef.current,
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
        <section ref={sectionRef} id='about' className="relative z-10 bg-background py-16 md:py-32">
            <div className="mx-auto flex flex-col items-center gap-16 px-6">

                <div className="flex flex-col  w-full gap-8 mx-auto max-w-4xl">
                    <h2 ref={titleRef} className=" font-normal text-center text-3xl pt-14 lg:pt-0 lg:text-5xl">
                        Tentang {" "}
                        <span className='text-[#2d94b3]'>Heal</span>
                    </h2>
                    <div ref={descriptionRef} className="max-w-4xl space-y-6">
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Heal adalah inovasi yang menghubungkan teknologi dengan kesehatan pribadi. Heal dirancang untuk memberikan solusi nyata terhadap tantangan kesehatan modern yang dihadapi setiap orang.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Dengan integrasi perangkat wearable seperti Garmin, Oura, dan Apple Health, Heal mampu membaca detak jantung, jumlah langkah, pola tidur, serta data kesehatan penting lainnya. Informasi ini kemudian diproses dan dianalisis secara otomatis, membentuk dasar bagi Smart Health Chatbot yang memberikan rekomendasi personal, edukasi kesehatan, dan panduan harian yang lebih akurat dan manusiawi.
                        </p>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Keunggulan utama Heal terletak pada fitur Context-Aware Response. Setiap respons chatbot disesuaikan dengan kondisi tubuh pengguna. Semua saran yang diberikan berasal dari data sebenarnya.  Saat data menunjukkan kelelahan, kurang tidur, atau ritme aktivitas yang terlalu tinggi, Heal akan merespons secara adaptif dengan menyarankan istirahat, hidrasi, atau perbaikan rutinitas.
                        </p>
                    </div>
                    <div ref={imageRef} className="">

                        <Image
                            src="/tw.png"
                            alt="Heal - About Section Image"
                            // className=" rounded-lg shadow-lg"
                            width={900}
                            height={100}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}
