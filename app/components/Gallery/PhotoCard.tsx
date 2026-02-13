'use client'
import Image from 'next/image';
import { useState } from 'react';
import { Photo } from '@/lib/photos';

interface PhotoCardProps {
    photo: Photo;
}

export default function PhotoCard({ photo }: PhotoCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gray-100"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="aspect-square relative">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${photo.imageUrl})` }}
                />

                {/* Overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-300" style={{ transform: isHovered ? 'translateY(0)' : 'translateY(20px)' }}>
                        <h3 className="text-xl font-bold mb-2">{photo.title}</h3>
                        <p className="text-sm text-gray-200 font-medium">{photo.event}</p>
                        {photo.description && (
                            <p className="text-xs text-gray-300 mt-2 line-clamp-2">{photo.description}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
