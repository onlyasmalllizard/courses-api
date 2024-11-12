import {db} from "src/lib/db";
import {UserLogin} from "../types.input";

export async function getUserFromDb(username: string): Promise<UserLogin> {
    const result = await db.select([
        'username',
        'password'
    ])
        .from('users')
        .where('username', username);

    return result[0];
}