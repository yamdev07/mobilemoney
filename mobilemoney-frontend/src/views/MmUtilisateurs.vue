<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-6">
    <div class="max-w-5xl mx-auto">

      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-4xl font-bold text-gray-800 mb-2">Gestion des Utilisateurs</h2>
        <p class="text-gray-600">Gérez les agents et administrateurs du système</p>
      </div>

      <!-- Formulaire d'ajout : uniquement visible pour l'admin -->
      <div v-if="utilisateurConnecte && utilisateurConnecte.role === 'admin'" class="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Nouvel Utilisateur</h3>
        <form @submit.prevent="ajouterUtilisateur" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Champs du formulaire ici (nom, email, mot de passe, rôle) -->
          <!-- ... -->
        </form>
      </div>

      <!-- Liste des utilisateurs -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">Liste des Utilisateurs</h3>
          <div class="flex gap-2">
            <span class="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              {{ utilisateurs.length }} utilisateur{{ utilisateurs.length > 1 ? 's' : '' }}
            </span>
          </div>
        </div>

        <!-- Message si vide -->
        <div v-if="utilisateurs.length === 0" class="text-center py-12">
          <p class="text-gray-500 text-lg">Aucun utilisateur enregistré</p>
        </div>

        <!-- Liste avec design moderne -->
        <div v-else class="space-y-3">
          <div v-for="u in utilisateurs" :key="u.id" class="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-green-300 hover:bg-green-50 transition-all group">
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-800 truncate">{{ u.nom }}</p>
              <p class="text-sm text-gray-500">{{ u.email }}</p>
              <span :class="u.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'"
                    class="px-2 py-1 rounded-full text-xs font-semibold">{{ u.role }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MmUtilisateurs',
  data() {
    return {
      utilisateurs: [],
      utilisateurConnecte: null, // Utilisateur courant
      nom: '',
      email: '',
      password: '',
      role: 'agent'
    };
  },
  mounted() {
    this.getUtilisateurConnecte();
  },
  methods: {
    async getUtilisateurConnecte() {
      // Récupère l'utilisateur connecté depuis le backend
      const res = await axios.get('http://localhost:5000/api/utilisateur-connecte');
      this.utilisateurConnecte = res.data;

      // Charge la liste selon le rôle
      this.getUtilisateurs();
    },

    async getUtilisateurs() {
      const res = await axios.get('http://localhost:5000/api/utilisateurs');
      if (this.utilisateurConnecte.role === 'agent') {
        // L'agent ne voit que ses informations
        this.utilisateurs = res.data.filter(u => u.id === this.utilisateurConnecte.id);
      } else {
        // L'admin voit tous les utilisateurs
        this.utilisateurs = res.data;
      }
    },

    async ajouterUtilisateur() {
      if (this.utilisateurConnecte.role !== 'admin') return;

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
