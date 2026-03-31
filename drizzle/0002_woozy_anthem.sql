CREATE TABLE `leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`phone` varchar(32) NOT NULL,
	`email` varchar(320),
	`reason` text,
	`preferredLocation` varchar(64),
	`source` varchar(64) NOT NULL DEFAULT 'ai-chat',
	`status` enum('new','contacted','scheduled','completed') NOT NULL DEFAULT 'new',
	`notes` text,
	`chatHistory` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leads_id` PRIMARY KEY(`id`)
);
