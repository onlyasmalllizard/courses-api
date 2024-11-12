import {logger} from "../../../lib/logger";
import bcrypt from "bcrypt";

const log = logger.child({
    service: 'hashPasswordService'
});

export function hashPasswordService(password: string): string {
    log.info('hashPasswordService - INIT');
    const saltRounds = 10;
    const hash = bcrypt.hashSync(password, saltRounds);
    log.info('hashPasswordService - END');
    return hash;
}