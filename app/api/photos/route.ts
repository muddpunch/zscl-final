import { NextRequest, NextResponse } from 'next/server';
import { getPhotos, addPhoto } from '@/lib/photos';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;
    const sortBy = searchParams.get('sortBy') || 'newest';

    const photos = getPhotos(category, sortBy);

    return NextResponse.json({ photos });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.imageUrl || !body.category || !body.event) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newPhoto = addPhoto({
            title: body.title,
            imageUrl: body.imageUrl,
            category: body.category,
            event: body.event,
            uploadDate: body.uploadDate || new Date().toISOString().split('T')[0],
            description: body.description
        });

        return NextResponse.json({ photo: newPhoto }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
