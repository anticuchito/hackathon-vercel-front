import { ref } from 'vue';
import type { CoreMessage } from 'ai';

export const useChatStore = defineStore('chat', () => {
  const messages = ref<CoreMessage[]>([]);

  const sendMessage = async (message: CoreMessage) => {
    messages.value.push(message);

    try {
      const response = await fetch('http://localhost:3001/api/openai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: messages.value }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;
      let fullText = '';
      let isFirstChunk = true;

      if (reader) {
        while (!done) {
          const { value, done: streamDone } = await reader.read();
          done = streamDone;
          if (value) {
            let chunk = decoder.decode(value, { stream: true });
            chunk = chunk.replace(/^data: /gm, ''); // Remove "data: " prefix

            // Add space at the beginning of the first chunk
            if (isFirstChunk) {
              chunk = ' ' + chunk.trim();
              isFirstChunk = false;
            } else {
              chunk = chunk.trim();
            }

            fullText += chunk + ' '; // Add space after each chunk
          }
        }
      }

      console.log('Full response received:', fullText.trim());
      messages.value.push({ role: 'assistant', content: fullText.trim() });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return {
    messages,
    sendMessage,
  };
});
