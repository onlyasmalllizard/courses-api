import {logger} from "src/lib/logger";
import {UserLogin} from "../types.input";
import * as jose from 'jose';

const log = logger.child({
    service: 'generateJwtService'
});

export async function generateJwtService(user: UserLogin): Promise<string> {
    log.info('generateJwtService - INIT');
    const secret = new TextEncoder().encode(process.env.TOKEN);
    const alg = 'HS256';

    const key = await new jose.SignJWT({ 'urn:osc:resources': true })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setIssuer('urn:osc:auth')
        .setAudience('urn:osc:user')
        .setExpirationTime('120s')
        .sign(secret);

    log.info('generateJwtService - END');
    return key;
}