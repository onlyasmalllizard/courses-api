import {UpdateCourseRequest} from "../types.input";
import {logger} from "src/lib/logger";
import {db} from "src/lib/db";
import {getCourseByIdService} from "../get-course-by-id-service/get-course-by-id-service";
import {Course} from "../types";

const log = logger.child({
    service: 'updateCourseService'
});

export async function updateCourseService(updateCourseRequest: UpdateCourseRequest): Promise<Course> {
    log.info('updateCourseService - INIT');

    await db('courses')
        .update(updateCourseRequest)
        .where('id', updateCourseRequest.id);

    log.info('updateCourseService - END');

    return getCourseByIdService(updateCourseRequest.id);
}