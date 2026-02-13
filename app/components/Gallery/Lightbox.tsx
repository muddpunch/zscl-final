'use client'
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import Image from 'next/image';
import { Photo } from '@/lib/photos';

interface LightboxProps {
    photo: Photo;
    onClose: () => void;
    onNext: () => void;
    onPrev: () => void;
}

export default function Lightbox({ photo, onClose, onNext, onPrev }: LightboxProps) {
    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') onNext();
            if (e.key === 'ArrowLeft') onPrev();
        };

        document.addEventListener('keydown', handleKeyDown);
        // Prevent scrolling when lightbox is open
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose, onNext, onPrev]);

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center backdrop-blur-sm">
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all z-10"
            >
                <X size={32} />
            </button>

            {/* Navigation Buttons */}
            <button
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all hidden md:block"
            >
                <ChevronLeft size={48} />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-all hidden md:block"
            >
                <ChevronRight size={48} />
            </button>

            {/* Main Content */}
            <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center p-4">
                <div className="relative w-full h-full flex items-center justify-center">
                    <div
                        className="relative max-w-full max-h-full"
                        style={{ aspectRatio: '16/9', height: '80vh' }}
                    >
                        <div
                            className="w-full h-full bg-contain bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${photo.imageUrl})` }}
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>

                {/* Caption */}
                <div className="absolute bottom-8 left-0 right-0 text-center text-white p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-2xl font-bold mb-2">{photo.title}</h3>
                    <p className="text-gray-300">{photo.description || photo.event}</p>
                </div>
            </div>
        </div>
    );
}
