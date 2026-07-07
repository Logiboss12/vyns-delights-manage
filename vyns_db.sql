-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 07 juil. 2026 à 12:48
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `vyns_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `cache`
--

DROP TABLE IF EXISTS `cache`;
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` bigint NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` bigint UNSIGNED DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categories_parent_id_foreign` (`parent_id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `categories`
--

INSERT INTO `categories` (`id`, `parent_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Cuisine', 'Plats maison et service traiteur', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(2, NULL, 'Pâtisserie', 'Gâteaux et douceurs faites maison', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(3, 1, 'Plats principaux', 'Nos plats copieux', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(4, 1, 'Entrées & accompagnements', 'Pour accompagner', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(5, 1, 'Grillades & braisés', 'Poissons et viandes braisés', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(6, 1, 'Boissons', 'Boissons fraîches et naturelles', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(7, 2, 'Gâteaux', 'Gâteaux classiques', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(8, 2, 'Viennoiseries', 'Beignets et viennoiseries', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(9, 2, 'Entremets & desserts', 'Douceurs pour terminer', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(10, 2, 'Gâteaux événementiels', 'Sur commande pour vos événements', '2026-07-07 08:13:32', '2026-07-07 08:13:32');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

DROP TABLE IF EXISTS `events`;
CREATE TABLE IF NOT EXISTS `events` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'promo',
  `badge` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_label` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `type`, `badge`, `date_label`, `image_url`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Menu famille -15%', 'Commandez un menu famille et profitez de 15% de réduction.', 'promo', 'black - week', 'Ce week-end', 'https://loremflickr.com/600/400/party,food?lock=301', 1, '2026-07-07 08:13:32', '2026-07-07 08:47:53'),
(2, 'Traiteur & événements', 'Mariages, anniversaires, réunions : VYN\'S DELIGHTS régale vos invités.', 'promo', 'Service', 'Sur réservation', 'https://loremflickr.com/600/400/catering?lock=302', 1, '2026-07-07 08:13:32', '2026-07-07 09:52:40'),
(3, 'Nouveaux desserts', 'Découvrez nos nouvelles douceurs faites maison.', 'nouveaute', 'Nouveau', 'Cette semaine', 'https://loremflickr.com/600/400/dessert?lock=303', 1, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(4, 'Gâteau d\'anniversaire sur commande', 'Un anniversaire à fêter ? Commandez votre gâteau personnalisé.', 'service', 'Sur mesure', 'Toute l\'année', 'https://loremflickr.com/600/400/birthday,cake?lock=304', 1, '2026-07-07 08:13:32', '2026-07-07 08:13:32');

-- --------------------------------------------------------

--
-- Structure de la table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `uuid` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `queue` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint UNSIGNED NOT NULL,
  `reserved_at` int UNSIGNED DEFAULT NULL,
  `available_at` int UNSIGNED NOT NULL,
  `created_at` int UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int UNSIGNED NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_07_05_095817_create_personal_access_tokens_table', 1),
(5, '2026_07_05_102033_create_categories_table', 1),
(6, '2026_07_05_102033_create_products_table', 1),
(7, '2026_07_05_102034_create_orders_table', 1),
(8, '2026_07_05_102231_create_order_items_table', 1),
(9, '2026_07_07_055614_add_parent_id_to_categories_table', 1),
(10, '2026_07_07_075154_create_events_table', 1);

-- --------------------------------------------------------

--
-- Structure de la table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` bigint UNSIGNED NOT NULL,
  `status` enum('pending','confirmed','preparing','delivered','cancelled') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'pending',
  `total_amount` decimal(10,2) NOT NULL,
  `delivery_address` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `status`, `total_amount`, `delivery_address`, `created_at`, `updated_at`) VALUES
