import { relations } from 'drizzle-orm';
import { pgTable, serial, text, integer, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const semesterEnum =  pgEnum("semester", ["1", "2", "3", "4", "5", "6", "7", "8"])

export const user = pgTable('user', {
	id: serial('id').primaryKey(),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull(),
	kampusId: integer('kampus_id').notNull().references(() => kampus.id)
});

export const userRelations = relations(user, ({ many }) => ({
	files: many(fileUpload),
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

export const semester = pgTable('semester', {
	id: serial('id').primaryKey(),
	semester: semesterEnum(),
	kampusId: integer("kampus_id").notNull().references(() => kampus.id)
})

export const matkul = pgTable("matkul", {
	id: serial('id').primaryKey(),
	namaMatkul: text("nama_matkul").notNull(),
	semesterId: integer("semester_id").notNull().references(() => semester.id)
})

export const fileUpload = pgTable("fileUpload", {
	id: serial('id').primaryKey(),
	namaFile: text('nama_file').notNull(),
	userId: integer("user_id").notNull().references(() => user.id),
	semesterId: integer('semester_id').notNull().references(() => semester.id),
})

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;
