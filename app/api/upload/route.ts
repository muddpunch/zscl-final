import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';

const extensions: Record<string, string> = {
    'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif',
};
const MAX_FILE_SIZE = 8 * 1024 * 1024;

function hasValidSignature(type: string, bytes: Buffer) {
    if (type === 'image/jpeg') return bytes.length > 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
    if (type === 'image/png') return bytes.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    if (type === 'image/gif') return ['GIF87a', 'GIF89a'].includes(bytes.toString('ascii', 0, 6));
    if (type === 'image/webp') return bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
    return false;
}

export async function POST(request: NextRequest) {
    const denied = requireAdmin(request);
    if (denied) return denied;
    const data = await request.formData();
    const file = data.get('file');
    if (!(file instanceof File) || !extensions[file.type] || file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'Wybierz obraz JPG, PNG, WEBP lub GIF do 8 MB.' }, { status: 400 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    if (!hasValidSignature(file.type, bytes)) {
        return NextResponse.json({ error: 'Plik nie wygląda na wybrany format obrazu.' }, { status: 400 });
    }

    const filename = `${randomUUID()}.${extensions[file.type]}`;
    const directory = join(process.cwd(), 'public', 'uploads');
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, filename), bytes, { flag: 'wx' });
    return NextResponse.json({ url: `/uploads/${filename}` }, { status: 201 });
}
