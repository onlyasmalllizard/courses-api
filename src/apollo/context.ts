import {KeyValueCache} from "@apollo/utils.keyvaluecache";
import {initSQLDataSources} from "../datasources/init-sql-datasources";
import {OSCDataSources} from "./types";

export interface OSCContext {
    token: string;
    dataSources: OSCDataSources;
}

export class Context {
    private runtimeContext?: OSCDataSources;

    public getContext = async (options: {
        cache: KeyValueCache,
        token: string
    }): Promise<OSCContext> => {
        const sqlDataSource = await initSQLDataSources();

        this.runtimeContext = { sql: sqlDataSource };

        return {
            token: options.token,
            dataSources: this.runtimeContext
        }
    }
}