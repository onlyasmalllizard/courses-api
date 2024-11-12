import knex from 'knex';
import 'dotenv/config';

export const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.HOST,
        port: process.env.DB_PORT as unknown as number,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
    },
});