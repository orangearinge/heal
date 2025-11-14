"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Dede Fernanda",
    title: "Busy Professional",
    avatarSrc: "https://avatars.githubusercontent.com/ddfrnnd",
    quote: "Heal membantu saya memahami pola tidur dan stres kerja. Sekarang saya lebih aware dengan kesehatan mental dan bisa mengatur work-life balance dengan lebih baik.",
  },
  {
    name: "Nissa Zahra",
    title: "Atlet Lari",
    avatarSrc: "https://avatars.githubusercontent.com/nisszhra",
    quote: "Integrasi dengan Garmin watch saya sangat membantu! Heal memberikan insight yang tepat tentang recovery time dan kapan saya harus push harder dalam training.",
  },
  {
    name: "Ahmad Saif",
    title: "Pekerja Shift",
    avatarSrc: "https://avatars.githubusercontent.com/ahmdsaif87",
    quote: "Sebagai pekerja shift malam, Heal membantu saya mengoptimalkan jadwal tidur dan memberikan tips kesehatan yang sesuai dengan lifestyle saya yang unik.",
  },
  {
    name: "Alifia Shasa",
    title: "Ibu Bekerja",
    avatarSrc: "https://avatars.githubusercontent.com/alifia-30",
    quote: "Heal seperti punya personal health coach 24/7. Sangat membantu saya menjaga kesehatan sambil mengurus keluarga dan karir. Responsnya selalu relevan dengan kondisi saya.",
  },
  {
    name: "Fadil",
    title: "Senior Manager",
    avatarSrc: "https://avatars.githubusercontent.com/fadilsflow",
    quote: "Data dari Apple Watch saya sekarang lebih bermakna berkat Heal. Aplikasi ini memberikan context yang saya butuhkan untuk membuat keputusan kesehatan yang lebih baik.",
  },
  {
    name: "Abdel",
    title: "Freelancer",
    avatarSrc: "https://avatars.githubusercontent.com/muwaffaqnabdel",
    quote: "Heal memahami rutinitas kerja freelance saya yang tidak teratur. Saran-sarannya selalu tepat waktu dan membantu saya tetap sehat meski jadwal yang fleksibel.",
  },
];

// --- Helper untuk membagi testimoni (Tetap Sama) ---
const columns = [
  testimonials.filter((_, i) => i % 3 === 0), 
  testimonials.filter((_, i) => i % 3 === 1), 
  testimonials.filter((_, i) => i % 3 === 2), 
];

// --- Komponen Bintang 
const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
  </svg>
);

// --- Komponen Kartu  
const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => (
  <figure className="p-6 bg-gray-100 rounded-lg shadow-sm break-inside-avoid dark:bg-gray-800">
    <div className="flex items-center gap-1 text-yellow-500">
      <StarIcon className="w-5 h-5" />
      <StarIcon className="w-5 h-5" />
      <StarIcon className="w-5 h-5" />
      <StarIcon className="w-5 h-5" />
      <StarIcon className="w-5 h-5" />
    </div>
    {/* PERUBAHAN: Menambahkan 'dark:text-gray-300' */}
    <blockquote className="mt-4 text-gray-700 dark:text-gray-300">
      <p>&ldquo;{testimonial.quote}&rdquo;</p>
    </blockquote>
    <figcaption className="flex items-center mt-4">
      <Avatar className="size-10 mr-3">
        <AvatarImage src={testimonial.avatarSrc} alt={testimonial.name} />
        <AvatarFallback>{testimonial.name.substring(0, 2)}</AvatarFallback>
      </Avatar>
      <div>
        {/* PERUBAHAN: Menambahkan 'dark:text-gray-100' */}
        <cite className="font-semibold text-gray-900 not-italic dark:text-gray-100">{testimonial.name}</cite>
        {/* PERUBAHAN: Menambahkan 'dark:text-gray-400' */}
        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.title}</p>
      </div>
    </figcaption>
  </figure>
);

export default function TestimoniSection() {
  return (
    <section className="py-16 md:py-24 bg-white text-black dark:bg-black dark:text-white">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Header (PERUBAHAN DI SINI) */}
        <div className="max-w-xl mx-auto text-center space-y-4">
          {/* PERUBAHAN: Menambahkan 'dark:bg-blue-900 dark:text-blue-200' */}
          <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            Testimonials
          </span>
          {/* PERUBAHAN: Menambahkan 'dark:text-gray-100' */}
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100">
            Why People Love Us
          </h2>
          {/* PERUBAHAN: Menambahkan 'dark:text-gray-400' */}
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Discover how Aston's courses have helped users grow and succeed.
          </p>
        </div>

        {/* Container Marquee (Tetap Sama) */}
        <div className="mt-20 relative max-h-[90vh] overflow-hidden 
                       [mask-image:_linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]">
          
          <div className="flex justify-center gap-10">
            {columns.map((column, colIndex) => (
              <div
                key={colIndex}
                className={`flex flex-col gap-10 animate-marquee-y flex-shrink-0 w-[340px]
                            ${colIndex % 2 === 0 ? 'animate-duration-[40s]' : 'animate-duration-[50s]'} 
                            ${colIndex === 1 ? 'flex' : 'hidden md:flex'}`}
              >
                {[...column, ...column].map((testimonial, cardIndex) => (
                  <TestimonialCard 
                    key={`${testimonial.name}-${cardIndex}`} 
                    testimonial={testimonial} 
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}