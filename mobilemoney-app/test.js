const pool = require('./db');

async function testConnexion() {
  try {
    const [rows] = await pool.query('SELECT NOW() AS now');
    console.log('Connexion MySQL OK :', rows[0].now);
  } catch (err) {
    console.error('Erreur de connexion :', err);
  }
}

testConnexion();
