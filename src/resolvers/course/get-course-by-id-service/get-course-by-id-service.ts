import {db} from "../../../lib/db";
import {logger} from "../../../lib/logger";
import {selectColumns} from "../common/select-columns";
import {Course} from "../types";

const log = logger.child({
    service: 'getCourseByIdService'
});

export async function getCourseByIdService(id: number): Promise<Course> {
    log.info('getCourseByIdService - INIT');

    const result = await db.select(selectColumns)
        .from('courses')
        .where('id', id);

    log.info('getCourseByIdService - END');

    return result[0];
}