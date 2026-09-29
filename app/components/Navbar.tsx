'use client'
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        {
            name: "O nas",
            href: "/o-nas"
        },
        {
            name: "Samorząd",
            href: "/samorzad"
        },
        {
            name: "Aktualności",
            href: "/blog"
        },
        {
            name: "Galeria",
            href: "/galeria"
        },
        {
            name: "Kalendarz",
            href: "/kalendarz"
        },
        {
            name: "Media Szkolne",
            href: "/media-szkolne"
        },
    ];

    return (
        <nav className="fixed top-0 w-full bg-white z-50 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <div className="shrink-0 flex items-center gap-2">
                        <Link href={"/"} className="flex items-center gap-2">
                            {/* Assuming logo.png is the icon. If it includes text, we might not need the h1. 
                                 Based on the image, there is an icon and text. 
                                 I'll keep the image and add the text next to it conforming to the design. */}
                            <div className="relative w-10 h-10">
                                <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
                            </div>
                            <span className="text-2xl font-bold text-[var(--second-text)]">ZSCL</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                aria-current={pathname === link.href ? "page" : undefined}
                                className={`text-base font-medium transition-colors duration-200 ${pathname === link.href
                                    ? "text-[var(--second-text)] font-bold"
                                    : "text-gray-700 hover:text-[var(--second-text)]"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors text-[var(--second-text)]">
                            <Search size={20} />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center md:hidden gap-4">
                        <button className="p-2 rounded-full bg-gray-100 text-[var(--second-text)]">
                            <Search size={20} />
                        </button>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            aria-label={isOpen ? "Zamknij menu" : "Otwórz menu"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-navigation"
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[var(--second-text)] focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div id="mobile-navigation" className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 font-bold h-screen">
                    <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center justify-center h-full gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                aria-current={pathname === link.href ? "page" : undefined}
                                className={`block px-3 py-2 rounded-md text-xl font-medium ${pathname === link.href
                                    ? "text-[var(--second-text)] bg-red-50"
                                    : "text-gray-700 hover:text-[var(--second-text)] hover:bg-gray-50"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}
