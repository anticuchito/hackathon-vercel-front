<template>
  <div class="chatbox">
    <div class="chatbox-messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        <strong>{{ message.role === 'user' ? 'User' : 'AI' }}:</strong>
        <span>{{ ' ' + message.content }}</span> <!-- Agrega un espacio inicial a cada mensaje -->
      </div>
    </div>
    <form @submit.prevent="handleSubmit" class="chatbox-input">
      <input v-model="input" placeholder="Type your message..." />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useChat } from '@/composables/useChat';

const { messages, sendMessage } = useChat();
const input = ref('');

const handleSubmit = () => {
  if (input.value.trim() !== '') {
    sendMessage(input.value);
    input.value = '';
  }
};
</script>

<style scoped>
.chatbox {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.chatbox-messages {
  max-height: 300px;
  overflow-y: auto;
  padding: 10px;
}

.message {
  margin-bottom: 10px;
}

.chatbox-input {
  display: flex;
  border-top: 1px solid #ccc;
}

.chatbox-input input {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 0 0 0 5px;
}

.chatbox-input button {
  padding: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 0 0 5px 0;
}
</style>
