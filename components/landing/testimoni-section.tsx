"use client";

import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

// Data Testimoni
const testimonials = [
  {
    name: "Dede Fernanda",
    title: "Project Manager",
    avatarSrc: "https://avatars.githubusercontent.com/ddfrnnd",
    quote: "This platform made my experience seamless and enjoyable. The quality of service exceeded my expectations!",
  },
  {
    name: "Ahmed Saif",
    title: "Lead Developer",
    avatarSrc: "https://avatars.githubusercontent.com/ahmdsaif87",
    quote: "Tailus has transformed the way I develop web applications. Their extensive collection of UI components is amazing.",
  },
  {
    name: "Alifia Shasa",
    title: "Software Engineer",
    avatarSrc: "https://avatars.githubusercontent.com/alifia-30",
    quote: "A game-changer for modern web development. The flexibility to customize every aspect is unparalleled.",
  },
  {
    name: "Wahyu Fadilah",
    title: "UX Designer",
    avatarSrc: "https://avatars.githubusercontent.com/fadilsflow",
    quote: "I can't recommend them enough. My project was handled with utmost care and precision. A 5-star experience!",
  },
  {
    name: "Niss Zhra",
    title: "Creator, Tailkits",
    avatarSrc: "https://avatars.githubusercontent.com/nisszhra",
    quote: "From start to finish, the process was smooth and professional. The final product is outstanding.",
  },
  {
    name: "Abdel Muwaffaq",
    title: "Software Engineer",
    avatarSrc: "https://avatars.githubusercontent.com/muwaffaqnabdel",
    quote: "They understood our vision perfectly and brought it to life. We will definitely be working with them again.",
  },
];

export default function TestimoniSection() {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  // Kita tidak lagi butuh thumbApi jika avatar tidak pakai carousel
  // const [thumbApi, setThumbApi] = useState<CarouselApi>(); 
  const [selectedIndex, setSelectedIndex] = useState(0);
  const totalTestimonials = testimonials.length;

  useEffect(() => {
    if (!mainApi) {
      return;
    }

    const onSelect = () => {
      const newIndex = mainApi.selectedScrollSnap();
      setSelectedIndex(newIndex);
      // Jika avatar bukan carousel, kita hanya perlu mengupdate selectedIndex
    };

    mainApi.on("select", onSelect);
    onSelect(); // Inisialisasi
    return () => {
      mainApi.off("select", onSelect);
    };
  }, [mainApi]);

  const onThumbClick = (index: number) => {
    if (!mainApi) {
      return;
    }
    mainApi.scrollTo(index);
    setSelectedIndex(index);
  };

  return (
    <section className="py-16 md:py-32 w-full "> {/* Pastikan latar belakang gelap */}
      <div className="container mx-auto max-w-4xl space-y-20 text-center">

        {/* Header */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl">
            What Our Customers Say
          </h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            Real stories from real people! See how our services have transformed
            their experiences.
          </p>
          <Button className="rounded-full">Book Now</Button> {/* Sesuaikan warna tombol */}
        </div>

        {/* Bagian Avatar (Zigzag - BUKAN CAROUSEL LAGI) */}
        <div className="relative w-full max-w-3xl mx-auto py-8"> {/* Menambah padding-y agar ring tidak terpotong */}
          {/* Garis Putus-putus */}
          <div className="absolute left-0 right-0 top-1/2 h-0 -translate-y-1/2 border-t-2 border-dotted border-gray-700" />

          <div className="flex justify-between items-center h-20 relative"> {/* Container flex untuk avatar */}
            {testimonials.map((testimonial, index) => {
              // Menentukan posisi zigzag
              const isEven = index % 2 === 0; // Jika genap, di atas. Jika ganjil, di bawah.
              const positionClass = isEven ? "-translate-y-8" : "translate-y-8"; // Menggeser avatar ke atas/bawah

              // Hitung left position agar terdistribusi merata
              const leftPosition = `calc(${(index / (totalTestimonials - 1)) * 100}% - 30px)`; // Menyesuaikan agar center

              return (
                <div
                  key={testimonial.name}
                  className="absolute z-10 cursor-pointer transition-transform duration-300 ease-in-out"
                  style={{ left: leftPosition, transform: selectedIndex === index ? 'scale(1.1)' : 'scale(1)' }} // Efek scale untuk yang aktif
                  onClick={() => onThumbClick(index)}
                >
                  {/* Lingkaran hitam kecil */}

                  <div className={`relative ${positionClass}`}> {/* Wrapper untuk menggeser zigzag */}
                    <Avatar
                      className={`size-16 md:size-20  transition-all duration-300 ${selectedIndex === index
                        ? "ring-4 ring-[#2d94b3] ring-offset-2 ring-offset-black" // ring-offset-black untuk latar belakang gelap
                        : "ring-2 ring-gray-600"
                        }`}
                    >
                      <AvatarImage
                        src={testimonial.avatarSrc}
                        alt={testimonial.name}
                        className="rounded-full"
                      />
                      <AvatarFallback>
                        {testimonial.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Utama (Quotes) */}
        <Carousel setApi={setMainApi} opts={{ loop: true }}>
          <CarouselContent className="h-40">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index}>
                <div className="p-4 h-full flex items-center justify-center">
                  <p className="text-lg md:text-xl font-medium text-center max-w-lg">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex justify-center gap-4 mt-10">
            <CarouselPrevious className="relative static translate-y-0 text-white border-gray-700 hover:bg-gray-800" /> {/* Sesuaikan warna panah */}
            <CarouselNext className="relative static translate-y-0 text-white border-gray-700 hover:bg-gray-800" /> {/* Sesuaikan warna panah */}
          </div>
        </Carousel>

      </div>
    </section>
  );
}