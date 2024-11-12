import {OSCSqlDatasource} from "../datasources/osc-sql-datasource";

export type OSCDataSources = {
    sql: OSCSqlDatasource
}

export interface OSCContext {
    token: string;
    dataSources: OSCDataSources;
}
