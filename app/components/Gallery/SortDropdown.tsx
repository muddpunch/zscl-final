'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface SortDropdownProps {
    currentSort: string;
}

export default function SortDropdown({ currentSort }: SortDropdownProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isOpen, setIsOpen] = useState(false);

    const sortOptions = [
        { value: 'newest', label: 'Najnowsze' },
        { value: 'oldest', label: 'Najstarsze' },
        { value: 'event', label: 'Nazwa wydarzenia' }
    ];

    const handleSortChange = (sortValue: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('sortBy', sortValue);

        const queryString = params.toString();
        router.push(`/galeria${queryString ? `?${queryString}` : ''}`);
        setIsOpen(false);
    };

    const currentLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Najnowsze';

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-(--accent-colour) transition-colors font-medium text-gray-700"
            >
                <span className="text-sm">Sortuj według: {currentLabel}</span>
                <ChevronDown size={18} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
                        {sortOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleSortChange(option.value)}
                                className={`w-full text-left px-4 py-3 text-sm hover:bg-gray-50 transition-colors ${currentSort === option.value ? 'bg-red-50 text-(--accent-colour) font-semibold' : 'text-gray-700'
                                    }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
