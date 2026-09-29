import { NextRequest, NextResponse } from 'next/server';
import { addPost, getAllPosts } from '@/lib/posts';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
    const includeDrafts = request.nextUrl.searchParams.get('all') === '1';
    if (includeDrafts) {
        const denied = requireAdmin(request);
        if (denied) return denied;
    }
    return NextResponse.json({ posts: await getAllPosts(includeDrafts) });
}

export async function POST(request: NextRequest) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    try {
        const body = await request.json();

        if (!body.title || !body.excerpt || !body.content || !body.author) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newPost = await addPost({
            title: body.title,
            excerpt: body.excerpt,
            content: body.content,
            image: body.image || '/images/baner.webp',
            published: true,
            date: new Date().toISOString().split('T')[0],
            author: body.author,
            category: body.category || 'General'
        });

        return NextResponse.json({ post: newPost }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid request body' },
            { status: 400 }
        );
    }
}
