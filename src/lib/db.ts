import knex from 'knex';

export const db = knex({
    client: 'mysql2',
    connection: {
        host: process.env.HOST,
        port: parseInt(process.env.PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: 'osc',
    },
});