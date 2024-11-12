import {db} from "../../../src/lib/db";
import {insertDefaultCourses} from "./data/courses";
import {insertDefaultCollections} from "./data/collections";
import {insertDefaultCollectionToCourseData} from "./data/collection-to-course-index";
import {initialiseTestDb} from "./initialise-test-db";

export async function loadDefaultData() {
    await initialiseTestDb();

    await db.raw(insertDefaultCourses);
    await db.raw(insertDefaultCollections);
    await db.raw(insertDefaultCollectionToCourseData);
}