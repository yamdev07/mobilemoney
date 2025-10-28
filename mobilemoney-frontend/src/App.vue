<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Mobile Money App</h1>

    <nav class="mb-4 space-x-4">
      <router-link to="/operateurs" class="text-blue-500 hover:underline">Opérateurs</router-link>
      <router-link to="/utilisateurs" class="text-blue-500 hover:underline">Utilisateurs</router-link>
      <router-link to="/transactions" class="text-blue-500 hover:underline">Transactions</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
export default {};
</script>
