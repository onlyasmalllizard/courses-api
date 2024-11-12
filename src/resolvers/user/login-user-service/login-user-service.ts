import {UserLogin} from "../types.input";
import {logger} from "../../../lib/logger";
import {UserLoginResponse} from "../types";
import {getUserFromDb} from "./get-user-from-db";
import {verifyPasswordService} from "./verify-password-service";
import {generateJwtService} from "./generate-jwt-service";

const log = logger.child({
    service: 'loginUserService'
});

export async function loginUserService({username, password}: UserLogin): Promise<UserLoginResponse> {
    log.info('loginUserService - INIT');
    const storedUser = await getUserFromDb(username);
    const isPasswordCorrect = verifyPasswordService(storedUser.password, password);

    if (!isPasswordCorrect) {
        throw new Error('Password is incorrect');
    }

    const jwtToken = generateJwtService(storedUser);

    log.info('loginUserService - END');

    return {
        accessToken: jwtToken
    };
}