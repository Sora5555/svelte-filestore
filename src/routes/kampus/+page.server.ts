import { db } from '$lib/server/db';
import { error, fail } from '@sveltejs/kit';
import type { Action, Actions } from './$types';
import { kampus, semester } from '$lib/server/db/schema';
import { count } from 'drizzle-orm';
import { eq } from 'drizzle-orm';

export const load = async () => {
	const kampusArray = await db.query.kampus.findMany({
		with: {
			jumlahSemester: {
				with: {
					matkul: true
				}
			}
		}
	});
	return { kampusArray };
};

export const actions: Actions = {
	tambahKampus: async ({ request }) => {
		let data = await request.formData();
		let namaKampus = data.get('namaKampus');
		let singkatanKampus = data.get('singkatanKampus');
		if (!namaKampus || !singkatanKampus) {
			return fail(401);
		}
		const newKampus = await db.insert(kampus).values({ namaKampus, singkatanKampus });
	},
	tambahSemester: async ({ url }) => {
		let data = url.searchParams.get('id');
		let semesterQuery = await db
			.select({ count: count() })
			.from(semester)
			.where(eq(semester.kampusId, data));
		let semesterCount = semesterQuery[0].count + 1;
		if (semesterCount > 8) {
			error(401, {
				message: 'Semester tidak bisa melebihi 8'
			});
		}
		const newSemester = await db
			.insert(semester)
			.values({ semester: semesterCount, kampusId: data });
	}
};
