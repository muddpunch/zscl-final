'use client'

interface ColumnsProps {
    count: number;
    children: React.ReactNode;
}

export default function Columns({ count, children }: ColumnsProps) {
    // Tailwind needs complete class names to scan them, so we map the count to the class
    const gridClass = {
        1: 'lg:grid-cols-1',
        2: 'lg:grid-cols-2',
        3: 'lg:grid-cols-3',
        4: 'lg:grid-cols-4',
    }[count] || 'lg:grid-cols-3';

    return (
        <section className="container mx-auto px-4 py-12">
            <div className={`grid grid-cols-1 md:grid-cols-2 ${gridClass} gap-8`}>
                {children}
            </div>
        </section>
    );
}