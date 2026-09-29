import { NextRequest, NextResponse } from 'next/server';
import { getPhotos, addPhoto } from '@/lib/photos';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;
    const sortBy = searchParams.get('sortBy') || 'newest';

    const photos = await getPhotos(category, sortBy);

    return NextResponse.json({ photos });
}

export async function POST(request: NextRequest) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    try {
        const body = await request.json();

        // Validate required fields
        if (!body.title || !body.imageUrl || !body.category) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newPhoto = await addPhoto({
            title: body.title,
            imageUrl: body.imageUrl,
            category: body.category,
            event: body.event || 'Ogólne',
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
