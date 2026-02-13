import { NextRequest, NextResponse } from 'next/server';
import { posts, addPost } from '@/lib/posts';

export async function GET(request: NextRequest) {
    return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.title || !body.excerpt || !body.content || !body.author) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const newPost = addPost({
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
