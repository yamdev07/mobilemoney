<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-green-100">
    <!-- En-tête moderne -->
    <header class="bg-white shadow-md border-b border-green-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo et titre -->
          <router-link to="/" class="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity">
            <div class="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold text-green-800">Mobile Money Manager</h1>
              <p class="text-xs text-green-600">Gestion des transactions</p>
            </div>
          </router-link>

          <!-- Navigation desktop -->
          <nav class="hidden md:flex items-center gap-2">
            <router-link 
              to="/operateurs"
              class="px-4 py-2 rounded-lg text-green-700 hover:bg-green-100 hover:text-green-900 transition-all font-medium flex items-center gap-2"
              active-class="bg-green-600 text-white hover:bg-green-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
              </svg>
              Opérateurs
            </router-link>
            <router-link 
              to="/utilisateurs"
              class="px-4 py-2 rounded-lg text-green-700 hover:bg-green-100 hover:text-green-900 transition-all font-medium flex items-center gap-2"
              active-class="bg-green-600 text-white hover:bg-green-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
              Utilisateurs
            </router-link>
            <router-link 
              to="/transactions"
              class="px-4 py-2 rounded-lg text-green-700 hover:bg-green-100 hover:text-green-900 transition-all font-medium flex items-center gap-2"
              active-class="bg-green-600 text-white hover:bg-green-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
              </svg>
              Transactions
            </router-link>
          </nav>

          <!-- Menu utilisateur -->
          <div class="hidden md:flex items-center gap-3">
            <div class="flex items-center gap-2 px-3 py-2 bg-green-100 rounded-lg">
              <div class="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span class="text-white text-sm font-semibold">A</span>
              </div>
              <span class="text-sm font-medium text-green-700">Agent</span>
            </div>
          </div>

          <!-- Bouton menu mobile -->
          <button @click="menuOpen = !menuOpen" class="md:hidden p-2 rounded-lg hover:bg-green-100">
            <svg class="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
        </div>

        <!-- Menu mobile -->
        <div v-if="menuOpen" class="md:hidden pb-4 space-y-2">
          <router-link 
            to="/operateurs"
            @click="menuOpen = false"
            class="block px-4 py-3 rounded-lg text-green-700 hover:bg-green-100 font-medium flex items-center gap-2"
            active-class="bg-green-600 text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
            </svg>
            Opérateurs
          </router-link>
          <router-link 
            to="/utilisateurs"
            @click="menuOpen = false"
            class="block px-4 py-3 rounded-lg text-green-700 hover:bg-green-100 font-medium flex items-center gap-2"
            active-class="bg-green-600 text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            Utilisateurs
          </router-link>
          <router-link 
            to="/transactions"
            @click="menuOpen = false"
            class="block px-4 py-3 rounded-lg text-green-700 hover:bg-green-100 font-medium flex items-center gap-2"
            active-class="bg-green-600 text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
            Transactions
          </router-link>
        </div>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view />
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-green-200 mt-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          
          <!-- Opérateurs -->
          <div class="flex items-center gap-6">
            <!-- MTN -->
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md">
                M
              </div>
              <span class="text-sm text-green-700 font-medium">MTN</span>
            </div>

            <!-- Moov -->
            <div class="flex items-center gap-2 cursor-pointer">
              <!-- Cercle orange avec M blanc -->
              <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md bg-orange-500">
                M
              </div>
              <!-- Nom Moov en orange -->
              <span class="text-sm font-medium text-orange-600">Moov</span>
            </div>

            <!-- Celtiis -->
            <div class="flex items-center gap-2">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-md">
                C
              </div>
              <span class="text-sm text-green-700 font-medium">Celtiis</span>
            </div>
          </div>

          <!-- Copyright -->
          <p class="text-sm text-green-600 mt-4 md:mt-0">© 2024 Mobile Money Manager. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false
    };
  }
};
</script>