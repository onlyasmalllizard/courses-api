import {logger} from "../../../lib/logger";
import {db} from "../../../lib/db";
import {AddCourseRequest} from "../types.input";

const log = logger.child({
    service: 'addCourseService'
});

export async function addCourseService(course: AddCourseRequest): Promise<number[]> {
    log.info('addCourseService - INIT');

    const result = await db('courses')
        .insert({ ...course, active: true })
        .onConflict()
        .merge();

    log.info('addCourseService - END');

    return result;
}