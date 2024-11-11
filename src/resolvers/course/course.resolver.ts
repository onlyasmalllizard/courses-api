import {Arg, Ctx, Int, Mutation, Query, Resolver} from "type-graphql";
import {Course} from "./types";
import {getCoursesFromDbService} from "./get-courses-from-db-service/get-courses-from-db-service";
import {getCourseByIdService} from "./get-course-by-id-service/get-course-by-id-service";
import {SortOrder} from "../../utils/enums/sort-order";
import {addCourseService} from "./add-course-service/add-course-service";
import {AddCourseRequest} from "./types.input";

@Resolver()
export class CourseResolver {
    @Query(() => [Course])
    async getCourses(
        @Arg('limit', () => Int, {
            defaultValue: 50,
        }) limit?: number,
        @Arg('offset', () => Int, {
            nullable: true,
            defaultValue: 0
        }) offset?: number,
        @Arg('sortOrder', () => String, { nullable: true }) sortOrder?: SortOrder
    ): Promise<Course[]> {
        return getCoursesFromDbService(limit as number, sortOrder as SortOrder, offset);
    }

    @Query(() => Course)
    async getCourseById(
        @Arg('courseId', () => Int) courseId: number
    ): Promise<Course> {
        return getCourseByIdService(courseId);
    }

    @Mutation(() => Course)
    async addCourse(@Arg('course') course: AddCourseRequest): Promise<Course> {
        const result = await addCourseService(course);

        return {
            id: result[0],
            ...course
        };
    }
}