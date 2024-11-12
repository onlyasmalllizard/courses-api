import {BatchedSQLDataSource} from "./sql-datasource";
import { Knex } from "knex";

export class OSCSqlDatasource extends BatchedSQLDataSource {
    constructor(knexConfig: Knex.Config, writeKnexConfig?: Knex.Config) {
        super({ knexConfig, writeKnexConfig });
    }

    async insertOrUpdateIntoDB(tableName: string, data: any) {
        const firstData = data[0] ? data[0] : data;
        return this.db.write.raw(
            `${this.db.write(tableName)
                .insert(data)
                .toQuery()} ON DUPLICATE KEY UPDATE ${Object.getOwnPropertyNames((firstData))
                .map((field) => `\`${field}\`=VALUES(\`${field}\`)`)
                .join(", ")}`
        );
    }
}