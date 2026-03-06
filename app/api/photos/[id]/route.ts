import { NextRequest, NextResponse } from 'next/server';
import { deletePhoto, getPhotoById } from '@/lib/photos';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const success = await deletePhoto(id);

    if (success) {
        return NextResponse.json({ message: 'Photo deleted successfully' });
    } else {
        return NextResponse.json(
            { error: 'Photo not found' },
            { status: 404 }
        );
    }
}

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const photo = await getPhotoById(id);

    if (photo) {
        return NextResponse.json({ photo });
    } else {
        return NextResponse.json(
            { error: 'Photo not found' },
            { status: 404 }
        );
    }
}
