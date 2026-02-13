'use client'
import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { Post } from '@/lib/posts';

interface BlogCardProps {
    post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 flex flex-col h-full">
            <div
                className="h-56 w-full bg-cover bg-center bg-gray-100 relative overflow-hidden"
                style={{ backgroundImage: `url(${post.image})` }}
            >
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>

            <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center justify-between gap-2 text-sm mb-3">
                    <div className="flex items-center gap-2 text-gray-500 font-medium">
                        <Calendar size={16} className="text-(--accent-colour)" />
                        <span>{post.date}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-red-50 text-(--accent-colour) text-xs font-bold uppercase tracking-wide">
                        {post.category}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-(--accent-colour) transition-colors line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-gray-600 mb-6 line-clamp-3 text-sm leading-relaxed flex-grow">
                    {post.excerpt}
                </p>

                <Link
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-(--accent-colour) font-bold hover:gap-3 transition-all mt-auto"
                >
                    Read Article <ArrowRight size={18} />
                </Link>
            </div>
        </article>
    );
}
