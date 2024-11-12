export const createCollections = `CREATE TABLE IF NOT EXISTS \`collections\` (
    \`id\` INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    \`name\` varchar(100) NOT NULL,
    \`createdAt\` datetime DEFAULT CURRENT_TIMESTAMP,
    \`modifiedAt\` datetime
);`;