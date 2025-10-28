const pool = require('./db');

async function seedDatabase() {
  try {
    // --- Ajouter les opérateurs ---
    const operateurs = ['MTN', 'Moov', 'Celtis'];
    for (const nom of operateurs) {
      await pool.query(`INSERT INTO operateurs (nom) VALUES (?)`, [nom]);
    }

    console.log('Opérateurs ajoutés ✅');

    // --- Ajouter les utilisateurs ---
    const utilisateurs = [
      { nom: 'Alice', email: 'alice@example.com', password: '12345', role: 'agent' },
      { nom: 'Bob', email: 'bob@example.com', password: '12345', role: 'agent' }
    ];

    for (const user of utilisateurs) {
      await pool.query(
        `INSERT INTO utilisateurs (nom, email, password, role) VALUES (?, ?, ?, ?)`,
        [user.nom, user.email, user.password, user.role]
      );
    }

    console.log('Utilisateurs ajoutés ✅');

    // --- Ajouter les transactions ---
    const transactions = [
      { nom_client: 'Client 1', numero: '97000001', type: 'dépôt', operateur_id: 1, montant: 5000, created_by: 1 },
      { nom_client: 'Client 2', numero: '97000002', type: 'retrait', operateur_id: 2, montant: 3000, created_by: 1 },
      { nom_client: 'Client 3', numero: '97000003', type: 'dépôt', operateur_id: 3, montant: 7000, created_by: 2 },
      { nom_client: 'Client 4', numero: '97000004', type: 'retrait', operateur_id: 1, montant: 2000, created_by: 2 },
      { nom_client: 'Client 5', numero: '97000005', type: 'dépôt', operateur_id: 2, montant: 4500, created_by: 1 }
    ];

    for (const t of transactions) {
      await pool.query(
        `INSERT INTO transactions (nom_client, numero, type, operateur_id, montant, created_by)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [t.nom_client, t.numero, t.type, t.operateur_id, t.montant, t.created_by]
      );
    }

    console.log('Transactions ajoutées ✅');

    console.log('Base de données remplie avec succès 🎉');
    process.exit(0);
  } catch (err) {
    console.error('Erreur lors du seed :', err);
    process.exit(1);
  }
}

seedDatabase();
m