import Database from 'better-sqlite3';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// 数据库文件路径
const DB_PATH = process.env.DB_PATH || path.join(process.cwd(), 'busuanzi.db');

// 创建数据库连接
let db: Database.Database;

export function getDb(): Database.Database {
  if (!db) {
    db = new Database(DB_PATH);
    initDb();
  }
  return db;
}

function initDb() {
  // 创建用户表
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    )
  `);

  // 创建八字命盘记录表
  db.exec(`
    CREATE TABLE IF NOT EXISTS bazi_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      name TEXT NOT NULL,
      gender TEXT NOT NULL,
      birth_year INTEGER NOT NULL,
      year_pillar TEXT NOT NULL,
      month_pillar TEXT NOT NULL,
      day_pillar TEXT NOT NULL,
      hour_pillar TEXT NOT NULL,
      start_age INTEGER,
      first_da_yun TEXT,
      analysis_result TEXT,
      chart_data TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // 创建索引
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_bazi_user ON bazi_records(user_id);
  `);
}

// 用户操作
export function getOrCreateUser(userId?: string): string {
  const database = getDb();

  if (userId) {
    // 检查用户是否存在
    const existing = database.prepare('SELECT id FROM users WHERE id = ?').get(userId);
    if (existing) return userId;
  }

  // 创建新用户
  const newId = uuidv4();
  database.prepare('INSERT INTO users (id) VALUES (?)').run(newId);
  return newId;
}

export function getUserById(id: string) {
  const database = getDb();
  return database.prepare('SELECT * FROM users WHERE id = ?').get(id);
}

// 命盘操作
export interface BaziRecord {
  id: string;
  user_id: string;
  name: string;
  gender: string;
  birth_year: number;
  year_pillar: string;
  month_pillar: string;
  day_pillar: string;
  hour_pillar: string;
  start_age?: number;
  first_da_yun?: string;
  analysis_result?: string;
  chart_data?: string;
  created_at: string;
}

export function saveBaziRecord(record: Omit<BaziRecord, 'id' | 'created_at'>): string {
  const database = getDb();
  const id = uuidv4();

  database.prepare(`
    INSERT INTO bazi_records (id, user_id, name, gender, birth_year, year_pillar, month_pillar, day_pillar, hour_pillar, start_age, first_da_yun, analysis_result, chart_data)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    id,
    record.user_id,
    record.name,
    record.gender,
    record.birth_year,
    record.year_pillar,
    record.month_pillar,
    record.day_pillar,
    record.hour_pillar,
    record.start_age || null,
    record.first_da_yun || null,
    record.analysis_result || null,
    record.chart_data || null
  );

  return id;
}

export function getBaziRecords(userId: string): BaziRecord[] {
  const database = getDb();
  return database.prepare('SELECT * FROM bazi_records WHERE user_id = ? ORDER BY created_at DESC').all(userId) as BaziRecord[];
}

export function getBaziRecordById(id: string): BaziRecord | undefined {
  const database = getDb();
  return database.prepare('SELECT * FROM bazi_records WHERE id = ?').get(id) as BaziRecord | undefined;
}

export function updateBaziRecord(id: string, name: string): void {
  const database = getDb();
  database.prepare('UPDATE bazi_records SET name = ? WHERE id = ?').run(name, id);
}

export function deleteBaziRecord(id: string): void {
  const database = getDb();
  database.prepare('DELETE FROM bazi_records WHERE id = ?').run(id);
}

export function deleteAllBaziRecords(userId: string): void {
  const database = getDb();
  database.prepare('DELETE FROM bazi_records WHERE user_id = ?').run(userId);
}

export function getBaziRecordCount(userId: string): number {
  const database = getDb();
  const result = database.prepare('SELECT COUNT(*) as count FROM bazi_records WHERE user_id = ?').get(userId) as { count: number };
  return result.count;
}
