import {Course} from "../types";
import {db} from "../../../lib/db";
import {logger} from "../../../lib/logger";
import {selectColumns} from "../common/select-columns";

const log = logger.child({
    service: 'getCoursesFromDbService'
});

export async function getCoursesFromDbService(): Promise<Course[]> {
    log.info('getCoursesFromDbService - INIT');

    const result = await db.select(selectColumns)
        .from('courses');

    log.info('getCoursesFromDbService - END');

    return result;
}