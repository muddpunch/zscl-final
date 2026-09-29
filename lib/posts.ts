import { randomUUID } from 'node:crypto';
import sanitizeHtml from 'sanitize-html';
import { db } from './db';

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

type PostRow = Omit<Post, 'published'> & { published: number };
const cleanHtml = (html: string) => sanitizeHtml(html, {
    allowedTags: ['p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote', 'a', 'img'],
    allowedAttributes: { a: ['href', 'target', 'rel'], img: ['src', 'alt', 'width', 'height'] },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false,
});
const fromRow = (row: PostRow): Post => ({ ...row, content: cleanHtml(row.content), published: Boolean(row.published) });

export async function getPaginatedPosts(page: number, limit: number, category?: string) {
    const filterCategory = category && category !== 'All' ? category : null;
    const where = filterCategory ? 'AND category = ?' : '';
    const params = filterCategory ? [filterCategory] : [];
    const posts = db.prepare(`SELECT * FROM posts WHERE published = 1 ${where} ORDER BY date DESC LIMIT ? OFFSET ?`)
        .all(...params, limit, Math.max(0, (page - 1) * limit)) as PostRow[];
    const { total } = db.prepare(`SELECT COUNT(*) AS total FROM posts WHERE published = 1 ${where}`)
        .get(...params) as { total: number };

    return { posts: posts.map(fromRow), totalPages: Math.ceil(total / limit) };
}

export async function getAllPosts(includeDrafts = false) {
    const where = includeDrafts ? '' : 'WHERE published = 1';
    return (db.prepare(`SELECT * FROM posts ${where} ORDER BY date DESC`).all() as PostRow[]).map(fromRow);
}

export async function getAllCategories(): Promise<string[]> {
    const rows = db.prepare('SELECT DISTINCT category FROM posts WHERE published = 1 ORDER BY category').all() as { category: string }[];
    return ['All', ...rows.map(row => row.category)];
}

export async function getFeaturedPost(): Promise<Post | null> {
    const row = db.prepare('SELECT * FROM posts WHERE published = 1 ORDER BY date DESC LIMIT 1').get() as PostRow | undefined;
    return row ? fromRow(row) : null;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    const row = db.prepare('SELECT * FROM posts WHERE slug = ?').get(slug) as PostRow | undefined;
    return row ? fromRow(row) : null;
}

export async function addPost(post: Omit<Post, 'id' | 'slug'>): Promise<Post> {
    const baseSlug = post.title.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'post';
    const slug = `${baseSlug}-${Date.now().toString(36)}`;
    const result: Post = { ...post, content: cleanHtml(post.content), id: randomUUID(), slug };

    db.prepare(`INSERT INTO posts (id, title, slug, excerpt, content, image, published, author, category, date)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
        .run(result.id, result.title, result.slug, result.excerpt, result.content, result.image,
            Number(result.published), result.author, result.category, result.date || new Date().toISOString().slice(0, 10));
    return result;
}

export async function deletePost(slug: string): Promise<boolean> {
    return db.prepare('DELETE FROM posts WHERE slug = ?').run(slug).changes > 0;
}
