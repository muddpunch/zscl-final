import prisma from './prisma';

export interface Photo {
    id: string;
    title: string;
    imageUrl: string;
    category: string;
    event: string;
    uploadDate: string;
    description?: string;
}

function formatPhoto(p: {
    id: string;
    title: string;
    imageUrl: string;
    category: string;
    event: string;
    uploadDate: string;
    description: string | null;
    createdAt: Date;
}): Photo {
    return {
        id: p.id,
        title: p.title,
        imageUrl: p.imageUrl,
        category: p.category,
        event: p.event,
        uploadDate: p.uploadDate,
        description: p.description ?? undefined,
    };
}

export async function getPhotos(category?: string, sortBy: string = 'newest'): Promise<Photo[]> {
    const where = category && category !== 'All Photos'
        ? { category }
        : {};

    let orderBy: { uploadDate: 'asc' | 'desc' } | { event: 'asc' };
    switch (sortBy) {
        case 'oldest':
            orderBy = { uploadDate: 'asc' };
            break;
        case 'event':
            orderBy = { event: 'asc' };
            break;
        case 'newest':
        default:
            orderBy = { uploadDate: 'desc' };
    }

    const rows = await prisma.photo.findMany({ where, orderBy });
    return rows.map(formatPhoto);
}

export async function getPhotoById(id: string): Promise<Photo | null> {
    const p = await prisma.photo.findUnique({ where: { id } });
    return p ? formatPhoto(p) : null;
}

export async function getAllCategories(): Promise<string[]> {
    const rows = await prisma.photo.findMany({
        select: { category: true },
        distinct: ['category'],
        orderBy: { category: 'asc' },
    });
    return ['All Photos', ...rows.map((r: { category: string }) => r.category)];
}

export async function addPhoto(photo: Omit<Photo, 'id'>): Promise<Photo> {
    const p = await prisma.photo.create({
        data: {
            title: photo.title,
            imageUrl: photo.imageUrl,
            category: photo.category,
            event: photo.event,
            uploadDate: photo.uploadDate,
            description: photo.description ?? null,
        },
    });
    return formatPhoto(p);
}

export async function deletePhoto(id: string): Promise<boolean> {
    try {
        await prisma.photo.delete({ where: { id } });
        return true;
    } catch {
        return false;
    }
}
