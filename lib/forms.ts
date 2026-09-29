import { randomUUID } from 'node:crypto';
import { db } from './db';

export type FormFieldType = 'text' | 'email' | 'number' | 'textarea' | 'select' | 'checkbox';
export interface FormField {
    id: string;
    label: string;
    type: FormFieldType;
    required: boolean;
    options?: string[];
}
export interface CustomForm {
    id: string;
    title: string;
    description: string;
    slug: string;
    fields: FormField[];
    published: boolean;
    createdAt: string;
    responseCount?: number;
}
interface FormRow extends Omit<CustomForm, 'fields' | 'published' | 'responseCount' | 'createdAt'> {
    fields_json: string;
    published: number;
    created_at: string;
    response_count?: number;
}

const toForm = (row: FormRow): CustomForm => ({
    id: row.id, title: row.title, description: row.description, slug: row.slug,
    fields: JSON.parse(row.fields_json), published: Boolean(row.published),
    createdAt: row.created_at, responseCount: row.response_count,
});

function slugify(value: string) {
    return value.normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'formularz';
}

export async function getForms(): Promise<CustomForm[]> {
    const rows = db.prepare(`SELECT f.*, COUNT(r.id) AS response_count
        FROM forms f LEFT JOIN form_responses r ON r.form_id = f.id
        GROUP BY f.id ORDER BY f.created_at DESC`).all() as FormRow[];
    return rows.map(toForm);
}

export async function getFormBySlug(slug: string, includeDraft = false): Promise<CustomForm | null> {
    const visibility = includeDraft ? '' : 'AND published = 1';
    const row = db.prepare(`SELECT * FROM forms WHERE slug = ? ${visibility}`).get(slug) as FormRow | undefined;
    return row ? toForm(row) : null;
}

export async function getFormById(id: string): Promise<CustomForm | null> {
    const row = db.prepare('SELECT * FROM forms WHERE id = ?').get(id) as FormRow | undefined;
    return row ? toForm(row) : null;
}

export async function createForm(title: string, description: string, fields: FormField[]): Promise<CustomForm> {
    const id = randomUUID();
    const slug = `${slugify(title)}-${id.slice(0, 8)}`;
    db.prepare('INSERT INTO forms (id, title, description, slug, fields_json) VALUES (?, ?, ?, ?, ?)')
        .run(id, title.trim(), description.trim(), slug, JSON.stringify(fields));
    return (await getFormById(id))!;
}

export async function setFormPublished(id: string, published: boolean): Promise<boolean> {
    return db.prepare('UPDATE forms SET published = ? WHERE id = ? OR slug = ?').run(Number(published), id, id).changes > 0;
}

export async function deleteForm(id: string): Promise<boolean> {
    return db.prepare('DELETE FROM forms WHERE id = ? OR slug = ?').run(id, id).changes > 0;
}

export async function submitForm(slug: string, input: Record<string, unknown>) {
    const form = await getFormBySlug(slug);
    if (!form) return { error: 'Formularz nie istnieje lub nie jest aktywny.', status: 404 as const };

    const answers: Record<string, string | boolean> = {};
    for (const field of form.fields) {
        const raw = input[field.id];
        if (field.type === 'checkbox') {
            const checked = raw === true;
            if (field.required && !checked) return { error: `Zaznacz pole „${field.label}”.`, status: 400 as const };
            answers[field.id] = checked;
            continue;
        }

        const value = typeof raw === 'string' ? raw.trim() : '';
        if (field.required && !value) return { error: `Uzupełnij pole „${field.label}”.`, status: 400 as const };
        if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return { error: `Podaj poprawny adres e-mail w polu „${field.label}”.`, status: 400 as const };
        }
        if (field.type === 'number' && value && !Number.isFinite(Number(value))) {
            return { error: `Podaj liczbę w polu „${field.label}”.`, status: 400 as const };
        }
        if (field.type === 'select' && value && !field.options?.includes(value)) {
            return { error: `Wybierz jedną z dostępnych opcji w polu „${field.label}”.`, status: 400 as const };
        }
        answers[field.id] = value;
    }

    db.prepare('INSERT INTO form_responses (id, form_id, answers_json) VALUES (?, ?, ?)')
        .run(randomUUID(), form.id, JSON.stringify(answers));
    return { ok: true as const };
}

function csvCell(input: unknown) {
    let value = String(input ?? '');
    if (/^[\s]*[=+@\-\t\r]/.test(value)) value = `'${value}`;
    return `"${value.replace(/"/g, '""')}"`;
}

export async function getFormCsv(id: string): Promise<string | null> {
    const form = await getFormById(id);
    if (!form) return null;
    const rows = db.prepare('SELECT answers_json, submitted_at FROM form_responses WHERE form_id = ? ORDER BY submitted_at')
        .all(id) as { answers_json: string; submitted_at: string }[];
    const headers = ['Data wysłania', ...form.fields.map(field => field.label)];
    const lines = [headers, ...rows.map(row => {
        const answers = JSON.parse(row.answers_json) as Record<string, string | boolean>;
        return [row.submitted_at, ...form.fields.map(field => answers[field.id] ?? '')];
    })];
    return '\uFEFF' + lines.map(line => line.map(csvCell).join(',')).join('\r\n');
}

export async function getFormResponses(id: string) {
    const form = await getFormById(id);
    if (!form) return null;
    const rows = db.prepare('SELECT answers_json, submitted_at FROM form_responses WHERE form_id = ? ORDER BY submitted_at DESC')
        .all(id) as { answers_json: string; submitted_at: string }[];
    return {
        columns: ['Data wysłania', ...form.fields.map(field => field.label)],
        rows: rows.map(row => {
            const answers = JSON.parse(row.answers_json) as Record<string, string | boolean>;
            return [row.submitted_at, ...form.fields.map(field => answers[field.id] ?? '')];
        }),
    };
}
