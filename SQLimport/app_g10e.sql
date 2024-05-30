-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 30, 2024 at 01:08 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `app_g10e`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `contactNum` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `msg` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customerfestivals`
--

CREATE TABLE `customerfestivals` (
  `customerId` varchar(255) NOT NULL,
  `festivalId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
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

-- --------------------------------------------------------

--
-- Table structure for table `festival`
--

CREATE TABLE `festival` (
  `festivalId` varchar(255) NOT NULL,
  `festivalName` varchar(255) DEFAULT NULL,
  `beginTime` date DEFAULT NULL,
  `endTime` date DEFAULT NULL,
  `ticketPrice` bigint(20) DEFAULT NULL,
  `IMG-PATH` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `organiserfestivals`
--

CREATE TABLE `organiserfestivals` (
  `organiserId` varchar(255) NOT NULL,
  `festivalId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `organisers`
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
-- Table structure for table `sensor`
--

CREATE TABLE `sensor` (
  `sensorId` varchar(255) NOT NULL,
  `festivalId` varchar(255) DEFAULT NULL,
  `latitude` double DEFAULT NULL,
  `longitude` double DEFAULT NULL,
  `currentSoundDensity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `super`
--

CREATE TABLE `super` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(255) NOT NULL,
  `admin_password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `super`
--

INSERT INTO `super` (`admin_id`, `admin_name`, `admin_password`) VALUES
(1, 'admin', '$2y$10$PvplRi/icaDBSfY8gNs6ZO65UxOOinQYBLhppknQAbIbQo4cGO0ca');

-- --------------------------------------------------------

--
-- Table structure for table `verifier`
--

CREATE TABLE `verifier` (
  `verifierId` varchar(255) NOT NULL,
  `userEmail` varchar(255) DEFAULT NULL,
  `verificationCode` varchar(255) DEFAULT NULL,
  `expireTime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `votingparties`
--

CREATE TABLE `votingparties` (
  `votingPartyId` varchar(255) NOT NULL,
  `vote_up` tinyint(1) DEFAULT NULL,
  `FestivalId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`contactNum`);

--
-- Indexes for table `customerfestivals`
--
ALTER TABLE `customerfestivals`
  ADD PRIMARY KEY (`customerId`,`festivalId`),
  ADD KEY `festivalId` (`festivalId`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customerId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `festival`
--
ALTER TABLE `festival`
  ADD PRIMARY KEY (`festivalId`);

--
-- Indexes for table `organiserfestivals`
--
ALTER TABLE `organiserfestivals`
  ADD PRIMARY KEY (`organiserId`,`festivalId`),
  ADD KEY `festivalId` (`festivalId`);

--
-- Indexes for table `organisers`
--
ALTER TABLE `organisers`
  ADD PRIMARY KEY (`organiserId`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `sensor`
--
ALTER TABLE `sensor`
  ADD PRIMARY KEY (`sensorId`),
  ADD KEY `festivalId` (`festivalId`);

--
-- Indexes for table `super`
--
ALTER TABLE `super`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `verifier`
--
ALTER TABLE `verifier`
  ADD PRIMARY KEY (`verifierId`);

--
-- Indexes for table `votingparties`
--
ALTER TABLE `votingparties`
  ADD PRIMARY KEY (`votingPartyId`),
  ADD KEY `FestivalId` (`FestivalId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `contactNum` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `super`
--
ALTER TABLE `super`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customerfestivals`
--
ALTER TABLE `customerfestivals`
  ADD CONSTRAINT `customerfestivals_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `customers` (`customerId`),
  ADD CONSTRAINT `customerfestivals_ibfk_2` FOREIGN KEY (`festivalId`) REFERENCES `festival` (`festivalId`);

--
-- Constraints for table `organiserfestivals`
--
ALTER TABLE `organiserfestivals`
  ADD CONSTRAINT `organiserfestivals_ibfk_1` FOREIGN KEY (`organiserId`) REFERENCES `organisers` (`organiserId`),
  ADD CONSTRAINT `organiserfestivals_ibfk_2` FOREIGN KEY (`festivalId`) REFERENCES `festival` (`festivalId`);

--
-- Constraints for table `sensor`
--
ALTER TABLE `sensor`
  ADD CONSTRAINT `sensor_ibfk_1` FOREIGN KEY (`festivalId`) REFERENCES `festival` (`festivalId`);

--
-- Constraints for table `votingparties`
--
ALTER TABLE `votingparties`
  ADD CONSTRAINT `votingparties_ibfk_1` FOREIGN KEY (`FestivalId`) REFERENCES `festival` (`festivalId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
