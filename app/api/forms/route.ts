import { NextRequest, NextResponse } from 'next/server';
import { createForm, getForms, type FormFieldType } from '@/lib/forms';
import { requireAdmin } from '@/lib/admin-auth';

const fieldTypes: FormFieldType[] = ['text', 'email', 'number', 'textarea', 'select', 'checkbox'];

export async function GET(request: NextRequest) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    return NextResponse.json({ forms: await getForms() });
}

export async function POST(request: NextRequest) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    try {
        const body = await request.json();
        const title = typeof body.title === 'string' ? body.title.trim() : '';
        const description = typeof body.description === 'string' ? body.description : '';
        if (!title || !Array.isArray(body.fields) || body.fields.length < 1 || body.fields.length > 40) {
            return NextResponse.json({ error: 'Podaj tytuł i od 1 do 40 pól formularza.' }, { status: 400 });
        }

        const labels = new Set<string>();
        const fields = body.fields.map((field: Record<string, unknown>) => {
            const label = typeof field.label === 'string' ? field.label.trim() : '';
            if (!label || label.length > 120 || !fieldTypes.includes(field.type as FormFieldType)) throw new Error('Nieprawidłowe pole.');
            const normalized = label.toLocaleLowerCase('pl');
            if (labels.has(normalized)) throw new Error('Nazwy pól muszą być unikalne, bo staną się nagłówkami kolumn CSV.');
            labels.add(normalized);
            const type = field.type as FormFieldType;
            const options = type === 'select' && Array.isArray(field.options)
                ? field.options.filter((option): option is string => typeof option === 'string').map(option => option.trim()).filter(Boolean).slice(0, 50)
                : undefined;
            if (type === 'select' && !options?.length) throw new Error(`Dodaj opcje do pola „${label}”.`);
            return {
                id: crypto.randomUUID(), label, type,
                required: Boolean(field.required), ...(options ? { options } : {}),
            };
        });

        return NextResponse.json({ form: await createForm(title, description, fields) }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Nie udało się zapisać formularza.' }, { status: 400 });
    }
}
