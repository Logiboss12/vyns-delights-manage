# VYN'S DELIGHTS — Manager E-Commerce

Application web full-stack de commande en ligne pour **VYN'S DELIGHTS**, activité de
**pâtisserie et cuisine** à Bertoua, proposant aussi un service pour les événements
(anniversaires, mariages, commandes spéciales).

Les clients consultent le catalogue, commandent en ligne et suivent leurs commandes ;
l'administratrice gère le catalogue, les stocks, les commandes et les événements.

## Stack technique

- **Front-end** : React 19 + PrimeReact, React Router, Axios, Chart.js (Vite)
- **Back-end** : Laravel 13 (API REST) + Sanctum
- **Base de données** : MySQL 8

## Structure du dépôt

```
├── backend/     API REST Laravel (auth, catalogue, commandes, admin)
├── frontend/    SPA React + PrimeReact
└── database/    Export SQL de la base
```

## Fonctionnalités

- Authentification par jetons (Sanctum) avec rôles client / admin
- Catalogue hiérarchique (Cuisine / Pâtisserie et sous-catégories), filtre et pagination
- Panier, commande avec **gestion transactionnelle du stock**, suivi des commandes
- Espace admin : tableau de bord avec **graphiques**, CRUD produits avec **upload d'images**,
  gestion des commandes et des événements

## Installation

**Prérequis :** PHP 8.5, Composer, Node.js, MySQL, Git.

### 1. Base de données

Créer une base `vyns_db`, puis importer l'export SQL :

```bash
mysql -u root -p vyns_db < database/dump.sql
```

### 2. Back-end (API Laravel)

```bash
cd backend
composer install
cp .env.example .env          # puis renseigner DB_DATABASE, DB_USERNAME, DB_PASSWORD
php artisan key:generate
php artisan migrate --seed    # (ignorer si la base est déjà importée)
php artisan storage:link
php artisan serve             # http://127.0.0.1:8000
```

### 3. Front-end (React)

```bash
cd frontend
npm install
npm run dev                   # http://localhost:5173
```

> Les deux serveurs doivent tourner simultanément.

## Comptes de démonstration

| Rôle  | Email                     | Mot de passe   |
|-------|---------------------------|----------------|
| Admin | admin@vynsdelights.com    | admin1234      |
| Client| client@test.com           | motdepasse123  |

## Auteur

**Dountsop Debret** — Projet réalisé dans le cadre du cours de Développement Web
niveau approfondi (D-CLIC).