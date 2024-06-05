-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 05 juin 2024 à 20:26
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `app_g10e`
--

-- --------------------------------------------------------

--
-- Structure de la table `contact_us`
--

CREATE TABLE `contact_us` (
  `contactNum` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `msg` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `contact_us`
--

INSERT INTO `contact_us` (`contactNum`, `firstName`, `surname`, `email`, `msg`) VALUES
(12, 'zdefhtryt', 'zdefhtry', 'jean.manoury@eleve.isep.fr', '\"rzt\'ey(htr-kyèuil'),
(13, 'zdefhtry', 'zdefhtry', 'jean.manoury@eleve.isep.fr', '\"rzt\'ey(htr-kyèuil'),
(14, 'fvygbhjnk,l;m', 'trygubhijo,kp;', 'salut@bjr.fr', 'Taste'),
(15, 'gvhbjk,l;m', 'vgjbhknl,', 'salut@bjr.fr', 'TASTE'),
(16, 'ée\"ré\'tyrt', 'zerztryt', 'jean.manoury@eleve.isep.fr', 'skfbrujfoekpfekfoezgea');

-- --------------------------------------------------------

--
-- Structure de la table `customerfestivals`
--

CREATE TABLE `customerfestivals` (
  `customerId` varchar(255) NOT NULL,
  `festivalId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `customers`
--

CREATE TABLE `customers` (
  `customerId` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `subscriptionExpireDate` date DEFAULT NULL,
  `verified` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `customers`
--

INSERT INTO `customers` (`customerId`, `email`, `surname`, `firstName`, `password`, `phoneNumber`, `subscriptionExpireDate`, `verified`) VALUES
('665889e3d5088', 'jean.manoury@eleve.isep.fr', 'manoury', 'jean', '$2y$10$Xv6YFRx1aSnRJWRBslvfd.Uhx0XHTo5wl4wSYsKhgldWroPF1d1V2', '0123456789', '2024-05-30', 1),
('66609b54e6309', 'jean.manoury@outlook.fr', 'MANOURY', 'Jean', '$2y$10$Zy8xMz0o/uhnDDhaYNToNO5IsiDXsacEQBkSgcyJhxE2UMvxEHvdW', '0775547895', '2024-06-05', 0);

-- --------------------------------------------------------

--
-- Structure de la table `festival`
--

CREATE TABLE `festival` (
  `festivalId` varchar(255) NOT NULL,
  `festivalName` varchar(255) DEFAULT NULL,
  `beginTime` date DEFAULT NULL,
  `endTime` date DEFAULT NULL,
  `ticketPrice` bigint(20) DEFAULT NULL,
  `IMG-PATH` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `festival`
--

INSERT INTO `festival` (`festivalId`, `festivalName`, `beginTime`, `endTime`, `ticketPrice`, `IMG-PATH`) VALUES
('1', 'We Love Green', '2024-05-31', '2024-06-02', 79, '../Assets/WLG.png'),
('665702868f8f1', 'arde', '2024-05-09', '2024-05-31', 30, '../Assets/ardeban.jpg'),
('665705f5e14aa', 'solidays', '2024-05-09', '2024-05-17', 30, '../Assets/solidays.png'),
('66570608aedeb', 'wlg', '2024-05-23', '2024-06-01', 90, '../Assets/WLG.png'),
('66570623aeadb', 'hellfest', '2024-05-31', '2024-06-20', 90, '../Assets/hell.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `organiserfestivals`
--

CREATE TABLE `organiserfestivals` (
  `organiserId` varchar(255) NOT NULL,
  `festivalId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `organisers`
--

CREATE TABLE `organisers` (
  `organiserId` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `surname` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT NULL,
  `reason` varchar(255) DEFAULT NULL,
  `verified` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `sensor`
--

CREATE TABLE `sensor` (
  `sensorId` varchar(255) NOT NULL,
  `festivalId` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `currentSoundDensity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `sensor`
--

INSERT INTO `sensor` (`sensorId`, `festivalId`, `latitude`, `longitude`, `currentSoundDensity`) VALUES
('1', '1', 1, 1, 95),
('2', '1', 1, -1, 50),
('3', '1', 1, 0, 102),
('4', '1', -1, 1, 80);

-- --------------------------------------------------------

--
-- Structure de la table `super`
--

CREATE TABLE `super` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(255) NOT NULL,
  `admin_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `super`
--

INSERT INTO `super` (`admin_id`, `admin_name`, `admin_password`) VALUES
(1, 'admin', '$2y$10$PvplRi/icaDBSfY8gNs6ZO65UxOOinQYBLhppknQAbIbQo4cGO0ca');

-- --------------------------------------------------------

--
-- Structure de la table `verifier`
--

CREATE TABLE `verifier` (
  `verifierId` varchar(255) NOT NULL,
  `userEmail` varchar(255) DEFAULT NULL,
  `verificationCode` varchar(255) DEFAULT NULL,
  `expireTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `verifier`
--

INSERT INTO `verifier` (`verifierId`, `userEmail`, `verificationCode`, `expireTime`) VALUES
('665889e3e5c60', 'jean.manoury@eleve.isep.fr', '529953', '2024-05-30 16:19:59'),
('66609b5505684', 'jean.manoury@outlook.fr', '679959', '2024-06-05 19:12:33');

-- --------------------------------------------------------

--
-- Structure de la table `votingparties`
--

CREATE TABLE `votingparties` (
  `votingPartyId` int(11) NOT NULL,
  `vote` tinyint(1) DEFAULT NULL,
  `sensorId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `votingparties`
--

INSERT INTO `votingparties` (`votingPartyId`, `vote`, `sensorId`) VALUES
(19, 2, '1'),
(20, 1, '2'),
(21, 2, '3'),
(22, 1, '4'),
(23, 2, '4'),
(24, 1, '3'),
(25, 2, '2'),
(26, 1, '1'),
(27, 2, '1'),
(28, 1, '1'),
(29, 2, '2'),
(30, 1, '2');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`contactNum`);

--
-- Index pour la table `customerfestivals`
--
ALTER TABLE `customerfestivals`
  ADD PRIMARY KEY (`customerId`,`festivalId`),
  ADD KEY `festivalId` (`festivalId`);

--
-- Index pour la table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `festival`
--
ALTER TABLE `festival`
  ADD PRIMARY KEY (`festivalId`);

--
-- Index pour la table `organiserfestivals`
--
ALTER TABLE `organiserfestivals`
  ADD PRIMARY KEY (`organiserId`,`festivalId`),
  ADD KEY `festivalId` (`festivalId`);

--
-- Index pour la table `organisers`
--
ALTER TABLE `organisers`
  ADD PRIMARY KEY (`organiserId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`sensorId`),
  ADD KEY `festivalId` (`festivalId`);

--
-- Index pour la table `super`
--
ALTER TABLE `super`
  ADD PRIMARY KEY (`admin_id`);

--
-- Index pour la table `verifier`
--
ALTER TABLE `verifier`
  ADD PRIMARY KEY (`verifierId`);

--
-- Index pour la table `votingparties`
--
ALTER TABLE `votingparties`
  ADD PRIMARY KEY (`votingPartyId`),
  ADD KEY `FestivalId` (`sensorId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `contactNum` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `super`
--
ALTER TABLE `super`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `votingparties`
--
ALTER TABLE `votingparties`
  MODIFY `votingPartyId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `customerfestivals`
--
ALTER TABLE `customerfestivals`
  ADD CONSTRAINT `customerfestivals_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`customerId`),
  ADD CONSTRAINT `customerfestivals_ibfk_2` FOREIGN KEY (`festivalId`) REFERENCES `festival` (`festivalId`);

--
-- Contraintes pour la table `organiserfestivals`
--
ALTER TABLE `organiserfestivals`
  ADD CONSTRAINT `organiserfestivals_ibfk_1` FOREIGN KEY (`organiserId`) REFERENCES `organisers` (`organiserId`),
  ADD CONSTRAINT `organiserfestivals_ibfk_2` FOREIGN KEY (`festivalId`) REFERENCES `festival` (`festivalId`);

--
-- Contraintes pour la table `sensor`
--
ALTER TABLE `sensor`
  ADD CONSTRAINT `sensor_ibfk_1` FOREIGN KEY (`festivalId`) REFERENCES `festival` (`festivalId`);

--
-- Contraintes pour la table `votingparties`
--
ALTER TABLE `votingparties`
  ADD CONSTRAINT `votingparties_ibfk_2` FOREIGN KEY (`sensorId`) REFERENCES `sensor` (`sensorId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `votingparties_ibfk_3` FOREIGN KEY (`sensorId`) REFERENCES `sensor` (`sensorId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
