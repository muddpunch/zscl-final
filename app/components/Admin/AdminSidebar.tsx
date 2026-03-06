'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Calendar,
    Image as ImageIcon,
    FileText,
    Users,
    Settings,
    LogOut
} from 'lucide-react';

export default function AdminSidebar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Panel', href: '/admin', icon: LayoutDashboard },
        { name: 'Wydarzenia', href: '/admin/events', icon: Calendar },
        { name: 'Galeria', href: '/admin/gallery', icon: ImageIcon },
        { name: 'Posty na blogu', href: '/admin/blog', icon: FileText },
        { name: 'Użytkownicy', href: '/admin/users', icon: Users },
    ];

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#780000] text-white flex flex-col z-50">
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
                <button className="w-full flex items-center gap-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-colors text-left">
                    <LogOut size={20} />
                    <span>Wyloguj</span>
                </button>

                <div className="mt-6 flex items-center gap-3 px-4 pt-2">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center text-[#780000] font-bold">JD</div>
                    </div>
                    <div>
                        <div className="text-sm font-bold">Jane Doe</div>
                        <div className="text-xs text-white/50">Przewodnicząca</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
