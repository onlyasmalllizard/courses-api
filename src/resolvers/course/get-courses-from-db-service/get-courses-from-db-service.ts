import {Course} from "../types";
import {db} from "../../../lib/db";

export async function getCoursesFromDbService(): Promise<Course[]> {
    const selectColumns = [
        'id',
        'title',
        'description',
        'duration',
        'outcome'
    ];

    return db.select(selectColumns)
        .from('courses');
}