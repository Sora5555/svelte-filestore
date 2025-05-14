import { db } from '$lib/server/db/index.js'
import { fileUpload } from '$lib/server/db/schema';
import { eq, param } from 'drizzle-orm'
import type { Actions } from "./$types";
import { writeFile } from 'fs/promises'
import path from 'path';

export const load = async ({params}) => {
    const fileArray = await db.query.fileUpload.findMany({
        where: eq(fileUpload.matkulId, Number(params.namaMatkul))
    })
    return {fileArray}
}

export const actions: Actions = {
    fileUpload: async ({request, locals, params}) => {
        let data = await request.formData();
        let file = data.get("file") as File;
        let judul = data.get("judul");
        const fileStore = await writeFile(path.join(process.cwd(), "static", "files", file?.name), Buffer.from(await file?.arrayBuffer()));
        const newFileUpload = await db.insert(fileUpload).values({namaFile: file.name, judul, userId: locals.user?.id, matkulId: params.namaMatkul});
    }
}