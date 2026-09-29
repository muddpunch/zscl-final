import { NextRequest, NextResponse } from 'next/server';
import { addEvent, getAllEvents, getEventsByMonth } from '@/lib/events';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
    const headers = { 'Cache-Control': 'no-store, max-age=0' };
    const searchParams = request.nextUrl.searchParams;
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    if (month && year) {
        const monthNumber = Number(month);
        const yearNumber = Number(year);
        if (!Number.isInteger(monthNumber) || monthNumber < 1 || monthNumber > 12 || !Number.isInteger(yearNumber)) {
            return NextResponse.json({ error: 'Nieprawidłowy miesiąc lub rok.' }, { status: 400, headers });
        }
        return NextResponse.json({ events: await getEventsByMonth(yearNumber, monthNumber - 1) }, { headers });
    }
    return NextResponse.json({ events: await getAllEvents() }, { headers });
}

export async function POST(request: NextRequest) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.date || !body.category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newEvent = await addEvent({
            title: body.title,
            date: body.date,
            category: body.category,
            startTime: body.startTime,
            endTime: body.endTime,
            location: body.location,
            description: body.description
        });

        return NextResponse.json({ event: newEvent }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
