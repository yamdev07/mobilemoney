<template>
  <div class="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-blue-600 mb-8 text-center">Mobile Money App</h1>
    <div class="space-y-8">
      <MmOperateurs class="bg-white p-6 rounded shadow-md" />
      <MmUtilisateurs class="bg-white p-6 rounded shadow-md" />
      <MmTransactions class="bg-white p-6 rounded shadow-md" />
    </div>
  </div>
</template>

<script>
import MmTransactions from './components/MmTransactions.vue';
import MmUtilisateurs from './components/MmUtilisateurs.vue';
import MmOperateurs from './components/MmOperateurs.vue';

export default {
  name: 'App',
  components: {
    MmTransactions,
    MmUtilisateurs,
    MmOperateurs
  }
};
</script>
