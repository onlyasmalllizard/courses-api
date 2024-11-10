import {Course} from "../types";
import {db} from "../../../lib/db";
import {logger} from "../../../lib/logger";

const log = logger.child({
    service: 'getCoursesFromDbService'
});

export async function getCoursesFromDbService(): Promise<Course[]> {
    log.info('getCoursesFromDbService - INIT');

    const selectColumns = [
        'id',
        'title',
        'description',
        'duration',
        'outcome'
    ];

    const result = await db.select(selectColumns)
        .from('courses');

    log.info('getCoursesFromDbService - END');

    return result;
}