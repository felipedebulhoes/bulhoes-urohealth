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

/**
 * Keyword snapshots table for SEO keyword tracking.
 * Stores weekly snapshots of keyword performance data.
 */
export const keywordSnapshots = mysqlTable("keyword_snapshots", {
  id: int("id").autoincrement().primaryKey(),
  /** The keyword/search term */
  keyword: varchar("keyword", { length: 512 }).notNull(),
  /** Category: urologia, robotica, andrologia */
  category: varchar("category", { length: 64 }).notNull(),
  /** Data source: similarweb, google_trends, search_console */
  source: varchar("source", { length: 64 }).notNull(),
  /** Search volume (monthly) */
  volume: int("volume"),
  /** Traffic share (0-1) */
  trafficShare: text("trafficShare"),
  /** Organic difficulty (0-100) */
  difficulty: int("difficulty"),
  /** CPC in BRL */
  cpc: text("cpc"),
  /** Position in SERP (if available) */
  position: int("position"),
  /** Primary search intent: informational, navigational, transactional, commercial */
  intent: varchar("intent", { length: 32 }),
  /** Trend direction: up, down, stable */
  trend: varchar("trend", { length: 16 }),
  /** Trend change percentage */
  trendChange: text("trendChange"),
  /** Additional JSON data */
  metadata: text("metadata"),
  /** Snapshot week date (Monday of the week) */
  weekDate: timestamp("weekDate").notNull(),
  /** Cron task UID for the scheduled job */
  scheduleCronTaskUid: varchar("scheduleCronTaskUid", { length: 65 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type KeywordSnapshot = typeof keywordSnapshots.$inferSelect;
export type InsertKeywordSnapshot = typeof keywordSnapshots.$inferInsert;

/**
 * Tracked keywords configuration.
 * Admin can add/remove keywords to track.
 */
export const trackedKeywords = mysqlTable("tracked_keywords", {
  id: int("id").autoincrement().primaryKey(),
  /** The keyword to track */
  keyword: varchar("keyword", { length: 512 }).notNull(),
  /** Category: urologia, robotica, andrologia */
  category: varchar("category", { length: 64 }).notNull(),
  /** Whether actively tracking */
  active: mysqlEnum("active", ["yes", "no"]).default("yes").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TrackedKeyword = typeof trackedKeywords.$inferSelect;
export type InsertTrackedKeyword = typeof trackedKeywords.$inferInsert;

/**
 * Favorited article ideas from the keyword panel.
 * Admin can save suggested article titles for later planning.
 */
export const articleFavorites = mysqlTable("article_favorites", {
  id: int("id").autoincrement().primaryKey(),
  /** The keyword that generated this idea */
  keyword: varchar("keyword", { length: 512 }).notNull(),
  /** Category of the keyword */
  category: varchar("category", { length: 64 }).notNull(),
  /** The suggested article title */
  title: text("title").notNull(),
  /** Search volume of the keyword at time of save */
  volume: int("volume"),
  /** Difficulty of the keyword at time of save */
  difficulty: int("difficulty"),
  /** Status: pending, in_progress, published */
  status: mysqlEnum("status", ["pending", "in_progress", "published"]).default("pending").notNull(),
  /** Optional notes from the admin */
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ArticleFavorite = typeof articleFavorites.$inferSelect;
export type InsertArticleFavorite = typeof articleFavorites.$inferInsert;

/**
 * Article drafts generated from keyword ideas.
 * Stores the auto-generated structure for blog posts.
 */
export const articleDrafts = mysqlTable("article_drafts", {
  id: int("id").autoincrement().primaryKey(),
  /** Reference to the favorite (if created from a favorite) */
  favoriteId: int("favoriteId"),
  /** The keyword that inspired this draft */
  keyword: varchar("keyword", { length: 512 }).notNull(),
  /** Category */
  category: varchar("category", { length: 64 }).notNull(),
  /** Article title */
  title: text("title").notNull(),
  /** Generated article structure/outline in markdown */
  content: text("content").notNull(),
  /** Status: draft, review, published */
  status: mysqlEnum("status", ["draft", "review", "published"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ArticleDraft = typeof articleDrafts.$inferSelect;
export type InsertArticleDraft = typeof articleDrafts.$inferInsert;

/**
 * Playbook leads table for capturing name/email in exchange for PDF download.
 * Tracks who downloaded the "Guia de Saúde Integral" material.
 */
export const playbookLeads = mysqlTable("playbook_leads", {
  id: int("id").autoincrement().primaryKey(),
  /** Lead's full name */
  name: varchar("name", { length: 256 }).notNull(),
  /** Lead's email address */
  email: varchar("email", { length: 320 }).notNull(),
  /** Which playbook/material was downloaded */
  material: varchar("material", { length: 256 }).default("guia-saude-integral").notNull(),
  /** Source: homepage, landing-page, etc. */
  source: varchar("source", { length: 64 }).default("homepage").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PlaybookLead = typeof playbookLeads.$inferSelect;
export type InsertPlaybookLead = typeof playbookLeads.$inferInsert;
