import {logger} from "../../../lib/logger";
import {db} from "../../../lib/db";
import {GetCollectionsResponse} from "../types";

const log = logger.child({
    service: 'getCollectionsService'
});

export async function getCollectionsService(): Promise<GetCollectionsResponse> {
    log.info('getCollectionsService - INIT');

    const selectColumns = [
        'id',
        'name'
    ];

    const result = await db.select(selectColumns)
        .from('collections');

    log.info('getCollectionsService - END');

    return { collections: result };
}