CREATE TABLE `social_metadata_history` (
	`id` int AUTO_INCREMENT NOT NULL,
	`path` varchar(512) NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`image` text NOT NULL,
	`imageAlt` text NOT NULL,
	`type` varchar(32) NOT NULL,
	`contentHash` varchar(64) NOT NULL,
	`createdByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `social_metadata_history_id` PRIMARY KEY(`id`),
	CONSTRAINT `social_metadata_history_path_hash_unique` UNIQUE(`path`,`contentHash`)
);
