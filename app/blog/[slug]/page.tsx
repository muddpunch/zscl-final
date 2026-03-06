import { getPostBySlug, getPaginatedPosts, Post } from "@/lib/posts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Share2 } from "lucide-react";
import { Metadata } from "next";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);

    if (!post) {
        return {
            title: 'Nie znaleziono posta',
        };
    }

    return {
        title: `${post.title} - Blog ZSCL`,
        description: post.excerpt,
    };
}

// Generate static params for known posts to optimize build
export async function generateStaticParams() {
    const { posts } = await getPaginatedPosts(1, 100);
    return posts.map((post: Post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const resolvedParams = await params;
    const post = await getPostBySlug(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="min-h-screen pb-20">
            {/* Hero Header */}
            <div className="relative h-[400px] md:h-[500px] w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.image})` }}
                />
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="container mx-auto px-4 text-center max-w-4xl space-y-6">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4"
                        >
                            <ArrowLeft size={20} /> Powrót do Aktualności
                        </Link>
                        <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-lg">
                            {post.title}
                        </h1>
                        <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm md:text-base font-medium">
                            <div className="flex items-center gap-2">
                                <span className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                                    <User size={16} />
                                </span>
                                {post.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                                    <Calendar size={16} />
                                </span>
                                {post.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="p-2 rounded-full bg-white/20 backdrop-blur-md">
                                    <Clock size={16} />
                                </span>
                                5 min czytania
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="container mx-auto px-4 -mt-20 relative z-10">
                <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 max-w-4xl mx-auto">
                    <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed mb-10 border-l-4 border-(--accent-colour) pl-6 italic">
                        {post.excerpt}
                    </p>

                    <div className="prose prose-lg md:prose-xl max-w-none text-gray-800 leading-loose">
                        {/* 
                           In a real app, this would be a Markdown renderer. 
                           For now, we just display the text content.
                        */}
                        {post.content.split('\n').map((paragraph: string, idx: number) => (
                            <p key={idx} className="mb-6">{paragraph}</p>
                        ))}
                        <p>
                            Wsparcie społeczności uczniowskiej jest kluczowe dla rozwoju naszej placówki. Dzięki wspólnym wysiłkom Samorządu i Dyrekcji, udaje nam się realizować coraz więcej ambitnych projektów, które realnie wpływają na komfort nauki i atmosferę w szkole.
                        </p>
                        <h3>Dlaczego to jest ważne?</h3>
                        <p>
                            Każda inicjatywa, od drobnych zmian w statucie po duże wydarzenia kulturalne, ma na celu jedno: sprawienie, by każdy uczeń czuł się w ZSCL jak u siebie. Inwestujemy w dialog i otwartość, bo wierzymy, że to podstawa nowoczesnego szkolnictwa.
                        </p>
                    </div>

                    <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-gray-500 text-sm">
                            Tagi: <span className="font-semibold text-(--accent-colour)">Społeczność</span>, <span className="font-semibold text-(--accent-colour)">Życie Szkoły</span>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold transition-all">
                            <Share2 size={18} /> Udostępnij
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}
