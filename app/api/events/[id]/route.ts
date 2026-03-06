import { NextRequest, NextResponse } from 'next/server';
import { deleteEvent } from '@/lib/events';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const success = await deleteEvent(id);

    if (success) {
        return NextResponse.json({ message: 'Event deleted successfully' });
    } else {
        return NextResponse.json(
            { error: 'Event not found' },
            { status: 404 }
        );
    }
}
