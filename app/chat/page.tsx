"use client";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";
import {
  Message,
  MessageContent,
} from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputAttachment,
  PromptInputAttachments,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputModelSelect,
  PromptInputModelSelectContent,
  PromptInputModelSelectItem,
  PromptInputModelSelectTrigger,
  PromptInputModelSelectValue,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import { Action, Actions } from "@/components/ai-elements/actions";
import { Response } from "@/components/ai-elements/response";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import { Button } from "@/components/ui/button";
import { useChat } from "@ai-sdk/react";
import { Fragment, useState } from "react";
import { CopyIcon, GlobeIcon, Plus, RefreshCcwIcon, Sidebar } from "lucide-react";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card } from "@/components/ui/card";

const models = [
  {
    name: "Gemini 2.0 Flash",
    value: "google/gemini-2.0-flash",
  },
  {
    name: "Gemini Pro",
    value: "google/gemini-pro",
  },
];

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const { messages, sendMessage, status, regenerate } = useChat();
  const { open, toggleSidebar } = useSidebar();

  const hasMessages = messages.length > 0;

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    sendMessage(
      {
        text: message.text || "Sent with attachments",
        files: message.files
      },
      {
        body: {
          model: model,
          webSearch: webSearch,
        },
      },
    );
    setInput("");
  };

  return (
    <div className="flex h-screen w-full flex-col bg-background">
      {/* Header */}
      <header className="flex justify-between px-6 py-3">


        <div className="flex item-center justify-center gap-4">
          {!open && (
            <div className="">
              <ButtonGroup  >
                <Button className="rounded-full" variant={"outline"} onClick={(event) => {
                  toggleSidebar()
                }}>
                  <Sidebar />
                </Button>
                <Button className="rounded-full" variant={"outline"}>
                  <Plus />
                </Button>
              </ButtonGroup>
            </div>
          )}


        </div>
        <div className="flex item-center justify-center  gap-4">
          <ModeToggle />
          <UserButton />
        </div>
      </header>

      {/* Main Content */}
      {!hasMessages ? (
        /* Empty State - Input di tengah */
        <div className="flex flex-1 flex-col items-center justify-center p-8">
          <div className="w-full max-w-2xl space-y-6">
            <Card>
              Hallo world
            </Card>
            <div className="text-left">
              <h2 className="text-xl font-medium mb-2">Halo Fadil — aku Heal. Bagaimana aku bisa bantu hari ini? Kamu bisa tanya tentang tidur, kelelahan, stres, atau aktivitas fisik..</h2>
            </div>

            {/* Input di tengah */}
            <PromptInput onSubmit={handleSubmit} globalDrop multiple>
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
                    <PromptInputActionMenuTrigger />
                    <PromptInputActionMenuContent>
                      <PromptInputActionAddAttachments />
                    </PromptInputActionMenuContent>
                  </PromptInputActionMenu>
                  <PromptInputButton
                    variant={webSearch ? "default" : "ghost"}
                    onClick={() => setWebSearch(!webSearch)}
                  >
                    <GlobeIcon size={16} />
                    <span>Search</span>
                  </PromptInputButton>
                  <PromptInputModelSelect
                    onValueChange={(value) => {
                      setModel(value);
                    }}
                    value={model}
                  >
                    <PromptInputModelSelectTrigger>
                      <PromptInputModelSelectValue />
                    </PromptInputModelSelectTrigger>
                    <PromptInputModelSelectContent>
                      {models.map((model) => (
                        <PromptInputModelSelectItem key={model.value} value={model.value}>
                          {model.name}
                        </PromptInputModelSelectItem>
                      ))}
                    </PromptInputModelSelectContent>
                  </PromptInputModelSelect>
                </PromptInputTools>
                <PromptInputSubmit disabled={!input && !status} status={status} />
              </PromptInputFooter>
            </PromptInput>

            {/* Suggestion Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  setInput("Jelaskan secara singkat apa itu Next.js");
                }}
              >
                Apa itu Next.js?
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  setInput("Bagaimana cara membuat API di Next.js?");
                }}
              >
                Cara membuat API
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => {
                  setInput("Apa perbedaan SSR dan CSR?");
                }}
              >
                SSR vs CSR
              </Button>
            </div>
          </div>
        </div>
      ) : (
        /* Chat Mode - Input floating */
        <div className="relative flex flex-1 flex-col overflow-hidden">
          {/* Conversation Area dengan padding bottom untuk input */}
          <Conversation className="flex-1 rounded-none">
            <ConversationContent className="p-4 pb-64 ">
              <div className="mx-auto w-full max-w-3xl space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    {message.role === "assistant" && message.parts.filter((part) => part.type === "source-url").length > 0 && (
                      <Sources>
                        <SourcesTrigger
                          count={
                            message.parts.filter(
                              (part) => part.type === "source-url",
                            ).length
                          }
                        />
                        {message.parts.filter((part) => part.type === "source-url").map((part, i) => (
                          <SourcesContent key={`${message.id}-${i}`}>
                            <Source
                              key={`${message.id}-${i}`}
                              href={part.url}
                              title={part.url}
                            />
                          </SourcesContent>
                        ))}
                      </Sources>
                    )}
                    {message.parts.map((part, i) => {
                      switch (part.type) {
                        case "text":
                          return (
                            <Fragment key={`${message.id}-${i}`}>
                              <Message from={message.role} >

                                <MessageContent variant="flat" className="p-2">
                                  <Response key={`${message.id}-${i}`}>{part.text}</Response>
                                </MessageContent>
                              </Message>
                              {message.role === "assistant" && i === message.parts.length - 1 && (
                                <Actions className="mt-2">
                                  <Action
                                    onClick={() => regenerate()}
                                    label="Retry"
                                  >
                                    <RefreshCcwIcon className="size-3" />
                                  </Action>
                                  <Action
                                    onClick={() =>
                                      navigator.clipboard.writeText(part.text)
                                    }
                                    label="Copy"
                                  >
                                    <CopyIcon className="size-3" />
                                  </Action>
                                </Actions>
                              )}
                            </Fragment>
                          );
                        case "reasoning":
                          return (
                            <Reasoning
                              key={`${message.id}-${i}`}
                              className="w-full"
                              isStreaming={status === "streaming" && i === message.parts.length - 1 && message.id === messages.at(-1)?.id}
                            >
                              <ReasoningTrigger />
                              <ReasoningContent>{part.text}</ReasoningContent>
                            </Reasoning>
                          );
                        default:
                          return null;
                      }
                    })}
                  </div>
                ))}
                {status === "submitted" && <Loader />}
              </div>
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>

          {/* Floating Input Area */}
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-background via-background to-transparent pb-4 pt-8">
            <div className="mx-auto w-full max-w-3xl px-4">
              <PromptInput onSubmit={handleSubmit} className="bg-muted/50 backdrop-blur-sm rounded-xl" globalDrop multiple>
                <PromptInputHeader >
                  <PromptInputAttachments>
                    {(attachment) => <PromptInputAttachment data={attachment} />}
                  </PromptInputAttachments>
                </PromptInputHeader>
                <PromptInputBody>
                  <PromptInputTextarea
                    placeholder="Tanyakan lagi..."
                    onChange={(e) => setInput(e.target.value)}

                    value={input}
                  />
                </PromptInputBody>
                <PromptInputFooter>
                  <PromptInputTools>
                    <PromptInputActionMenu>
                      <PromptInputActionMenuTrigger />
                      <PromptInputActionMenuContent>
                        <PromptInputActionAddAttachments />
                      </PromptInputActionMenuContent>
                    </PromptInputActionMenu>
                    <PromptInputButton
                      variant={webSearch ? "default" : "ghost"}
                      onClick={() => setWebSearch(!webSearch)}
                    >
                      <GlobeIcon size={16} />
                      <span>Search</span>
                    </PromptInputButton>
                    <PromptInputModelSelect
                      onValueChange={(value) => {
                        setModel(value);
                      }}
                      value={model}
                    >
                      <PromptInputModelSelectTrigger>
                        <PromptInputModelSelectValue />
                      </PromptInputModelSelectTrigger>
                      <PromptInputModelSelectContent>
                        {models.map((model) => (
                          <PromptInputModelSelectItem key={model.value} value={model.value}>
                            {model.name}
                          </PromptInputModelSelectItem>
                        ))}
                      </PromptInputModelSelectContent>
                    </PromptInputModelSelect>
                  </PromptInputTools>
                  <PromptInputSubmit disabled={!input && !status} status={status} />
                </PromptInputFooter>
              </PromptInput>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
