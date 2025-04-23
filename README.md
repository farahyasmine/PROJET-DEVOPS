# 🎟️ Ticket Manager - Projet DevOps (ECE B3)

Application web de gestion de tickets avec authentification sécurisée, développée en React (frontend), Node.js (backend), PostgreSQL (base de données), et Docker.

> Projet réalisé dans le cadre du module **DevOps** à l’ECE Paris.

---

## 🚀 Comment lancer le projet

### ✅ Étapes obligatoires

1. **Cloner le dépôt Git**

```bash
git clone https://github.com/farahyasmine/PROJET-DEVOPS.git
cd PROJET-DEVOPS
```

2. **Se positionner sur la branche `integration-front`**

```bash
git checkout integration-front
```

3. **Créer le fichier `.env` pour le frontend**

Dans le dossier `frontend/`, crée un fichier `.env` avec ce contenu :

```
REACT_APP_API_URL=http://localhost:5050
```

> Ce fichier permet au frontend React de savoir à quelle URL accéder pour parler avec l’API backend.

4. **Lancer l'application avec Docker Compose**

À la racine du projet, exécute :

```bash
docker compose up --build
```

---

## 🔍 Résultat

Une fois le projet lancé :

- 🔗 Frontend accessible sur : [http://localhost:3000](http://localhost:3000)
- 🛠️ Backend API sur : [http://localhost:5050](http://localhost:5050)

---

## 🧠 Fonctionnalités

- Création de compte & Connexion
- Authentification sécurisée via JWT
- Création / Visualisation des tickets
- Interface utilisateur en React
- API REST en Express
- Conteneurisation avec Docker

---

## 🧪 Routes principales de l’API

| Méthode | URL                  | Description                          |
|---------|----------------------|--------------------------------------|
| POST    | `/auth/register`     | Créer un compte                      |
| POST    | `/auth/login`        | Se connecter                         |
| GET     | `/tickets`           | Voir tous les tickets (auth requis) |
| POST    | `/tickets`           | Créer un ticket (auth requis)       |

---

## 📦 Technologies utilisées

- **Frontend** : React, React Router
- **Backend** : Node.js, Express, JWT, bcrypt
- **BDD** : PostgreSQL
- **Outils** : Docker, Docker Compose

---

## 📁 Structure du projet

```
PROJET-DEVOPS/
├── backend/
├── frontend/
├── docker-compose.yml
├── start.sh
└── README.md
```

---

## ✅ Astuces

- 📦 Les appels API sont centralisés dans `frontend/src/api.js`
- 🔐 Token JWT est stocké dans `localStorage` après connexion
- 🐳 Les logs sont visibles dans le terminal Docker

---

🧠 Ce que le projet fait actuellement
🔐 Authentification
Création d’un compte (/auth/register) avec hash du mot de passe (bcrypt)

Connexion avec vérification et émission d’un JWT token

Token stocké dans le localStorage côté frontend

Middleware de protection sur les routes privées

🎫 Gestion des tickets
Liste des tickets accessibles si l'utilisateur est connecté

Création de tickets via un formulaire React

Sauvegarde des tickets dans PostgreSQL

Affichage dynamique via React

⚙️ Docker / DevOps
Projet totalement conteneurisé avec Docker

docker-compose.yml qui lance :

frontend (React)

backend (Node/Express)

base de données PostgreSQL

Script start.sh pour automatiser le setup

✅ Ce qui fonctionne bien
Lancement du projet complet via docker compose up --build

Création de compte et enregistrement sécurisé

Interface claire et fonctionnelle (connexion, tickets)

Authentification avec token JWT

Communication fluide frontend <-> backend

🚧 Ce qu’il reste à faire
🐛 Bugs et ajustements
Corriger certains messages d'erreur non visibles côté frontend

Gérer la déconnexion proprement (clear localStorage)

Meilleure gestion des erreurs API (frontend/backend)

💡 Améliorations possibles
Ajouter des rôles utilisateur (ex : Admin peut supprimer des tickets)

Ajouter la modification ou suppression de ticket

Pagination / filtre des tickets

Tests unitaires backend (ex : Jest, Supertest)

Pipeline CI/CD GitHub Actions ou GitLab CI

Sécurité : validation des champs (ex: Joi), rate limiting, helmet.js

Ajout d’un design responsive avec une vraie UI framework (ex: Tailwind, Bootstrap)

📌 Résumé pour un nouvel arrivant
Si une personne reprend le projet :

Elle clône, se met sur integration-front, ajoute le .env, et lance docker compose

Elle peut directement créer un compte, se connecter, et créer un ticket

Le projet est conteneurisé et prêt pour un déploiement

Quelques fonctionnalités restent à faire mais le coeur est déjà robuste