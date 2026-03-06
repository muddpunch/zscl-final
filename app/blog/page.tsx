import { getFeaturedPost, getPaginatedPosts, getAllCategories, Post } from "@/lib/posts";
import FeaturedPost from "../components/Blog/FeaturedPost";
import BlogCard from "../components/Blog/BlogCard";
import Pagination from "../components/Blog/Pagination";
import CategoryFilter from "../components/Blog/CategoryFilter";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aktualności ZSCL",
    description: "Bądź na bieżąco z najnowszymi informacjami i wydarzeniami od Samorządu Uczniowskiego ZSCL.",
};

interface BlogPageProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const resolvedSearchParams = await searchParams;
    const page = typeof resolvedSearchParams.page === 'string' ? parseInt(resolvedSearchParams.page) : 1;
    const category = typeof resolvedSearchParams.category === 'string' ? resolvedSearchParams.category : 'All';
    const limit = 6; // Number of posts per page

    const featuredPost = await getFeaturedPost();
    const { posts, totalPages } = await getPaginatedPosts(page, limit, category);
    const categories = await getAllCategories();

    return (
        <main className="container mx-auto px-4 py-12">

            {featuredPost && <FeaturedPost post={featuredPost} />}

            {/* Category Filter */}
            <CategoryFilter categories={categories} currentCategory={category} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post: Post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>

            {posts.length === 0 && (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-500">Nie znaleziono postów w tej kategorii.</p>
                </div>
            )}

            <Pagination
                currentPage={page}
                totalPages={totalPages}
                basePath="/blog"
            />
        </main>
    );
}
