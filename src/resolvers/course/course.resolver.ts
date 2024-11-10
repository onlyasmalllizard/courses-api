import {Arg, Int, Query, Resolver} from "type-graphql";
import {Course} from "./types";
import {getCoursesFromDbService} from "./get-courses-from-db-service/get-courses-from-db-service";
import {getCourseByIdService} from "./get-course-by-id-service/get-course-by-id-service";

@Resolver()
export class CourseResolver {
    @Query(() => [Course])
    async getCourses(): Promise<Course[]> {
        return getCoursesFromDbService();
    }

    @Query(() => Course)
    async getCourseById(
        @Arg('courseId', () => Int) courseId: number
    ): Promise<Course> {
        return getCourseByIdService(courseId);
    }
}