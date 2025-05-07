import type { RequestEvent, Actions } from "./$types";
import { db } from "$lib/server/db/index";
import { user } from "$lib/server/db/schema";
import bcrypt from "bcrypt";

export async function load(){
    const users = await db.query.user.findMany();

    return {
        users: users
    };
}


export const actions: Actions = {
    default: async({ request }) => {
        const data = await request.formData();
        let username: FormDataEntryValue | null = data.get("username");
        let password: FormDataEntryValue | null = data.get("password");
        let reconfirm_password: FormDataEntryValue | null = data.get("reconfirm_password");
        if(password === reconfirm_password){
            async function hashPassword(plainText: FormDataEntryValue | null) {
                let hashed = bcrypt.hash(plainText, 10).then(function(hash: any){
                    return hash
                })
                return hashed;
            }
            let password_hash = await hashPassword(password)
            const newUsers = await db.insert(user).values({username, password_hash});
        }

    }
}