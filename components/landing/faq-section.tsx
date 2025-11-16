'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'

export default function FAQsFour() {
  const faqItems = [
    {
      id: 'item-1',
      question: 'Bagaimana Heal bekerja?',
      answer: 'Heal menggunakan data kesehatan dari perangkat wearable atau input manual Anda untuk memberikan insights dan rekomendasi yang dipersonalisasi. AI kami menganalisis pola tidur, detak jantung, tingkat stres, dan aktivitas fisik untuk membantu Anda memahami kondisi kesehatan secara lebih baik.',
    },
    {
      id: 'item-2',
      question: 'Apakah data kesehatan saya aman dan privat?',
      answer: 'Ya, keamanan dan privasi data adalah prioritas utama kami. Semua data kesehatan dienkripsi dan disimpan dengan aman. Kami tidak pernah membagikan informasi pribadi Anda kepada pihak ketiga tanpa izin eksplisit dari Anda.',
    },
    {
      id: 'item-3',
      question: 'Perangkat wearable apa saja yang didukung?',
      answer: 'Saat ini Heal mendukung integrasi dengan Garmin, Oura Ring, dan Apple Watch. Untuk pengguna yang tidak memiliki perangkat wearable, Anda dapat memasukkan data secara manual melalui formulir onboarding kami.',
    },
    {
      id: 'item-4',
      question: 'Bagaimana cara membaca insights yang diberikan Heal?',
      answer: 'Heal memberikan penjelasan yang mudah dipahami untuk setiap rekomendasi. Insights ditampilkan dalam bahasa Indonesia dengan konteks yang sesuai dengan data kesehatan Anda. Jika ada yang kurang jelas, Anda selalu bisa bertanya lebih lanjut melalui chat.',
    },
    {
      id: 'item-5',
      question: 'Apakah ada biaya langganan?',
      answer: 'Heal menawarkan versi gratis dengan fitur dasar. Untuk akses fitur premium seperti analisis mendalam, rekomendasi advanced, dan integrasi dengan lebih banyak perangkat, tersedia paket langganan bulanan. Detail paket dapat dilihat di halaman pricing.',
    },
  ]

  return (
    <section className="relative z-10 bg-background py-16 md:py-24">
      <div className="mx-auto px-6 md:px-6">

        <div>
          <h2 className="text-foreground  text-center items-center  text-balance text-5xl font-normal">Pertanyaan yang Sering{" "}
            <span className='text-[#2d94b3]'>Ditanyakan</span>
          </h2>
          <p className="text-center text-muted-foreground mt-4 text-lg">
            Temukan jawaban untuk pertanyaan umum tentang Heal
          </p>
        </div>

        <div className="mt-12">
          <Accordion
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

          <p className="text-muted-foreground mt-6 px-8 text-center">
            Tidak menemukan jawaban yang Anda cari? Hubungi tim{' '}
            <Link
              href="/contact"
              className="text-primary font-medium hover:underline">
              dukungan pelanggan
            </Link>{' '}
            kami untuk bantuan lebih lanjut.
          </p>
        </div>
      </div>
    </section>
  )
}