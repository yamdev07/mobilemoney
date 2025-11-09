const express = require('express');
const router = express.Router();
const pool = require('../db');

// Ajouter une transaction
router.post('/', async (req, res) => {
  const { nom_client, numero, type, operateur_id, montant, created_by } = req.body;

  // ✅ Validation basique des champs
  if (!nom_client || !numero || !type || !operateur_id || !montant || !created_by) {
    return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
  }

  // ✅ Vérifier que numero et montant ne contiennent que des chiffres
  const isNumeric = /^\d+$/; // expression régulière : uniquement des chiffres

  if (!isNumeric.test(numero)) {
    return res.status(400).json({ error: 'Le numéro doit contenir uniquement des chiffres' });
  }

  if (!isNumeric.test(montant)) {
    return res.status(400).json({ error: 'Le montant doit contenir uniquement des chiffres' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO transactions (nom_client, numero, type, operateur_id, montant, created_by)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [nom_client, numero, type, operateur_id, montant, created_by]
    );
    res.json({ id: result.insertId, message: 'Transaction ajoutée' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});
