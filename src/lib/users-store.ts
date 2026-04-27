import { promises as fs } from "fs";
import path from "path";

export type StoredUser = {
  id: number;
  email: string;
  passwordHash: string | null;
  provider: "local" | "google";
  createdAt: string;
};

type UsersDb = {
  users: StoredUser[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "users.json");

let writeLock: Promise<void> = Promise.resolve();

async function ensureDbFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(DB_FILE);
  } catch {
    const init: UsersDb = { users: [] };
    await fs.writeFile(DB_FILE, JSON.stringify(init, null, 2), "utf8");
  }
}

async function readDb(): Promise<UsersDb> {
  await ensureDbFile();
  const raw = await fs.readFile(DB_FILE, "utf8");
  return JSON.parse(raw) as UsersDb;
}

async function writeDb(db: UsersDb) {
  await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2), "utf8");
}

async function withWriteLock<T>(fn: () => Promise<T>): Promise<T> {
  const prev = writeLock;
  let release!: () => void;
  writeLock = new Promise<void>((resolve) => {
    release = resolve;
  });

  await prev;
  try {
    return await fn();
  } finally {
    release();
  }
}

export async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const db = await readDb();
  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  return user ?? null;
}

export async function findUserById(id: number): Promise<StoredUser | null> {
  const db = await readDb();
  const user = db.users.find((u) => u.id === id);
  return user ?? null;
}

export async function createLocalUser(email: string, passwordHash: string): Promise<StoredUser> {
  return withWriteLock(async () => {
    const db = await readDb();
    const exists = db.users.some((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      throw new Error("EMAIL_EXISTS");
    }

    const nextId = db.users.length > 0 ? Math.max(...db.users.map((u) => u.id)) + 1 : 1;
    const user: StoredUser = {
      id: nextId,
      email,
      passwordHash,
      provider: "local",
      createdAt: new Date().toISOString(),
    };

    db.users.push(user);
    await writeDb(db);
    return user;
  });
}

export async function findOrCreateGoogleUser(email: string): Promise<StoredUser> {
  return withWriteLock(async () => {
    const db = await readDb();
    const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) return existing;

    const nextId = db.users.length > 0 ? Math.max(...db.users.map((u) => u.id)) + 1 : 1;
    const user: StoredUser = {
      id: nextId,
      email,
      passwordHash: null,
      provider: "google",
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    await writeDb(db);
    return user;
  });
}
