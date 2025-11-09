const db = require('./firebase');

async function test() {
  try {
    const docRef = db.collection('test').doc('demo');
    await docRef.set({
      message: 'Test Firebase',
      date: new Date()
    });
    console.log('Test réussi ✅');
  } catch (err) {
    console.error('Erreur Firebase :', err);
  }
}

test();
