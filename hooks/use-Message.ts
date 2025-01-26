import { create } from "zustand";

interface MessageState {
    hasMore: boolean;
    page: number;
    messages: Message[];
    actionMessage: Message | undefined;
    optimisticIds: string[];
    addMessage: (message: Message) => void;
    setActionMessage: (message: Message | undefined) => void;
    optimisticDeleteMessage: (messageId: string) => void;
    optimisticUpdateMessage: (message: Message) => void;
    setOptimisticIds: (id: string) => void;
    setMesssages: (messages: Message[]) => void;
}

export const useMessage = create<MessageState>()((set) => ({
    hasMore: true,
    page: 1,
    messages: [],
    optimisticIds: [],
    actionMessage: undefined,
    setMesssages: (messages) =>
        set((state) => ({
            messages: [...messages, ...state.messages],
            page: state.page + 1,
            hasMore: messages.length >= 100,
        })),
    setOptimisticIds: (id: string) =>
        set((state) => ({ optimisticIds: [...state.optimisticIds, id] })),
    addMessage: (newMessages) =>
        set((state) => ({
            messages: [...state.messages, newMessages],
        })),
    setActionMessage: (message) => set(() => ({ actionMessage: message })),
    optimisticDeleteMessage: (messageId) =>
        set((state) => {
            return {
                messages: state.messages.filter(
                    (message) => message.id !== messageId
                ),
            };
        }),
    optimisticUpdateMessage: (updateMessage) =>
        set((state) => {
            return {
                messages: state.messages.filter((message) => {
                    if (message.id === updateMessage.id) {
                        (message.content = updateMessage.content)
                    }
                    return message;
                }),
            };
        }),
}));