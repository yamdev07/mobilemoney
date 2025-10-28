const express = require('express');
const router = express.Router();
const pool = require('../db');

// Ajouter un opérateur
router.post('/', async (req, res) => {
  const { nom } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO operateurs (nom) VALUES (?)`,
      [nom]
    );
    res.json({ id: result.insertId, message: 'Opérateur ajouté' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Lister tous les opérateurs
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM operateurs ORDER BY id DESC`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
