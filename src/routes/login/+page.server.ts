import * as auth from "$lib/server/auth"
import type{ Actions } from "./$types"
import { db } from "$lib/server/db";
import { user } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { redirect } from "@sveltejs/kit";

export const load = async({locals}) => {
    if(locals.user?.username){
        return redirect(302, "/dashboard");
    }
    return {};
}

export const actions: Actions = {
    login: async(event) => {
        const data = await event.request.formData();
        const username: FormDataEntryValue | null | string = data.get("username");
        const password = data.get("password");

        const getUser = await db.query.user.findFirst({
            where: eq(user?.username, username),
        });

        const validatePassword = await bcrypt.compare(password, getUser?.passwordHash)
        if(validatePassword && getUser){
            const sessionToken = auth.generateSessionToken();
            const session = await auth.createSession(sessionToken, getUser.id);
            auth.setSessionTokenCookie(event, sessionToken, session.expiresAt)
            return redirect(302, '/dashboard');
        }
    }
}