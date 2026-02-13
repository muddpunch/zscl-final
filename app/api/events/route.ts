import { NextRequest, NextResponse } from 'next/server';
import { events, addEvent } from '@/lib/events';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const month = searchParams.get('month');
    const year = searchParams.get('year');

    let filteredEvents = [...events];

    if (month && year) {
        filteredEvents = events.filter(event => {
            const date = new Date(event.date);
            return date.getFullYear() === parseInt(year) && date.getMonth() === parseInt(month);
        });
    }

    return NextResponse.json({ events: filteredEvents });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.date || !body.category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newEvent = addEvent({
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
