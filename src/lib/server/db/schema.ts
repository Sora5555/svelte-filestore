import { relations } from 'drizzle-orm';
import { pgTable, serial, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const semesterEnum =  pgEnum("jumlahSemester", ["1", "2", "3", "4", "5", "6", "7", "8"])


export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	kampusId: integer('kampus_id').notNull().references(() => kampus.id),
	roleId: integer('role_id').notNull().references(() => role.id),
});

export const role = pgTable('roles', {
	id: serial('id').primaryKey(),
	namaRole: text('nama_role').notNull(),
})
export const roleRelations = relations(role, ({many}) => ({
	user: many(user),
}))

export const userRelations = relations(user, ({ many, one }) => ({
	files: many(fileUpload),
	asalKampus: one(kampus, {
		fields: [user.kampusId],
		references: [kampus.id],
	}),
	roles: one(role, {
		fields: [user.roleId],
		references: [role.id]
	})
}))

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: integer('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export const kampus = pgTable('kampus', {
	id: serial('id').primaryKey(),
	namaKampus: text('nama_kampus').notNull(),
	singkatanKampus: text('singkatan_kampus').notNull()
})

export const kampusRelations = relations(kampus, ({many}) => ({
	user: many(user),
	jumlahSemester: many(semester),
}))

export const semester = pgTable('semester', {
	id: serial('id').primaryKey(),
	semester: semesterEnum(),
	kampusId: integer("kampus_id").notNull().references(() => kampus.id)
})

export const semesterRelations = relations(semester, ({ many, one }) => ({
	semesterKampus: one(kampus, {
		fields: [semester.kampusId],
		references: [kampus.id],
	}),
	matkul: many(matkul),
}))

export const matkul = pgTable("matkul", {
	id: serial('id').primaryKey(),
	namaMatkul: text("nama_matkul").notNull(),
	semesterId: integer("semester_id").notNull().references(() => semester.id)
})

export const matkulRelations = relations(matkul, ({ one }) => ({
	matkulSemester: one(semester, {
		fields: [matkul.semesterId],
		references: [semester.id],
	})
}))

export const fileUpload = pgTable("fileUpload", {
	id: serial('id').primaryKey(),
	namaFile: text('nama_file').notNull(),
	userId: integer("user_id").notNull().references(() => user.id),
	matkulId: integer('matkul_id').notNull().references(() => matkul.id),
})
export const fileUploadRelations = relations(fileUpload, ({ one }) => ({
	uploader: one(user, {
		fields: [fileUpload.userId],
		references: [user.id]
	}),
	matkulMahasiswa: one(matkul, {
		fields: [fileUpload.matkulId],
		references: [matkul.id],
	})
}))

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
