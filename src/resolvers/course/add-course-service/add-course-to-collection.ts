import { db } from "src/lib/db";

export async function addCourseToCollection(courseId: number, collectionId: number): Promise<void> {
    await db('collection_to_course_index').insert({
        courseId,
        collectionId
    });
}