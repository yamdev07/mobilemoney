// routes/home.js
const express = require('express');
const router = express.Router();

// GET route home
router.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur le backend Mobile Money !' });
});

module.exports = router;
