#!/bin/bash

echo "📦 Lancement de l'application avec Docker Compose..."
docker-compose down
docker-compose up -d --build

echo "🕐 Attente de démarrage des conteneurs..."
sleep 10

# Vérification de la disponibilité de l'API
echo "🔍 Vérification de l'API (/ping)..."
if curl -sf http://localhost:5050/ping; then
  echo "✅ L'API est UP"
else
  echo "❌ L'API ne répond pas. Arrêt du script."
  docker-compose down
  exit 1
fi

# Exécution des tests Postman avec Newman
echo "🧪 Exécution des tests Postman avec Newman..."
newman run DevOps_Farah.postman_collection.json --environment DevOps_Seb.postman_environment.json --bail

# Vérification de l'exécution des tests
if [ $? -eq 0 ]; then
  echo "✅ Les tests ont été exécutés avec succès ! 🎉"
else
  echo "❌ Une erreur est survenue pendant l'exécution des tests. 🚨"
  docker-compose down
  exit 1
fi

# Attente de l'arrêt des conteneurs
read -p "⏹️ Appuyez sur une touche pour arrêter les containers..."

# Arrêt des conteneurs
docker-compose down
