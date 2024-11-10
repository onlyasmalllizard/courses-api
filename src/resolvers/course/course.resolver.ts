import {Arg, Int, Query, Resolver} from "type-graphql";
import {Course} from "./types";
import {getCoursesFromDbService} from "./get-courses-from-db-service/get-courses-from-db-service";
import {getCourseByIdService} from "./get-course-by-id-service/get-course-by-id-service";
import {SortOrder} from "../../utils/enums/sort-order";

@Resolver()
export class CourseResolver {
    @Query(() => [Course])
    async getCourses(
        @Arg('limit', () => Int, {
            nullable: true,
            defaultValue: 50,
        }) limit?: number,
        @Arg('offset', () => Int, {
            nullable: true,
            defaultValue: 0
        }) offset?: number,
        @Arg('sortOrder', () => String, { nullable: true }) sortOrder?: SortOrder
    ): Promise<Course[]> {
        return getCoursesFromDbService(limit, sortOrder, offset);
    }

    @Query(() => Course)
    async getCourseById(
        @Arg('courseId', () => Int) courseId: number
    ): Promise<Course> {
        return getCourseByIdService(courseId);
    }
}