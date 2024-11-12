import {GetCollectionByIdResponse, vwCoursesByCollectionItem} from "../types";
import {logger} from "src/lib/logger";
import {db} from "src/lib/db";
import {mapDataToGraphql} from "./map-data-to-graphql";

const log = logger.child({
    service: 'getCollectionByIdService'
});

export async function getCollectionByIdService(id: number): Promise<GetCollectionByIdResponse> {
    log.info('getCollectionById - INIT');

    const selectColumns = [
        'collectionId',
        'courseId',
        'name',
        'title',
        'description',
        'outcome',
        'duration'
    ];

    const data: vwCoursesByCollectionItem[] = await db.select(selectColumns)
        .from('vw_courses_by_collection')
        .where('collectionId', id);

    const result = mapDataToGraphql(data);

    log.info('getCollectionById - END');

    return result;
}