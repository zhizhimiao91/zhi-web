import { mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DatabaseSync } from 'node:sqlite'

const dataDir = fileURLToPath(new URL('../data', import.meta.url))
mkdirSync(dataDir, { recursive: true })

export const db = new DatabaseSync(join(dataDir, 'zhi-web.sqlite'))

db.exec(`
  CREATE TABLE IF NOT EXISTS views (
    slug TEXT PRIMARY KEY,
    count INTEGER NOT NULL DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL,
    author TEXT,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_comments_slug ON comments(slug);
`)
