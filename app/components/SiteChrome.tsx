'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';

export default function SiteChrome({ children }: { children: ReactNode }) {
    const isAdmin = usePathname().startsWith('/admin');
    if (isAdmin) return children;

    return <><Navbar /><main className="pt-20">{children}</main><Footer /></>;
}
