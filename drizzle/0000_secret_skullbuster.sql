CREATE TABLE `coonspace_note` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(256) NOT NULL,
	`content` text(256) NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer,
	`user_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `coonspace_user` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text(256) NOT NULL,
	`image_url` text(256) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `coonspace_user_username_unique` ON `coonspace_user` (`username`);