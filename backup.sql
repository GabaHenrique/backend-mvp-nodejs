-- MySQL dump 10.13  Distrib 8.0.45, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ruabikeshop_dev1
-- ------------------------------------------------------
-- Server version	8.0.45

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
-- Table structure for table `admin_users`
--

DROP TABLE IF EXISTS `admin_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','superadmin') DEFAULT 'admin',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin_users`
--

LOCK TABLES `admin_users` WRITE;
/*!40000 ALTER TABLE `admin_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,1,16,1,4289.90);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `total` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,4289.90,'pending','2026-04-08 01:57:32');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `category` varchar(100) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Quadro WTP Felix Prangenberg 21','Quadro WeThePeople modelo assinado por Felix Prangenberg, disponivel no tamanho 21',2589.90,10,'quadros','assets/imagens/produtos/quadrowtp.webp','2026-04-07 19:23:27','2026-04-07 19:23:27'),(2,'Pedal DRB','Pedal BMX nylon',89.90,10,'pedais','assets/imagens/produtos/pedaldrb.webp','2026-04-07 19:31:39','2026-04-07 21:46:06'),(3,'Banco Cult','Banco BMX Cult',249.90,5,'bancos','assets/imagens/produtos/bancocult.webp','2026-04-07 19:31:39','2026-04-07 21:41:36'),(4,'Manopla ODI','Manopla ODI Longneck',99.90,5,'manoplas','assets/imagens/produtos/manopla-odi.jpg','2026-04-07 19:31:39','2026-04-07 19:31:39'),(5,'Quadro FIEND','Quadro FIEND Reynolds',2899.00,8,'quadros','assets/imagens/produtos/quadrofiend.webp','2026-04-07 19:31:39','2026-04-07 21:47:18'),(6,'Banco FIEND Lewis','Banco Fiend Lewis Mills',289.00,8,'bancos','assets/imagens/produtos/bancofiend.webp','2026-04-07 19:31:39','2026-04-07 21:49:13'),(7,'Pedal Cult Dakota','Pedal Cult Dak, eixo em cromolly, plataforma em nylon',140.00,8,'pedais','assets/imagens/produtos/pedalcultdakota.webp','2026-04-07 19:31:39','2026-04-07 21:51:23'),(8,'Manopla Odyssey BOSS','Manopla Assinada por Aaros Ross, desenhos feitos em formato de teclado, acompanha barends nylond',80.00,10,'manoplas','assets/imagens/produtos/odyssey.jpg','2026-04-07 19:31:39','2026-04-07 21:44:32'),(9,'Cubo ECLAT Hybrid','Cubo Eclat Hybrid, cassete e freecoaster, rolamentos selados, eixo em cromolly',2420.00,8,'cubos','assets/imagens/produtos/cuboeclat.webp','2026-04-07 19:31:39','2026-04-07 21:43:35'),(10,'BMX CULT DEVOTATION 20.75','Bicicleta BMX Cult modelo DEVOTATION, fabricado em cromolly 4130 trataddo, pedivela 3pcs, pneus Cult x VANS 2.40',5450.00,10,'bikes','assets/imagens/produtos/cultbike.webp','2026-04-07 19:31:39','2026-04-07 21:42:43'),(11,'BMX FIEND TYPE A+','Bicicleta BMX FIEND modelo TYPE A+, fabricada em cromolly, pneus 2.40, guidao com 9 de altura',4289.90,10,'bikes','assets/imagens/produtos/bikefiend.webp','2026-04-07 20:14:50','2026-04-07 20:14:50'),(12,'Banco Odyssey TieDye','Banco ODYSSEY modelo fat, disponivel na cor tiedye, pivotal',249.90,5,'bancos','assets/imagens/produtos/bancoodyssey.webp','2026-04-07 20:14:50','2026-04-07 20:14:50'),(13,'Manopla CULT','Manopla CULT Brandon Begin, acompanha barends nylon, com 160mm de tamanho',80.00,15,'manoplas','assets/imagens/produtos/manoplacult.jpg','2026-04-07 20:14:50','2026-04-07 20:14:50'),(14,'BMX SUNDAY BIKES','Bicicleta BMX Sunday Bikes, fabricada em cromolly, pneus 2.40, guidao com 9 de altura',6589.90,10,'bikes','assets/imagens/produtos/bikesundaybranca.jpg','2026-04-07 20:14:50','2026-04-07 20:14:50'),(15,'BMX WTP Cinza','Bicicleta BMX WeThePeople, fabricada em cromolly, pneus 2.40, guidao com 9 de altura',5310.90,8,'bikes','assets/imagens/produtos/bikewtp.jpg','2026-04-07 20:14:50','2026-04-07 20:14:50'),(16,'BMX COLONY EMERGE','Bicicleta BMX COLONY Emerge, fabricada em cromolly, pneus 2.40, guidao com 9 de altura',4289.90,4,'bikes','assets/imagens/produtos/colonyemerge.webp','2026-04-07 20:14:50','2026-04-08 01:57:32'),(17,'Pedal ECLAT','Pedal Eclat fabricado em nylon, eixo em cromolly, aperto em chave allen ou 15',139.90,9,'pedais','assets/imagens/produtos/pedaleclat.webp','2026-04-07 20:14:50','2026-04-07 20:14:50'),(18,'Cubo Odyssey Vandero','Cubo Odyssey Vandero PRO, eixo em cromolly, rolamentos selados acompanha protetores',520.90,10,'cubos','assets/imagens/produtos/cuboodyssey.webp','2026-04-07 20:14:50','2026-04-07 20:14:50'),(19,'Cubo PROFILE','Cubo PROFILE, eixo em cromolly, rolamentos selados',1270.00,4,'cubos','assets/imagens/produtos/cuboprofile.jpg','2026-04-07 20:14:50','2026-04-07 20:14:50'),(20,'Quadro VOLUME VLM','Quadro VOLUME, disponivel na cor cinza com azul, central MID, direção selada',2889.00,12,'quadros','assets/imagens/produtos/volumeframe.webp','2026-04-07 21:56:36','2026-04-07 21:56:36'),(21,'Quadro FIT FRAME','Quadro FIT fabricado em cromolly 4130, movimento central e direção selados',2149.50,5,'quadros','assets/imagens/produtos/fitframe.webp','2026-04-07 21:56:36','2026-04-07 21:56:36'),(22,'Cubo SDS CULT','Cubo CULT SDS, podendo ser usado como LHD ou RHD, cog com 9 dentes',1279.00,6,'cubos','assets/imagens/produtos/cubocult.webp','2026-04-07 21:56:36','2026-04-07 21:56:36');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-27 15:53:04
