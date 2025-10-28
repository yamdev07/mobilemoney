<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-4xl font-bold text-gray-800 mb-2">
          Gestion des Transactions
        </h2>
        <p class="text-gray-600">Enregistrez et consultez toutes vos transactions</p>
      </div>

      <!-- Formulaire d'ajout -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
        <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Nouvelle Transaction
        </h3>
        <form @submit.prevent="ajouterTransaction" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Nom client -->
          <div class="relative">
            <label class="text-sm font-medium text-gray-700 mb-1 block">Nom du client</label>
            <input 
              v-model="nom_client" 
              placeholder="Jean Dupont" 
              class="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 focus:outline-none transition-colors pl-10" 
              required 
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 bottom-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>

          <!-- Numéro -->
          <div class="relative">
            <label class="text-sm font-medium text-gray-700 mb-1 block">Numéro</label>
            <input 
              v-model="numero" 
              placeholder="96XXXXXXXX" 
              class="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 focus:outline-none transition-colors pl-10" 
              required 
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 bottom-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </div>

          <!-- Type -->
          <div class="relative">
            <label class="text-sm font-medium text-gray-700 mb-1 block">Type</label>
            <select 
              v-model="type" 
              class="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 focus:outline-none transition-colors appearance-none pl-10 bg-white cursor-pointer">
              <option>dépôt</option>
              <option>retrait</option>
            </select>
            <svg class="w-5 h-5 text-gray-400 absolute left-3 bottom-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
            </svg>
            <svg class="w-4 h-4 text-gray-400 absolute right-3 bottom-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>

          <!-- Opérateur -->
          <div class="relative">
            <label class="text-sm font-medium text-gray-700 mb-1 block">Opérateur</label>
            <select 
              v-model="operateur_id" 
              class="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 focus:outline-none transition-colors appearance-none pl-10 bg-white cursor-pointer">
              <option v-for="op in operateurs" :key="op.id" :value="op.id">{{ op.nom }}</option>
            </select>
            <svg class="w-5 h-5 text-gray-400 absolute left-3 bottom-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <svg class="w-4 h-4 text-gray-400 absolute right-3 bottom-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>

          <!-- Montant -->
          <div class="relative">
            <label class="text-sm font-medium text-gray-700 mb-1 block">Montant (FCFA)</label>
            <input 
              v-model.number="montant" 
              type="number"
              placeholder="5000" 
              class="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 focus:outline-none transition-colors pl-10" 
              required 
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 bottom-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>

          <!-- ID Agent -->
          <div class="relative">
            <label class="text-sm font-medium text-gray-700 mb-1 block">ID Agent</label>
            <input 
              v-model.number="created_by" 
              type="number"
              placeholder="1" 
              class="w-full border-2 border-gray-200 p-3 rounded-xl focus:border-purple-500 focus:outline-none transition-colors pl-10" 
              required 
            />
            <svg class="w-5 h-5 text-gray-400 absolute left-3 bottom-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
            </svg>
          </div>

          <!-- Bouton submit -->
          <button 
            type="submit" 
            class="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-700 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Enregistrer la transaction
          </button>
        </form>
      </div>

      <!-- Liste des transactions -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
            Historique des Transactions
          </h3>
          <span class="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
            {{ transactions.length }} transaction{{ transactions.length > 1 ? 's' : '' }}
          </span>
        </div>

        <!-- Message si vide -->
        <div v-if="transactions.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <p class="text-gray-500 text-lg">Aucune transaction enregistrée</p>
          <p class="text-gray-400 text-sm mt-1">Commencez par ajouter votre première transaction</p>
        </div>

        <!-- Liste avec design moderne -->
        <div v-else class="space-y-3">
          <div 
            v-for="t in transactions" 
            :key="t.id"
            class="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border-2 border-gray-100 hover:border-purple-300 hover:bg-purple-50 transition-all group">
            
            <!-- Badge type -->
            <div class="flex-shrink-0">
              <span 
                :class="t.type === 'dépôt' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'"
                class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                <svg v-if="t.type === 'dépôt'" class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m0 0l-4-4m4 4l4-4"/>
                </svg>
                <svg v-else class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20V4m0 0l4 4m-4-4l-4 4"/>
                </svg>
                {{ t.type }}
              </span>
            </div>

            <!-- Infos client -->
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-gray-800 truncate">{{ t.nom_client }}</p>
              <p class="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {{ t.numero }}
              </p>
            </div>

            <!-- Opérateur -->
            <div class="hidden sm:block">
              <span class="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium">
                {{ t.operateur_nom }}
              </span>
            </div>

            <!-- Montant -->
            <div class="text-right">
              <p class="text-xl font-bold text-purple-600">{{ montant.toLocaleString() }} FCFA</p>
              <p class="text-xs text-gray-500">{{ new Date(t.date_transaction).toLocaleDateString('fr-FR') }}</p>
            </div>

            <!-- Icône flèche -->
            <div class="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity">
              <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
  name: 'MmTransactions',
  data() {
    return {
      transactions: [],
      operateurs: [],
      nom_client: '',
      numero: '',
      type: 'dépôt',
      operateur_id: null,
      montant: 0,
      created_by: 1
    };
  },
  mounted() {
    this.getTransactions();
    this.getOperateurs();
  },
  methods: {
    async getTransactions() {
      const res = await axios.get('http://localhost:5000/api/transactions');
      this.transactions = res.data;
    },
    async getOperateurs() {
      const res = await axios.get('http://localhost:5000/api/operateurs');
      this.operateurs = res.data;
      if (this.operateurs.length) this.operateur_id = this.operateurs[0].id;
    },
    async ajouterTransaction() {
      await axios.post('http://localhost:5000/api/transactions', {
        nom_client: this.nom_client,
        numero: this.numero,
        type: this.type,
        operateur_id: this.operateur_id,
        montant: this.montant,
        created_by: this.created_by
      });
      this.nom_client = '';
      this.numero = '';
      this.type = 'dépôt';
      this.montant = 0;
      this.getTransactions();
    }
  }
};
</script>