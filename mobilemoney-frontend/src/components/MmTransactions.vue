<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4">Transactions</h2>
    <form @submit.prevent="ajouterTransaction" class="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
      <input v-model="nom_client" placeholder="Nom client" class="border p-2 rounded" required />
      <input v-model="numero" placeholder="Numéro" class="border p-2 rounded" required />
      <select v-model="type" class="border p-2 rounded">
        <option>dépôt</option>
        <option>retrait</option>
      </select>
      <select v-model="operateur_id" class="border p-2 rounded">
        <option v-for="op in operateurs" :key="op.id" :value="op.id">{{ op.nom }}</option>
      </select>
      <input v-model.number="montant" placeholder="Montant" class="border p-2 rounded" required />
      <input v-model.number="created_by" placeholder="ID Agent" class="border p-2 rounded" required />
      <button type="submit" 
              class="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 col-span-full">
        Ajouter
      </button>
    </form>
    <ul class="list-disc pl-5 space-y-1">
      <li v-for="t in transactions" :key="t.id">
        {{ t.nom_client }} - {{ t.numero }} - {{ t.type }} - {{ t.operateur_nom }} - {{ t.montant }} - {{ t.date_transaction }}
      </li>
    </ul>
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
