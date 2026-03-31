import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Files table for S3 file storage.
 * Stores metadata about uploaded files; actual bytes live in S3.
 */
export const files = mysqlTable("files", {
  id: int("id").autoincrement().primaryKey(),
  /** Owner user ID (nullable for public/admin uploads) */
  userId: int("userId"),
  /** Original filename as uploaded by the user */
  filename: varchar("filename", { length: 512 }).notNull(),
  /** MIME type of the file */
  mimeType: varchar("mimeType", { length: 128 }).notNull(),
  /** File size in bytes */
  size: int("size").notNull(),
  /** S3 object key */
  fileKey: varchar("fileKey", { length: 1024 }).notNull(),
  /** Public CDN URL for the file */
  url: text("url").notNull(),
  /** Optional description or label */
  description: text("description"),
  /** Optional category/folder for organization */
  category: varchar("category", { length: 128 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FileRecord = typeof files.$inferSelect;
export type InsertFile = typeof files.$inferInsert;

/**
 * Leads table for patient contact collection via AI chat widget.
 * Captures interested patients' contact info for follow-up.
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  /** Patient's full name */
  name: varchar("name", { length: 256 }).notNull(),
  /** Patient's phone number (WhatsApp preferred) */
  phone: varchar("phone", { length: 32 }).notNull(),
  /** Patient's email (optional) */
  email: varchar("email", { length: 320 }),
  /** Reason for consultation / main complaint */
  reason: text("reason"),
  /** Preferred location: campinas, sp-paulista, sp-moema */
  preferredLocation: varchar("preferredLocation", { length: 64 }),
  /** Source of the lead: ai-chat, website, etc. */
  source: varchar("source", { length: 64 }).default("ai-chat").notNull(),
  /** Status: new, contacted, scheduled, completed */
  status: mysqlEnum("status", ["new", "contacted", "scheduled", "completed"]).default("new").notNull(),
  /** Optional notes from admin follow-up */
  notes: text("notes"),
  /** Conversation history from the chat (JSON) */
  chatHistory: text("chatHistory"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;