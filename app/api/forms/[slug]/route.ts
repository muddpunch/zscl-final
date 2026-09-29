import { NextRequest, NextResponse } from 'next/server';
import { deleteForm, getFormBySlug, setFormPublished, submitForm } from '@/lib/forms';
import { requireAdmin } from '@/lib/admin-auth';

type Context = { params: Promise<{ slug: string }> };

export async function GET(_request: NextRequest, { params }: Context) {
    const { slug } = await params;
    const form = await getFormBySlug(slug);
    return form ? NextResponse.json({ form }) : NextResponse.json({ error: 'Formularz nie istnieje.' }, { status: 404 });
}

export async function POST(request: NextRequest, { params }: Context) {
    const { slug } = await params;
    try {
        const answers = await request.json();
        if (!answers || typeof answers !== 'object' || Array.isArray(answers)) {
            return NextResponse.json({ error: 'Nieprawidłowe odpowiedzi.' }, { status: 400 });
        }
        const result = await submitForm(slug, answers);
        if ('ok' in result) return NextResponse.json({ ok: true });
        return NextResponse.json({ error: result.error }, { status: result.status });
    } catch {
        return NextResponse.json({ error: 'Nie udało się wysłać odpowiedzi.' }, { status: 400 });
    }
}

export async function PATCH(request: NextRequest, { params }: Context) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    const { slug } = await params;
    try {
        const { published } = await request.json();
        if (typeof published !== 'boolean') return NextResponse.json({ error: 'Nieprawidłowy status.' }, { status: 400 });
        const updated = await setFormPublished(slug, published);
        return updated ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Nie znaleziono formularza.' }, { status: 404 });
    } catch {
        return NextResponse.json({ error: 'Nie udało się zmienić statusu.' }, { status: 400 });
    }
}

export async function DELETE(request: NextRequest, { params }: Context) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    const { slug } = await params;
    const deleted = await deleteForm(slug);
    return deleted ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Nie znaleziono formularza.' }, { status: 404 });
}
