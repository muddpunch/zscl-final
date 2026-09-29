import { NextRequest, NextResponse } from 'next/server';
import { deletePost, getPostBySlug } from '@/lib/posts';
import { requireAdmin } from '@/lib/admin-auth';

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    const { slug } = await params;

    const success = await deletePost(slug);

    if (success) {
        return NextResponse.json({ message: 'Post deleted successfully' });
    } else {
        return NextResponse.json(
            { error: 'Post not found' },
            { status: 404 }
        );
    }
}
