import {Field, Int, ObjectType} from "type-graphql";

@ObjectType()
export class Course {
    @Field(() => Int)
    id: number;

    @Field(() => String)
    title: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => String)
    duration: string;

    @Field(() => String, { nullable: true })
    outcome: string;
}

@ObjectType()
export class DeleteCourseResponse {
    @Field(() => Int)
    id: number;
}