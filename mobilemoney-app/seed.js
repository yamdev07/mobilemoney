require('dotenv').config();
const admin = require('firebase-admin');

// 🟢 Lire et parser l’objet JSON depuis la variable d’environnement
const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
});

const db = admin.firestore();

async function seedFirebase() {
  try {
    console.log('🚀 Initialisation du remplissage Firestore...');

    // --- Nettoyer les anciennes données ---
    await clearCollection('operateurs');
    await clearCollection('utilisateurs');
    await clearCollection('transactions');

    // --- Ajouter les opérateurs ---
    const operateursData = [
      { nom: 'MTN', couleur: '#FFC107', created_at: new Date() },
      { nom: 'Moov', couleur: '#E53935', created_at: new Date() },
      { nom: 'Celtis', couleur: '#1E88E5', created_at: new Date() }
    ];

    const operateurs = {};
    for (const op of operateursData) {
      const ref = await db.collection('operateurs').add(op);
      operateurs[op.nom] = ref.id;
      console.log(`✅ Opérateur ajouté : ${op.nom}`);
    }

    // --- Ajouter les utilisateurs ---
    const utilisateursData = [
      { nom: 'Alice', email: 'alice@example.com', password: '12345', role: 'agent', created_at: new Date() },
      { nom: 'Bob', email: 'bob@example.com', password: '12345', role: 'agent', created_at: new Date() }
    ];

    const utilisateurs = {};
    for (const user of utilisateursData) {
      const ref = await db.collection('utilisateurs').add(user);
      utilisateurs[user.nom] = ref.id;
      console.log(`✅ Utilisateur ajouté : ${user.nom}`);
    }

    // --- Ajouter les transactions ---
    const transactionsData = [
      { nom_client: 'Client 1', numero: '97000001', type: 'dépôt', operateur_nom: 'MTN', montant: 5000, created_by_nom: 'Alice' },
      { nom_client: 'Client 2', numero: '97000002', type: 'retrait', operateur_nom: 'Moov', montant: 3000, created_by_nom: 'Alice' },
      { nom_client: 'Client 3', numero: '97000003', type: 'dépôt', operateur_nom: 'Celtis', montant: 7000, created_by_nom: 'Bob' },
      { nom_client: 'Client 4', numero: '97000004', type: 'retrait', operateur_nom: 'MTN', montant: 2000, created_by_nom: 'Bob' },
      { nom_client: 'Client 5', numero: '97000005', type: 'dépôt', operateur_nom: 'Moov', montant: 4500, created_by_nom: 'Alice' }
    ];

    for (const t of transactionsData) {
      await db.collection('transactions').add({
        ...t,
        operateur_id: operateurs[t.operateur_nom],
        created_by: utilisateurs[t.created_by_nom],
        date_transaction: new Date(),
        statut: 'completé'
      });
      console.log(`💳 Transaction ajoutée pour ${t.nom_client}`);
    }

    console.log('\n🎉 Base Firestore remplie avec succès !');
    process.exit(0);

  } catch (err) {
    console.error('❌ Erreur lors du seed Firebase :', err);
    process.exit(1);
  }
}

// --- Fonction pour vider une collection ---
async function clearCollection(name) {
  const snapshot = await db.collection(name).get();
  const batch = db.batch();
  snapshot.forEach(doc => batch.delete(doc.ref));
  await batch.commit();
  console.log(`🗑️ Collection "${name}" vidée`);
}

// Lancer le seed
seedFirebase();
