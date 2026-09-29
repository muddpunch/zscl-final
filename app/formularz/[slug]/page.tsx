import { notFound } from 'next/navigation';
import { getFormBySlug } from '@/lib/forms';
import FormResponse from './FormResponse';

export const dynamic = 'force-dynamic';

export default async function PublicFormPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const form = await getFormBySlug(slug);
    if (!form) notFound();
    return <FormResponse form={form} />;
}
