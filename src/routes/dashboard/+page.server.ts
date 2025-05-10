import type { PageServerLoad} from "./$types";
import * as auth from "$lib/server/auth"
import { error, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import { fail } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { kampus, semester } from "$lib/server/db/schema";
import { count, eq } from "drizzle-orm";

export const load: PageServerLoad = async (event) => {
    if(!event.locals.user || !event.locals.role){
        redirect(302, "/login")
    }
    let kampus  = db.query.kampus.findMany({
        with: {
            jumlahSemester: true,
        }
    });
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
    tambahSemester: async({url}) => {
        let data = url.searchParams.get('id');
        let semesterQuery = (await db.select({count: count()}).from(semester).where(eq(semester.kampusId, data)));
        let semesterCount = semesterQuery[0].count + 1;
        if(semesterCount > 8){
            error(401, {
                message: "Semester tidak bisa melebihi 8",
            })
        }
        const newSemester = await db.insert(semester).values({semester: semesterCount, kampusId: data});
    }
}
