# Mobile Money App

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![Vue.js](https://img.shields.io/badge/Vue-3.x-brightgreen)](https://vuejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-blue)](https://www.mysql.com/)

Application web pour gérer les dépôts et retraits d’argent via différents opérateurs (MTN, Moov, Celtis).  
L’application permet de gérer les utilisateurs (agents/admin), les transactions et les opérateurs.

---

## 🗂️ Structure du projet

GestionRetraits/
├─ mobilemoney-app/ # Backend Node.js + MySQL
├─ mobilemoney-frontend/ # Frontend Vue 3 + Tailwind CSS


---

## ⚡ Prérequis

- Node.js >= 18
- npm >= 9
- MySQL / MariaDB
- (Optionnel) Postman pour tester les API

---

## Backend – mobilemoney-app

### 1. Installation

Ouvrez un terminal et exécutez :

````bash
cd mobilemoney-app
npm install
````
---

## 2. Configuration

Créer un fichier .env à la racine du backend avec les infos MySQL :
````
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=ton_mdp
DB_NAME=mobilemoney
DB_PORT=3306
PORT=5000
````
---
# 3. Lancer le serveur
````
npm run dev
````

Le backend sera accessible sur:
````
http://localhost:5000
````
---
# 4. Seeder la base de données (facultatif)

-Pour ajouter des données de test :
````
node seed.js
````
-Frontend – mobilemoney-frontend

# 1. Installation
````
cd mobilemoney-frontend
npm install
````
# 2. Lancer le frontend
````
npm run serve
````

Le frontend sera accessible sur :
````
http://localhost:8080
````
---
## 🚀 Fonctionnalités

- Gestion des opérateurs : Ajouter, lister

- Gestion des utilisateurs : Ajouter, lister

- Gestion des transactions : Ajouter, lister

- Navigation par pages séparées via Vue Router

- UI stylée avec Tailwind CSS

- Backend avec Node.js + Express + MySQL

- API REST sécurisée avec CORS activé
  
---
## ⚙️ Technologies utilisées

- Frontend : Vue 3, Vue Router, Tailwind CSS, Axios

- Backend : Node.js, Express, Firebase

- Outils : npm, Postman (optionnel)

---
## 📌 Notes

Assurez-vous que le backend tourne avant de lancer le frontend pour éviter les erreurs Network Error avec Axios.

Pour personnaliser le style, modifiez le fichier index.css et les classes Tailwind dans vos composants.
---
## 💻 Captures d’écran

Exemple pour ajouter vos captures :

![Opérateurs](./screenshots/operateurs.png)
![Transactions](./screenshots/transactions.png)
---
## Auteurs

Yoann yamd
