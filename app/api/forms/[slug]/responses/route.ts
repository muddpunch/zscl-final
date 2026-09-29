import { NextRequest, NextResponse } from 'next/server';
import { getFormResponses } from '@/lib/forms';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    const { slug } = await params;
    const result = await getFormResponses(slug);
    return result ? NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } })
        : NextResponse.json({ error: 'Nie znaleziono formularza.' }, { status: 404 });
}
