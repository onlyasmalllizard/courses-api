import {ArgsType, Field, InputType, Int} from "type-graphql";
import {SortOrder} from "../../utils/enums/sort-order";

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

@InputType()
export class UpdateCourseRequest {
    @Field(() => Int)
    id: number;

    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    description?: string;

    @Field(() => String, { nullable: true })
    duration?: string;

    @Field(() => String, { nullable: true })
    outcome?: string;
}

@ArgsType()
export class GetCoursesRequest {
    @Field(() => Int, { nullable: true })
    limit?: number;

    @Field(() => Int, { nullable: true })
    offset?: number;

    @Field(() => String, { nullable: true })
    sortOrder?: SortOrder
}