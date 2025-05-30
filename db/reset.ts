'use server';
import { sql } from "drizzle-orm";

import { drizzleClientHttp as db } from "@/db/drizzle.server";
import {
  tagsTable,
  videosTable} from '@/db/schema'

const main = async () => {
  try {
    await db.execute(sql`DROP TABLE IF EXISTS ${videosTable} CASCADE`)
    await db.execute(sql`DROP TABLE IF EXISTS ${tagsTable} CASCADE`)
    console.log('Reset completed');
  } catch (error) {
    console.error('Error during reset:', error);
    process.exit(1);
  }
};

(async () => {
  await main();
})();
