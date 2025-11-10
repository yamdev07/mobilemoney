<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-6"
  >
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-4xl font-bold text-slate-800 mb-2">
          Gestion des Opérateurs
        </h2>
        <p class="text-slate-600">
          Ajoutez et gérez les opérateurs Mobile Money
        </p>
      </div>

      <!-- Formulaire d'ajout -->
      <div
        class="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-slate-200"
      >
        <h3
          class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2"
        >
          <svg
            class="w-5 h-5 text-slate-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Nouvel Opérateur
        </h3>
        <form @submit.prevent="ajouterOperateur" class="flex gap-3">
          <div class="flex-1 relative">
            <input
              v-model="nom"
              placeholder="Nom de l'opérateur (ex: MTN, Moov, Celtiis)"
              class="w-full border-2 border-slate-200 p-3 rounded-xl focus:border-slate-700 focus:outline-none transition-colors pl-10"
              required
            />
            <svg
              class="w-5 h-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <button
            type="submit"
            class="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all shadow-md hover:shadow-lg font-medium flex items-center gap-2"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Ajouter
          </button>
        </form>
      </div>

      <!-- Liste des opérateurs -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
        <div class="flex items-center justify-between mb-4">
          <h3
            class="text-lg font-semibold text-slate-800 flex items-center gap-2"
          >
            <svg
              class="w-5 h-5 text-slate-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            Liste des Opérateurs
          </h3>
          <span
            class="bg-slate-100 text-slate-800 text-sm font-medium px-3 py-1 rounded-full"
          >
            {{ operateurs.length }} opérateur{{
              operateurs.length > 1 ? "s" : ""
            }}
          </span>
        </div>

        <!-- Message si vide -->
        <div v-if="operateurs.length === 0" class="text-center py-12">
          <svg
            class="w-16 h-16 text-slate-300 mx-auto mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <p class="text-slate-500 text-lg">Aucun opérateur pour le moment</p>
          <p class="text-slate-400 text-sm mt-1">
            Ajoutez votre premier opérateur ci-dessus
          </p>
        </div>

        <!-- Liste avec design moderne -->
        <div v-else class="space-y-3">
          <div
            v-for="(op, index) in operateurs"
            :key="op.id"
            class="flex items-center gap-4 p-4 rounded-xl border-2 border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all group"
          >
            <div
              :class="getOperateurColor(op.nom)"
              class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md"
            >
              {{ op.nom.charAt(0).toUpperCase() }}
            </div>
            <div class="flex-1">
              <p
                class="font-semibold text-slate-800 group-hover:text-slate-900 transition-colors"
              >
                {{ op.nom }}
              </p>
              <p class="text-xs text-slate-500">Opérateur #{{ index + 1 }}</p>
            </div>
            <button
              @click="supprimerOperateur(op.id)"
              class="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-50 rounded-lg"
            >
              <svg
                class="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Suggestions d'opérateurs populaires -->
      <div
        v-if="operateurs.length === 0"
        class="mt-6 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl p-6"
      >
        <h4
          class="text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2"
        >
          <svg
            class="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Suggestion : Opérateurs populaires
        </h4>
        <div class="flex flex-wrap gap-2">
          <button
            @click="ajouterOperateurRapide('MTN')"
            class="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-colors font-medium shadow-sm"
          >
            + MTN
          </button>
          <button
            @click="ajouterOperateurRapide('Moov')"
            class="px-4 py-2 bg-gradient-to-r from-blue-500 to-orange-500 text-white rounded-lg hover:from-blue-600 hover:to-orange-600 transition-colors font-medium shadow-sm"
          >
            + Moov
          </button>
          <button
            @click="ajouterOperateurRapide('Celtiis')"
            class="px-4 py-2 bg-gradient-to-r from-blue-400 to-teal-500 text-white rounded-lg hover:from-blue-500 hover:to-teal-600 transition-colors font-medium shadow-sm"
          >
            + Celtiis
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MmOperateurs",
  data() {
    return { operateurs: [], nom: "" };
  },
  mounted() {
    this.getOperateurs();
  },
  methods: {
    async getOperateurs() {
      try {
        const res = await axios.get("http://localhost:5000/api/operateurs");
        this.operateurs = res.data;
      } catch (error) {
        console.error("Erreur lors du chargement des opérateurs:", error);
      }
    },
    async ajouterOperateur() {
      if (!this.nom.trim()) return;
      try {
        await axios.post("http://localhost:5000/api/operateurs", {
          nom: this.nom,
        });
        this.nom = "";
        this.getOperateurs();
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'opérateur:", error);
      }
    },
    async ajouterOperateurRapide(nom) {
      this.nom = nom;
      await this.ajouterOperateur();
    },
    async supprimerOperateur(id) {
      if (!confirm("Êtes-vous sûr de vouloir supprimer cet opérateur ?"))
        return;
      try {
        await axios.delete(`http://localhost:5000/api/operateurs/${id}`);
        this.getOperateurs();
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
      }
    },
    getOperateurColor(nom) {
      const nomLower = nom.toLowerCase();
      if (nomLower.includes("mtn")) return "bg-yellow-400";
      if (nomLower.includes("moov"))
        return "bg-gradient-to-br from-blue-500 to-orange-500";
      if (nomLower.includes("celtiis") || nomLower.includes("celtis"))
        return "bg-gradient-to-br from-blue-400 to-teal-500";
      return "bg-gradient-to-br from-slate-700 to-slate-900";
    },
  },
};
</script>
