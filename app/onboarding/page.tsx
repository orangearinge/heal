import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [device, setDevice] = useState("");

  const wearableList = [
    { label: "Garmin", value: "garmin" },
    { label: "Oura Ring", value: "oura" },
    { label: "Apple Watch", value: "apple_watch" },
    { label: "Tidak punya perangkat", value: "manual" }
  ];

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 space-y-8">
      {step === 1 && (
        <div className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-semibold text-center">Selamat Datang di Heal</h1>

          <div className="space-y-2">
            <Label htmlFor="name">Nama panggilan</Label>
            <Input
              id="name"
              placeholder="Contoh: Fadil"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <Button className="w-full" onClick={() => name && setStep(2)}>
            Lanjutkan
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-semibold text-center">Halo {name}</h1>
          <p className="text-center text-sm">Pilih perangkat wearable Anda</p>

          <Select onValueChange={setDevice}>
            <SelectTrigger>
              <SelectValue placeholder="Pilih perangkat" />
            </SelectTrigger>
            <SelectContent>
              {wearableList.map((d) => (
                <SelectItem key={d.value} value={d.value}>
                  {d.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="w-full" onClick={() => device && setStep(3)}>
            Lanjutkan
          </Button>
        </div>
      )}

      {step === 3 && (
        <div className="w-full max-w-sm space-y-4 text-center">
          <h1 className="text-2xl font-semibold">Setup selesai</h1>
          <p>Nama: {name}</p>
          <p>Perangkat: {device}</p>

          <Button className="w-full">Mulai Gunakan Heal</Button>
        </div>
      )}
    </div>
  );
}