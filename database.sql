-- booking.users definition

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `userType` enum('RESTARUANT','USER') NOT NULL DEFAULT 'USER',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- booking.menus definition

CREATE TABLE `menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` int NOT NULL,
  `category` enum('KOREAN','JAPANESE','CHINESE','WESTERN','NONE') NOT NULL DEFAULT 'NONE',
  `description` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `restaurant_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_bcd4a935c967cc9c20e770d1e62` (`restaurant_id`),
  CONSTRAINT `FK_bcd4a935c967cc9c20e770d1e62` FOREIGN KEY (`restaurant_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- booking.bookings definition

CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `restaurant` varchar(255) NOT NULL,
  `bookingDate` datetime NOT NULL,
  `startedAt` datetime NOT NULL,
  `endedAt` datetime NOT NULL,
  `numberOfPeople` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `deletedAt` datetime(6) DEFAULT NULL,
  `userId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_38a69a58a323647f2e75eb994de` (`userId`),
  CONSTRAINT `FK_38a69a58a323647f2e75eb994de` FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- booking.booking_menus definition

CREATE TABLE `booking_menus` (
  `bookingId` int NOT NULL,
  `menuId` int NOT NULL,
  PRIMARY KEY (`bookingId`,`menuId`),
  KEY `IDX_5b6e058d2b0886fcb8cd2cc4df` (`bookingId`),
  KEY `IDX_fa634cd79a126829c7ef904b1c` (`menuId`),
  CONSTRAINT `FK_5b6e058d2b0886fcb8cd2cc4dfc` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_fa634cd79a126829c7ef904b1c4` FOREIGN KEY (`menuId`) REFERENCES `menus` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;