-- MySQL dump 10.13  Distrib 5.7.30, for Linux (x86_64)
--
-- Host: localhost    Database: food_order
-- ------------------------------------------------------
-- Server version	5.7.30-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carrier`
--

DROP TABLE IF EXISTS `carrier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carrier` (
  `id` varchar(36) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_252ee8b65aee495a6dcc32f058` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carrier`
--

LOCK TABLES `carrier` WRITE;
/*!40000 ALTER TABLE `carrier` DISABLE KEYS */;
INSERT INTO `carrier` VALUES ('2b2de8dd-8be2-4106-a27b-5463f9820afd','John','Smith','3457890000','2020-05-12 18:37:39.405893','2020-05-12 18:37:39.405893',NULL),('b6d7bd3f-9c3a-45df-80da-972669a0aa54','Cecelia','Heidenreich','058-426-3137','2020-05-11 16:27:58.260635','2020-05-11 16:27:58.260635',NULL),('f1963851-b4d8-4673-ab64-bbbc7b128c83','Moses','Mante','086-208-0734','2020-05-11 16:27:58.379119','2020-05-13 18:30:56.000000',NULL);
/*!40000 ALTER TABLE `carrier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `customer` (
  `id` varchar(36) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_03846b4bae9df80f19c76005a8` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES ('1ae6b968-f1ec-4c9b-9592-d5cb7eda4c66','Fletcher','Weimann','641-581-3581','5495 Hailey Junctions','2020-05-11 16:27:58.284391','2020-05-11 16:27:58.284391',NULL),('2215a396-9c22-4c19-a08c-3d5d86dceb18','Albertha','Lockman','101-388-9919','2356 Aufderhar Junction','2020-05-11 16:27:58.334779','2020-05-11 16:27:58.334779',NULL),('2ac21986-3ee2-4f04-a969-2bcc09167d7b','Davon','Mitchell','266-027-8328','18309 Nyasia Causeway','2020-05-11 16:27:58.272970','2020-05-11 16:27:58.272970',NULL),('82056ae7-c5ea-48c4-a392-f5aefd623700','Tiana','Flatley','607-590-3846','011 Mertz Fords','2020-05-11 16:27:58.324134','2020-05-11 16:27:58.324134',NULL),('985aa45d-904d-41f7-b775-ffe7e9f5b9df','Miles','Davis','+380938885055','Alton, Illinois, U.S.','2020-05-12 23:28:27.550818','2020-05-13 17:05:13.000000',NULL),('ca4b20a0-bfba-430c-a873-066b1f1f96ed','Camilla','Strosin','591-159-6643','42024 Garret Cape','2020-05-11 16:27:58.312023','2020-05-11 16:27:58.312023',NULL);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order` (
  `id` varchar(36) NOT NULL,
  `restaurantId` varchar(36) DEFAULT NULL,
  `customerId` varchar(36) DEFAULT NULL,
  `carrierId` varchar(36) DEFAULT NULL,
  `status` enum('CREATED','ACCEPTED','DELIVERED','PICKED_UP') NOT NULL DEFAULT 'CREATED',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `deliveredAt` datetime DEFAULT NULL,
  `pickedAt` datetime DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_c93f22720c77241d2476c07cabf` (`restaurantId`),
  KEY `FK_124456e637cca7a415897dce659` (`customerId`),
  KEY `FK_3180b06102e839c44f77f7358cb` (`carrierId`),
  CONSTRAINT `FK_124456e637cca7a415897dce659` FOREIGN KEY (`customerId`) REFERENCES `customer` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_3180b06102e839c44f77f7358cb` FOREIGN KEY (`carrierId`) REFERENCES `carrier` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_c93f22720c77241d2476c07cabf` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES ('2613cbea-4a53-4fce-b5fe-5dcd0c06a599','3683dab3-996f-48ff-bb76-1883c33010e0','1ae6b968-f1ec-4c9b-9592-d5cb7eda4c66','f1963851-b4d8-4673-ab64-bbbc7b128c83','DELIVERED','2020-05-13 23:12:57.557555','2020-05-13 23:12:57.557555','2020-05-13 22:38:31','2020-05-13 22:00:31','1477  Ferrell Street'),('58b885ae-9abd-4dd7-989a-3ec149fd1d10','3683dab3-996f-48ff-bb76-1883c33010e0','1ae6b968-f1ec-4c9b-9592-d5cb7eda4c66','f1963851-b4d8-4673-ab64-bbbc7b128c83','DELIVERED','2020-05-13 23:00:33.926154','2020-05-13 23:09:01.000000','2020-05-13 23:09:01','2020-05-13 23:08:31','1477  Ferrell Street'),('955b998b-6141-47bf-87bb-a3851a69f385','3683dab3-996f-48ff-bb76-1883c33010e0','1ae6b968-f1ec-4c9b-9592-d5cb7eda4c66','f1963851-b4d8-4673-ab64-bbbc7b128c83','DELIVERED','2020-05-13 23:13:54.272265','2020-05-13 23:13:54.272265','2020-05-13 21:34:30','2020-05-13 21:10:11','244  Heather Sees Way');
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_product`
--

DROP TABLE IF EXISTS `order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_product` (
  `orderId` varchar(255) NOT NULL,
  `productCode` varchar(255) NOT NULL,
  `quantity` tinyint(4) NOT NULL,
  `sellPrice` decimal(10,2) NOT NULL,
  `totalPrice` decimal(10,2) GENERATED ALWAYS AS ((`quantity` * `sellPrice`)) VIRTUAL NOT NULL,
  PRIMARY KEY (`orderId`,`productCode`),
  KEY `FK_9f7544e465628cc9704f4ef9459` (`productCode`),
  CONSTRAINT `FK_3fb066240db56c9558a91139431` FOREIGN KEY (`orderId`) REFERENCES `order` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_9f7544e465628cc9704f4ef9459` FOREIGN KEY (`productCode`) REFERENCES `product` (`code`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_product`
--

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
INSERT INTO `order_product` (`orderId`, `productCode`, `quantity`, `sellPrice`) VALUES ('2613cbea-4a53-4fce-b5fe-5dcd0c06a599','0806035f-090d-4260-93a0-fa624c97beec',1,994.00),('2613cbea-4a53-4fce-b5fe-5dcd0c06a599','0d574fbb-b934-4c26-9da3-1e8bf825bffc',1,224.00),('58b885ae-9abd-4dd7-989a-3ec149fd1d10','0806035f-090d-4260-93a0-fa624c97beec',1,994.00),('58b885ae-9abd-4dd7-989a-3ec149fd1d10','0d574fbb-b934-4c26-9da3-1e8bf825bffc',3,224.00),('955b998b-6141-47bf-87bb-a3851a69f385','0806035f-090d-4260-93a0-fa624c97beec',1,994.00),('955b998b-6141-47bf-87bb-a3851a69f385','0d574fbb-b934-4c26-9da3-1e8bf825bffc',1,224.00),('955b998b-6141-47bf-87bb-a3851a69f385','264908b6-62f6-4e32-ae76-cad8f2498226',2,408.00);
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `restaurantId` varchar(36) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`code`),
  KEY `FK_3249a5709fb37437198f7dff801` (`restaurantId`),
  CONSTRAINT `FK_3249a5709fb37437198f7dff801` FOREIGN KEY (`restaurantId`) REFERENCES `restaurant` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES ('0806035f-090d-4260-93a0-fa624c97beec','Intelligent Concrete Soap',994.00,'3683dab3-996f-48ff-bb76-1883c33010e0','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('0d574fbb-b934-4c26-9da3-1e8bf825bffc','Unbranded Fresh Hat',224.00,'3683dab3-996f-48ff-bb76-1883c33010e0','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('125adae6-1744-4102-96e9-0672469adf4d','Rustic Metal Tuna',227.00,'25660fbf-1ca8-46ab-98f4-45b272d5efb3','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('1f9b818a-d7e1-455d-901c-03974754435e','Handcrafted Concrete Bike',179.00,'6e0bd007-cbee-4b30-b4ac-32825d31de1e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('249a97be-6be3-48e4-86c1-225b44a20a73','Incredible Concrete Computer',244.00,'3683dab3-996f-48ff-bb76-1883c33010e0','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('264908b6-62f6-4e32-ae76-cad8f2498226','Licensed Fresh Chicken',408.00,'3683dab3-996f-48ff-bb76-1883c33010e0','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('36905d6c-fe44-47d5-81a0-025f41aa118c','Practical Wooden Car',666.00,'6e0bd007-cbee-4b30-b4ac-32825d31de1e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('36f98282-b7d7-479d-a284-82c8313b2a1d','Small Wooden Pizza',640.00,'6e0bd007-cbee-4b30-b4ac-32825d31de1e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('3895c7c7-866d-45a5-b094-4f038a4498d5','Unbranded Granite Fish',437.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('390bcd84-2dea-477c-9a9c-c338e5b1a87e','Generic Soft Sausages',556.00,'25660fbf-1ca8-46ab-98f4-45b272d5efb3','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('4348d94c-fb1f-4b54-b10d-b8ed86d7847d','Handcrafted Metal Ball',855.00,'6e0bd007-cbee-4b30-b4ac-32825d31de1e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('45de8d7f-b088-4dcf-9dc9-dadc7f7599ba','Incredible Metal Pizza',569.00,'c02acd8a-4a5d-4c5f-baa6-9f3948fcba4e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('48aca3aa-a291-42df-9d5c-947e2942da3a','Fantastic Cotton Chips',763.00,'6e0bd007-cbee-4b30-b4ac-32825d31de1e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('4f6f6995-0b9b-4047-98bf-eb16badc05d5','Handcrafted Frozen Shirt',168.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('52d62e9f-01d5-452f-9114-db2c41877880','Rustic Plastic Sausages',119.00,'6e0bd007-cbee-4b30-b4ac-32825d31de1e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('5be0b6ba-8ed4-4d88-acbe-f8dd78a0c2b3','Intelligent Cotton Shirt',708.00,'25660fbf-1ca8-46ab-98f4-45b272d5efb3','2020-05-13 17:13:15.723716','2020-05-13 19:04:57.000000',NULL),('5d5fd7b4-c2e9-4c8b-9f14-b8a17afaca50','Licensed Soft Chips',214.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('68ab0a62-dd4e-4d31-966b-60bcac83064f','Incredible Granite Bike',964.00,'3683dab3-996f-48ff-bb76-1883c33010e0','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('7f82ba6e-6572-480e-ba17-c7d4dfb78f6e','Awesome Cotton Ball',622.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('83a445de-bd9f-4118-81f1-1a63be5ba61f','Handcrafted Rubber Chips',965.25,'25660fbf-1ca8-46ab-98f4-45b272d5efb3','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('86ebb0a3-9ce9-4f44-8a61-8c80fa6f717e','Licensed Cotton Chips',287.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('88254d93-9817-45a5-b204-597e4c8cf28e','Small Soft Chips',262.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('8960c433-059f-45ea-9ae0-b31429f0191a','Practical Rubber Car',78.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('89b69cd2-1175-4bb8-8397-654ed010c527','Handmade Wooden Cheese',853.00,'6e0bd007-cbee-4b30-b4ac-32825d31de1e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('9c9503b1-9c08-40e4-9e69-9564bb62a873','Ergonomic Steel Chair',728.00,'c02acd8a-4a5d-4c5f-baa6-9f3948fcba4e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('9ce0a71d-889e-430e-beb9-aeade0c186f0','Intelligent Plastic Towels',954.00,'3683dab3-996f-48ff-bb76-1883c33010e0','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('9f51decd-7987-48e6-8a02-6e29faaaf323','Practical Tuna',25.00,'25660fbf-1ca8-46ab-98f4-45b272d5efb3','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('a9ed74ca-89c5-4ad6-917e-6d0c18f7329a','Small Plastic Hat',675.00,'3683dab3-996f-48ff-bb76-1883c33010e0','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('b4ea23cb-7a54-4b3d-8f02-9b7906f45d36','Ergonomic Wooden Shoes',855.00,'6e0bd007-cbee-4b30-b4ac-32825d31de1e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('b76a117e-e7eb-46bc-8895-c17a89c391f0','Licensed Plastic Salad',593.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('bb945314-32c3-47b0-b8d7-32ab620d9f61','Generic Wooden Hat',160.00,'c02acd8a-4a5d-4c5f-baa6-9f3948fcba4e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('bf6d876e-fdd8-454e-a4a9-4cfead746a83','Licensed Wooden Chair',608.00,'3683dab3-996f-48ff-bb76-1883c33010e0','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('c3fde90c-5d34-480e-8f62-2a6c78cb8c3f','Tasty Fresh Bacon',944.00,'3683dab3-996f-48ff-bb76-1883c33010e0','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('cc34ee2c-d73a-4118-9cce-6e3619acfce6','Rustic Frozen Hat',268.00,'25660fbf-1ca8-46ab-98f4-45b272d5efb3','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('d24c71d0-ace7-4c9c-8f94-e7ea60d4205b','Refined Rubber Chair',412.00,'3683dab3-996f-48ff-bb76-1883c33010e0','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('d41760dd-e71c-4c91-89dc-c0b2560defe1','Small Soft Salad',780.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('d4a1f3fd-2e94-4781-84c3-5a3d5dc60f48','Tasty Soft Cheese',11.00,'c02acd8a-4a5d-4c5f-baa6-9f3948fcba4e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('d81a3bd7-5f52-4341-85d3-d5f215ec3b9a','Unbranded Granite Hat',133.00,'3683dab3-996f-48ff-bb76-1883c33010e0','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('da31c3ed-1b8e-463a-af74-0d58262be132','Gorgeous Fresh Fish',879.00,'c02acd8a-4a5d-4c5f-baa6-9f3948fcba4e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('dc42d808-e323-4e84-bb4f-b9ec55c18186','Handcrafted Steel Hat',420.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('dd595b0d-bc72-4f07-9e86-09f3331855a6','Sleek Soft Salad',296.15,'6e0bd007-cbee-4b30-b4ac-32825d31de1e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('de5d8e27-ed61-487a-813f-86566f6b8add','Refined Concrete Table',40.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('e37f6555-0524-45d8-b746-6def4d335633','Tasty Soft Gloves',524.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('e446dcfd-c76d-48ef-a9d9-0450f36e37f8','Ergonomic Cotton Fish',91.00,'25660fbf-1ca8-46ab-98f4-45b272d5efb3','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('e6e92851-95d7-455e-972f-d4dbfa777ce2','Gorgeous Fresh Towels',616.00,'3683dab3-996f-48ff-bb76-1883c33010e0','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('e90d185a-f74e-4909-b8ae-a31188425b4d','Refined Plastic Cheese',539.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('e951147a-0932-44f8-81a4-b0cb4b51131a','Ergonomic Rubber Towels',870.00,'6e0bd007-cbee-4b30-b4ac-32825d31de1e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('e991fee5-5d84-4d6d-85d8-0f1cb3ec4dac','Ergonomic Frozen Soap',150.00,'c02acd8a-4a5d-4c5f-baa6-9f3948fcba4e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('e9beb5ef-82c9-47b6-b957-beb63477c4df','Small Cotton Ball',123.00,'cfb4abf4-f7e0-4683-b195-f8fec8090289','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL),('f07cd914-c902-4553-ae17-9a5faba4dcff','Intelligent Concrete Mouse',734.00,'6e0bd007-cbee-4b30-b4ac-32825d31de1e','2020-05-13 17:13:15.723716','2020-05-13 17:13:16.034051',NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restaurant` (
  `id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ed2ce9515d60dab55892d24ce4` (`name`,`address`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES ('25660fbf-1ca8-46ab-98f4-45b272d5efb3','Berge Group','897 Federico Extension','544-446-1675','2020-05-11 16:27:58.367200','2020-05-11 16:27:58.367200',NULL),('3683dab3-996f-48ff-bb76-1883c33010e0','Kerluke LLC','8242 Lind Fork','341-148-3966','2020-05-11 16:27:58.245671','2020-05-11 16:27:58.245671',NULL),('6e0bd007-cbee-4b30-b4ac-32825d31de1e','O\'Kon, Toy and Hegmann','8825 Kelsi Inlet','408-121-5687','2020-05-11 16:27:58.358106','2020-05-11 16:27:58.358106',NULL),('c02acd8a-4a5d-4c5f-baa6-9f3948fcba4e','Weissnat LLC','64142 Larson Pike','886-404-6989','2020-05-11 16:27:58.349452','2020-05-11 16:27:58.349452',NULL),('cfb4abf4-f7e0-4683-b195-f8fec8090289','Borer - Quitzon','7256 Schinner Mission','326-030-5690','2020-05-11 16:27:58.341302','2020-05-11 16:27:58.341302',NULL),('fadfb13a-6838-45ba-9c66-0f1b147af0c8','Milwaukee cavs','Milwaukee, 1002  Whaley Lane','414-469-5873','2020-05-13 18:45:00.410937','2020-05-13 18:50:23.000000',NULL);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-13 23:54:13
