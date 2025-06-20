<script setup>
import { ref } from 'vue';
import axios from 'axios';

const companies = ref([]);
const isLoading = ref(false);
const error = ref(null);

const getCompanies = async () => {
  isLoading.value = true;
  error.value = null;
  companies.value = [];

  // The Vite proxy server will add the API key.
  const url = '/api/companies';

  try {
    // The API key is added by the serverless function on Vercel, so we don't send it from the browser.
    const response = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
      },
    });
    companies.value = response.data.data;
  } catch (err) {
    console.error('Error fetching companies:', err);
    error.value = 'Failed to fetch companies. Please check the console for more details.';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <main>
    <div class="container">
      <h1>List Of Companies</h1>
      <button v-if="companies.length === 0" @click="getCompanies" :disabled="isLoading">
        {{ isLoading ? 'Fetching Companies...' : 'Fetch Companies' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>

      <ul v-if="companies.length > 0">
        <li v-for="company in companies" :key="company.id">
          {{ company.name }}
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  background-color: #f9f9f9;
  font-family: 'Lato', sans-serif;
}

h1 {
  color: #333;
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
  margin-bottom: 10px;
  font-weight: bold;
}

ul {
  list-style: none;
  padding: 0;
}

button {
  margin-bottom: 1.5rem;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  background-color: #42b983;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

button:hover {
  background-color: #33a06f;
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

button:disabled {
  background-color: #a5d6b8;
  cursor: not-allowed;
  transform: translateY(0);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

li {
  padding: 8px 0;
  color: #333;
  font-family: 'Lato', sans-serif;
  font-size: 1.1rem;
}

li:last-child {
  border-bottom: none;
}
</style>
