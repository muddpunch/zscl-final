import prisma from './prisma';

export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    published: boolean;
    date: string;
    author: string;
    category: string;
}

function formatPost(p: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    published: boolean;
    author: string;
    category: string;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}): Post {
    return {
        id: p.id,
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt,
        content: p.content,
        image: p.image,
        published: p.published,
        author: p.author,
        category: p.category,
        date: p.date.toISOString().split('T')[0],
    };
}

export async function getPaginatedPosts(page: number, limit: number, category?: string) {
    const where = category && category !== 'All'
        ? { published: true, category }
        : { published: true };

    const [rawPosts, total] = await Promise.all([
        prisma.post.findMany({
            where,
            orderBy: { date: 'desc' },
            skip: (page - 1) * limit,
            take: limit,
        }),
        prisma.post.count({ where }),
    ]);

    return {
        posts: rawPosts.map(formatPost),
        totalPages: Math.ceil(total / limit),
    };
}

export async function getAllCategories(): Promise<string[]> {
    const rows = await prisma.post.findMany({
        where: { published: true },
        select: { category: true },
        distinct: ['category'],
        orderBy: { category: 'asc' },
    });
    return ['All', ...rows.map((r: { category: string }) => r.category)];
}

export async function getFeaturedPost(): Promise<Post | null> {
    const p = await prisma.post.findFirst({
        where: { published: true },
        orderBy: { date: 'desc' },
    });
    return p ? formatPost(p) : null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const p = await prisma.post.findUnique({ where: { slug } });
    return p ? formatPost(p) : null;
}

export async function addPost(post: Omit<Post, 'id' | 'slug'>): Promise<Post> {
    const slug = post.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    const uniqueSlug = `${slug}-${Date.now()}`;

    const p = await prisma.post.create({
        data: {
            title: post.title,
            slug: uniqueSlug,
            excerpt: post.excerpt,
            content: post.content,
            image: post.image,
            published: post.published,
            author: post.author,
            category: post.category,
            date: post.date ? new Date(post.date) : new Date(),
        },
    });
    return formatPost(p);
}

export async function deletePost(slug: string): Promise<boolean> {
    try {
        await prisma.post.delete({ where: { slug } });
        return true;
    } catch {
        return false;
    }
}
