export interface Photo {
    id: string;
    title: string;
    imageUrl: string;
    category: string;
    event: string;
    uploadDate: string;
    description?: string;
}

export const photos: Photo[] = [
    {
        id: '1',
        title: 'Homecoming Dance 2025',
        imageUrl: '/images/baner.webp',
        category: 'Homecoming',
        event: 'Homecoming Dance',
        uploadDate: '2025-10-15',
        description: 'Students enjoying the homecoming dance'
    },
    {
        id: '2',
        title: 'Spirit Week - Crazy Hair Day',
        imageUrl: '/images/baner.webp',
        category: 'Spirit Week',
        event: 'Spirit Week',
        uploadDate: '2025-09-20',
        description: 'Creative hairstyles during spirit week'
    },
    {
        id: '3',
        title: 'Basketball Championship',
        imageUrl: '/images/baner.webp',
        category: 'Sports',
        event: 'Basketball Game',
        uploadDate: '2025-11-10',
        description: 'Victory at the championship game'
    },
    {
        id: '4',
        title: 'Graduation Ceremony 2025',
        imageUrl: '/images/baner.webp',
        category: 'Graduation',
        event: 'Graduation',
        uploadDate: '2025-06-15',
        description: 'Celebrating our graduates'
    },
    {
        id: '5',
        title: 'Prom Night',
        imageUrl: '/images/baner.webp',
        category: 'Prom',
        event: 'Prom 2025',
        uploadDate: '2025-05-20',
        description: 'An unforgettable prom night'
    },
    {
        id: '6',
        title: 'Science Fair Winners',
        imageUrl: '/images/baner.webp',
        category: 'Academic',
        event: 'Science Fair',
        uploadDate: '2025-03-10',
        description: 'Award ceremony for science fair'
    },
    {
        id: '7',
        title: 'Football Game',
        imageUrl: '/images/baner.webp',
        category: 'Sports',
        event: 'Football Season',
        uploadDate: '2025-10-01',
        description: 'Exciting football match'
    },
    {
        id: '8',
        title: 'Student Council Meeting',
        imageUrl: '/images/baner.webp',
        category: 'Council',
        event: 'Monthly Meeting',
        uploadDate: '2025-09-05',
        description: 'Planning school events'
    },
    {
        id: '9',
        title: 'Art Exhibition',
        imageUrl: '/images/baner.webp',
        category: 'Academic',
        event: 'Art Show',
        uploadDate: '2025-04-12',
        description: 'Student artwork on display'
    }
];

export function getPhotos(category?: string, sortBy: string = 'newest'): Photo[] {
    let filteredPhotos = [...photos];

    // Filter by category
    if (category && category !== 'All Photos') {
        filteredPhotos = filteredPhotos.filter(photo => photo.category === category);
    }

    // Sort
    filteredPhotos.sort((a, b) => {
        switch (sortBy) {
            case 'oldest':
                return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
            case 'event':
                return a.event.localeCompare(b.event);
            case 'newest':
            default:
                return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
        }
    });

    return filteredPhotos;
}

export function getPhotoById(id: string): Photo | undefined {
    return photos.find(photo => photo.id === id);
}

export function getAllCategories(): string[] {
    return ['All Photos', ...new Set(photos.map(photo => photo.category))];
}

// For future admin functionality
export function addPhoto(photo: Omit<Photo, 'id'>): Photo {
    const newPhoto: Photo = {
        ...photo,
        id: Date.now().toString()
    };
    photos.push(newPhoto);
    return newPhoto;
}

export function deletePhoto(id: string): boolean {
    const index = photos.findIndex(photo => photo.id === id);
    if (index !== -1) {
        photos.splice(index, 1);
        return true;
    }
    return false;
}
