'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
    LayoutDashboard,
    Calendar,
    Image as ImageIcon,
    FileText,
    ClipboardList,
    Settings,
    LogOut,
    Menu,
    X,
} from 'lucide-react';

export default function AdminSidebar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    const navItems = [
        { name: 'Panel', href: '/admin', icon: LayoutDashboard },
        { name: 'Wydarzenia', href: '/admin/events', icon: Calendar },
        { name: 'Galeria', href: '/admin/gallery', icon: ImageIcon },
        { name: 'Posty na blogu', href: '/admin/blog', icon: FileText },
        { name: 'Formularze i głosowania', href: '/admin/forms', icon: ClipboardList },
    ];

    return (
        <>
        <div className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between bg-[#780000] px-4 text-white shadow-lg lg:hidden">
            <span className="font-bold tracking-wide">ZSCL Admin</span>
            <button type="button" aria-label={mobileOpen ? 'Zamknij menu panelu' : 'Otwórz menu panelu'} aria-expanded={mobileOpen} aria-controls="admin-mobile-nav" onClick={() => setMobileOpen(open => !open)} className="grid h-11 w-11 place-items-center rounded-lg hover:bg-white/10">
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
        </div>
        {mobileOpen && <nav id="admin-mobile-nav" className="fixed inset-x-0 top-16 z-40 space-y-1 bg-[#780000] p-3 text-white shadow-xl lg:hidden">
            {navItems.map(item => <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} aria-current={pathname === item.href ? 'page' : undefined} className={`flex min-h-12 items-center gap-3 rounded-lg px-3 ${pathname === item.href ? 'bg-white/15 font-semibold' : 'text-white/80 hover:bg-white/10'}`}><item.icon size={18} />{item.name}</Link>)}
            <button onClick={async () => { await fetch('/api/admin/session', { method: 'DELETE' }); window.location.reload(); }} className="flex min-h-12 w-full items-center gap-3 rounded-lg px-3 text-left text-white/80 hover:bg-white/10"><LogOut size={18} />Wyloguj</button>
        </nav>}
        <aside className="fixed left-0 top-0 z-50 hidden h-screen w-64 flex-col bg-[#780000] text-white lg:flex">
            {/* Logo Area */}
            <div className="p-8 pb-4">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#780000] font-bold">
                        Z
                    </div>
                    <div className="font-bold text-xl tracking-wide">ZSCL Admin</div>
                </div>
                <div className="text-white/60 text-xs pl-11">Samorząd Uczniowski</div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                    ? 'bg-white/10 text-white shadow-lg font-medium'
                                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} className={isActive ? 'text-white' : 'text-white/70 group-hover:text-white'} />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 border-t border-white/10 space-y-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left">
                    <Settings size={20} />
                    <span>Ustawienia</span>
                </button>
                <button onClick={async () => { await fetch('/api/admin/session', { method: 'DELETE' }); window.location.reload(); }} className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left">
                    <LogOut size={20} />
                    <span>Wyloguj</span>
                </button>

                <div className="mt-6 flex items-center gap-3 px-4 pt-2">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-[#780000] font-bold">ZS</div>
                    </div>
                    <div>
                        <div className="text-sm font-bold">Administrator</div>
                        <div className="text-xs text-white/50">Panel ZSCL</div>
                    </div>
                </div>
            </div>
        </aside>
        </>
    );
}
