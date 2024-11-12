import {Args, Mutation, Query, Resolver} from "type-graphql";
import {UserLogin} from "./types.input";
import {registerUserService} from "./register-user-service/register-user-service";
import {RegisterUserResponse, UserLoginResponse} from "./types";
import {loginUserService} from "./login-user-service/login-user-service";
@Resolver()
export class UserResolver {
    @Query(() => UserLoginResponse)
    async login(@Args(() => UserLogin) userLogin: UserLogin) {
        return loginUserService(userLogin);
    }

    @Mutation(() => RegisterUserResponse)
    async register(@Args(() => UserLogin) userLogin: UserLogin) {
        return registerUserService(userLogin);
    }
}