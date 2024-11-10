import {Query, Resolver} from "type-graphql";
import {Course} from "./types";
import {getCoursesFromDbService} from "./get-courses-from-db-service/get-courses-from-db-service";

@Resolver()
export class CourseResolver {
    @Query(() => [Course])
    async getCourses(): Promise<Course[]> {
        return getCoursesFromDbService();
    }
}