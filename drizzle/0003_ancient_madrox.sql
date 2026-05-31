CREATE TABLE `keyword_snapshots` (
	`id` int AUTO_INCREMENT NOT NULL,
	`keyword` varchar(512) NOT NULL,
	`category` varchar(64) NOT NULL,
	`source` varchar(64) NOT NULL,
	`volume` int,
	`trafficShare` text,
	`difficulty` int,
	`cpc` text,
	`position` int,
	`intent` varchar(32),
	`trend` varchar(16),
	`trendChange` text,
	`metadata` text,
	`weekDate` timestamp NOT NULL,
	`scheduleCronTaskUid` varchar(65),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `keyword_snapshots_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tracked_keywords` (
	`id` int AUTO_INCREMENT NOT NULL,
	`keyword` varchar(512) NOT NULL,
	`category` varchar(64) NOT NULL,
	`active` enum('yes','no') NOT NULL DEFAULT 'yes',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `tracked_keywords_id` PRIMARY KEY(`id`)
);
