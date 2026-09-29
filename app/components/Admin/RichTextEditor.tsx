'use client';

import { useEffect, useRef, useState } from 'react';
import { Bold, Heading2, ImagePlus, Italic, List, Underline } from 'lucide-react';

const tools = [
    { label: 'Pogrubienie', command: 'bold', icon: Bold },
    { label: 'Kursywa', command: 'italic', icon: Italic },
    { label: 'Podkreślenie', command: 'underline', icon: Underline },
    { label: 'Nagłówek', command: 'formatBlock', value: 'h2', icon: Heading2 },
    { label: 'Lista punktowana', command: 'insertUnorderedList', icon: List },
];

export default function RichTextEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
    const editor = useRef<HTMLDivElement>(null);
    const uploadInput = useRef<HTMLInputElement>(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (editor.current && editor.current.innerHTML !== value) editor.current.innerHTML = value;
    }, [value]);

    async function insertImage(file?: File) {
        if (!file) return;
        setBusy(true);
        setError('');
        try {
            const data = new FormData();
            data.set('file', file);
            const response = await fetch('/api/upload', { method: 'POST', body: data });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Nie udało się dodać zdjęcia.');
            editor.current?.focus();
            document.execCommand('insertHTML', false, `<p><img src="${result.url}" alt="" /></p>`);
            if (editor.current) onChange(editor.current.innerHTML);
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : 'Błąd wysyłania zdjęcia.');
        } finally {
            setBusy(false);
            if (uploadInput.current) uploadInput.current.value = '';
        }
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-300 focus-within:border-[#780000] focus-within:ring-4 focus-within:ring-red-900/10">
            <div role="toolbar" aria-label="Formatowanie tekstu" className="flex flex-wrap items-center gap-1 border-b border-gray-200 bg-gray-50 p-2">
                {tools.map(({ label, command, value: commandValue, icon: Icon }) => (
                    <button key={command} type="button" title={label} aria-label={label}
                        onMouseDown={event => event.preventDefault()}
                        onClick={() => { editor.current?.focus(); document.execCommand(command, false, commandValue); if (editor.current) onChange(editor.current.innerHTML); }}
                        className="grid h-10 w-10 place-items-center rounded-lg text-gray-700 hover:bg-white hover:text-[#780000]">
                        <Icon size={18} aria-hidden="true" />
                    </button>
                ))}
                <button type="button" title="Wstaw zdjęcie" aria-label="Wstaw zdjęcie" disabled={busy}
                    onMouseDown={event => event.preventDefault()} onClick={() => uploadInput.current?.click()}
                    className="grid h-10 w-10 place-items-center rounded-lg text-gray-700 hover:bg-white hover:text-[#780000] disabled:opacity-50">
                    <ImagePlus size={18} aria-hidden="true" />
                </button>
                <input ref={uploadInput} type="file" accept="image/jpeg,image/png,image/webp,image/gif" className="sr-only" onChange={event => void insertImage(event.target.files?.[0])} />
                {busy && <span className="px-2 text-xs text-gray-500">Wysyłanie zdjęcia…</span>}
            </div>
            <div ref={editor} contentEditable role="textbox" aria-label="Treść ogłoszenia" aria-multiline="true"
                data-placeholder="Napisz treść ogłoszenia…" onInput={event => onChange(event.currentTarget.innerHTML)}
                className="min-h-64 px-4 py-3 text-gray-900 outline-none [&_h2]:my-3 [&_h2]:text-2xl [&_img]:my-3 [&_img]:max-h-96 [&_img]:rounded-lg [&_img]:object-contain [&_li]:ml-6 [&_ul]:list-disc" />
            {error && <p role="alert" className="px-4 pb-3 text-sm text-red-700">{error}</p>}
        </div>
    );
}
