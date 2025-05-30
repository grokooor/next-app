import { default as path } from 'node:path';

import { neon, neonConfig, Pool } from '@neondatabase/serverless';
import { default as dotenv } from 'dotenv';
import { drizzle as drizzleHttp } from 'drizzle-orm/neon-http';
import { drizzle as drizzleWs } from 'drizzle-orm/neon-serverless';
import ws from 'ws';

import * as schema from '@/db/schema'
let connectionString: string | undefined;

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: path.join(__dirname, '../.env') })
  connectionString = process.env.DATABASE_URL;
}

if (!process.env.NODE_ENV) {
  console.log('NODE_ENV unnset')
}

if (process.env.NODE_ENV === 'development') {
  // Configuring Neon for local development
  dotenv.config({ path: path.join(__dirname, '../.env.development'), override: true })
  connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw Error('No connection string connecting locally')
}
  neonConfig.fetchEndpoint = (host) => {
    const [protocol, port] = host === 'db.localtest.me' ? ['http', 4444] : ['https', 443];
    return `${protocol}://${host}:${port}/sql`;
  };
  const connectionStringUrl = new URL(connectionString);
  neonConfig.useSecureWebSocket = connectionStringUrl.hostname !== 'db.localtest.me';
  neonConfig.wsProxy = (host) => (host === 'db.localtest.me' ? `${host}:4444/v2` : `${host}/v2`);
}

neonConfig.webSocketConstructor = ws;
if (!connectionString) {
  throw Error('No connection string to connect to remote')
}
const sql = neon(connectionString);
const pool = new Pool({ connectionString });
// Drizzle supports both HTTP and WebSocket clients. Choose the one that fits your needs:
// HTTP Client:
// - Best for serverless functions and Lambda environments
// - Ideal for stateless operations and quick queries
// - Lower overhead for single queries
// - Better for applications with sporadic database access
export const drizzleClientHttp = drizzleHttp({ client: sql, schema });
// WebSocket Client:
// - Best for long-running applications (like servers)
// - Maintains a persistent connection
// - More efficient for multiple sequential queries
// - Better for high-frequency database operations
export const drizzleClientWs = drizzleWs({ client: pool, schema });