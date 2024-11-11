import {logger} from "../../lib/logger";
import {db} from "../../lib/db";

const log = logger.child({
    service: 'selectLastInsertIdService'
});

export async function selectLastInsertIdService(): Promise<number> {
    log.info('selectLastInsertIdService - INIT');

    const rawData = await db.raw('select LAST_INSERT_ID()');
    const data = Object.values(rawData[0])[0] as Record<string, number>;
    const result = Object.values(data)[0];

    log.info('selectLastInsertIdService - END');
    return result;
}