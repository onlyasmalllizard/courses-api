import {logger} from "../../../lib/logger";
import {db} from "../../../lib/db";

const log = logger.child({
    service: 'deleteCourseService'
});

export async function deleteCourseService(id: number): Promise<number> {
    log.info('deleteCourseService - INIT');

    await db.del()
        .from('courses')
        .where('id', id);

    log.info('deleteCourseService - END');

    return id;
}