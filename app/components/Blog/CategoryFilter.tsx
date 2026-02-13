'use client'
import { useRouter, useSearchParams } from 'next/navigation';

interface CategoryFilterProps {
    categories: string[];
    currentCategory: string;
}

export default function CategoryFilter({ categories, currentCategory }: CategoryFilterProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (category === 'All') {
            params.delete('category');
        } else {
            params.set('category', category);
        }

        // Reset to page 1 when changing category
        params.delete('page');

        const queryString = params.toString();
        router.push(`/blog${queryString ? `?${queryString}` : ''}`);
    };

    return (
        <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-6 py-2.5 rounded-full font-semibold transition-all ${currentCategory === category
                            ? 'bg-(--accent-colour) text-white shadow-lg scale-105'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-(--accent-colour) hover:text-(--accent-colour)'
                        }`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}
