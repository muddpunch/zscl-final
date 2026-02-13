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

export const events: Event[] = [
    {
        id: '1',
        title: 'Labor Day (No School)',
        date: '2025-09-04',
        category: 'holidays',
        description: 'School closed for Labor Day'
    },
    {
        id: '2',
        title: 'Soccer Practice',
        date: '2025-09-06',
        startTime: '15:30',
        endTime: '17:00',
        category: 'sports',
        location: 'Soccer Field'
    },
    {
        id: '3',
        title: 'Debate Club',
        date: '2025-09-08',
        startTime: '16:00',
        endTime: '17:30',
        category: 'academic',
        location: 'Room 102'
    },
    {
        id: '4',
        title: 'Council Meeting',
        date: '2025-09-12',
        startTime: '15:00',
        endTime: '16:30',
        category: 'council',
        location: 'Conference Room'
    },
    {
        id: '5',
        title: 'Volleyball vs. North',
        date: '2025-09-13',
        startTime: '18:00',
        category: 'sports',
        location: 'Main Gym'
    },
    {
        id: '6',
        title: 'Biology Midterm',
        date: '2025-09-14',
        startTime: '09:00',
        endTime: '11:00',
        category: 'exams',
        location: 'Room 304'
    },
    {
        id: '7',
        title: 'Fall Pep Rally',
        date: '2025-09-16',
        startTime: '14:00',
        category: 'sports',
        location: 'Main Gym'
    },
    {
        id: '8',
        title: 'Football vs. South',
        date: '2025-09-16',
        startTime: '19:00',
        category: 'sports',
        location: 'Stadium'
    },
    {
        id: '9',
        title: 'Yearbook Photo Day',
        date: '2025-09-20',
        startTime: '08:00',
        endTime: '14:00',
        category: 'academic'
    },
    {
        id: '10',
        title: 'Math Final Exam',
        date: '2025-09-22',
        startTime: '09:00',
        endTime: '12:00',
        category: 'exams',
        location: 'Room 201'
    },
    {
        id: '11',
        title: 'Teacher In-Service',
        date: '2025-09-29',
        category: 'holidays',
        description: 'No school for students'
    },
    {
        id: '12',
        title: 'Cross Country Meet',
        date: '2025-09-30',
        startTime: '09:00',
        category: 'sports',
        location: 'City Park'
    }
];

export function getEventsByMonth(year: number, month: number): Event[] {
    return events.filter(event => {
        const date = new Date(event.date);
        return date.getFullYear() === year && date.getMonth() === month;
    });
}

export function getUpcomingEvents(limit: number = 5): Event[] {
    const today = new Date('2025-09-01'); // Mocking "today" to match mock data
    return events
        .filter(event => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, limit);
}

// For future admin functionality
export function addEvent(event: Omit<Event, 'id'>): Event {
    const newEvent: Event = {
        ...event,
        id: Date.now().toString()
    };
    events.push(newEvent);
    return newEvent;
}

export function deleteEvent(id: string): boolean {
    const index = events.findIndex(event => event.id === id);
    if (index !== -1) {
        events.splice(index, 1);
        return true;
    }
    return false;
}

export const CATEGORY_COLORS: Record<EventCategory, { bg: string, text: string, border: string }> = {
    academic: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    sports: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    council: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
    holidays: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
    exams: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' }
};
