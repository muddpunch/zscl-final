import { NextRequest, NextResponse } from 'next/server';
import { getFormById, getFormCsv } from '@/lib/forms';
import { requireAdmin } from '@/lib/admin-auth';

export async function GET(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    const { slug } = await params;
    const [form, csv] = await Promise.all([getFormById(slug), getFormCsv(slug)]);
    if (!form || csv === null) return NextResponse.json({ error: 'Nie znaleziono formularza.' }, { status: 404 });
    return new NextResponse(csv, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="${form.slug}-odpowiedzi.csv"`,
            'Cache-Control': 'no-store',
        },
    });
}
