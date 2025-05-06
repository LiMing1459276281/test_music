import 'server-only'
import { sql as vercelSql, db as verceldb} from '@vercel/postgres';
import { sql as pgSql, db as pgdb} from '@/lib/postgres-client';
import { PrismaClient } from '@prisma/client';
 
export const prisma = new PrismaClient();

export const sql = process.env.POSTGRES_CLIENT_TYPE === 'vercel'  ? vercelSql : pgSql

export const db = process.env.POSTGRES_CLIENT_TYPE === 'vercel' ? verceldb : pgdb

type clientType = "vercel" | "pg" | undefined;
