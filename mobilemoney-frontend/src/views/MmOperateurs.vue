<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-6">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-4xl font-bold text-gray-800 mb-2">
          Gestion des Opérateurs
        </h2>
        <p class="text-gray-600">Ajoutez et gérez vos opérateurs</p>
      </div>

      <!-- Formulaire d'ajout -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Nouvel Opérateur
        </h3>
        <form @submit.prevent="ajouterOperateur" class="flex gap-3">
          <div class="flex-1 relative">
            <input 
              v-model="nom" 
              placeholder="Nom de l'opérateur" 
              class="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-blue-500 focus:outline-none transition-colors pl-10" 
              required 
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>
          <button 
            type="submit" 
            class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-medium flex items-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Ajouter
          </button>
        </form>
      </div>

      <!-- Liste des opérateurs -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            Liste des Opérateurs
          </h3>
          <span class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
            {{ operateurs.length }} opérateur{{ operateurs.length > 1 ? 's' : '' }}
          </span>
        </div>

        <!-- Message si vide -->
        <div v-if="operateurs.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
          </svg>
          <p class="text-gray-500 text-lg">Aucun opérateur pour le moment</p>
          <p class="text-gray-400 text-sm mt-1">Ajoutez votre premier opérateur ci-dessus</p>
        </div>

        <!-- Liste avec design moderne -->
        <div v-else class="space-y-3">
          <div 
            v-for="(op, index) in operateurs" 
            :key="op.id"
            class="flex items-center gap-4 p-4 rounded-xl border-2 border-gray-100 hover:border-blue-300 hover:bg-blue-50 transition-all group">
            <div class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md">
              {{ op.nom.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1">
              <p class="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                {{ op.nom }}
              </p>
              <p class="text-xs text-gray-500">Opérateur #{{ index + 1 }}</p>
            </div>
            <div class="opacity-0 group-hover:opacity-100 transition-opacity">
              <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
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