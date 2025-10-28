<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Opérateurs</h2>
    <form @submit.prevent="ajouterOperateur" class="flex gap-2 mb-4">
      <input v-model="nom" placeholder="Nom opérateur" 
             class="border border-gray-300 p-2 rounded flex-1" required />
      <button type="submit" 
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Ajouter
      </button>
    </form>
    <ul class="list-disc pl-5 space-y-1">
      <li v-for="op in operateurs" :key="op.id">{{ op.nom }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'MmOperateurs',
  data() {
    return { operateurs: [], nom: '' };
  },
  mounted() { this.getOperateurs(); },
  methods: {
    async getOperateurs() {
      const res = await axios.get('http://localhost:5000/api/operateurs');
      this.operateurs = res.data;
    },
    async ajouterOperateur() {
      await axios.post('http://localhost:5000/api/operateurs', { nom: this.nom });
      this.nom = '';
      this.getOperateurs();
    }
  }
};
</script>
