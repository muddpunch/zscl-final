import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const globalForDb = globalThis as typeof globalThis & { sqlite?: DatabaseSync };

function connect() {
    if (globalForDb.sqlite) return globalForDb.sqlite;

    const dir = join(process.cwd(), 'data');
    mkdirSync(dir, { recursive: true });

    const db = new DatabaseSync(join(dir, 'zscl.sqlite'));
    db.exec(`
        PRAGMA journal_mode = WAL;
        PRAGMA foreign_keys = ON;
        CREATE TABLE IF NOT EXISTS posts (
            id TEXT PRIMARY KEY, title TEXT NOT NULL, slug TEXT NOT NULL UNIQUE,
            excerpt TEXT NOT NULL, content TEXT NOT NULL, image TEXT NOT NULL,
            published INTEGER NOT NULL DEFAULT 1, author TEXT NOT NULL DEFAULT 'Admin',
            category TEXT NOT NULL DEFAULT 'General', date TEXT NOT NULL,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS events (
            id TEXT PRIMARY KEY, title TEXT NOT NULL, date TEXT NOT NULL,
            start_time TEXT, end_time TEXT, category TEXT NOT NULL,
            location TEXT, description TEXT,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS photos (
            id TEXT PRIMARY KEY, title TEXT NOT NULL, image_url TEXT NOT NULL,
            category TEXT NOT NULL, event TEXT NOT NULL, upload_date TEXT NOT NULL,
            description TEXT,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS forms (
            id TEXT PRIMARY KEY, title TEXT NOT NULL, description TEXT NOT NULL DEFAULT '',
            slug TEXT NOT NULL UNIQUE, fields_json TEXT NOT NULL,
            published INTEGER NOT NULL DEFAULT 0,
            created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS form_responses (
            id TEXT PRIMARY KEY,
            form_id TEXT NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
            answers_json TEXT NOT NULL,
            submitted_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
        CREATE INDEX IF NOT EXISTS posts_published_date ON posts(published, date DESC);
        CREATE INDEX IF NOT EXISTS events_date ON events(date);
        CREATE INDEX IF NOT EXISTS photos_upload_date ON photos(upload_date);
        CREATE INDEX IF NOT EXISTS form_responses_form ON form_responses(form_id, submitted_at);
    `);

    globalForDb.sqlite = db;
    return db;
}

export const db = connect();