(1, 2, 'pending', 3000.00, 'Quartier Tigaza, Bertoua', '2026-06-13 19:26:00', '2026-07-07 08:13:32'),
(2, 2, 'cancelled', 84.00, 'Quartier Bonis, Bertoua', '2026-06-26 12:33:00', '2026-07-07 08:13:32'),
(3, 2, 'delivered', 2000.00, 'Quartier Mokolo, Bertoua', '2026-06-09 18:32:00', '2026-07-07 08:13:32'),
(4, 2, 'confirmed', 14725.00, 'Quartier Mokolo, Bertoua', '2026-06-18 10:54:00', '2026-07-07 08:13:32'),
(5, 2, 'delivered', 1224.00, 'Quartier Tigaza, Bertoua', '2026-06-25 19:38:00', '2026-07-07 08:13:32'),
(6, 2, 'confirmed', 2051.00, 'Quartier Bonis, Bertoua', '2026-06-21 10:11:00', '2026-07-07 08:13:32'),
(7, 2, 'delivered', 4500.00, 'Quartier Nkolbikok, Bertoua', '2026-06-18 17:15:00', '2026-07-07 08:13:32'),
(8, 2, 'pending', 34902.00, 'Quartier Bonis, Bertoua', '2026-06-23 08:10:00', '2026-07-07 08:13:32'),
(9, 2, 'cancelled', 3634.00, 'Centre-ville, Bertoua', '2026-06-23 09:31:00', '2026-07-07 08:13:32'),
(10, 2, 'confirmed', 141.00, 'Quartier Bonis, Bertoua', '2026-07-05 14:32:00', '2026-07-07 08:13:32'),
(11, 2, 'cancelled', 37015.00, 'Quartier Tigaza, Bertoua', '2026-06-24 16:29:00', '2026-07-07 08:13:32'),
(12, 2, 'delivered', 3200.00, 'Quartier Madagascar, Bertoua', '2026-06-16 09:51:00', '2026-07-07 08:13:32'),
(13, 2, 'pending', 238.00, 'Quartier Nkolbikok, Bertoua', '2026-06-22 18:33:00', '2026-07-07 08:13:32'),
(14, 2, 'cancelled', 5400.00, 'Quartier Mokolo, Bertoua', '2026-06-11 11:02:00', '2026-07-07 08:13:32'),
(15, 2, 'preparing', 3105.00, 'Quartier Bonis, Bertoua', '2026-06-14 08:09:00', '2026-07-07 08:13:32'),
(16, 2, 'confirmed', 1663.00, 'Quartier Bonis, Bertoua', '2026-06-09 08:05:00', '2026-07-07 08:13:32'),
(17, 2, 'confirmed', 8059.00, 'Quartier Madagascar, Bertoua', '2026-06-15 11:26:00', '2026-07-07 08:13:32'),
(18, 2, 'confirmed', 192.00, 'Quartier Haoussa, Bertoua', '2026-07-06 12:26:00', '2026-07-07 08:13:32'),
(19, 2, 'pending', 117.00, 'Quartier Bonis, Bertoua', '2026-06-20 08:55:00', '2026-07-07 08:13:32'),
(20, 2, 'delivered', 133.00, 'Quartier Kano, Bertoua', '2026-07-07 11:54:00', '2026-07-07 08:13:32'),
(21, 2, 'confirmed', 19000.00, 'Quartier Haoussa, Bertoua', '2026-07-01 11:08:00', '2026-07-07 08:13:32'),
(22, 2, 'preparing', 2162.00, 'Centre-ville, Bertoua', '2026-07-02 17:04:00', '2026-07-07 08:13:32'),
(23, 2, 'confirmed', 347.00, 'Quartier Mokolo, Bertoua', '2026-07-04 14:15:00', '2026-07-07 08:13:32'),
(24, 2, 'delivered', 4456.00, 'Quartier Madagascar, Bertoua', '2026-06-29 17:17:00', '2026-07-07 08:13:32'),
(25, 2, 'confirmed', 153722.00, 'Quartier Madagascar, Bertoua', '2026-06-15 18:37:00', '2026-07-07 08:13:32'),
(26, 2, 'pending', 54.00, 'Quartier Haoussa, Bertoua', '2026-06-25 16:42:00', '2026-07-07 08:13:32'),
(27, 2, 'confirmed', 339.00, 'Quartier Mokolo, Bertoua', '2026-06-09 17:28:00', '2026-07-07 08:13:32'),
(28, 2, 'confirmed', 210.00, 'Quartier Mokolo, Bertoua', '2026-07-06 09:22:00', '2026-07-07 09:52:26'),
(29, 2, 'preparing', 20561.00, 'Quartier Madagascar, Bertoua', '2026-06-15 07:25:00', '2026-07-07 08:13:32'),
(30, 2, 'delivered', 4899.00, 'Quartier Nkolbikok, Bertoua', '2026-06-28 11:31:00', '2026-07-07 08:13:32'),
(31, 1, 'confirmed', 81.00, 'Bertoua', '2026-07-07 08:45:12', '2026-07-07 08:45:54'),
(32, 2, 'delivered', 81.00, 'Quartier Nkolbikok, Bertoua', '2026-07-07 09:28:52', '2026-07-07 09:52:15'),
(33, 2, 'preparing', 15000.00, 'Quartier Nkolbikok, bertoua', '2026-07-07 09:50:15', '2026-07-07 09:52:08');

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` bigint UNSIGNED NOT NULL,
  `product_id` bigint UNSIGNED NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_items_order_id_foreign` (`order_id`),
  KEY `order_items_product_id_foreign` (`product_id`)
) ENGINE=MyISAM AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `unit_price`, `created_at`, `updated_at`) VALUES
(1, 1, 6, 3, 1000.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(2, 2, 41, 2, 42.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(3, 3, 5, 1, 2000.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(4, 4, 3, 1, 2500.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(5, 4, 4, 3, 4000.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(6, 4, 26, 3, 62.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(7, 4, 27, 3, 13.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(8, 5, 13, 2, 400.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(9, 5, 21, 2, 23.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(10, 5, 26, 3, 62.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(11, 5, 33, 3, 64.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(12, 6, 5, 1, 2000.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(13, 6, 19, 1, 51.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(14, 7, 14, 3, 1500.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(15, 8, 16, 3, 1600.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(16, 8, 17, 2, 15000.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(17, 8, 43, 2, 51.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(18, 9, 7, 2, 800.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(19, 9, 11, 1, 1800.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(20, 9, 19, 3, 51.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(21, 9, 40, 3, 27.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(22, 10, 27, 1, 13.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(23, 10, 35, 2, 64.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(24, 11, 1, 2, 3500.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(25, 11, 17, 2, 15000.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(26, 11, 29, 3, 5.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(27, 12, 16, 2, 1600.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(28, 13, 27, 2, 13.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(29, 13, 33, 2, 64.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(30, 13, 41, 2, 42.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(31, 14, 1, 1, 3500.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(32, 14, 6, 1, 1000.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(33, 14, 12, 1, 500.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(34, 14, 13, 1, 400.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(35, 15, 10, 2, 1500.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(36, 15, 43, 1, 51.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(37, 15, 47, 2, 27.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(38, 16, 7, 2, 800.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(39, 16, 31, 3, 5.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(40, 16, 38, 3, 16.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(41, 17, 4, 2, 4000.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(42, 17, 27, 2, 13.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(43, 17, 48, 1, 33.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(44, 18, 33, 3, 64.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(45, 19, 32, 1, 69.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(46, 19, 38, 3, 16.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(47, 20, 24, 2, 26.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(48, 20, 34, 3, 27.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(49, 21, 5, 2, 2000.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(50, 21, 17, 1, 15000.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(51, 22, 6, 2, 1000.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(52, 22, 25, 3, 54.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(53, 23, 29, 2, 5.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(54, 23, 32, 2, 69.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(55, 23, 43, 3, 51.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(56, 23, 44, 1, 46.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(57, 24, 9, 1, 800.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(58, 24, 15, 3, 1200.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(59, 24, 29, 1, 5.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(60, 24, 43, 1, 51.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(61, 25, 15, 3, 1200.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(62, 25, 18, 3, 50000.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(63, 25, 41, 1, 42.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(64, 25, 45, 1, 80.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(65, 26, 36, 2, 27.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(66, 27, 45, 3, 80.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(67, 27, 48, 3, 33.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(68, 28, 22, 2, 5.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(69, 28, 39, 1, 47.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(70, 28, 43, 3, 51.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(71, 29, 11, 3, 1800.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(72, 29, 17, 1, 15000.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(73, 29, 21, 1, 23.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(74, 29, 32, 2, 69.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(75, 30, 16, 3, 1600.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(76, 30, 48, 3, 33.00, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(77, 31, 47, 3, 27.00, '2026-07-07 08:45:12', '2026-07-07 08:45:12'),
(78, 32, 47, 3, 27.00, '2026-07-07 09:28:52', '2026-07-07 09:28:52'),
(79, 33, 17, 1, 15000.00, '2026-07-07 09:50:15', '2026-07-07 09:50:15');

-- --------------------------------------------------------

--
-- Structure de la table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint UNSIGNED NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(4, 'App\\Models\\User', 1, 'auth_token', 'd5629fea2f4c5629b050c73a69c5852e14b87c6c50315d4e978b1e7cff0a2e54', '[\"*\"]', '2026-07-07 09:53:02', NULL, '2026-07-07 09:51:07', '2026-07-07 09:53:02');

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` bigint UNSIGNED NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_quantity` int NOT NULL DEFAULT '0',
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  `image_url` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`)
) ENGINE=MyISAM AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `category_id`, `name`, `description`, `price`, `stock_quantity`, `is_available`, `image_url`, `created_at`, `updated_at`) VALUES
(1, 3, 'Poulet DG', 'Poulet sauté aux plantains mûrs et légumes.', 3500.00, 15, 1, 'https://loremflickr.com/640/480/chicken,food?lock=101', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(2, 3, 'Ndolè aux crevettes', 'Feuilles de ndolè mijotées, crevettes et viande.', 3000.00, 12, 1, 'https://loremflickr.com/640/480/shrimp,food?lock=102', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(3, 3, 'Eru et water fufu', 'Eru traditionnel accompagné de water fufu.', 2500.00, 10, 1, 'https://loremflickr.com/640/480/soup,food?lock=103', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(4, 5, 'Poisson braisé + bâton', 'Poisson braisé épicé, servi avec bâton de manioc.', 4000.00, 8, 1, 'https://loremflickr.com/640/480/fish,grilled?lock=104', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(5, 5, 'Brochettes de bœuf', 'Brochettes de bœuf marinées et grillées.', 2000.00, 18, 1, 'https://loremflickr.com/640/480/beef,grilled?lock=109', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(6, 4, 'Beignets haricots', 'Beignets moelleux accompagnés de haricots.', 1000.00, 20, 1, 'https://loremflickr.com/640/480/beans,food?lock=105', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(7, 4, 'Plantains frits', 'Plantains mûrs frits, croustillants.', 800.00, 25, 1, 'https://loremflickr.com/640/480/plantain,food?lock=110', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(8, 6, 'Jus de gingembre', 'Jus de gingembre maison, frais et piquant.', 800.00, 30, 1, 'https://loremflickr.com/640/480/juice,drink?lock=107', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(9, 6, 'Jus de bissap', 'Boisson d\'hibiscus rafraîchissante.', 800.00, 3, 1, 'https://loremflickr.com/640/480/juice,drink?lock=108', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(10, 7, 'Gâteau au chocolat', 'Moelleux au chocolat intense, part individuelle.', 1500.00, 14, 1, 'https://loremflickr.com/640/480/chocolate,cake?lock=201', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(11, 7, 'Gâteau vanille-fraise', 'Génoise vanille et fraises fraîches.', 1800.00, 10, 1, 'https://loremflickr.com/640/480/strawberry,cake?lock=202', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(12, 8, 'Croissant au beurre', 'Croissant feuilleté pur beurre.', 500.00, 40, 1, 'https://loremflickr.com/640/480/croissant?lock=203', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(14, 9, 'Salade de fruits', 'Assortiment de fruits frais de saison.', 1500.00, 4, 1, 'https://loremflickr.com/640/480/fruit,salad?lock=106', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(15, 9, 'Mousse au chocolat', 'Mousse au chocolat onctueuse.', 1200.00, 12, 1, 'https://loremflickr.com/640/480/chocolate,mousse?lock=205', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(16, 9, 'Tarte aux pommes', 'Tarte fine aux pommes caramélisées.', 1600.00, 8, 1, 'https://loremflickr.com/640/480/apple,tart?lock=206', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(17, 10, 'Gâteau d\'anniversaire personnalisé', 'Gâteau sur commande, décor au choix.', 15000.00, 4, 1, 'https://loremflickr.com/640/480/birthday,cake?lock=207', '2026-07-07 08:13:32', '2026-07-07 09:50:15'),
(18, 10, 'Pièce montée de mariage', 'Pièce montée sur mesure pour votre grand jour.', 50000.00, 3, 1, 'https://loremflickr.com/640/480/wedding,cake?lock=208', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(19, 4, 'Poisson pané 170', 'Hic totam at voluptatibus accusamus placeat ex nihil quo.', 51.00, 2, 1, 'https://loremflickr.com/640/480/food,dish?lock=8242', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(20, 3, 'Mbongo tchobi 912', 'Minus porro corrupti qui ratione eius eveniet perspiciatis qui.', 33.00, 19, 1, 'https://loremflickr.com/640/480/food,dish?lock=43125', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(21, 3, 'Brochettes de bœuf 15', 'Nihil quaerat nobis voluptas est nihil sunt sint magnam totam natus repellat.', 23.00, 7, 1, 'https://loremflickr.com/640/480/food,dish?lock=45261', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(22, 8, 'Sauce arachide 44', 'Corporis deserunt sapiente provident et cumque qui.', 5.00, 4, 1, 'https://loremflickr.com/640/480/food,dish?lock=10908', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(23, 4, 'Taro sauce jaune 846', 'Totam optio modi libero voluptatem ut qui enim.', 44.00, 27, 1, 'https://loremflickr.com/640/480/food,dish?lock=86391', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(24, 8, 'Mbongo tchobi 514', 'Ipsum hic qui aliquid rem ut quisquam.', 26.00, 26, 1, 'https://loremflickr.com/640/480/food,dish?lock=25320', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(25, 5, 'Poulet braisé 418', 'Laudantium voluptatem a omnis perferendis quas iste soluta facilis ex nesciunt accusamus iure.', 54.00, 25, 1, 'https://loremflickr.com/640/480/food,dish?lock=57624', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(26, 7, 'Porc au four 526', 'Dolorum quia expedita quia saepe et iure et est et ut qui excepturi sunt.', 62.00, 14, 1, 'https://loremflickr.com/640/480/food,dish?lock=75130', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(27, 4, 'Achu 168', 'At accusantium facere harum corrupti dolorum rerum est.', 13.00, 3, 1, 'https://loremflickr.com/640/480/food,dish?lock=68070', '2026-07-07 08:13:32', '2026-07-07 09:51:48'),
(28, 9, 'Brochettes de bœuf 113', 'Consequatur aspernatur officiis ut quod deleniti quam eos est id eos asperiores iste facilis.', 75.00, 12, 1, 'https://loremflickr.com/640/480/food,dish?lock=10430', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(29, 7, 'Bobolo 959', 'Natus rem et dolorum voluptas ea impedit porro omnis occaecati libero.', 5.00, 31, 1, 'https://loremflickr.com/640/480/food,dish?lock=99510', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(30, 6, 'Soya 839', 'Dicta officiis laboriosam voluptatem et itaque quod.', 63.00, 15, 1, 'https://loremflickr.com/640/480/food,dish?lock=2555', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(31, 5, 'Plantains frits 713', 'Esse at eaque porro culpa id nihil qui perspiciatis vero cupiditate.', 5.00, 32, 1, 'https://loremflickr.com/640/480/food,dish?lock=55764', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(32, 8, 'Achu 932', 'Ab minus consequatur ratione fugiat quis non inventore nisi eaque et veniam veniam.', 69.00, 2, 1, 'https://loremflickr.com/640/480/food,dish?lock=50630', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(33, 3, 'Brochettes de bœuf 912', 'Sint ullam excepturi id cumque ipsum eum delectus iste maxime numquam exercitationem odio.', 64.00, 16, 1, 'https://loremflickr.com/640/480/food,dish?lock=64579', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(34, 4, 'Brochettes de bœuf 181', 'Atque doloremque quas consectetur quia numquam saepe cum recusandae.', 27.00, 23, 1, 'https://loremflickr.com/640/480/food,dish?lock=26444', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(35, 6, 'Haricots rouges 924', 'Labore minus et a in nihil aliquam ipsam.', 64.00, 17, 1, 'https://loremflickr.com/640/480/food,dish?lock=6020', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(36, 8, 'Poulet braisé 699', 'Qui fugit eum voluptas maiores consequatur amet doloremque.', 27.00, 23, 1, 'https://loremflickr.com/640/480/food,dish?lock=69345', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(37, 6, 'Attiéké poisson 304', 'Omnis tenetur qui omnis et nostrum aut non commodi id repellendus.', 63.00, 0, 1, 'https://loremflickr.com/640/480/food,dish?lock=35710', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(38, 7, 'Bobolo 772', 'In quae itaque voluptatem quisquam velit corporis enim ab modi iste.', 16.00, 19, 1, 'https://loremflickr.com/640/480/food,dish?lock=65493', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(39, 5, 'Haricots rouges 141', 'Et animi reiciendis magnam itaque cupiditate a quo consequatur velit ipsam.', 47.00, 38, 1, 'https://loremflickr.com/640/480/food,dish?lock=14442', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(40, 5, 'Koki 634', 'Neque dolor qui id est quo corporis alias minima autem debitis possimus.', 27.00, 36, 1, 'https://loremflickr.com/640/480/food,dish?lock=96384', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(41, 9, 'Poisson pané 821', 'Quo accusantium et dicta vero corrupti officia optio nostrum iusto rerum occaecati hic.', 42.00, 26, 1, 'https://loremflickr.com/640/480/food,dish?lock=30063', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(42, 5, 'Miondo 81', 'Numquam est molestias voluptas possimus et sapiente eum magnam.', 5.00, 27, 1, 'https://loremflickr.com/640/480/food,dish?lock=13476', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(43, 8, 'Haricots rouges 975', 'Culpa et cumque eum accusantium repudiandae pariatur alias eaque amet quo unde.', 51.00, 13, 1, 'https://loremflickr.com/640/480/food,dish?lock=43157', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(44, 4, 'Koki 972', 'Nihil sint itaque dignissimos eaque maiores vitae voluptas tempore omnis dolorem id mollitia quo.', 46.00, 27, 1, 'https://loremflickr.com/640/480/food,dish?lock=39946', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(45, 4, 'Miondo 330', 'Illo magni at cum voluptas harum aperiam reprehenderit cum reprehenderit quia minima et.', 80.00, 23, 1, 'https://loremflickr.com/640/480/food,dish?lock=62065', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(46, 4, 'Haricots rouges 770', 'Accusamus rerum velit natus optio perferendis quibusdam aspernatur enim eveniet.', 19.00, 26, 1, 'https://loremflickr.com/640/480/food,dish?lock=29772', '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(47, 7, 'Achu 177', 'Architecto dolore fugit id nulla doloremque itaque minus quod.', 27.00, 13, 1, 'https://loremflickr.com/640/480/food,dish?lock=68320', '2026-07-07 08:13:32', '2026-07-07 09:28:52'),
(48, 7, 'Poisson pané 840', 'Magnam eos et veritatis quis et nihil eaque aspernatur fugiat.', 33.00, 8, 1, 'https://loremflickr.com/640/480/food,dish?lock=44094', '2026-07-07 08:13:32', '2026-07-07 08:13:32');

-- --------------------------------------------------------

--
-- Structure de la table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('client','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'client',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `phone`, `address`, `role`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Administratrice VYN\'S', 'admin@vynsdelights.com', NULL, '$2y$12$sEcQxlJ6rhU4VxiG//JiKOwMb3DDCxZ6qj7OtuTGUZcwM/Rg8v1NC', '690000000', 'Bertoua', 'admin', NULL, '2026-07-07 08:13:32', '2026-07-07 08:13:32'),
(2, 'Test Client', 'client@test.com', NULL, '$2y$12$xu4CPTzc6W2tdGUgBtfg..TVDxLuRhiOTdrAHUk4E6QQTAF6QjLV.', '690000000', 'Quartier Nkolbikok, Bertoua', 'client', NULL, '2026-07-07 08:13:32', '2026-07-07 08:13:32');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
