const fs = require('fs');
const serviceAccount = require('./serviceAccountKey.json');

const jsonString = JSON.stringify(serviceAccount); // transforme en ligne unique
const envContent = `SERVICE_ACCOUNT='${jsonString}'
DATABASE_URL='https://mobilemoney-698f4-default-rtdb.firebaseio.com'
PORT=5000
`;

fs.writeFileSync('.env', envContent);
console.log('.env généré avec succès !');
