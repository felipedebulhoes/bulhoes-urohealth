CREATE TABLE `article_drafts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`favoriteId` int,
	`keyword` varchar(512) NOT NULL,
	`category` varchar(64) NOT NULL,
	`title` text NOT NULL,
	`content` text NOT NULL,
	`status` enum('draft','review','published') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `article_drafts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `article_favorites` (
	`id` int AUTO_INCREMENT NOT NULL,
	`keyword` varchar(512) NOT NULL,
	`category` varchar(64) NOT NULL,
	`title` text NOT NULL,
	`volume` int,
	`difficulty` int,
	`status` enum('pending','in_progress','published') NOT NULL DEFAULT 'pending',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `article_favorites_id` PRIMARY KEY(`id`)
);
