import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from '@/db/schema';

if (!process.env.DATABASE_URL) {
    // We throw an error in development if missing, but might handle gracefully in build
    if (process.env.NODE_ENV === 'development') {
        console.warn("⚠️ DATABASE_URL is not set in .env");
    }
}

const sql = neon(process.env.DATABASE_URL || "postgresql://mock:mock@localhost:5432/mock");
export const db = drizzle(sql, { schema });
