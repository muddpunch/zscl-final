'use client'
import { useRouter, useSearchParams } from 'next/navigation';

interface GalleryFilterProps {
    categories: string[];
    currentCategory: string;
}

export default function GalleryFilter({ categories, currentCategory }: GalleryFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (category === 'All Photos') {
            params.delete('category');
        } else {
            params.set('category', category);
        }

        const queryString = params.toString();
        router.push(`/galeria${queryString ? `?${queryString}` : ''}`);
    };

    return (
        <div className="flex flex-wrap gap-3 mb-8">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-5 py-2 rounded-full font-semibold text-sm transition-all ${currentCategory === category
                        ? 'bg-(--accent-colour) text-white shadow-md'
                        : 'bg-white text-gray-700 border border-gray-200 hover:border-(--accent-colour) hover:text-(--accent-colour)'
                        }`}
                >
                    {category === 'All Photos' ? 'Wszystkie zdjęcia' : category}
                </button>
            ))}
        </div>
    );
}
