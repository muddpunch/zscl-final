'use client'
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import PhotoCard from '../components/Gallery/PhotoCard';
import GalleryFilter from '../components/Gallery/GalleryFilter';
import SortDropdown from '../components/Gallery/SortDropdown';
import Lightbox from '../components/Gallery/Lightbox';
import { Photo } from '@/lib/photos';
import { Loader2 } from 'lucide-react';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function GalleryContent() {
    const searchParams = useSearchParams();
    const category = searchParams.get('category') || 'All Photos';
    const sortBy = searchParams.get('sortBy') || 'newest';

    const [photos, setPhotos] = useState<Photo[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [displayCount, setDisplayCount] = useState(9);

    // Lightbox state
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

    useEffect(() => {
        async function fetchPhotos() {
            // Only fetch on client side
            if (typeof window === 'undefined') return;

            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (category !== 'All Photos') params.set('category', category);
                params.set('sortBy', sortBy);

                const response = await fetch(`/api/photos?${params.toString()}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch photos');
                }
                const data: { photos: Photo[] } = await response.json();

                setPhotos(data.photos || []);

                // Get categories from photos
                const photoCategories = data.photos.map(p => p.category);
                const uniqueCategories: string[] = ['All Photos', ...Array.from(new Set(photoCategories))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Failed to fetch photos:', error);
                setPhotos([]);
                setCategories(['All Photos']);
            } finally {
                setLoading(false);
            }
        }

        fetchPhotos();
        setDisplayCount(9); // Reset display count when filters change
    }, [category, sortBy]);

    const displayedPhotos = photos.slice(0, displayCount);
    const hasMore = displayCount < photos.length;

    const openLightbox = (index: number) => setSelectedPhotoIndex(index);
    const closeLightbox = () => setSelectedPhotoIndex(null);
    const nextPhoto = () => setSelectedPhotoIndex(prev => (prev !== null && prev < displayedPhotos.length - 1 ? prev + 1 : 0));
    const prevPhoto = () => setSelectedPhotoIndex(prev => (prev !== null && prev > 0 ? prev - 1 : displayedPhotos.length - 1));

    return (
        <main className="container mx-auto px-4 py-12">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                    Event Gallery
                </h1>
                <p className="text-lg text-gray-600">
                    Capturing the best moments from the 2025-2026 school year.
                </p>
            </div>

            {/* Filters and Sort */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <GalleryFilter categories={categories} currentCategory={category} />
                <SortDropdown currentSort={sortBy} />
            </div>

            {/* Loading State */}
            {loading && (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="animate-spin text-(--accent-colour)" size={48} />
                </div>
            )}

            {/* Photo Grid */}
            {!loading && displayedPhotos.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {displayedPhotos.map((photo, index) => (
                        <div key={photo.id} onClick={() => openLightbox(index)}>
                            <PhotoCard photo={photo} />
                        </div>
                    ))}
                </div>
            )}

            {/* Empty State */}
            {!loading && photos.length === 0 && (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500">No photos found in this category.</p>
                </div>
            )}

            {/* Load More Button */}
            {!loading && hasMore && (
                <div className="text-center">
                    <button
                        onClick={() => setDisplayCount(prev => prev + 9)}
                        className="px-8 py-3 bg-white border-2 border-(--accent-colour) text-(--accent-colour) rounded-full font-bold hover:bg-(--accent-colour) hover:text-white transition-all shadow-sm hover:shadow-md"
                    >
                        Load More Photos
                    </button>
                </div>
            )}

            {/* Lightbox */}
            {selectedPhotoIndex !== null && displayedPhotos[selectedPhotoIndex] && (
                <Lightbox
                    photo={displayedPhotos[selectedPhotoIndex]}
                    onClose={closeLightbox}
                    onNext={nextPhoto}
                    onPrev={prevPhoto}
                />
            )}
        </main>
    );
}

export default function GalleryPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin" /></div>}>
            <GalleryContent />
        </Suspense>
    );
}
