import { randomUUID } from 'node:crypto';
import { db } from './db';
import type { Event } from './event-types';
export { CATEGORY_COLORS } from './event-types';
export type { Event, EventCategory } from './event-types';

interface EventRow extends Omit<Event, 'startTime' | 'endTime' | 'location' | 'description'> {
    start_time: string | null;
    end_time: string | null;
    location: string | null;
    description: string | null;
}

const fromRow = (row: EventRow): Event => ({
    id: row.id, title: row.title, date: row.date, category: row.category,
    startTime: row.start_time ?? undefined, endTime: row.end_time ?? undefined,
    location: row.location ?? undefined, description: row.description ?? undefined,
});

export async function getAllEvents(): Promise<Event[]> {
    return (db.prepare('SELECT * FROM events ORDER BY date, start_time').all() as EventRow[]).map(fromRow);
}

export async function getEventsByMonth(year: number, month: number): Promise<Event[]> {
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    return (db.prepare('SELECT * FROM events WHERE date LIKE ? ORDER BY date, start_time').all(`${prefix}-%`) as EventRow[]).map(fromRow);
}

export async function getUpcomingEvents(limit = 5): Promise<Event[]> {
    const today = new Date().toISOString().slice(0, 10);
    return (db.prepare('SELECT * FROM events WHERE date >= ? ORDER BY date, start_time LIMIT ?').all(today, limit) as EventRow[]).map(fromRow);
}

export async function addEvent(event: Omit<Event, 'id'>): Promise<Event> {
    const result: Event = { ...event, id: randomUUID() };
    db.prepare(`INSERT INTO events (id, title, date, start_time, end_time, category, location, description)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(result.id, result.title, result.date, result.startTime ?? null, result.endTime ?? null,
            result.category, result.location ?? null, result.description ?? null);
    return result;
}

export async function deleteEvent(id: string): Promise<boolean> {
    return db.prepare('DELETE FROM events WHERE id = ?').run(id).changes > 0;
}
