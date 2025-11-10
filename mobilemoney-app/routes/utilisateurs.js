const express = require('express');
const router = express.Router();
const db = require('../firebase');

// GET tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.ref('utilisateurs').once('value');
    const data = snapshot.val() || {};
    const utilisateurs = Object.keys(data).map(key => ({ id: key, ...data[key] }));
    res.json(utilisateurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// POST nouvel utilisateur
router.post('/', async (req, res) => {
  try {
    const { nom, email } = req.body;
    if (!nom || !email) return res.status(400).json({ error: 'Nom et email requis' });

    const newRef = db.ref('utilisateurs').push();
    await newRef.set({ nom, email });
    res.status(201).json({ id: newRef.key, nom, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
