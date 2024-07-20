import { computed } from 'vue';
import { useChatStore } from '@/store/chat';
import type { CoreMessage } from 'ai';

export const useChat = () => {
  const chatStore = useChatStore();

  const messages = computed(() => chatStore.messages);

  const sendMessage = (content: string) => {
    const userMessage: CoreMessage = { role: 'user', content };
    chatStore.sendMessage(userMessage);
  };

  return {
    messages,
    sendMessage,
  };
};
