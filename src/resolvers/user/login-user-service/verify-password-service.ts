import {logger} from "src/lib/logger";
import bcrypt from "bcrypt";

const log = logger.child({
    service: 'verifyPasswordService'
});

export function verifyPasswordService(passwordHash: string, submittedPassword: string): boolean {
    log.info('verifyPasswordService - INIT');

    const result = bcrypt.compareSync(submittedPassword, passwordHash);
    log.info('verifyPasswordService - END');
    return result;
}