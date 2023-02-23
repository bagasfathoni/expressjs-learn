CREATE DATABASE  IF NOT EXISTS `abc_store` /*!40100 DEFAULT CHARACTER SET utf16 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `abc_store`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: abc_store
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(32) NOT NULL,
  `customer_name` varchar(100) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `customer_id_UNIQUE` (`customer_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'b7977d77e62549ffb6521005970d3fbb','AGUS SUYONO','agus.suyono@mail.com',1),(2,'26c9483e69e7411282501c038c607101','HERI PURNOMO','heri.purnomo@mail.com',1),(3,'0609534426e842ea9daf50537211710a','DIMAS HARYONO','dimas.haryono@mail.com',1),(4,'16f70906a3a64af78ebae55358f03b82','DIMAS AGUNG','dimas.agung@mail.com',1);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` varchar(32) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `is_active` tinyint DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_id_UNIQUE` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'b4838994b62240bf92de2dd7e3d56123','MEJA',800000,1),(2,'d835aef63441456bb25722fecb3e26a4','KURSI',350000,1),(3,'fd88b065087d4dfc90bdbbeac2d3ddc7','LAMPU',30000,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trx_master`
--

DROP TABLE IF EXISTS `trx_master`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trx_master` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trx_id` varchar(64) NOT NULL,
  `customer_id` int DEFAULT NULL,
  `total_amount` decimal(10,0) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trx_id_UNIQUE` (`trx_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trx_master`
--

LOCK TABLES `trx_master` WRITE;
/*!40000 ALTER TABLE `trx_master` DISABLE KEYS */;
INSERT INTO `trx_master` VALUES (1,'37f00086909ae454a1cff28a55524993bf27d63fb8245751d9ef65b76580c7fa',3,2400000,'2023-01-21 15:21:53'),(2,'2df73643faecf3cd133cba126c8e0621aee35f5964b680dba7a39da5ffecfdfe',2,2650000,'2023-01-21 15:23:19'),(3,'2d83b4f31f5a26c443b7c9b72c8e09c9c6f7f73e811c7bf8ed9ec8e3e5fe4945',2,1150000,'2023-01-21 16:41:37');
/*!40000 ALTER TABLE `trx_master` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trx_product`
--

DROP TABLE IF EXISTS `trx_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trx_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `trx_id` varchar(64) NOT NULL,
  `product_id` int DEFAULT NULL,
  `qty` int DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trx_product`
--

LOCK TABLES `trx_product` WRITE;
/*!40000 ALTER TABLE `trx_product` DISABLE KEYS */;
INSERT INTO `trx_product` VALUES (2,'37f00086909ae454a1cff28a55524993bf27d63fb8245751d9ef65b76580c7fa',1,3,2400000),(5,'2df73643faecf3cd133cba126c8e0621aee35f5964b680dba7a39da5ffecfdfe',1,2,1600000),(6,'2df73643faecf3cd133cba126c8e0621aee35f5964b680dba7a39da5ffecfdfe',2,3,1050000),(7,'2d83b4f31f5a26c443b7c9b72c8e09c9c6f7f73e811c7bf8ed9ec8e3e5fe4945',1,1,800000),(8,'2d83b4f31f5a26c443b7c9b72c8e09c9c6f7f73e811c7bf8ed9ec8e3e5fe4945',2,1,350000);
/*!40000 ALTER TABLE `trx_product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-22 10:16:02
