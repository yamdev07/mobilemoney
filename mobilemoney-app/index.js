const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Route racine pour tester le serveur
app.get('/', (req, res) => {
  res.send('API Mobile Money fonctionne ✅');
});

// Import des routes
const transactionsRoutes = require('./routes/transactions');
const utilisateursRoutes = require('./routes/utilisateurs');
const operateursRoutes = require('./routes/operateurs');

app.use('/api/transactions', transactionsRoutes);
app.use('/api/utilisateurs', utilisateursRoutes);
app.use('/api/operateurs', operateursRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
