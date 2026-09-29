'use client';

import { ReactNode, useEffect, useState } from 'react';
import { LockKeyhole } from 'lucide-react';

export default function AdminAccess({ children }: { children: ReactNode }) {
    const [ready, setReady] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [demo, setDemo] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [busy, setBusy] = useState(false);

    async function refreshSession() {
        const response = await fetch('/api/admin/session', { cache: 'no-store' });
        const session = await response.json();
        setAuthenticated(session.authenticated);
        setDemo(session.demo);
        setReady(true);
    }

    useEffect(() => { void refreshSession(); }, []);

    async function login(event: { preventDefault(): void }, skip = false) {
        event.preventDefault();
        setBusy(true);
        setError('');
        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(skip ? { skip: true } : { password }),
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Logowanie nie powiodło się.');
            await refreshSession();
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : 'Nie udało się zalogować.');
        } finally {
            setBusy(false);
        }
    }

    if (!ready) return <div className="grid min-h-screen place-items-center text-sm text-gray-500">Sprawdzanie sesji…</div>;
    if (!authenticated) {
        return (
            <div className="grid min-h-screen place-items-center bg-[#f6f5f2] p-5">
                <form onSubmit={event => login(event)} className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 shadow-xl shadow-gray-900/5">
                    <div className="mb-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#780000]"><LockKeyhole size={23} /></div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#780000]">ZSCL · panel</p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-950">Logowanie</h1>
                    <p className="mt-2 text-sm leading-6 text-gray-600">Wpisz hasło administratora, aby zarządzać treścią strony.</p>
                    <label htmlFor="admin-password" className="mt-7 block text-sm font-semibold text-gray-800">Hasło</label>
                    <input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={event => setPassword(event.target.value)} className="mt-2 min-h-12 w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-[#780000] focus:ring-4 focus:ring-red-900/10" />
                    {error && <p role="alert" className="mt-3 text-sm text-red-700">{error}</p>}
                    <button disabled={busy} className="mt-5 min-h-12 w-full rounded-xl bg-[#780000] px-4 font-semibold text-white transition hover:bg-[#5a0000] disabled:opacity-60">Zaloguj się</button>
                    {process.env.NODE_ENV !== 'production' && (
                        <button type="button" disabled={busy} onClick={event => login(event, true)} className="mt-3 min-h-12 w-full rounded-xl border border-gray-300 px-4 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-60">Pomiń logowanie · tryb lokalny</button>
                    )}
                </form>
            </div>
        );
    }

    return (
        <>
            {demo && <div role="status" className="fixed bottom-4 right-4 z-[100] max-w-sm rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-950 shadow-lg">Tryb demonstracyjny: „Pomiń logowanie” działa tylko lokalnie. Ustaw `ADMIN_PASSWORD` przed udostępnieniem panelu.</div>}
            {children}
        </>
    );
}
