use osc;

LOCK TABLES `collection_to_course_index` WRITE;
TRUNCATE TABLE `collection_to_course_index`;
INSERT INTO `collection_to_course_index` (`collectionId`, `courseId`) VALUES
(1, 1),
(2, 2),
(3, 3),
(3, 4),
(3, 5),
(4, 6),
(3, 7),
(4, 8),
(5, 9),
(3, 10);
UNLOCK TABLES;