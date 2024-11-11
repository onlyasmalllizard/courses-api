import {Arg, Args, Int, Mutation, Query, Resolver} from "type-graphql";
import {Course, DeleteCourseResponse} from "./types";
import {getCoursesFromDbService} from "./get-courses-from-db-service/get-courses-from-db-service";
import {getCourseByIdService} from "./get-course-by-id-service/get-course-by-id-service";
import {addCourseService} from "./add-course-service/add-course-service";
import {AddCourseRequest, GetCoursesRequest, UpdateCourseRequest} from "./types.input";
import {updateCourseService} from "./update-course-service/update-course-service";
import {deleteCourseService} from "./delete-course-service/delete-course-service";

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
    async addCourse(
        @Arg('course') course: AddCourseRequest,
        @Arg('collectionId') collectionId: number
    ): Promise<Course> {
        const result = await addCourseService(course, collectionId);

        return {
            id: result,
            ...course
        };
    }

    @Mutation(() => Course)
    async updateCourse(@Arg('course') course: UpdateCourseRequest): Promise<Course> {
        return updateCourseService(course);
    }

    @Mutation(() => DeleteCourseResponse)
    async deleteCourse(@Arg('courseId', () => Int) courseId: number): Promise<DeleteCourseResponse> {
        const result = await deleteCourseService(courseId);

        return { id: result };
    }
}