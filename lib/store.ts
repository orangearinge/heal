import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UIMessage } from "ai";

interface ManualData {
  age: string;
  weight: string;
  height: string;
  sleep: string;
  stress: string;
}

interface WearableExtra {
  age: string;
  weight: string;
}

interface WearableData {
  restingHR: number;
  hrv: number;
  sleepScore: number;
  sleepDuration: string;
  steps: number;
  stress: number;
}

interface ChatHistory {
  id: string;
  title: string;
  messages: UIMessage[];
  createdAt: string;
  updatedAt: string;
}

interface OnboardingStore {
  name: string;
  device: string;
  manualData: ManualData;
  wearableExtra: WearableExtra;
  wearableData: WearableData | null;
  lastRefetchTime: string | null;
  setOnboardingData: (data: {
    name: string;
    device: string;
    manualData?: ManualData;
    wearableExtra?: WearableExtra;
    wearableData?: WearableData;
  }) => void;
  updateWearableData: (data: WearableData) => void;
  clearOnboardingData: () => void;
}

interface ChatStore {
  chats: ChatHistory[];
  currentChatId: string | null;
  addChat: (chat: ChatHistory) => void;
  updateChat: (id: string, messages: UIMessage[], title?: string) => void;
  deleteChat: (id: string) => void;
  setCurrentChat: (id: string | null) => void;
  getChat: (id: string) => ChatHistory | undefined;
}

export const useOnboardingStore = create<OnboardingStore>()(
  persist(
    (set) => ({
      name: "",
      device: "",
      manualData: {
        age: "",
        weight: "",
        height: "",
        sleep: "",
        stress: "",
      },
      wearableExtra: {
        age: "",
        weight: "",
      },
      wearableData: null,
      lastRefetchTime: null,
      setOnboardingData: (data) =>
        set({
          name: data.name,
          device: data.device,
          manualData: data.manualData || {
            age: "",
            weight: "",
            height: "",
            sleep: "",
            stress: "",
          },
          wearableExtra: data.wearableExtra || {
            age: "",
            weight: "",
          },
          wearableData: data.wearableData || null,
          lastRefetchTime: data.wearableData ? new Date().toISOString() : null,
        }),
      updateWearableData: (data) =>
        set({
          wearableData: data,
          lastRefetchTime: new Date().toISOString(),
        }),
      clearOnboardingData: () =>
        set({
          name: "",
          device: "",
          manualData: {
            age: "",
            weight: "",
            height: "",
            sleep: "",
            stress: "",
          },
          wearableExtra: {
            age: "",
            weight: "",
          },
          wearableData: null,
          lastRefetchTime: null,
        }),
    }),
    {
      name: "onboarding-storage",
    }
  )
);

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      chats: [],
      currentChatId: null,
      addChat: (chat) =>
        set((state) => ({
          chats: [chat, ...state.chats],
          currentChatId: chat.id,
        })),
      updateChat: (id, messages, title) =>
        set((state) => ({
          chats: state.chats.map((chat) =>
            chat.id === id
              ? {
                  ...chat,
                  messages,
                  title: title || chat.title,
                  updatedAt: new Date().toISOString(),
                }
              : chat
          ),
        })),
      deleteChat: (id) =>
        set((state) => ({
          chats: state.chats.filter((chat) => chat.id !== id),
          currentChatId:
            state.currentChatId === id ? null : state.currentChatId,
        })),
      setCurrentChat: (id) => set({ currentChatId: id }),
      getChat: (id) => get().chats.find((chat) => chat.id === id),
    }),
    {
      name: "chat-storage",
    }
  )
);
