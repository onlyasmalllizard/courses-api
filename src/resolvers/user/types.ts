import {Field, ObjectType} from "type-graphql";

@ObjectType()
export class RegisterUserResponse {
    @Field(() => String)
    username: string;
}

@ObjectType()
export class UserLoginResponse {
    @Field(() => String)
    accessToken: string;
}