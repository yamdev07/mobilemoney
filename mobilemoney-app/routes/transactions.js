const express = require('express');
const router = express.Router();
const db = require('../firebase');

router.post('/', async (req, res) => {
  const { nom_client, numero, type, operateur, montant, created_by } = req.body;
  try {
    const docRef = await db.collection('transactions').add({
      nom_client, numero, type, operateur, montant, created_by, date: new Date()
    });
    res.json({ id: docRef.id, message: 'Transaction ajoutée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

router.get('/', async (req, res) => {
  try {
    const snapshot = await db.collection('transactions').orderBy('date', 'desc').get();
    const transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
