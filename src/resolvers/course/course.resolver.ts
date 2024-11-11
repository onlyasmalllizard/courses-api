import {Arg, Args, Int, Mutation, Query, Resolver} from "type-graphql";
import {Course} from "./types";
import {getCoursesFromDbService} from "./get-courses-from-db-service/get-courses-from-db-service";
import {getCourseByIdService} from "./get-course-by-id-service/get-course-by-id-service";
import {addCourseService} from "./add-course-service/add-course-service";
import {AddCourseRequest, GetCoursesRequest, UpdateCourseRequest} from "./types.input";
import {updateCourseService} from "./update-course-service/update-course-service";

@Resolver()
export class CourseResolver {
    @Query(() => [Course])
    async getCourses(@Args(() => GetCoursesRequest) getCoursesRequest: GetCoursesRequest): Promise<Course[]> {
        return getCoursesFromDbService(getCoursesRequest);
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
            id: result,
            ...course
        };
    }

    @Mutation(() => Course)
    async updateCourse(@Arg('course') course: UpdateCourseRequest): Promise<Course> {
        return updateCourseService(course);
    }
}