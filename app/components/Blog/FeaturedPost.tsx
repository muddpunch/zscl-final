'use client'
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, User } from 'lucide-react';
import { Post } from '@/lib/posts';

interface FeaturedPostProps {
    post: Post;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
    return (
        <section className="mb-16">
            <Link href={`/blog/${post.slug}`} className="group block relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="relative h-[500px] w-full">
                    <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{ backgroundImage: `url(${post.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3">
                        <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-(--button-colour) text-black font-bold text-sm tracking-wide uppercase">
                            Polecany Post
                        </span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight group-hover:text-(--button-colour) transition-colors">
                            {post.title}
                        </h2>
                        <p className="text-lg text-gray-200 line-clamp-2 mb-6">
                            {post.excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm font-medium text-white/80">
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-(--button-colour)" />
                                <span>{post.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={18} className="text-(--button-colour)" />
                                <span>{post.author}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </section>
    );
}
