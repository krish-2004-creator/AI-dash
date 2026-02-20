import { pgTable, serial, text, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    role: text('role').notNull().default('user'), // 'admin' | 'user'
    status: text('status').notNull().default('pending'), // 'active' | 'pending' | 'rejected'
    password: text('password'), // For future use if not using OAuth
    createdAt: timestamp('created_at').defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const workspaces = pgTable('workspaces', {
    id: serial('id').primaryKey(),
    userId: integer('user_id').references(() => users.id),
    title: text('title').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export type Workspace = typeof workspaces.$inferSelect;
export type NewWorkspace = typeof workspaces.$inferInsert;

export const documents = pgTable('documents', {
    id: serial('id').primaryKey(),
    workspaceId: integer('workspace_id').references(() => workspaces.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    type: text('type').notNull(), // 'pdf', 'txt'
    url: text('url').notNull(), // S3 URL or base64 data for now
    content: text('content'), // Extracted text content
    createdAt: timestamp('created_at').defaultNow(),
});

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;

export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    workspaceId: integer('workspace_id').references(() => workspaces.id, { onDelete: 'cascade' }),
    role: text('role').notNull(), // 'user', 'assistant'
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

export type Message = typeof messages.$inferSelect;
export type NewMessage = typeof messages.$inferInsert;
