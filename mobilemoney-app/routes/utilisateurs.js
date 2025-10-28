const express = require('express');
const router = express.Router();
const pool = require('../db');

// Middleware simple pour simuler l'utilisateur connecté
// Dans une vraie app, on utiliserait JWT ou sessions
function authMiddleware(req, res, next) {
  // Exemple : on passe l'userId et role dans l'en-tête pour test
  req.user = {
    id: req.headers['x-user-id'] || 0,
    role: req.headers['x-user-role'] || 'agent'
  };
  next();
}

router.use(authMiddleware);

// GET /api/utilisateurs
router.get('/', async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      // admin voit tous les utilisateurs
      const [rows] = await pool.query('SELECT id, nom, email, role FROM utilisateurs');
      res.json(rows);
    } else {
      // agent ne voit que lui-même
      const [rows] = await pool.query('SELECT id, nom, email, role FROM utilisateurs WHERE id = ?', [req.user.id]);
      res.json(rows);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
