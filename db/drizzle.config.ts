import { default as path } from 'node:path';

import { default as dotenv } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

dotenv.config({ path: path.join(__dirname, '../.env') })

export default defineConfig({
    out: './drizzle/migrations',
    schema: './db/schema.ts',
    schemaFilter: 'public',
    dialect: 'postgresql',
    verbose: true,
    strict: true,
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
});;