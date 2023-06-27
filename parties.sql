-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mar. 27 juin 2023 à 13:11
-- Version du serveur : 5.7.39
-- Version de PHP : 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `alois`
--

-- --------------------------------------------------------

--
-- Structure de la table `parties`
--

CREATE TABLE `parties` (
  `id` int(11) NOT NULL,
  `utilisateur_id` int(11) DEFAULT NULL,
  `date_partie` date DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `difficulte` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `parties`
--

INSERT INTO `parties` (`id`, `utilisateur_id`, `date_partie`, `score`, `difficulte`) VALUES
(12, 1, '2023-06-26', 0, 'easy'),
(14, 1, '2023-06-26', 20, 'easy'),
(15, 1, '2023-06-26', 36, 'easy'),
(16, 1, '2023-06-26', 8, 'hard'),
(17, 1, '2023-06-26', 4, 'medium'),
(19, 1, '2023-06-26', 28, 'all');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `parties`
--
ALTER TABLE `parties`
  ADD PRIMARY KEY (`id`),
  ADD KEY `utilisateur_id` (`utilisateur_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `parties`
--
ALTER TABLE `parties`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `parties`
--
ALTER TABLE `parties`
  ADD CONSTRAINT `parties_ibfk_1` FOREIGN KEY (`utilisateur_id`) REFERENCES `utilisateurs` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
