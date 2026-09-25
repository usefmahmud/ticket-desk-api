import { pgEnum } from 'drizzle-orm/pg-core';

export const roleValues = ['customer', 'agent', 'super_admin'] as const;

export const role = pgEnum('role', roleValues);

export type Role = (typeof roleValues)[number];
