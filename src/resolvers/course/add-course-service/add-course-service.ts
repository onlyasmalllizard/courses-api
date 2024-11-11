import {logger} from "../../../lib/logger";
import {db} from "../../../lib/db";
import {AddCourseRequest} from "../types.input";
import {selectLastInsertIdService} from "../../../utils/helpers/select-last-insert-id-service";

const log = logger.child({
    service: 'addCourseService'
});

export async function addCourseService(course: AddCourseRequest): Promise<number> {
    log.info('addCourseService - INIT');

    await db('courses')
        .insert({ ...course, active: true })
        .onConflict()
        .merge();

    // const id = await db.fromRaw('select last_insert_id()');

    log.info('addCourseService - END');

    return selectLastInsertIdService();
}