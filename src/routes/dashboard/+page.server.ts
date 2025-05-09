import type { PageServerLoad} from "./$types";
import * as auth from "$lib/server/auth"
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { kampus } from "$lib/server/db/schema";

export const load: PageServerLoad = async (event) => {
    if(!event.locals.user || !event.locals.role){
        redirect(302, "/login")
    }
    let kampus  = db.query.kampus.findMany();
    return {user: event.locals.user, role: event.locals.role, kampus: kampus}
}

export const actions: Actions = {
    logout: async (event) => {
        if (!event.locals.session) {
                    return fail(401);
                }
                await auth.invalidateSession(event.locals.session.id);
                auth.deleteSessionTokenCookie(event);
        
                return redirect(302, '/login');
    },
    tambahKampus: async ({request}) => {
        let data = await request.formData();
        let namaKampus = data.get("namaKampus");
        let singkatanKampus = data.get("singkatanKampus");
        if(!namaKampus || !singkatanKampus){
            return fail(401);
        }
        const newKampus = await db.insert(kampus).values({ namaKampus, singkatanKampus, })

    },
    tambahSemester: async({params}) => {
        console.log(params, 1);
    }
}
