import { db } from '$lib/server/db';
import { fileUpload, pertemuan } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types.js';
import path from 'path';
import { writeFile } from 'fs/promises';

export const load = async ({ params }) => {
	const fileUploadArray = await db.query.fileUpload.findMany({
		where: eq(fileUpload.pertemuanId, params.pertemuan)
	});
	const pertemuanData = await db.query.pertemuan.findFirst({
		where: eq(pertemuan.id, params.pertemuan)
	});

	return { fileUploadArray, pertemuanData };
};

export const actions: Actions = {
	fileUpload: async ({ request, locals, params }) => {
		let data = await request.formData();
		let file = data.get('file') as File;
		let judul = data.get('judul');
		const fileStore = await writeFile(
			path.join(process.cwd(), 'static', 'files', file?.name),
			Buffer.from(await file?.arrayBuffer())
		);
		const newFileUpload = await db.insert(fileUpload).values({
			namaFile: file.name,
			judul,
			userId: locals.user?.id,
			pertemuanId: params.pertemuan
		});
	}
};
