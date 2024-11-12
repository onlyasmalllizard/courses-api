export const createUsers = `CREATE TABLE IF NOT EXISTS \`users\` (
    \`id\` INT(10) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    \`username\` varchar(100) UNIQUE NOT NULL,
    \`password\` varchar(255) NOT NULL,
    \`active\` boolean DEFAULT true,
    \`createdAt\` datetime DEFAULT CURRENT_TIMESTAMP,
    \`modifiedAt\` datetime
);`;