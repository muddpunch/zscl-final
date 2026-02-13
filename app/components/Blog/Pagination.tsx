'use client'
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    basePath: string;
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
    // If only 1 page, don't show pagination
    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-3 mt-16">
            {currentPage > 1 ? (
                <Link
                    href={`${basePath}?page=${currentPage - 1}`}
                    className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-(--accent-colour) hover:text-white hover:border-(--accent-colour) transition-all shadow-sm"
                >
                    <ChevronLeft size={20} />
                </Link>
            ) : (
                <button disabled className="p-3 rounded-full bg-gray-50 border border-gray-100 text-gray-300 cursor-not-allowed">
                    <ChevronLeft size={20} />
                </button>
            )}

            <div className="flex items-center gap-2 px-4">
                <span className="text-gray-900 font-bold">{currentPage}</span>
                <span className="text-gray-400">/</span>
                <span className="text-gray-600">{totalPages}</span>
            </div>

            {currentPage < totalPages ? (
                <Link
                    href={`${basePath}?page=${currentPage + 1}`}
                    className="p-3 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-(--accent-colour) hover:text-white hover:border-(--accent-colour) transition-all shadow-sm"
                >
                    <ChevronRight size={20} />
                </Link>
            ) : (
                <button disabled className="p-3 rounded-full bg-gray-50 border border-gray-100 text-gray-300 cursor-not-allowed">
                    <ChevronRight size={20} />
                </button>
            )}
        </div>
    );
}
