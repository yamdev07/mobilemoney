<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-4xl font-bold text-slate-800 mb-2">
          Gestion des Transactions
        </h2>
        <p class="text-slate-600">Enregistrez et consultez toutes vos transactions</p>
      </div>

      <!-- Formulaire d'ajout -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200">
        <h3 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          Nouvelle Transaction
        </h3>
        <form @submit.prevent="ajouterTransaction" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Nom client -->
          <div class="relative">
            <label class="text-sm font-medium text-slate-700 mb-1 block">Nom du client</label>
            <input 
              v-model="nom_client" 
              placeholder="Jean Dupont" 
              class="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-slate-700 focus:outline-none transition-colors pl-10" 
              required 
            />
            <svg class="w-5 h-5 text-slate-400 absolute left-3 bottom-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
          </div>

          <!-- Numéro -->
          <div class="relative">
            <label class="text-sm font-medium text-slate-700 mb-1 block">Numéro</label>
            <input 
              v-model="numero" 
              placeholder="96XXXXXXXX" 
              class="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-slate-700 focus:outline-none transition-colors pl-10" 
              required 
            />
            <svg class="w-5 h-5 text-slate-400 absolute left-3 bottom-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </div>

          <!-- Type -->
          <div class="relative">
            <label class="text-sm font-medium text-slate-700 mb-1 block">Type</label>
            <select 
              v-model="type" 
              class="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-slate-700 focus:outline-none transition-colors appearance-none pl-10 bg-white cursor-pointer">
              <option>dépôt</option>
              <option>retrait</option>
            </select>
            <svg class="w-5 h-5 text-slate-400 absolute left-3 bottom-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/>
            </svg>
            <svg class="w-4 h-4 text-slate-400 absolute right-3 bottom-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>

          <!-- Opérateur -->
          <div class="relative">
            <label class="text-sm font-medium text-slate-700 mb-1 block">Opérateur</label>
            <select 
              v-model="operateur_id" 
              class="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-slate-700 focus:outline-none transition-colors appearance-none pl-10 bg-white cursor-pointer">
              <option v-for="op in operateurs" :key="op.id" :value="op.id">{{ op.nom }}</option>
            </select>
            <svg class="w-5 h-5 text-slate-400 absolute left-3 bottom-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            <svg class="w-4 h-4 text-slate-400 absolute right-3 bottom-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>

          <!-- Montant -->
          <div class="relative">
            <label class="text-sm font-medium text-slate-700 mb-1 block">Montant (FCFA)</label>
            <input 
              v-model.number="montant" 
              type="number"
              placeholder="5000" 
              class="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-slate-700 focus:outline-none transition-colors pl-10" 
              required 
            />
            <svg class="w-5 h-5 text-slate-400 absolute left-3 bottom-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>

          <!-- ID Agent -->
          <div class="relative">
            <label class="text-sm font-medium text-slate-700 mb-1 block">ID Agent</label>
            <input 
              v-model.number="created_by" 
              type="number"
              placeholder="1" 
              class="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-slate-700 focus:outline-none transition-colors pl-10" 
              required 
            />
            <svg class="w-5 h-5 text-slate-400 absolute left-3 bottom-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/>
            </svg>
          </div>

          <!-- Bouton submit -->
          <button 
            type="submit" 
            class="md:col-span-2 lg:col-span-3 bg-gradient-to-r from-slate-700 to-slate-900 text-white px-6 py-3 rounded-xl hover:from-slate-800 hover:to-black transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center gap-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
            Enregistrer la transaction
          </button>
        </form>
      </div>

      <!-- Filtres et recherche -->
      <div class="bg-white rounded-2xl shadow-lg p-4 mb-6 border border-slate-200">
        <div class="flex flex-col md:flex-row gap-3">
          <div class="flex-1 relative">
            <input 
              v-model="recherche"
              placeholder="Rechercher par nom, numéro..." 
              class="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-slate-700 focus:outline-none transition-colors pl-10" 
            />
            <svg class="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>
          <select 
            v-model="filtreType"
            class="border-2 border-slate-200 p-3 rounded-xl focus:border-slate-700 focus:outline-none transition-colors bg-white cursor-pointer">
            <option value="">Tous les types</option>
            <option value="dépôt">Dépôts uniquement</option>
            <option value="retrait">Retraits uniquement</option>
          </select>
          <select 
            v-model="filtreOperateur"
            class="border-2 border-slate-200 p-3 rounded-xl focus:border-slate-700 focus:outline-none transition-colors bg-white cursor-pointer">
            <option value="">Tous les opérateurs</option>
            <option v-for="op in operateurs" :key="op.id" :value="op.id">{{ op.nom }}</option>
          </select>
        </div>
      </div>

      <!-- Liste des transactions -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <svg class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"/>
            </svg>
            Historique des Transactions
          </h3>
          <span class="bg-slate-100 text-slate-800 text-sm font-medium px-3 py-1 rounded-full">
            {{ transactionsFiltrees.length }} transaction{{ transactionsFiltrees.length > 1 ? 's' : '' }}
          </span>
        </div>

        <!-- Message si vide -->
        <div v-if="transactionsFiltrees.length === 0" class="text-center py-12">
          <svg class="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <p class="text-slate-500 text-lg">Aucune transaction trouvée</p>
          <p class="text-slate-400 text-sm mt-1">Commencez par ajouter votre première transaction</p>
        </div>

        <!-- Liste avec design moderne -->
        <div v-else class="space-y-3">
          <div 
            v-for="t in transactionsFiltrees" 
            :key="t.id"
            class="flex flex-col sm:flex-row sm:items-center gap-3 p-4 rounded-xl border-2 border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all group">
            
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
              <p class="font-semibold text-slate-800 truncate">{{ t.nom_client }}</p>
              <p class="text-sm text-slate-500 flex items-center gap-2 mt-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                {{ t.numero }}
              </p>
            </div>

            <!-- Opérateur -->
            <div class="hidden sm:block">
              <span 
                :class="getOperateurBadgeClass(t.operateur_nom)"
                class="px-3 py-1 rounded-lg text-sm font-medium">
                {{ t.operateur_nom }}
              </span>
            </div>

            <!-- Montant -->
            <div class="text-right">
              <p class="text-xl font-bold text-slate-800">{{ formatMontant(t.montant) }} FCFA</p>
              <p class="text-xs text-slate-500">{{ formatDate(t.date_transaction) }}</p>
            </div>

            <!-- Bouton supprimer -->
            <button 
              @click="supprimerTransaction(t.id)"
              class="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg">
              <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
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
      created_by: 1,
      recherche: '',
      filtreType: '',
      filtreOperateur: ''
    };
  },
  computed: {
    transactionsFiltrees() {
      let filtered = this.transactions;
      
      // Filtre par recherche
      if (this.recherche) {
        const search = this.recherche.toLowerCase();
        filtered = filtered.filter(t => 
          t.nom_client.toLowerCase().includes(search) ||
          t.numero.includes(search)
        );
      }
      
      // Filtre par type
      if (this.filtreType) {
        filtered = filtered.filter(t => t.type === this.filtreType);
      }
      
      // Filtre par opérateur
      if (this.filtreOperateur) {
        filtered = filtered.filter(t => t.operateur_id == this.filtreOperateur);
      }
      
      return filtered;
    }
  },
  mounted() {
    this.getTransactions();
    this.getOperateurs();
  },
  methods: {
    async getTransactions() {
      try {
        const res = await axios.get('http://localhost:5000/api/transactions');
        this.transactions = res.data;
      } catch (error) {
        console.error('Erreur lors du chargement des transactions:', error);
      }
    },
    async getOperateurs() {
      try {
        const res = await axios.get('http://localhost:5000/api/operateurs');
        this.operateurs = res.data;
        if (this.operateurs.length) this.operateur_id = this.operateurs[0].id;
      } catch (error) {
        console.error('Erreur lors du chargement des opérateurs:', error);
      }
    },
    async ajouterTransaction() {
      try {
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
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la transaction:', error);
      }
    },
    async supprimerTransaction(id) {
      if (!confirm('Êtes-vous sûr de vouloir supprimer cette transaction ?')) return;
      try {
        await axios.delete(`http://localhost:5000/api/transactions/${id}`);
        this.getTransactions();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    },
    formatMontant(montant) {
      return new Intl.NumberFormat('fr-FR').format(montant);
    },
    formatDate(date) {
      return new Date(date).toLocaleString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    getOperateurBadgeClass(nom) {
      const nomLower = nom.toLowerCase();
      if (nomLower.includes('mtn')) return 'bg-yellow-100 text-yellow-800';
      if (nomLower.includes('moov')) return 'bg-blue-100 text-blue-800';
      if (nomLower.includes('celtiis') || nomLower.includes('celtis')) return 'bg-teal-100 text-teal-800';
      return 'bg-slate-100 text-slate-800';
    }
  }
};
</script>