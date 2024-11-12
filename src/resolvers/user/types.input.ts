import {ArgsType, Field, InputType} from "type-graphql";

@ArgsType()
export class UserLogin {
    @Field(() => String)
    username: string;

    @Field(() => String)
    password: string;
}