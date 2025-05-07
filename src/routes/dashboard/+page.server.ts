import type { PageServerLoad} from "./$types";
import * as auth from "$lib/server/auth"
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async (event) => {
    if(!event.locals.user){
        redirect(302, "/login")
    }
    return {user: event.locals.user}
}

export const actions: Actions = {
    logout: async (event) => {
        if (!event.locals.session) {
                    return fail(401);
                }
                await auth.invalidateSession(event.locals.session.id);
                auth.deleteSessionTokenCookie(event);
        
                return redirect(302, '/login');
    }
}
