<template>
  <div class="sample-page">
    <h1>{{ title }}</h1>
    <p>{{ message }}</p>
    <button @click="changeMessage">Click Me!</button>
    <button @click="showPortalMessage">Show Welcome Message</button>
    <p v-if="portalMessage">{{ portalMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const title = ref('Welcome to Your Sample Page');
const message = ref('This is a sample page created for you. You can start building your amazing application from here.');
const portalMessage = ref('');

const changeMessage = () => {
  message.value = 'You clicked the button! Now go build something great.';
};

const showPortalMessage = () => {
  portalMessage.value = 'welcome to the portal';
};
</script>

<style scoped>
.sample-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #f9f9f9;
}

h1 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

p {
  color: #34495e;
  margin-bottom: 1.5rem;
}

button {
  margin: 0 0.5rem;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #42b983;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #33a06f;
}
</style> 