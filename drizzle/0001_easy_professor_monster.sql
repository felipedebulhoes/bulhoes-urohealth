CREATE TABLE `files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int,
	`filename` varchar(512) NOT NULL,
	`mimeType` varchar(128) NOT NULL,
	`size` int NOT NULL,
	`fileKey` varchar(1024) NOT NULL,
	`url` text NOT NULL,
	`description` text,
	`category` varchar(128),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `files_id` PRIMARY KEY(`id`)
);
