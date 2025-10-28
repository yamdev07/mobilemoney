const express = require('express');
const router = express.Router();
const pool = require('../db');

// Ajouter un utilisateur
router.post('/', async (req, res) => {
  const { nom, email, password, role } = req.body;
  try {
    const [result] = await pool.query(
      `INSERT INTO utilisateurs (nom, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [nom, email, password, role || 'agent']
    );
    res.json({ id: result.insertId, message: 'Utilisateur ajouté' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

// Lister tous les utilisateurs
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT * FROM utilisateurs ORDER BY id DESC`);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
