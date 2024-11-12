import {beforeEach, describe, expect, test} from "vitest";
import {getApolloServer} from "../../../src";
import {checkResponseBody} from "../../check-test-responses";
import {Course} from "../../../src/resolvers/course/types";
import {loadDefaultData} from "../../_data/sql-defaults/load-default-data";
import * as coursesResponse from 'test/_data/responses/coursesResponse';

const testServer = getApolloServer();

const GET_COURSES_QUERY = `query GetCourses {
  getCourses {
    id
    title
    description
    duration
    outcome
  }
}`;

const GET_COURSES_WITH_LIMIT_QUERY = `query GetCourses($limit: Int) {
  getCourses(limit: $limit) {
    id
    title
    description
    duration
    outcome
  }
}`;

const GET_COURSES_WITH_LIMIT_AND_OFFSET_QUERY = `query GetCourses($limit: Int, $offset: Int) {
  getCourses(limit: $limit, offset: $offset) {
    id
    title
    description
    duration
    outcome
  }
}`;

const GET_COURSES_WITH_SORT_ORDER_QUERY = `query GetCourses($sortOrder: String) {
  getCourses(sortOrder: $sortOrder) {
    id
    title
    description
    duration
    outcome
  }
}`;

const GET_COURSE_BY_ID_QUERY = `query getCourseById($courseId: Int!) {
  getCourseById(courseId: $courseId) {
    id
    title
    outcome
    description
    duration
  }
}`;

describe("getCourses", () => {
    beforeEach(async () => loadDefaultData());

    test("it gets all of the courses when no parameters are sent", async () => {
        const response = await testServer.executeOperation({
            query: GET_COURSES_QUERY
        });

        const data = checkResponseBody(response);
        expect(data).not.to.be.undefined;

        const typedResponse = data?.getCourses as Course[];
        expect(typedResponse).toEqual(coursesResponse.getCourses);
    });

    test("it orders the response if sort order is sent", async () => {
        const response = await testServer.executeOperation({
            query: GET_COURSES_WITH_SORT_ORDER_QUERY,
            variables: {
                sortOrder: 'ASC'
            }
        });

        const data = checkResponseBody(response);
        expect(data).not.to.be.undefined;

        const typedResponse = data?.getCourses as Course[];
        expect(typedResponse).toEqual(coursesResponse.getCoursesWithSortOrder);
    });

    test("it limits the number of responses if limit is sent", async () => {
        const response = await testServer.executeOperation({
            query: GET_COURSES_WITH_LIMIT_QUERY,
            variables: {
                limit: 2
            }
        });

        const data = checkResponseBody(response);
        expect(data).not.to.be.undefined;

        const typedResponse = data?.getCourses as Course[];
        expect(typedResponse).toEqual(coursesResponse.getCoursesWithLimit);
    });

    test("it offsets the response if both limit and offset are sent", async () => {
        const response = await testServer.executeOperation({
            query: GET_COURSES_WITH_LIMIT_AND_OFFSET_QUERY,
            variables: {
                limit: 2,
                offset: 1
            }
        });

        const data = checkResponseBody(response);
        expect(data).not.to.be.undefined;

        const typedResponse = data?.getCourses as Course[];
        expect(typedResponse).toEqual(coursesResponse.getCoursesWithLimitAndOffset);
    });
});

describe("getCourseById", () => {
    beforeEach(async () => loadDefaultData());

    test("it gets the course for the given id", async () => {
        const response = await testServer.executeOperation({
            query: GET_COURSE_BY_ID_QUERY,
            variables: {
                courseId: 2
            }
        });

        const data = checkResponseBody(response);
        expect(data).not.to.be.undefined;

        const typedResponse = data?.getCourseById as Course;
        expect(typedResponse).toEqual(coursesResponse.getCourseById);
    });

    test("it returns an error when the id does not match a course", async () => {
        const response = await testServer.executeOperation({
            query: GET_COURSE_BY_ID_QUERY,
            variables: {
                courseId: 20
            }
        });

        expect(response.body.singleResult?.errors[0]).toBeTruthy();
    });
});

