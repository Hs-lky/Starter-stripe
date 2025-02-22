# Angular SaaS Starter

Ce projet est un modèle de démarrage SaaS basé sur Angular.

## Table des matières
- [Fonctionnalités](#fonctionnalités)
- [Installation](#installation)
- [Développement](#développement)
- [Compilation](#compilation)
- [Tests](#tests)
- [Docker](#docker)
- [Déploiement](#déploiement)
- [Variables d'environnement](#variables-denvironnement)
- [Contribution](#contribution)
- [Licence](#licence)

## Fonctionnalités
- Angular 17 avec support SSR
- Système d'authentification et d'autorisation
- Gestion des abonnements et des utilisateurs
- Intégration API
- TailwindCSS pour le style
- Dockerisé pour un déploiement facile

## Installation
### Prérequis
- Node.js (>= 20)
- Angular CLI (>= 17)
- Docker (optionnel, pour le déploiement en conteneur)

### Étapes
1. Cloner le dépôt :
   ```sh
   git clone <repository-url>
   cd angular-saas-starter
   ```
2. Installer les dépendances :
   ```sh
   npm install
   ```

## Développement
Lancer le serveur de développement :
```sh
npm start
```
L'application sera disponible à `http://localhost:4200/`.

## Compilation
Pour créer une version prête pour la production :
```sh
npm run build
```
La sortie sera générée dans le répertoire `dist/`.

## Tests
Exécuter les tests unitaires avec Karma :
```sh
npm test
```

## Docker
### Exécution avec Docker Compose
```sh
docker-compose up --build
```

### Exécution d'une version de production
```sh
docker build -t angular-saas-starter .
docker run -p 4200:4200 angular-saas-starter
```

## Déploiement
Pour le déploiement en CI/CD, configurez GitHub Actions ou un pipeline similaire. Un exemple de workflow est disponible dans `.github/workflows/main.yml`.

## Variables d'environnement
Définissez les variables suivantes pour la production :
- `NODE_ENV=production`
- `PORT=4000`

## Contribution
Les contributions sont les bienvenues ! Veuillez forker le dépôt, apporter vos modifications et soumettre une pull request.

## Licence
Ce projet est sous licence MIT.
