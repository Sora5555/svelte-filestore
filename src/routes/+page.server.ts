import { redirect } from '@sveltejs/kit';

export const load = async({locals}) => {
    if(locals.user?.username){
        return redirect(302, "/dashboard");
    } else {
        return redirect(302, "/login");
    }
}