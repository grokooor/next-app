import { SQL, sql } from 'drizzle-orm';
import {
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
  
export const videosTable = pgTable('videos', {
  url:  text('url').primaryKey(),
  video_id: text('video_id').generatedAlwaysAs(
    (): SQL => sql`SUBSTRING(${videosTable.url},31,11)`,
  ),
  kind: text(),
  etag: text(),
  id: text(),
  title: text(),
  description: text(),
  tags: text().array(),
  thumbnail_url: text(),
  thumbnail_width: text(),
  thumbnail_height: text(),
  updated_at_utc: timestamp('updated_at_utc').defaultNow(),
  created_at_utc: timestamp('created_at_utc').defaultNow()
});

export const tagsTable = pgTable('tags', {
  id: text('id'),
  tag: text(),
  updated_at_utc: timestamp('updated_at_utc').defaultNow(),
  created_at_utc: timestamp('created_at_utc').defaultNow()
});