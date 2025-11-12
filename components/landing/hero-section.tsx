"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    PromptInput,
    PromptInputActionAddAttachments,
    PromptInputActionMenu,
    PromptInputActionMenuContent,
    PromptInputAttachments,
    PromptInputAttachment,
    PromptInputBody,
    PromptInputFooter,
    PromptInputHeader,
    PromptInputSubmit,
    PromptInputTextarea,
    PromptInputTools,
} from "@/components/ai-elements/prompt-input";

export default function HeroSection() {
    const [input, setInput] = useState("");

    const handleSubmit = () => {
        if (!input.trim()) return;
        console.log("Submitted:", input);
        setInput("");
    };

    return (
        <div className="relative min-h-screen flex flex-col justify-center overflow-hidden">
            {/* Big background text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <h1 className="text-[15rem] md:text-[25rem] lg:text-[15rem] font-bold select-none leading-none tracking-tight">
                    Heal
                </h1>
            </div>

            {/* Floating input box */}
            <div className="relative z-10 w-full max-w-xl mx-auto px-6 translate-y-32">

                <PromptInput onSubmit={handleSubmit} globalDrop multiple className="bg-background">
                    <PromptInputHeader>
                        <PromptInputAttachments>
                            {(attachment) => <PromptInputAttachment data={attachment} />}
                        </PromptInputAttachments>
                    </PromptInputHeader>
                    <PromptInputBody>
                        <PromptInputTextarea
                            placeholder="Apa yang ingin Anda ketahui?"
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                        />
                    </PromptInputBody>
                    <PromptInputFooter>
                        <PromptInputTools>
                            <PromptInputActionMenu>
                                <PromptInputActionMenuContent>
                                    <PromptInputActionAddAttachments />
                                </PromptInputActionMenuContent>
                            </PromptInputActionMenu>
                        </PromptInputTools>
                        <PromptInputSubmit disabled={!input} />
                    </PromptInputFooter>
                </PromptInput>
            </div>

            {/* Bottom-left description */}
            <div className="absolute bottom-10 left-10 text-sm max-w-md">
                <p>
                    Grok 4 is the most intelligent model in the world. Available now to
                    SuperGrok and Premium+ subscribers, as well as our API.
                </p>
            </div>

            {/* Bottom-right button */}
            <div className="absolute bottom-10 right-10">
                <Button variant="outline" className="rounded-full">
                    READ ANNOUNCEMENT
                </Button>
            </div>
        </div>
    );
}
