import {Field, Int, ObjectType} from "type-graphql";
import {Course} from "../course/types";

@ObjectType()
export class GetCollectionsResponse {
    @Field(() => [Collection])
    collections: Collection[];
}

@ObjectType()
export class Collection {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    name: string;
}

@ObjectType()
export class GetCollectionByIdResponse {
    @Field(() => Collection)
    collection: Collection;

    @Field(() => [Course])
    courses: Course[];
}

export interface vwCoursesByCollectionItem {
    collectionId: number;
    courseId: number;
    name: string;
    title: string;
    description: string;
    duration: string;
    outcome: string;
}