"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useOnboardingStore } from "@/lib/store";

export default function OnboardingPage() {
    const { setOnboardingData, updateWearableData } = useOnboardingStore();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const [name, setName] = useState("");
    const [device, setDevice] = useState("");

    // Manual input
    const [manualData, setManualData] = useState({
        age: "",
        weight: "",
        height: "",
        sleep: "",
        stress: "",
    });

    // Wearable fallback input
    const [wearableExtra, setWearableExtra] = useState({
        age: "",
        weight: "",
    });

    // Simulasi data wearable device
    const randomWearableData = () => ({
        restingHR: Math.floor(50 + Math.random() * 30),
        hrv: Math.floor(20 + Math.random() * 60),
        sleepScore: Math.floor(50 + Math.random() * 50),
        sleepDuration: (5 + Math.random() * 3).toFixed(1),
        steps: Math.floor(2000 + Math.random() * 8000),
        stress: Math.floor(1 + Math.random() * 10)
    });

    const [wearableData, setWearableData] = useState(() => randomWearableData());

    const wearableList = [
        { label: "Garmin", value: "garmin" },
        { label: "Oura Ring", value: "oura" },
        { label: "Apple Watch", value: "apple_watch" },
        { label: "Tidak punya perangkat", value: "manual" }
    ];

    const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

    const handleNext = async () => {
        setLoading(true);
        await delay(800);
        setLoading(false);
        setStep(step + 1);
    };

    const handleDeviceSelect = async (val: string) => {
        setDevice(val);
        setLoading(true);
        await delay(900);
        setLoading(false);

        if (val === "manual") {
            setStep(3);
        } else {
            setWearableData(randomWearableData());
            setStep(4);
        }
    };

    const refreshWearable = async () => {
        setLoading(true);
        await delay(1000);
        const newData = randomWearableData();
        setWearableData(newData);
        updateWearableData(newData);
        setLoading(false);
    };

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 space-y-8">

            {/* STEP 1 */}
            {step === 1 && (
                <div className="w-full max-w-sm space-y-6">
                    <h1 className="text-2xl font-mono pb-10">WELCOME TO HEAL!</h1>

                    <div className="space-y-2">
                        <Label>Masukan nama panggilan Anda</Label>
                        <Input
                            placeholder="Contoh: Fadil"
                            value={name}
                            className="rounded-full"
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Button
                            className="w-full rounded-full"
                            disabled={!name || loading}
                            onClick={handleNext}
                        >
                            {loading ? "Memproses..." : "Lanjutkan"}
                        </Button>
                    </div>
                </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
                <div className="w-full max-w-sm space-y-4">
                    <h1 className="text-2xl font-mono pb-4">Halo {name}...</h1>
                    <p className="text-sm">Pilih perangkat wearable Anda</p>

                    <div className="grid grid-cols-1 gap-3">
                        {wearableList.map((d) => (
                            <Button
                                key={d.value}
                                variant="outline"
                                disabled={loading}
                                onClick={() => handleDeviceSelect(d.value)}
                                className="w-full rounded-full"
                            >
                                {loading && device === d.value ? "Menghubungkan..." : d.label}
                            </Button>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 3 manual */}
            {step === 3 && (
                <div className="w-full max-w-sm space-y-4 animate-in fade-in">
                    <h1 className="text-xl font-mono pb-4">Isi Data Anda Secara Manual</h1>

                    <div className="space-y-3">
                        {[
                            { key: "age", label: "Usia" },
                            { key: "weight", label: "Berat Badan (kg)" },
                            { key: "height", label: "Tinggi Badan (cm)" },
                            { key: "sleep", label: "Durasi Tidur (jam)" },
                            { key: "stress", label: "Tingkat Stres (1-10)" },
                        ].map((f) => (
                            <div key={f.key} className="space-y-1">
                                <Label>{f.label}</Label>
                                <Input
                                    className="rounded-full"
                                    value={manualData[f.key as keyof typeof manualData]}
                                    onChange={(e) =>
                                        setManualData({ ...manualData, [f.key]: e.target.value })
                                    }
                                />
                            </div>
                        ))}

                        <Button
                            className="w-full rounded-full"
                            disabled={loading}
                            onClick={handleNext}
                        >
                            {loading ? "Memproses..." : "Lanjutkan"}
                        </Button>
                    </div>
                </div>
            )}

            {/* STEP 4 wearable extra */}
            {step === 4 && (
                <div className="w-full max-w-sm space-y-4 animate-in fade-in">
                    <h1 className="text-xl font-mono pb-4">Data Tambahan Dibutuhkan</h1>

                    <p className="text-sm">Perangkat {device} tidak menyediakan semua info.</p>

                    <div className="space-y-3">
                        {[
                            { key: "age", label: "Usia" },
                            { key: "weight", label: "Berat Badan (kg)" },
                        ].map((f) => (
                            <div key={f.key} className="space-y-1">
                                <Label>{f.label}</Label>
                                <Input
                                    className="rounded-full"
                                    value={wearableExtra[f.key as keyof typeof wearableExtra]}
                                    onChange={(e) =>
                                        setWearableExtra({ ...wearableExtra, [f.key]: e.target.value })
                                    }
                                />
                            </div>
                        ))}

                        <Button
                            className="w-full rounded-full"
                            disabled={loading}
                            onClick={handleNext}
                        >
                            {loading ? "Memproses..." : "Lanjutkan"}
                        </Button>
                    </div>
                </div>
            )}

            {/* STEP 5 summary */}
            {step === 5 && (
                <div className="w-full max-w-sm space-y-4 animate-in fade-in">
                    <h1 className="text-xl font-mono pb-4">Setup selesai, Yeay 🎉!</h1>

                    <p>Nama: {name}</p>
                    <p>Perangkat: {device}</p>

                    {/* MANUAL DATA */}
                    {device === "manual" ? (
                        <div className="text-sm space-y-1">
                            <p>Usia: {manualData.age}</p>
                            <p>Berat: {manualData.weight} kg</p>
                            <p>Tinggi: {manualData.height} cm</p>
                            <p>Tidur: {manualData.sleep} jam</p>
                            <p>Stres: {manualData.stress}/10</p>
                        </div>
                    ) : (
                        <>
                            {/* WEARABLE DATA */}
                            <div className="text-sm space-y-1">
                                <p>Usia: {wearableExtra.age}</p>
                                <p>Berat: {wearableExtra.weight} kg</p>
                                <p className="font-semibold mt-3">Data dari perangkat:</p>
                                <p>Resting HR: {wearableData.restingHR} bpm</p>
                                <p>HRV: {wearableData.hrv} ms</p>
                                <p>Sleep Score: {wearableData.sleepScore}</p>
                                <p>Durasi tidur: {wearableData.sleepDuration} jam</p>
                                <p>Langkah: {wearableData.steps}</p>
                                <p>Stres: {wearableData.stress}/10</p>
                            </div>

                            <Button
                                className="w-full rounded-full"
                                variant="secondary"
                                disabled={loading}
                                onClick={refreshWearable}
                            >
                                {loading ? "Mengambil ulang data..." : "Refresh Data Wearable"}
                            </Button>
                        </>
                    )}

                    <Button
                        className="w-full rounded-full"
                        onClick={() => {
                            if (device === "manual") {
                                setOnboardingData({
                                    name,
                                    device,
                                    manualData,
                                });
                            } else {
                                setOnboardingData({
                                    name,
                                    device,
                                    wearableExtra,
                                    wearableData,
                                });
                            }
                        }}
                    >
                        <Link href={"/chat"}>
                            Mulai Gunakan Heal
                        </Link>
                    </Button>
                </div>
            )}
        </div>
    );
}
