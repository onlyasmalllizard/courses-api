import {db} from "../../../src/lib/db";
import {createCourses} from "./table-creation/courses";
import {createCollections} from "./table-creation/collections";
import {createCollectionToCourseIndex} from "./table-creation/collection-to-course-index";
import {createVwCoursesByCollection} from "./table-creation/vw-courses-by-collection";
import {createUsers} from "./table-creation/users";

export async function initialiseTestDb() {
    await db.schema.dropTableIfExists('collection_to_course_index');

    await db.schema.dropTableIfExists('courses');
    await db.schema.raw(createCourses);

    await db.schema.dropTableIfExists('collections');
    await db.schema.raw(createCollections);

    await db.schema.raw(createCollectionToCourseIndex);

    await db.schema.dropViewIfExists('vw_courses_by_collection');
    await db.schema.raw(createVwCoursesByCollection);

    await db.schema.dropTableIfExists('users');
    await db.schema.raw(createUsers);
}