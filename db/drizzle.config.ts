import { defineConfig } from 'drizzle-kit';

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