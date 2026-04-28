import type { ResultSetHeader, RowDataPacket } from "mysql2/promise";
import { getDb } from "./db";

export type StoredUser = {
  id: number;
  email: string;
  passwordHash: string | null;
  provider: "local" | "google";
  createdAt: string;
};

type UserRow = RowDataPacket & {
  id: number | string | bigint;
  email: string;
  password: string | null;
  created_at: Date | string | null;
};

function toStoredUser(row: UserRow): StoredUser {
  const passwordHash = row.password || null;
  const createdAt =
    row.created_at instanceof Date
      ? row.created_at.toISOString()
      : row.created_at || new Date().toISOString();

  return {
    id: Number(row.id),
    email: row.email,
    passwordHash,
    provider: passwordHash ? "local" : "google",
    createdAt,
  };
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const [rows] = await getDb().execute<UserRow[]>(
    "SELECT id, email, password, created_at FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1",
    [email],
  );

  return rows[0] ? toStoredUser(rows[0]) : null;
}

export async function findUserById(id: number): Promise<StoredUser | null> {
  const [rows] = await getDb().execute<UserRow[]>(
    "SELECT id, email, password, created_at FROM users WHERE id = ? LIMIT 1",
    [id],
  );

  return rows[0] ? toStoredUser(rows[0]) : null;
}

export async function updateUserPasswordByEmail(
  email: string,
  passwordHash: string,
): Promise<StoredUser | null> {
  const existing = await findUserByEmail(email);
  if (!existing) return null;

  await getDb().execute(
    "UPDATE users SET password = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [passwordHash, existing.id],
  );

  return findUserById(existing.id);
}

export async function createLocalUser(email: string, passwordHash: string): Promise<StoredUser> {
  const existing = await findUserByEmail(email);
  if (existing) {
    throw new Error("EMAIL_EXISTS");
  }

  const [result] = await getDb().execute<ResultSetHeader>(
    "INSERT INTO users (email, password, created_at, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
    [email, passwordHash],
  );

  const user = await findUserById(result.insertId);
  if (!user) {
    throw new Error("USER_CREATE_FAILED");
  }

  return user;
}

export async function findOrCreateGoogleUser(email: string): Promise<StoredUser> {
  const existing = await findUserByEmail(email);
  if (existing) return existing;

  const [result] = await getDb().execute<ResultSetHeader>(
    "INSERT INTO users (email, password, created_at, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
    [email, ""],
  );

  const user = await findUserById(result.insertId);
  if (!user) {
    throw new Error("USER_CREATE_FAILED");
  }

  return user;
}
