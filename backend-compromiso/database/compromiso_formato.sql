-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: compromiso
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `formato`
--

DROP TABLE IF EXISTS `formato`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formato` (
  `Id_Formato` int(11) NOT NULL AUTO_INCREMENT,
  `Cod_Formato` varchar(50) NOT NULL,
  `Fec_Actualizacion` date NOT NULL,
  `Ver_Formato` varchar(10) NOT NULL,
  `Est_Formato` enum('Activo','Inactivo') NOT NULL,
  `Id_Responsable` int(11) DEFAULT NULL,
  `Nom_Formato` varchar(255) NOT NULL,
  `Nom_Magnetico` varchar(255) DEFAULT NULL,
  `Id_Procedimiento` int(11) DEFAULT NULL,
  `Id_Unidad` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`Id_Formato`),
  KEY `Id_Responsable` (`Id_Responsable`),
  KEY `Id_Procedimiento` (`Id_Procedimiento`),
  KEY `Id_Unidad` (`Id_Unidad`),
  CONSTRAINT `formato_ibfk_1` FOREIGN KEY (`Id_Responsable`) REFERENCES `responsable` (`Id_Responsable`),
  CONSTRAINT `formato_ibfk_2` FOREIGN KEY (`Id_Procedimiento`) REFERENCES `procedimiento` (`Id_Procedimiento`),
  CONSTRAINT `formato_ibfk_3` FOREIGN KEY (`Id_Unidad`) REFERENCES `unidad` (`Id_Unidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formato`
--

LOCK TABLES `formato` WRITE;
/*!40000 ALTER TABLE `formato` DISABLE KEYS */;
/*!40000 ALTER TABLE `formato` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-08-25 12:01:57
