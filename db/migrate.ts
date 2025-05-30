import "dotenv/config"

import { migrate } from 'drizzle-orm/neon-http/migrator';

import { drizzleClientHttp as db } from "@/db/drizzle.server"
 
const main = async () => {
  try {
await migrate(db, { migrationsFolder: "./drizzle/migrations" })
    console.log('Migration completed');
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
};

(async () => {
  await main();
})();
