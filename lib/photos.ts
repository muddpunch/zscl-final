import { randomUUID } from 'node:crypto';
import { db } from './db';

export interface Photo {
    id: string;
    title: string;
    imageUrl: string;
    category: string;
    event: string;
    uploadDate: string;
    description?: string;
}

interface PhotoRow extends Photo { description: string | null }
const fromRow = (row: PhotoRow): Photo => ({ ...row, description: row.description ?? undefined });

export async function getPhotos(category?: string, sortBy = 'newest'): Promise<Photo[]> {
    const where = category && category !== 'All Photos' ? 'WHERE category = ?' : '';
    const order = sortBy === 'oldest' ? 'upload_date ASC' : sortBy === 'event' ? 'event ASC' : 'upload_date DESC';
    const rows = db.prepare(`SELECT id, title, image_url AS imageUrl, category, event,
        upload_date AS uploadDate, description FROM photos ${where} ORDER BY ${order}`)
        .all(...(where ? [category] : [])) as PhotoRow[];
    return rows.map(fromRow);
}

export async function getPhotoById(id: string): Promise<Photo | null> {
    const row = db.prepare(`SELECT id, title, image_url AS imageUrl, category, event,
        upload_date AS uploadDate, description FROM photos WHERE id = ?`).get(id) as PhotoRow | undefined;
    return row ? fromRow(row) : null;
}

export async function getAllCategories(): Promise<string[]> {
    const rows = db.prepare('SELECT DISTINCT category FROM photos ORDER BY category').all() as { category: string }[];
    return ['All Photos', ...rows.map(row => row.category)];
}

export async function addPhoto(photo: Omit<Photo, 'id'>): Promise<Photo> {
    const result: Photo = { ...photo, id: randomUUID() };
    db.prepare(`INSERT INTO photos (id, title, image_url, category, event, upload_date, description)
        VALUES (?, ?, ?, ?, ?, ?, ?)`)
        .run(result.id, result.title, result.imageUrl, result.category, result.event,
            result.uploadDate || new Date().toISOString().slice(0, 10), result.description ?? null);
    return result;
}

export async function deletePhoto(id: string): Promise<boolean> {
    return db.prepare('DELETE FROM photos WHERE id = ?').run(id).changes > 0;
}
