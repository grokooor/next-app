import { defineConfig } from 'drizzle-kit';

export default defineConfig({
      out: './drizzle/migrations',
      schema: './db/schema.ts',
      schemaFilter: 'public',
      dialect: 'postgresql',
      verbose: true,
      strict: true,
  dbCredentials: {
        // todo: switch for prod/dev
        url: process.env.DATABASE_URL!
        }
    });;