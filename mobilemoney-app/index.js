const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(cors()); // autoriser frontend Vue
app.use(express.json());

// Routes
const homeRouter = require('./routes/home');
const operateursRouter = require('./routes/operateurs');
const utilisateursRouter = require('./routes/utilisateurs');
const transactionsRouter = require('./routes/transactions');

app.use('/api/home', homeRouter);
app.use('/api/operateurs', operateursRouter);
app.use('/api/utilisateurs', utilisateursRouter);
app.use('/api/transactions', transactionsRouter);

// Route test
app.get('/', (req, res) => {
  res.send('Backend MobileMoney fonctionne ✅');
});

// Lancement serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
