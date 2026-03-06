import prisma from './prisma';

export type EventCategory = 'academic' | 'sports' | 'council' | 'holidays' | 'exams';

export interface Event {
    id: string;
    title: string;
    date: string; // ISO date string YYYY-MM-DD
    startTime?: string;
    endTime?: string;
    category: EventCategory;
    location?: string;
    description?: string;
}

function formatEvent(e: {
    id: string;
    title: string;
    date: string;
    startTime: string | null;
    endTime: string | null;
    category: string;
    location: string | null;
    description: string | null;
    createdAt: Date;
}): Event {
    return {
        id: e.id,
        title: e.title,
        date: e.date,
        startTime: e.startTime ?? undefined,
        endTime: e.endTime ?? undefined,
        category: e.category as EventCategory,
        location: e.location ?? undefined,
        description: e.description ?? undefined,
    };
}

export async function getEventsByMonth(year: number, month: number): Promise<Event[]> {
    // month is 0-based (JS convention). Build YYYY-MM prefix.
    const monthStr = String(month + 1).padStart(2, '0');
    const prefix = `${year}-${monthStr}`;

    const rows = await prisma.event.findMany({
        where: { date: { startsWith: prefix } },
        orderBy: { date: 'asc' },
    });
    return rows.map(formatEvent);
}

export async function getUpcomingEvents(limit: number = 5): Promise<Event[]> {
    const today = new Date().toISOString().split('T')[0];

    const rows = await prisma.event.findMany({
        where: { date: { gte: today } },
        orderBy: { date: 'asc' },
        take: limit,
    });
    return rows.map(formatEvent);
}

export async function addEvent(event: Omit<Event, 'id'>): Promise<Event> {
    const e = await prisma.event.create({
        data: {
            title: event.title,
            date: event.date,
            startTime: event.startTime ?? null,
            endTime: event.endTime ?? null,
            category: event.category,
            location: event.location ?? null,
            description: event.description ?? null,
        },
    });
    return formatEvent(e);
}

export async function deleteEvent(id: string): Promise<boolean> {
    try {
        await prisma.event.delete({ where: { id } });
        return true;
    } catch {
        return false;
    }
}

export const CATEGORY_COLORS: Record<EventCategory, { bg: string; text: string; border: string }> = {
    academic: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    sports:   { bg: 'bg-green-100',  text: 'text-green-800',  border: 'border-green-200'  },
    council:  { bg: 'bg-red-100',    text: 'text-red-800',    border: 'border-red-200'    },
    holidays: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
    exams:    { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
};
