import type { RequestEvent, Actions } from "./$types";
import { db } from "$lib/server/db/index";
import { user } from "$lib/server/db/schema";
import bcrypt from "bcrypt";

export async function load(){
    const users = await db.query.user.findMany();
    const roles = await db.query.role.findMany();
    let kampus  = await db.query.kampus.findMany({
        with: {
            jumlahSemester: {
                with: {
                    matkul: true,
                }
            },
        }
    });
    return {
        users: users,
        roles: roles,
        kampus: kampus,
    };
}


export const actions: Actions = {
    default: async({ request }) => {
        const data = await request.formData();
        let username: FormDataEntryValue | null = data.get("username");
        let password: FormDataEntryValue | null = data.get("password");
        let role_id: FormDataEntryValue | null = data.get("role");
        let kampus_id: FormDataEntryValue | null = data.get("kampus")
        let reconfirm_password: FormDataEntryValue | null = data.get("reconfirm_password");
        if(password === reconfirm_password){
            async function hashPassword(plainText: FormDataEntryValue | null) {
                let hashed = bcrypt.hash(plainText, 10).then(function(hash: any){
                    return hash
                })
                return hashed;
            }
            let password_hash = await hashPassword(password)
            const newUsers = await db.insert(user).values({username, passwordHash: password_hash, kampusId: kampus_id, roleId: role_id});
        }

    }
}