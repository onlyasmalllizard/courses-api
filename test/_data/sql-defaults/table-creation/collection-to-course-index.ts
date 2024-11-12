export const createCollectionToCourseIndex = `CREATE TABLE IF NOT EXISTS \`collection_to_course_index\` (
    \`id\` INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    \`collectionId\` INT(10) UNSIGNED NOT NULL,
    \`courseId\` INT(10) UNSIGNED NOT NULL,
    FOREIGN KEY(\`collectionId\`)
        REFERENCES \`collections\`(\`id\`)
        ON DELETE CASCADE,
    FOREIGN KEY(\`courseId\`)
        REFERENCES \`courses\`(\`id\`)
        ON DELETE CASCADE,
    \`createdAt\` datetime DEFAULT CURRENT_TIMESTAMP,
    \`modifiedAt\` datetime
);`;