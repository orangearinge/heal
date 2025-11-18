"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MoreHorizontal } from "lucide-react";

interface SuggestionButtonsProps {
  onSuggestionClick: (suggestion: string) => void;
}

const suggestionQuestions = [
  "Berdasarkan data kesehatan saya, bagaimana kondisi saya hari ini?",
  "Apakah ada tanda-tanda yang perlu saya perhatikan dari data kesehatan saya?",
  "Bagaimana tren kesehatan saya dalam beberapa hari terakhir?",
  "Apa yang bisa saya lakukan untuk meningkatkan kualitas tidur?",
  "Berapa jam tidur yang ideal untuk saya berdasarkan usia dan aktivitas?",
  "Bagaimana cara mengatasi masalah tidur yang saya alami?",
  "Apa penyebab seseorang sering terbangun di malam hari?",
  "Bagaimana cara mengurangi stres berdasarkan data saya?",
  "Apa tanda-tanda stres yang bisa saya pantau dari detak jantung?",
  "Bagaimana mengelola stres kerja dengan data kesehatan?",
  "Apa hubungan antara kualitas tidur dan tingkat stres?",
  "Berapa langkah harian yang ideal untuk saya?",
  "Bagaimana cara meningkatkan detak jantung saat olahraga?",
  "Apa yang bisa saya lakukan untuk meningkatkan HRV?",
  "Bagaimana memahami data gerakan dan aktivitas harian?",
  "Apa rekomendasi makanan untuk mendukung tidur yang lebih baik?",
  "Bagaimana hubungan antara makanan dan tingkat stres?",
  "Apa yang harus saya makan sebelum tidur untuk kualitas istirahat yang baik?",
  "Bagaimana pola makan yang sehat berdasarkan data kesehatan saya?",
  "Apa yang menyebabkan detak jantung saya tidak stabil?",
  "Bagaimana memahami variasi detak jantung (HRV) saya?",
  "Kapan saya harus khawatir dengan detak jantung saya?",
  "Apa perbedaan antara detak jantung istirahat dan maksimal?",
  "Bagaimana mengukur kualitas recovery setelah olahraga?",
  "Berapa lama waktu recovery yang ideal untuk tubuh saya?",
  "Apa tanda-tanda bahwa tubuh saya sudah cukup istirahat?",
  "Bagaimana mengoptimalkan proses recovery alami tubuh?",
  "Apa insight paling penting dari data kesehatan saya?",
  "Bagaimana memaksimalkan manfaat wearable device saya?",
  "Apa tren kesehatan yang perlu saya perhatikan bulan ini?",
  "Bagaimana membuat rutinas kesehatan yang berkelanjutan?"
];

export function SuggestionButtons({ onSuggestionClick }: SuggestionButtonsProps) {
  const displayedQuestions = suggestionQuestions.slice(0, 6);
  const remainingQuestions = suggestionQuestions.slice(6);

  return (
    <div className="relative flex flex-col space-y-3">
      {/* Scroll horizontal area */}
      <div className="flex overflow-x-auto gap-2 py-1">
        {displayedQuestions.map((q, i) => (
          <Button
            key={i}
            variant="outline"
            size="sm"
            className="rounded-full text-xs whitespace-nowrap"
            onClick={() => onSuggestionClick(q)}
          >
            {q}
          </Button>
        ))}

        {/* Icon titik tiga */}
        {remainingQuestions.length > 0 && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full p-2 absolute top-1 right-1 bg-background shadow-md"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Semua Pertanyaan</DialogTitle>
                <DialogDescription>
                  Pilih pertanyaan untuk ditanyakan ke Heal tentang data kesehatan Anda
                </DialogDescription>
              </DialogHeader>

              <ScrollArea className="max-h-[60vh] pr-2">
                <div className="flex flex-col gap-2">
                  {remainingQuestions.map((q, i) => (
                    <Button
                      key={i}
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs text-left justify-start whitespace-normal h-auto py-2 px-3"
                      onClick={() => onSuggestionClick(q)}
                    >
                      {q}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
}
