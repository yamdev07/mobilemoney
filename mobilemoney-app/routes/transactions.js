const express = require('express');
const router = express.Router();
const pool = require('../db');

// Ajouter une transaction
router.post('/', async (req, res) => {
  const { nom_client, numero, type, operateur_id, montant, created_by } = req.body;
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

// Lister toutes les transactions
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT t.*, o.nom AS operateur_nom, u.nom AS agent_nom
       FROM transactions t
       LEFT JOIN operateurs o ON t.operateur_id = o.id
       LEFT JOIN utilisateurs u ON t.created_by = u.id
       ORDER BY t.date_transaction DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
