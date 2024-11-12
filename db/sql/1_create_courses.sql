use osc;

DROP TABLE IF EXISTS `courses`;

CREATE TABLE IF NOT EXISTS `courses` (
    `id` INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `title` varchar(255) NOT NULL,
    `description` varchar(255),
    `duration` varchar(100) NOT NULL,
    `outcome` varchar(255) NOT NULL,
    `active` boolean,
    `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
    `modifiedAt` datetime
);