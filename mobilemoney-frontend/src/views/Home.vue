<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- En-tête avec message de bienvenue -->
      <div class="mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 class="text-4xl font-bold text-slate-800 mb-2">
              Bonjour, {{ utilisateur.nom }} 👋
            </h1>
            <p class="text-slate-600">Voici un aperçu de vos transactions du jour</p>
          </div>
          <div class="flex items-center gap-3 bg-white px-4 py-3 rounded-xl shadow-md border border-slate-200">
            <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            <div>
              <p class="text-xs text-slate-500">Aujourd'hui</p>
              <p class="font-semibold text-slate-800">{{ dateAujourdhui }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Statistiques globales du jour -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total transactions -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border border-slate-200 hover:shadow-xl transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
            </div>
            <span class="text-xs font-semibold text-slate-500 uppercase">Total</span>
          </div>
          <p class="text-3xl font-bold text-slate-800">{{ stats.total }}</p>
          <p class="text-sm text-slate-500 mt-1">Transactions</p>
        </div>

        <!-- Dépôts -->
        <div class="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m0 0l-4-4m4 4l4-4"/>
              </svg>
            </div>
            <span class="text-xs font-semibold uppercase opacity-90">Dépôts</span>
          </div>
          <p class="text-3xl font-bold">{{ stats.depots.nombre }}</p>
          <p class="text-sm opacity-90 mt-1">{{ formatMontant(stats.depots.montant) }} FCFA</p>
        </div>

        <!-- Retraits -->
        <div class="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20V4m0 0l4 4m-4-4l-4 4"/>
              </svg>
            </div>
            <span class="text-xs font-semibold uppercase opacity-90">Retraits</span>
          </div>
          <p class="text-3xl font-bold">{{ stats.retraits.nombre }}</p>
          <p class="text-sm opacity-90 mt-1">{{ formatMontant(stats.retraits.montant) }} FCFA</p>
        </div>

        <!-- Montant total -->
        <div class="bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl shadow-lg p-6 text-white hover:shadow-xl transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <span class="text-xs font-semibold uppercase opacity-90">Montant Total</span>
          </div>
          <p class="text-3xl font-bold">{{ formatMontant(stats.montantTotal) }}</p>
          <p class="text-sm opacity-90 mt-1">FCFA</p>
        </div>
      </div>

      <!-- Transactions par réseau -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- MTN -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-2 border-yellow-200 hover:border-yellow-400 transition-all">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-md">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h3 class="font-bold text-slate-800">MTN Mobile Money</h3>
              <p class="text-xs text-slate-500">Réseau jaune</p>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span class="text-sm text-slate-600">Transactions</span>
              <span class="font-bold text-slate-800">{{ reseaux.mtn.total }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span class="text-sm text-green-700 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m0 0l-4-4m4 4l4-4"/>
                </svg>
                Dépôts
              </span>
              <span class="font-bold text-green-700">{{ formatMontant(reseaux.mtn.depots) }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span class="text-sm text-orange-700 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20V4m0 0l4 4m-4-4l-4 4"/>
                </svg>
                Retraits
              </span>
              <span class="font-bold text-orange-700">{{ formatMontant(reseaux.mtn.retraits) }}</span>
            </div>
          </div>
        </div>

        <!-- Moov -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-200 hover:border-blue-400 transition-all">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-orange-500 rounded-full flex items-center justify-center shadow-md">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h3 class="font-bold text-slate-800">Moov Money</h3>
              <p class="text-xs text-slate-500">Réseau bleu/orange</p>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span class="text-sm text-slate-600">Transactions</span>
              <span class="font-bold text-slate-800">{{ reseaux.moov.total }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span class="text-sm text-green-700 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m0 0l-4-4m4 4l4-4"/>
                </svg>
                Dépôts
              </span>
              <span class="font-bold text-green-700">{{ formatMontant(reseaux.moov.depots) }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span class="text-sm text-orange-700 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20V4m0 0l4 4m-4-4l-4 4"/>
                </svg>
                Retraits
              </span>
              <span class="font-bold text-orange-700">{{ formatMontant(reseaux.moov.retraits) }}</span>
            </div>
          </div>
        </div>

        <!-- Celtiis -->
        <div class="bg-white rounded-2xl shadow-lg p-6 border-2 border-teal-200 hover:border-teal-400 transition-all">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center shadow-md">
              <span class="text-white font-bold text-lg">C</span>
            </div>
            <div>
              <h3 class="font-bold text-slate-800">Celtiis Cash</h3>
              <p class="text-xs text-slate-500">Réseau bleu/vert</p>
            </div>
          </div>
          <div class="space-y-3">
            <div class="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span class="text-sm text-slate-600">Transactions</span>
              <span class="font-bold text-slate-800">{{ reseaux.celtiis.total }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span class="text-sm text-green-700 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m0 0l-4-4m4 4l4-4"/>
                </svg>
                Dépôts
              </span>
              <span class="font-bold text-green-700">{{ formatMontant(reseaux.celtiis.depots) }}</span>
            </div>
            <div class="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span class="text-sm text-orange-700 flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20V4m0 0l4 4m-4-4l-4 4"/>
                </svg>
                Retraits
              </span>
              <span class="font-bold text-orange-700">{{ formatMontant(reseaux.celtiis.retraits) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Dernières transactions -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
            <svg class="w-6 h-6 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Dernières Transactions
          </h3>
          <router-link to="/transactions" class="text-sm text-slate-600 hover:text-slate-800 font-medium flex items-center gap-1">
            Voir tout
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </router-link>
        </div>

        <div v-if="dernieresTransactions.length === 0" class="text-center py-8">
          <svg class="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
          </svg>
          <p class="text-slate-500">Aucune transaction aujourd'hui</p>
        </div>

        <div v-else class="space-y-3">
          <div 
            v-for="t in dernieresTransactions.slice(0, 5)" 
            :key="t.id"
            class="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all">
            <div class="flex-shrink-0">
              <span 
                :class="t.type === 'dépôt' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full font-semibold">
                <svg v-if="t.type === 'dépôt'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m0 0l-4-4m4 4l4-4"/>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20V4m0 0l4 4m-4-4l-4 4"/>
                </svg>
              </span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-slate-800">{{ t.nom_client }}</p>
              <p class="text-sm text-slate-500">{{ t.numero }} • {{ t.operateur_nom }}</p>
            </div>
            <div class="text-right">
              <p class="font-bold text-slate-800">{{ formatMontant(t.montant) }}</p>
              <p class="text-xs text-slate-500">{{ formatHeure(t.date_transaction) }}</p>
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
  name: 'MmHome',
  data() {
    return {
      utilisateur: {
        nom: 'Agent'
      },
      stats: {
        total: 0,
        depots: { nombre: 0, montant: 0 },
        retraits: { nombre: 0, montant: 0 },
        montantTotal: 0
      },
      reseaux: {
        mtn: { total: 0, depots: 0, retraits: 0 },
        moov: { total: 0, depots: 0, retraits: 0 },
        celtiis: { total: 0, depots: 0, retraits: 0 }
      },
      dernieresTransactions: []
    };
  },
  computed: {
    dateAujourdhui() {
      return new Date().toLocaleDateString('fr-FR', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  },
  mounted() {
    this.chargerDonnees();
  },
  methods: {
    async chargerDonnees() {
      try {
        // Charger les transactions du jour
        const res = await axios.get('http://localhost:5000/api/transactions');
        const transactions = res.data;
        
        // Filtrer les transactions du jour
        const aujourdhui = new Date().toDateString();
        const transactionsDuJour = transactions.filter(t => {
          const dateTransaction = new Date(t.date_transaction).toDateString();
          return dateTransaction === aujourdhui;
        });

        // Calculer les statistiques
        this.calculerStats(transactionsDuJour);
        this.dernieresTransactions = transactionsDuJour.reverse();

        // Charger le nom de l'utilisateur (ID 1 par défaut)
        const userRes = await axios.get('http://localhost:5000/api/utilisateurs');
        if (userRes.data.length > 0) {
          this.utilisateur.nom = userRes.data[0].nom;
        }
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    },
    calculerStats(transactions) {
      this.stats.total = transactions.length;
      
      transactions.forEach(t => {
        const montant = parseFloat(t.montant);
        
        if (t.type === 'dépôt') {
          this.stats.depots.nombre++;
          this.stats.depots.montant += montant;
        } else {
          this.stats.retraits.nombre++;
          this.stats.retraits.montant += montant;
        }
        
        this.stats.montantTotal += montant;

        // Stats par réseau
        const operateur = t.operateur_nom.toLowerCase();
        if (operateur.includes('mtn')) {
          this.reseaux.mtn.total++;
          if (t.type === 'dépôt') this.reseaux.mtn.depots += montant;
          else this.reseaux.mtn.retraits += montant;
        } else if (operateur.includes('moov')) {
          this.reseaux.moov.total++;
          if (t.type === 'dépôt') this.reseaux.moov.depots += montant;
          else this.reseaux.moov.retraits += montant;
        } else if (operateur.includes('celtiis') || operateur.includes('celtis')) {
          this.reseaux.celtiis.total++;
          if (t.type === 'dépôt') this.reseaux.celtiis.depots += montant;
          else this.reseaux.celtiis.retraits += montant;
        }
      });
    },
    formatMontant(montant) {
      return new Intl.NumberFormat('fr-FR').format(montant);
    },
    formatHeure(date) {
      return new Date(date).toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    }
  }
};
</script>