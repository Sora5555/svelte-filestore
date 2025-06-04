import { db } from '$lib/server/db/index.js';
import { fileUpload, matkul, pertemuan } from '$lib/server/db/schema';
import { eq, param } from 'drizzle-orm';
import type { Actions } from './$types';
import { writeFile } from 'fs/promises';
import path from 'path';

export const load = async ({ params }) => {
	const pertemuanArray = await db.query.pertemuan.findMany({
		where: eq(pertemuan.matkulId, Number(params.namaMatkul))
	});
	const matkulData = await db.query.matkul.findFirst({
		where: eq(matkul.id, Number(params.namaMatkul))
	});
	return { pertemuanArray, matkulData };
};

export const actions: Actions = {
	pertemuanAdd: async ({ request, locals, params }) => {
		let data = await request.formData();
		let nomorPertemuan = data.get('nomor_pertemuan');
		let judulPertemuan = data.get('judul_pertemuan');
		const newPertemuan = await db.insert(pertemuan).values({
			nomorPertemuan: nomorPertemuan,
			judulPertemuan: judulPertemuan,
			matkulId: params.namaMatkul
		});
	}
};
