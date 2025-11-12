import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function AboutSection() {
    return (
        <section id='about' className="py-16 md:py-32">
            <div className="mx-auto  flex flex-col items-center gap-16 px-6">
                {/* Top content: title & description side by side */}
                <div className="flex flex-col md:flex-row justify-between items-start w-full gap-8">
                    <h2 className="text-md font-normal lg:text-3xl max-w-xl">
                        About {" "}
                    </h2>
                    <p className="text-muted-foreground max-w-4xl">
                        TrueHealness was created for those who are done guessing. For those who've felt unseen in a system that treats people like averages. We built a platform that listens deeply— to your biology, your habits, your goals, and your story. We translate scattered health data into clarity, connection, and care that actually fits.
                    </p>
                </div>


                {/* Bottom content: logo grid */}
                <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 justify-items-start w-full">
                    {[
                        {
                            title: "Personalized Precision", desc: "We combine expert clinical insights with advanced technology, delivering health strategies uniquely tailored to your biology, goals, and daily rhythms—moving beyond generic solutions into truly personalized care."
                        },
                        {
                            title: "Adaptive Intelligence", desc: "Our closed loop Salus Framework continuously adapts to your evolving health signals, ensuring that every recommendation remains precise, relevant, and timely— backed by rigorous clinician oversight and state of the art AI."
                        },
                        {
                            title: "Trusted Transparency", desc: "Our commitment to security, clarity, and accountability means your health data remains private and your journey is supported by verifiable science and compassionate guidance."
                        }
                    ].map((content, index) => (
                        <Card key={index} className="w-full">
                            <CardHeader>

                                <CardTitle>
                                    {content.title}
                                </CardTitle>
                                <CardDescription>
                                    {content.desc}
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
