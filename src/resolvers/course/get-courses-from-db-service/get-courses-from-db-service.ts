import {Course} from "../types";
import {db} from "../../../lib/db";
import {logger} from "../../../lib/logger";
import {selectColumns} from "../common/select-columns";
import {SortOrder} from "../../../utils/enums/sort-order";

const log = logger.child({
    service: 'getCoursesFromDbService'
});

export async function getCoursesFromDbService(limit: number, sortOrder: SortOrder, offset: number = 0): Promise<Course[]> {
    log.info('getCoursesFromDbService - INIT');

    const result = await db.select(selectColumns)
        .from('courses')
        .orderBy('title', sortOrder)
        .limit(limit)
        .offset(offset);

    log.info('getCoursesFromDbService - END');

    return result;
}