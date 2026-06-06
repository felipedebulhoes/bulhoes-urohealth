CREATE TABLE `playbook_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`email` varchar(320) NOT NULL,
	`material` varchar(256) NOT NULL DEFAULT 'guia-saude-integral',
	`source` varchar(64) NOT NULL DEFAULT 'homepage',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `playbook_leads_id` PRIMARY KEY(`id`)
);
