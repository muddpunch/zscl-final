export type EventCategory = 'academic' | 'sports' | 'council' | 'holidays' | 'exams';

export interface Event {
    id: string;
    title: string;
    date: string;
    startTime?: string;
    endTime?: string;
    category: EventCategory;
    location?: string;
    description?: string;
}

export const CATEGORY_COLORS: Record<EventCategory, { bg: string; text: string; border: string }> = {
    academic: { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' },
    sports: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    council: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
    holidays: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
    exams: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
};
