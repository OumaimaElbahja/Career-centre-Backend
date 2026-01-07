========================================================================
PROCÉDURE D'EXÉCUTION DU PROJET CAREER CENTRE
========================================================================

Ce document explique les étapes nécessaires pour configurer et lancer 
le projet Career Centre (Backend Spring Boot + Frontend React/Vite).

------------------------------------------------------------------------
1. PRÉREQUIS
------------------------------------------------------------------------
Avant de commencer, assurez-vous d'avoir installé :
- Java Development Kit (JDK) 17 ou supérieur.
- MySQL Server (ex: via XAMPP ou installation directe).
- Node.js (version 18+ recommandée) et npm.
- Un IDE (IntelliJ IDEA recommandé, ou VS Code).

------------------------------------------------------------------------
2. CONFIGURATION DE LA BASE DE DONNÉES
------------------------------------------------------------------------
Le projet utilise MySQL. Suivez ces étapes :

1. Lancez votre serveur MySQL.
2. Créez une base de données nommée : career_center_db
   (Commande SQL : CREATE DATABASE career_center_db;)
3. Vérifiez les accès dans le fichier :
   src/main/resources/application.properties
   - spring.datasource.username=root
   - spring.datasource.password= (Laissez vide ou mettez votre mot de passe)

------------------------------------------------------------------------
3. LANCEMENT DU BACKEND (SPRING BOOT)
------------------------------------------------------------------------
Le backend gère l'API et la logique métier.

Option A : Via IntelliJ IDEA (Recommandé)
1. Ouvrez le projet dans IntelliJ.
2. Attendez que Maven importe les dépendances (pom.xml).
3. Localisez la classe principale : com.ensiasd.careercenter.CareerCenterApplication
4. Cliquez sur "Run" (Icône triangle vert).

Option B : Via Terminal (Maven)
1. Ouvrez un terminal à la racine du projet.
2. Exécutez : mvn spring-boot:run

Le backend sera accessible sur : http://localhost:8080
Documentation Swagger : http://localhost:8080/swagger-ui/index.html

------------------------------------------------------------------------
4. LANCEMENT DU FRONTEND (REACT / VITE)
------------------------------------------------------------------------
Le frontend est situé dans le dossier 'frontend'.

1. Ouvrez un nouveau terminal à la racine du projet.
2. Accédez au dossier frontend :
   cd frontend
3. Installez les dépendances (si ce n'est pas déjà fait) :
   npm install
4. Lancez l'application en mode développement :
   npm run dev

L'application sera accessible sur l'URL affichée dans le terminal 
(Généralement : http://localhost:5173)

------------------------------------------------------------------------
5. RÉCAPITULATIF DES URLS
------------------------------------------------------------------------
- Interface Utilisateur : http://localhost:5173
- API Backend : http://localhost:8080
- Swagger API Docs : http://localhost:8080/swagger-ui/index.html
- Base de données : career_center_db (MySQL)
------------------------------------------------------------------------
