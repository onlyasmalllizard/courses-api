import {OSCSqlDatasource} from "./osc-sql-datasource";
import {logger} from "../lib/logger";

let sqlDataSources: OSCSqlDatasource | undefined;

export async function initSQLDataSources(): Promise<OSCSqlDatasource> {
    const log = logger.child({class: "Context/initSQLDataSource"});

    const dbConnection = {
        client: 'mysql2',
        connection: {
            host: process.env.HOST,
            port: process.env.DB_PORT as unknown as number,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE,
        },
    }

    if (!sqlDataSources) {
        log.info('New data source created');
        sqlDataSources = new OSCSqlDatasource(
            { ...dbConnection },
            { ...dbConnection }
        )
    }

    return sqlDataSources;
}