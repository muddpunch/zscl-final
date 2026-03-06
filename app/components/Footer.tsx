'use client'
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GraduationCap, Mail, MapPin, Globe, Camera } from 'lucide-react';

export default function Footer() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path ? 'text-white font-semibold' : 'text-white/80 hover:text-white';

    return (
        <footer className="w-full bg-(--accent-colour) text-white pt-16 pb-8 mt-20">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="md:col-span-6 flex flex-col gap-6">
                        <div className="flex items-center gap-2">
                            <GraduationCap size={40} className="text-white" />
                            <span className="text-3xl font-extrabold tracking-wide">ZSCL</span>
                        </div>
                        <p className="text-white/80 leading-relaxed max-w-sm">
                            Reprezentujemy społeczność uczniowską z dumą, uczciwością i pełnym zaangażowaniem.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-3 flex flex-col gap-6">
                        <h4 className="text-(--button-colour) font-bold uppercase tracking-widest text-sm">Nawigacja</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="/blog" className={`transition-colors ${isActive('/blog')}`}>Aktualności</Link>
                            <Link href="/galeria" className={`transition-colors ${isActive('/galeria')}`}>Galeria</Link>
                            <Link href="/kalendarz" className={`transition-colors ${isActive('/kalendarz')}`}>Kalendarz</Link>
                            <Link href="/o-nas" className={`transition-colors ${isActive('/o-nas')}`}>O nas</Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-3 flex flex-col gap-6">
                        <h4 className="text-(--button-colour) font-bold uppercase tracking-widest text-sm">Kontakt</h4>
                        <div className="flex flex-col gap-4 text-white/80">
                            <a href="mailto:su@zscl.edu.pl" className="flex items-center gap-3 hover:text-white transition-colors">
                                <Mail size={18} />
                                <span>su@zscl.edu.pl</span>
                            </a>
                            <div className="flex items-center gap-3">
                                <MapPin size={18} />
                                <span>Sala 104, Budynek Główny</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/60">
                    <p>© 2026 Samorząd Uczniowski ZSCL. Wszelkie prawa zastrzeżone.</p>
                    <div className="flex gap-4">
                        <Link href="#"><Globe size={20} className="hover:text-white transition-colors" /></Link>
                        <Link href="#"><Camera size={20} className="hover:text-white transition-colors" /></Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
