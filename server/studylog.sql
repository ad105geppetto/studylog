CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255),
  `profile` varchar(255),
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE `token` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `refreshToken` varchar(255),
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE `rooms` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `entry` tinyint NOT NULL,
  `content` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE `logs` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `mon` int,
  `tue` int,
  `wed` int,
  `thu` int,
  `fri` int,
  `sat` int,
  `sun` int,
  `totalTime` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE `todos` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` int NOT NULL,
  `type` varchar(255) NOT NULL,
  `content` varchar(255),
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE `chats` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `userId` int NOT NULL,
  `roomId` int NOT NULL,
  `message` varchar(255),
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now())
);

CREATE TABLE `auth` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `certNum` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `verification` Boolean NOT NULL DEFAULT false,
  `createdAt` timestamp NOT NULL DEFAULT (now())
);

ALTER TABLE `chats` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `chats` ADD FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`);

ALTER TABLE `todos` ADD FOREIGN KEY (`userId`) REFERENCES `users` (`id`);

ALTER TABLE `logs` ADD FOREIGN KEY (`id`) REFERENCES `users` (`id`);

ALTER TABLE `token` ADD FOREIGN KEY (`id`) REFERENCES `users` (`id`);
