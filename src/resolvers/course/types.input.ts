import {Field, InputType} from "type-graphql";

@InputType()
export class AddCourseRequest {
    @Field(() => String)
    title: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => String)
    duration: string;

    @Field(() => String, { nullable: true })
    outcome: string;
}