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
import { motion } from "framer-motion";
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
import { Fragment, useState, useMemo, useEffect, useRef } from "react";
import { CopyIcon, GlobeIcon, PlusIcon, RefreshCcwIcon, Sidebar, User, Scale, Ruler, Moon, Brain, Activity, Clock, TrendingUp, Watch, Plus } from "lucide-react";
import { ModeToggle } from "@/components/layout/mode-toggle";
import { UserButton } from "@clerk/nextjs";
import { useSidebar } from "@/components/ui/sidebar";
import { ButtonGroup } from "@/components/ui/button-group";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useOnboardingStore, useChatStore } from "@/lib/store";
import { nanoid } from "nanoid";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SuggestionButtons } from "@/components/chat/suggestion-buttons";

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
const deviceList = [
  {
    name: "Garmin",
    value: "garmin",
  },
  {
    name: "Oura Ring",
    value: "oura",
  },
  {
    name: "Apple Watch",
    value: "apple_watch",
  },
  {
    name: "Manual",
    value: "manual",
  },
];

export default function ChatPage() {
  const { name, device, manualData, wearableExtra, wearableData, lastRefetchTime, updateWearableData } = useOnboardingStore();
  const { currentChatId, addChat, updateChat, setCurrentChat, getChat } = useChatStore();
  const [input, setInput] = useState("");
  const [model, setModel] = useState<string>(models[0].value);
  const [webSearch, setWebSearch] = useState(false);
  const { messages, setMessages, sendMessage, status, regenerate } = useChat();

  const { open, toggleSidebar } = useSidebar();

  // Track if we're in the middle of sending a message
  const isSendingRef = useRef(false);

  const availableDevices = useMemo(() => {
    if (!device) return [];
    return deviceList.filter((d) => d.value === device);
  }, [device]);

  const data = useMemo(() => {
    if (device === "manual") {
      return {
        age: manualData.age || "-",
        weight: manualData.weight || "-",
        height: manualData.height || "-",
        sleep: manualData.sleep || "-",
        stress: manualData.stress || "-",
      };
    } else if (wearableData && wearableExtra) {
      return {
        age: wearableExtra.age || "-",
        weight: wearableExtra.weight || "-",
        restingHeartRate: wearableData.restingHR || "-",
        hrv: wearableData.hrv || "-",
        sleepScore: wearableData.sleepScore || "-",
        sleepDuration: wearableData.sleepDuration || "-",
        steps: wearableData.steps || "-",
        stress: wearableData.stress || "-",
      };
    }
    return {};
  }, [device, manualData, wearableExtra, wearableData]);

  const formatLastRefetch = (timeString: string | null) => {
    if (!timeString) return "-";
    const date = new Date(timeString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Baru saja";
    if (diffMins < 60) return `${diffMins} menit yang lalu`;
    if (diffHours < 24) return `${diffHours} jam yang lalu`;
    return `${diffDays} hari yang lalu`;
  };

  const handleRefreshWearable = async () => {
    if (device === "manual" || !device) return;

    const randomWearableData = {
      restingHR: Math.floor(50 + Math.random() * 30),
      hrv: Math.floor(20 + Math.random() * 60),
      sleepScore: Math.floor(50 + Math.random() * 50),
      sleepDuration: (5 + Math.random() * 3).toFixed(1),
      steps: Math.floor(2000 + Math.random() * 8000),
      stress: Math.floor(1 + Math.random() * 10)
    };

    updateWearableData(randomWearableData);
  };

  // Load chat when currentChatId changes (user clicks on chat history)
  const prevChatIdRef = useRef<string | null>(currentChatId);
  useEffect(() => {
    // Skip if we're sending a message
    if (isSendingRef.current) {
      prevChatIdRef.current = currentChatId;
      return;
    }

    // Only load if chatId changed from user action
    if (prevChatIdRef.current !== currentChatId) {
      if (currentChatId) {
        const chat = getChat(currentChatId);
        if (chat && chat.messages.length > 0) {
          setMessages(chat.messages);
        } else {
          // Chat exists but no messages yet - don't clear
          // This happens when we just created the chat
        }
      } else {
        setMessages([]);
      }
      prevChatIdRef.current = currentChatId;
    }
  }, [currentChatId, getChat, setMessages]);

  // Save chat to store when messages change
  const prevMessagesLengthRef = useRef(0);
  useEffect(() => {
    // Skip if no messages or no chatId
    if (messages.length === 0 || !currentChatId) {
      prevMessagesLengthRef.current = messages.length;
      return;
    }

    // Skip if messages haven't actually changed
    if (messages.length === prevMessagesLengthRef.current && messages.length > 0) {
      const existingChat = getChat(currentChatId);
      if (existingChat && JSON.stringify(existingChat.messages) === JSON.stringify(messages)) {
        return;
      }
    }
    prevMessagesLengthRef.current = messages.length;

    const firstUserMessage = messages.find((m) => m.role === "user");
    const title = firstUserMessage?.parts.find((p) => p.type === "text")?.text?.slice(0, 50) || "New Chat";

    // Check if chat already exists
    const existingChat = getChat(currentChatId);
    if (existingChat) {
      // Update existing chat
      updateChat(currentChatId, [...messages], title);
    } else {
      // Create new chat
      addChat({
        id: currentChatId,
        title,
        messages: [...messages],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  }, [messages, currentChatId, addChat, updateChat, getChat]);

  const handleNewChat = () => {
    setCurrentChat(null);
    setMessages([]);
    setInput("");
  };

  const hasMessages = messages.length > 0;

  const handleSubmit = async (message: PromptInputMessage) => {
    const hasText = Boolean(message.text);
    const hasAttachments = Boolean(message.files?.length);

    if (!(hasText || hasAttachments)) {
      return;
    }

    // Set flag that we're sending
    isSendingRef.current = true;

    // Create chat ID if it doesn't exist
    let chatIdToUse = currentChatId;
    if (!chatIdToUse) {
      chatIdToUse = nanoid();
      setCurrentChat(chatIdToUse);
    }

    // Clear input
    setInput("");

    // Send the message with ID in options
    sendMessage(
      {
        text: message.text || "Sent with attachments",
        files: message.files
      },
      {
        body: {
          model: model,
          webSearch: webSearch,
          userData: device === "manual"
            ? { name, device, manualData }
            : { name, device, wearableExtra, wearableData },
        },
      },
    );

    // Reset flag after a short delay
    setTimeout(() => {
      isSendingRef.current = false;
    }, 100);
  };
  const text = `Halo ${name || "Pengguna"}. Bagaimana aku bisa bantu hari ini?`;
  const words = text.split(" ");


  return (
    <div className="flex h-screen w-full flex-col bg-background">
      {/* Header */}
      <header className={cn("relative flex justify-between px-6 py-3  w-full")}>
        <div className="flex items-center justify-center gap-4 md:flex">
          {/* Desktop: tombol hilang kalau sidebar terbuka */}
          <div className="hidden md:block">
            {!open && (
              <ButtonGroup>
                <Button
                  className="rounded-full"
                  variant="outline"
                  onClick={toggleSidebar}
                >
                  <Sidebar />
                </Button>

                <Button
                  className="rounded-full"
                  variant="outline"
                  onClick={handleNewChat}
                >
                  <Plus />
                </Button>
              </ButtonGroup>
            )}
          </div>

          {/* Mobile: tombol SELALU muncul biar bisa nutup sidebar */}
          <div className="block md:hidden">
            <ButtonGroup>
              <Button
                className="rounded-full"
                variant="outline"
                onClick={toggleSidebar}
              >
                <Sidebar />
              </Button>

              <Button
                className="rounded-full"
                variant="outline"
                onClick={handleNewChat}
              >
                <Plus />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="flex item-center justify-center right-3 fixed  gap-4">
          <ModeToggle />
          <UserButton />
        </div>
      </header>

      {/* Main Content */}
      {!hasMessages ? (
        /* Empty State - Input di tengah */
        <motion.div
          className="flex flex-1 flex-col items-center justify-center p-8 "
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full max-w-2xl space-y-6">
            <div className="text-left">
              <h2 className="text-3xl font-medium mb-2 flex flex-wrap gap-1">
                {words.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    {word}
                  </motion.span>
                ))}
              </h2>
            </div>

            {/* Improved Health Data Card */}
            <Card className="bg-muted">
              <CardHeader className="flex flex-row justify-between items-center pb-2 pt-3">
                <div className="flex items-center gap-2">
                  <div>
                    <h3 className="font-semibold text-xs">Data Kesehatan</h3>
                    {lastRefetchTime && device !== "manual" && (
                      <p className="text-[10px] text-muted-foreground">
                        {formatLastRefetch(lastRefetchTime)}
                      </p>
                    )}
                  </div>
                </div>
                {device !== "manual" && (
                  <Button
                    variant="secondary"
                    // size="icon"
                    size={"sm"}
                    onClick={handleRefreshWearable}
                    className="text-xs px-3 py-1"
                  >
                    Refresh data Weareable
                  </Button>
                )}
              </CardHeader>

              <CardContent className="pt-0 pb-3">
                {device === "manual" ? (
                  <div className="grid grid-cols-3 gap-1.5">
                    <div className="flex items-center gap-1.5 p-1.5 rounded-md">
                      <User className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">Usia</p>
                        <p className="font-semibold text-xs truncate">{data.age}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-md">
                      <Scale className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">Berat</p>
                        <p className="font-semibold text-xs truncate">{data.weight} kg</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-md">
                      <Ruler className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">Tinggi</p>
                        <p className="font-semibold text-xs truncate">{data.height} cm</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-md">
                      <Moon className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">Tidur</p>
                        <p className="font-semibold text-xs truncate">{data.sleep} jam</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-md col-span-2">
                      <Brain className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">Stres</p>
                        <p className="font-semibold text-xs truncate">{data.stress}/10</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-1.5">
                    <div className="flex items-center gap-1.5 p-1.5 rounded-md">
                      <User className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">Usia</p>
                        <p className="font-semibold text-xs truncate">{data.age}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-md">
                      <Scale className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">Berat</p>
                        <p className="font-semibold text-xs truncate">{data.weight} kg</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-md">
                      <Activity className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">HR</p>
                        <p className="font-semibold text-xs truncate">{data.restingHeartRate}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-md">
                      <TrendingUp className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">HRV</p>
                        <p className="font-semibold text-xs truncate">{data.hrv}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-md">
                      <Moon className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">Score</p>
                        <p className="font-semibold text-xs truncate">{data.sleepScore}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-md">
                      <Clock className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">Tidur</p>
                        <p className="font-semibold text-xs truncate">{data.sleepDuration}j</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-md">
                      <Watch className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">Steps</p>
                        <p className="font-semibold text-xs truncate">{data.steps}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 p-1.5 rounded-md">
                      <Brain className="size-3.5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <p className="text-[10px] text-muted-foreground">Stres</p>
                        <p className="font-semibold text-xs truncate">{data.stress}/10</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            {/* Suggestion Buttons */}
            <SuggestionButtons onSuggestionClick={setInput} />

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
                  {/* <PromptInputButton
                    variant={webSearch ? "default" : "ghost"}
                    onClick={() => setWebSearch(!webSearch)}
                  >
                    <GlobeIcon size={16} />
                    <span>Search</span>
                  </PromptInputButton> */}
                  {/* <PromptInputModelSelect
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
                  </PromptInputModelSelect> */}
                </PromptInputTools>
                <PromptInputSubmit disabled={!input && !status} status={status} />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </motion.div>
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
                    {/* <PromptInputButton
                      variant={webSearch ? "default" : "ghost"}
                      onClick={() => setWebSearch(!webSearch)}
                    >
                      <GlobeIcon size={16} />
                      <span>Search</span>
                    </PromptInputButton> */}
                    {/* <PromptInputModelSelect
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
                    </PromptInputModelSelect> */}
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