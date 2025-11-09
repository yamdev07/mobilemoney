const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Body parser
app.use(express.json());

// Route racine
app.get('/', (req, res) => {
  res.send('Backend MobileMoney fonctionne ✅');
});

// Exemple : tes routes existantes
const transactionsRouter = require('./routes/transactions');
app.use('/api/transactions', transactionsRouter);

// Démarrage serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
