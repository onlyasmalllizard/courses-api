import {db} from "src/lib/db";
import {logger} from "src/lib/logger";
import {selectColumns} from "../common/select-columns";
import {SortOrder} from "src/utils/enums/sort-order";
import {Course} from "../types";
import {GetCoursesRequest} from "../types.input";

const log = logger.child({
    service: 'getCoursesFromDbService'
});

export async function getCoursesFromDbService({ limit, offset, sortOrder }: GetCoursesRequest): Promise<Course[]> {
    log.info('getCoursesFromDbService - INIT');

    const rawQuery = `
    courses
    ${sortOrder && SortOrder[sortOrder] ? `order by title ${sortOrder}` : ''}
    ${limit ? 'limit ?' : ''}
    ${limit && offset ? 'offset ?' : ''}
    `;

    const rawBindings = [limit, offset].filter(binding => !!binding);

    const result = await db.select(selectColumns)
        .fromRaw(db.raw(rawQuery, rawBindings));

    log.info('getCoursesFromDbService - END');

    return result;
}