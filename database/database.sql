-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 29, 2020 at 10:40 PM
-- Server version: 5.7.23
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `oaxaca`
--

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_role` int(66) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id_role`, `role`) VALUES
(1, 'Administrator'),
(2, 'User');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_user` int(66) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `birthdate` date NOT NULL,
  `role_id` int(66) NOT NULL,
  `register_type` varchar(255) NOT NULL,
  `register_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_user`, `email`, `password`, `name`, `phone`, `birthdate`, `role_id`, `register_type`, `register_date`) VALUES
(1, 'tuxrick@gmail.com', '$2b$10$DztIx579D/8GWi.Fk73pBuruFPlsQsp2zwRy180g3Uk2PYiu6CnQi', 'ricardoooooo', '788999293923', '1989-11-11', 1, 'Normal', '2020-10-26 19:23:34'),
(2, 'tuxricks@gmail.com', '$2b$10$uiTuQM/iX.TCOJcXc.JCLuHWJMLonma1i2z6w8vHdNt.YDuLinwE2', 'Pepe pecas', '4444455555', '1989-11-12', 2, 'Normal', '2020-10-26 19:30:27'),
(3, 'tuxrick2@gmail.com', '$2b$10$mqwYsOPNgLNPtrtX16cxIOUgS6FurgpyQ/TxyAohy2uOExHA.RYWm', 'Pepe pecas', '4444455555', '1989-11-12', 2, 'Normal', '2020-10-26 21:51:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`),
  ADD KEY `id_role` (`id_role`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` int(66) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(66) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
