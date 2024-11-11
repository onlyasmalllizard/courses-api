import {logger} from "src/lib/logger";
import {AddCourseRequest} from "../types.input";
import {selectLastInsertIdService} from "src/utils/helpers/select-last-insert-id-service";
import {insertCourseIntoDb} from "./insert-course-into-db";
import {addCourseToCollection} from "./add-course-to-collection";

const log = logger.child({
    service: 'addCourseService'
});

export async function addCourseService(course: AddCourseRequest, collectionId: number): Promise<number> {
    log.info('addCourseService - INIT');

    await insertCourseIntoDb(course);

    const courseId = await selectLastInsertIdService();
    await addCourseToCollection(courseId, collectionId);

    log.info('addCourseService - END');

    return courseId;
}