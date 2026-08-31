CREATE TABLE `faq_helpful_counts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`questionId` varchar(64) NOT NULL,
	`helpfulCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `faq_helpful_counts_id` PRIMARY KEY(`id`),
	CONSTRAINT `faq_helpful_counts_questionId_unique` UNIQUE(`questionId`)
);
