Parfait, on va adapter ce README pour un **vrai dépôt public GitHub**. L’idée c’est d’expliquer **tout ce que le code fait**, **comment l’utiliser**, **sans divulguer d’infos sensibles**, et en gardant un ton pro et clair. Voici une **version complète et clean** prête à être mise dans ton dépôt :

---

```md
# 🎫 TicketApp - Application de gestion de tickets

TicketApp est une application web fullstack de gestion de tickets, développée dans le cadre d’un projet DevOps à l’ECE. Elle permet aux utilisateurs de créer des comptes, de se connecter, de soumettre des tickets, et aux administrateurs de gérer l’ensemble des demandes.

---

## 📌 Fonctionnalités

- ✅ Authentification avec JWT
- ✅ Rôles utilisateurs : Admin & Utilisateur
- ✅ Création, modification et suppression de tickets
- ✅ Filtrage des tickets par utilisateur
- ✅ Frontend React responsive
- ✅ API sécurisée (Node.js + Express)
- ✅ Base de données PostgreSQL
- ✅ Conteneurisation complète avec Docker

---

## 🧰 Stack technique

| Catégorie       | Technologie           |
|------------------|------------------------|
| **Frontend**     | React, React Router    |
| **Backend**      | Node.js, Express       |
| **Base de données** | PostgreSQL            |
| **Auth**         | JWT, bcrypt            |
| **Conteneurs**   | Docker, Docker Compose |

---

## 🚀 Installation & Lancement

### Prérequis

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### 1. Cloner le dépôt

```bash
git clone https://github.com/<ton-username>/PROJET-DEVOPS.git
cd PROJET-DEVOPS
```

### 2. Configuration des variables d’environnement

#### Backend (`backend/.env`)
```env
JWT_SECRET=your_jwt_secret_key
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=ticketdb
DB_HOST=db
```

#### Frontend (`frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:5050
```

> Remplace `your_jwt_secret_key` par une clé secrète longue et unique.

### 3. Lancer les services

```bash
docker compose up --build
```

### 4. Accès à l’application

- Frontend : [http://localhost:3000](http://localhost:3000)
- Backend API : [http://localhost:5050](http://localhost:5050)

---

## 🧪 Routes principales

### 🔐 Authentification

| Méthode | URL             | Description              |
|---------|------------------|--------------------------|
| POST    | `/auth/register` | Créer un nouveau compte |
| POST    | `/auth/login`    | Se connecter             |

### 📝 Tickets

| Méthode | URL           | Rôle requis | Description                    |
|---------|----------------|-------------|--------------------------------|
| GET     | `/tickets`     | Admin       | Récupérer tous les tickets     |
| POST    | `/tickets`     | User/Admin  | Créer un nouveau ticket        |
| GET     | `/tickets/mine`| User        | Voir ses propres tickets       |
| PUT     | `/tickets/:id` | Admin       | Modifier un ticket             |
| DELETE  | `/tickets/:id` | Admin       | Supprimer un ticket            |

---

## 📁 Structure du projet

```
PROJET-DEVOPS/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   └── index.js
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── api.js
│   ├── .env
│   └── Dockerfile
├── docker-compose.yml
├── start.sh
└── README.md
```

---

## ⚙️ Commandes utiles

```bash
# Arrêter les services
docker compose down

# Supprimer les volumes (attention : cela supprime les données de la BDD)
docker compose down --volumes

# Rebuild complet
docker compose up --build
```

---
