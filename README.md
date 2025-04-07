# 📦 Backend – DevOps Ticket App

Bienvenue dans la partie backend de l’application de gestion de tickets !  
Développée avec **Node.js**, **Express**, **Sequelize** et **PostgreSQL**.

---

## 🔧 Setup du projet

1. **Cloner le dépôt**
```bash
[git clone https://github.com/.../Projet_DevOps.git](https://github.com/farahyasmine/PROJET-DEVOPS.git)
cd Projet_DevOps/backend
```

2. **Créer le fichier `.env` à la racine de `/backend`**
```env
PORT=5050
JWT_SECRET=superSecretFarah
DB_NAME=support
DB_USER=postgres
DB_PASSWORD=pass
DB_HOST=localhost
DB_PORT=5432
```

3. **Lancer PostgreSQL (Docker ou local)**  
Si tu utilises Docker :
```bash
docker run --name postgres-farah \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=pass \
  -e POSTGRES_DB=support \
  -p 5432:5432 \
  -d postgres
```

4. **Installer les dépendances**
```bash
npm install
```

5. **Démarrer le serveur**
```bash
npm run dev
```

---

## 📮 API – Endpoints disponibles

| Méthode | Endpoint           | Description                      | Rôle requis |
|--------:|--------------------|----------------------------------|-------------|
| `POST`  | `/auth/register`   | Créer un compte utilisateur      | ❌ Aucun     |
| `POST`  | `/auth/login`      | Se connecter                     | ❌ Aucun     |
| `POST`  | `/tickets`         | Créer un nouveau ticket          | ✅ Employe   |
| `GET`   | `/tickets`         | Voir tous les tickets            | ✅ Tous      |
| `PUT`   | `/tickets/:id`     | Mettre à jour un ticket          | ✅ Admin/Technicien |
| `PUT`   | `/tickets/:id/fermer` | Fermer un ticket              | ✅ Admin/Technicien |

---

## 🧪 Tester rapidement avec Postman

➡️ Utilise le fichier :  
`DevOps_Farah.postman_collection.json`

Pour importer tous les appels API :
1. Ouvre Postman
2. Clique sur "Import"
3. Sélectionne le fichier `.json`
4. Remplace les tokens (`<TON_TOKEN>`) manuellement si besoin

---

## 🏁 Backend opérationnel 💪

