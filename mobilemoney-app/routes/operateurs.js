const express = require('express');
const router = express.Router();
const db = require('../firebase');

// GET tous les opérateurs
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.ref('operateurs').once('value');
    const data = snapshot.val() || {};
    const operateurs = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    res.json(operateurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST nouvel opérateur
router.post('/', async (req, res) => {
  try {
    const { nom } = req.body;
    if (!nom) return res.status(400).json({ error: 'Nom requis' });

    const newRef = db.ref('operateurs').push();
    await newRef.set({ nom });
    res.status(201).json({ id: newRef.key, nom });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
