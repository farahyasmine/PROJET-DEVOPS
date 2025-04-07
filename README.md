# 📦 Backend – DevOps Ticket App

## 🔧 Setup

1. Cloner le projet
2. Créer un fichier `.env` :

```env
PORT=5050
JWT_SECRET=superSecretFarah
DB_NAME=support
DB_USER=postgres
DB_PASSWORD=pass
DB_HOST=localhost
DB_PORT=5432


3. Lancer PostgreSQL (local ou Docker)
docker run --name postgres-farah -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=pass -e POSTGRES_DB=support -p 5432:5432 -d postgres

4. Installer les dépendances 
npm install

5. Lancer le backend
npm run dev

📮 API Routes

Méthode	 URL 	         Rôle requis
POST	/auth/register 	Aucun
POST	/auth/login  	Aucun
POST	/tickets	    Employe
GET  	/tickets	    Tous
✅ Test rapide avec Postman

Utilise le fichier DevOps_Farah.postman_collection.json pour importer tous les appels.