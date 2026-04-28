import mysql from "mysql2/promise";

const globalForDb = globalThis as typeof globalThis & {
  kenMysqlPool?: mysql.Pool;
};

function getDatabaseUrl() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured.");
  }

  return url;
}

export function getDb() {
  if (!globalForDb.kenMysqlPool) {
    globalForDb.kenMysqlPool = mysql.createPool({
      uri: getDatabaseUrl(),
      waitForConnections: true,
      connectionLimit: 10,
      namedPlaceholders: true,
    });
  }

  return globalForDb.kenMysqlPool;
}
