const express = require('express');
const router = express.Router();
const db = require('../firebase'); // notre config Firebase

// Middleware pour simuler l'utilisateur connecté
function authMiddleware(req, res, next) {
  req.user = {
    id: req.headers['x-user-id'] || '0',
    role: req.headers['x-user-role'] || 'agent'
  };
  next();
}

router.use(authMiddleware);

// GET /api/utilisateurs
router.get('/', async (req, res) => {
  try {
    let usersRef = db.collection('utilisateurs');
    let snapshot;

    if (req.user.role === 'admin') {
      // admin voit tous les utilisateurs
      snapshot = await usersRef.get();
    } else {
      // agent ne voit que lui-même
      snapshot = await usersRef.where('id', '==', req.user.id).get();
    }

    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});

module.exports = router;
