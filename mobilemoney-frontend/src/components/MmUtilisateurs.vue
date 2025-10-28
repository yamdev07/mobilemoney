<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Utilisateurs (Agents)</h2>
    <form @submit.prevent="ajouterUtilisateur" class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
      <input v-model="nom" placeholder="Nom" class="border p-2 rounded" required />
      <input v-model="email" placeholder="Email" class="border p-2 rounded" required />
      <input v-model="password" type="password" placeholder="Mot de passe" class="border p-2 rounded" required />
      <select v-model="role" class="border p-2 rounded">
        <option>agent</option>
        <option>admin</option>
      </select>
      <button type="submit" 
              class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 col-span-full">
        Ajouter
      </button>
    </form>
    <ul class="list-disc pl-5 space-y-1">
      <li v-for="u in utilisateurs" :key="u.id">{{ u.nom }} - {{ u.email }} - {{ u.role }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'MmUtilisateurs',
  data() {
    return {
      utilisateurs: [],
      nom: '',
      email: '',
      password: '',
      role: 'agent'
    };
  },
  mounted() { this.getUtilisateurs(); },
  methods: {
    async getUtilisateurs() {
      const res = await axios.get('http://localhost:5000/api/utilisateurs');
      this.utilisateurs = res.data;
    },
    async ajouterUtilisateur() {
      await axios.post('http://localhost:5000/api/utilisateurs', {
        nom: this.nom,
        email: this.email,
        password: this.password,
        role: this.role
      });
      this.nom = '';
      this.email = '';
      this.password = '';
      this.role = 'agent';
      this.getUtilisateurs();
    }
  }
};
</script>
