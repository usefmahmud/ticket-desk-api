import { pgTable } from 'drizzle-orm/pg-core';

import { createdAt, id, updatedAt } from './base.js';
import { varchar } from 'drizzle-orm/cockroach-core';
import { role } from './enums';

export const users = pgTable('users', {
  id: id(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
  passwordHash: varchar().notNull(),

  role: role().notNull().default('customer'),

  createdAt: createdAt(),
  updatedAt: updatedAt(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
