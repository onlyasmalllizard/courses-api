import {db} from "src/lib/db";
import {AddCourseRequest} from "../types.input";

export async function insertCourseIntoDb(course: AddCourseRequest): Promise<void> {
    await db('courses')
        .insert({ ...course, active: true });
}