use osc;

LOCK TABLES `collections` WRITE;
TRUNCATE TABLE `collections`;
INSERT INTO `collections` (`name`) VALUES
('Languages'),
('Media Studies'),
('Sociology'),
('Maths'),
('Science');
UNLOCK TABLES;