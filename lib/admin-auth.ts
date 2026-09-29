import { createHmac, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';

export const ADMIN_COOKIE = 'zscl_admin_session';
const SESSION_SECONDS = 8 * 60 * 60;
type SessionRole = 'admin' | 'demo';

function secret() {
    return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD ||
        (process.env.NODE_ENV === 'production' ? '' : 'local-development-only-secret');
}

function signature(payload: string) {
    const key = secret();
    return key ? createHmac('sha256', key).update(payload).digest('base64url') : '';
}

export function createSession(role: SessionRole) {
    const expires = Math.floor(Date.now() / 1000) + SESSION_SECONDS;
    const payload = `${expires}.${role}`;
    return { value: `${payload}.${signature(payload)}`, maxAge: SESSION_SECONDS };
}

export function getSessionRole(request: NextRequest): SessionRole | null {
    const value = request.cookies.get(ADMIN_COOKIE)?.value;
    if (!value) return null;
    const [expiresText, role, received] = value.split('.');
    if (!expiresText || !received || (role !== 'admin' && role !== 'demo')) return null;
    const expires = Number(expiresText);
    if (!Number.isSafeInteger(expires) || expires <= Date.now() / 1000) return null;
    if (role === 'demo' && process.env.NODE_ENV === 'production') return null;

    const expected = Buffer.from(signature(`${expiresText}.${role}`));
    const actual = Buffer.from(received);
    return expected.length === actual.length && timingSafeEqual(expected, actual) ? role : null;
}

export function requireAdmin(request: NextRequest) {
    if (getSessionRole(request)) return null;
    return NextResponse.json({ error: 'Zaloguj się, aby wykonać tę operację.' }, { status: 401 });
}

export function passwordMatches(input: string, expected: string) {
    const digest = (value: string) => createHmac('sha256', 'zscl-password-check').update(value).digest();
    return timingSafeEqual(digest(input), digest(expected));
}
