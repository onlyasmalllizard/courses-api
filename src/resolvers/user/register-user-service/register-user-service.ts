import {logger} from "src/lib/logger";
import {UserLogin} from "../types.input";
import {db} from "src/lib/db";
import {hashPasswordService} from "./hash-password-service";
import {RegisterUserResponse} from "../types";

const log = logger.child({
    service: 'registerUserService'
});

export async function registerUserService({username, password}: UserLogin): Promise<RegisterUserResponse> {
    log.info('registerUserService - INIT');

    const hash = hashPasswordService(password);

    await db('users').insert({
        username,
        password: hash
    });

    log.info('registerUserService - END');
    return {
        username
    };
}