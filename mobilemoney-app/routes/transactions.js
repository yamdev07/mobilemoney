const express = require('express');
const router = express.Router();
const db = require('../firebase');

// GET toutes les transactions
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.ref('transactions').once('value');
    const data = snapshot.val() || {};
    const transactions = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST nouvelle transaction
router.post('/', async (req, res) => {
  try {
    const { montant, utilisateurId, operateurId } = req.body;
    if (!montant || !utilisateurId || !operateurId)
      return res.status(400).json({ error: 'Toutes les infos sont requises' });

    const newRef = db.ref('transactions').push();
    await newRef.set({ montant, utilisateurId, operateurId, date: Date.now() });
    res.status(201).json({ id: newRef.key, montant, utilisateurId, operateurId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
