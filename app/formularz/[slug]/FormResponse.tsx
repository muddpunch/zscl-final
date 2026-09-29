'use client';

import { FormEvent, useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';
import type { CustomForm } from '@/lib/forms';

export default function FormResponse({ form }: { form: CustomForm }) {
    const [answers, setAnswers] = useState<Record<string, string | boolean>>({});
    const [error, setError] = useState('');
    const [sent, setSent] = useState(false);
    const [busy, setBusy] = useState(false);

    async function submit(event: FormEvent) {
        event.preventDefault(); setBusy(true); setError('');
        try {
            const response = await fetch(`/api/forms/${form.slug}`, {
                method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(answers),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Nie udało się wysłać odpowiedzi.');
            setSent(true);
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : 'Nie udało się wysłać odpowiedzi.');
        } finally { setBusy(false); }
    }

    if (sent) return (
        <div className="mx-auto grid min-h-[60vh] max-w-xl place-items-center px-5 py-16 text-center">
            <div><CheckCircle2 className="mx-auto text-green-700" size={52} /><h1 className="mt-5 text-3xl font-bold">Dziękujemy za odpowiedź</h1><p className="mt-2 text-gray-600">Twoje zgłoszenie zostało zapisane.</p></div>
        </div>
    );

    return (
        <main className="min-h-[70vh] bg-[#f7f6f4] px-4 py-12 sm:px-6">
            <form onSubmit={submit} className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <header className="border-t-8 border-[#780000] px-6 py-7 sm:px-9">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#780000]">ZSCL · formularz</p>
                    <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-950">{form.title}</h1>
                    {form.description && <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-gray-600">{form.description}</p>}
                    <p className="mt-5 text-xs text-gray-500"><span className="text-red-700">*</span> Pole wymagane</p>
                </header>

                <div className="space-y-4 px-6 pb-6 sm:px-9">
                    {form.fields.map(field => (
                        <div key={field.id} className="rounded-xl border border-gray-200 p-4 sm:p-5">
                            {field.type === 'checkbox' ? (
                                <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm font-medium text-gray-900">
                                    <input type="checkbox" required={field.required} checked={Boolean(answers[field.id])} onChange={event => setAnswers(current => ({ ...current, [field.id]: event.target.checked }))} className="h-5 w-5 accent-[#780000]" />
                                    <span>{field.label}{field.required && <span className="ml-1 text-red-700" aria-hidden="true">*</span>}</span>
                                </label>
                            ) : <>
                                <label htmlFor={field.id} className="mb-3 block text-sm font-semibold text-gray-900">{field.label}{field.required && <span className="ml-1 text-red-700" aria-hidden="true">*</span>}</label>
                                {field.type === 'textarea' ? (
                                    <textarea id={field.id} required={field.required} rows={4} value={String(answers[field.id] ?? '')} onChange={event => setAnswers(current => ({ ...current, [field.id]: event.target.value }))} className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#780000] focus:ring-4 focus:ring-red-900/10" />
                                ) : field.type === 'select' ? (
                                    <select id={field.id} required={field.required} value={String(answers[field.id] ?? '')} onChange={event => setAnswers(current => ({ ...current, [field.id]: event.target.value }))} className="min-h-11 w-full rounded-lg border border-gray-300 bg-white px-3 outline-none focus:border-[#780000]">
                                        <option value="">Wybierz odpowiedź</option>{field.options?.map(option => <option key={option} value={option}>{option}</option>)}
                                    </select>
                                ) : <input id={field.id} type={field.type} required={field.required} value={String(answers[field.id] ?? '')} onChange={event => setAnswers(current => ({ ...current, [field.id]: event.target.value }))} className="min-h-11 w-full rounded-lg border border-gray-300 px-3 outline-none focus:border-[#780000] focus:ring-4 focus:ring-red-900/10" />}
                            </>}
                        </div>
                    ))}
                    {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{error}</p>}
                    <button disabled={busy} className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#780000] px-5 font-semibold text-white hover:bg-[#5a0000] disabled:opacity-60"><Send size={17} />{busy ? 'Wysyłanie…' : 'Wyślij odpowiedź'}</button>
                </div>
            </form>
        </main>
    );
}
