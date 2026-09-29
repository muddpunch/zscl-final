'use client'
import CalendarGrid from '../components/Calendar/CalendarGrid';
import UpcomingSidebar from '../components/Calendar/UpcomingSidebar';
import { useState, useEffect } from 'react';
import type { Event } from '@/lib/events';
import { Loader2 } from 'lucide-react';

export default function CalendarPage() {
    const [pageEvents, setPageEvents] = useState<Event[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchEvents() {
            setLoading(true);
            try {
                // Fetch events from API
                const response = await fetch('/api/events', { cache: 'no-store' });
                const data = await response.json();
                const allEvents = data.events || [];
                setPageEvents(allEvents);

                const today = new Date().toLocaleDateString('sv-SE');
                const filtered = allEvents
                    .filter((e: Event) => e.date >= today)
                    .sort((a: Event, b: Event) => a.date.localeCompare(b.date))
                    .slice(0, 5);
                
                setUpcomingEvents(filtered);
            } catch (error) {
                console.error('Failed to fetch events:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchEvents();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="animate-spin text-(--accent-colour)" size={48} />
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-12">
            <div className="mb-12 text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
                    Kalendarz Szkolny
                </h1>
                <p className="text-lg text-gray-600">
                    Bądź na bieżąco z planami lekcji, wydarzeniami sportowymi i szkolnymi.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Main Calendar Area - 2/3 width on large screens */}
                <div className="w-full lg:w-2/3 xl:w-3/4">
                    <CalendarGrid events={pageEvents} />
                </div>

                {/* Sidebar Area - 1/3 width on large screens */}
                <div className="w-full lg:w-1/3 xl:w-1/4">
                    <UpcomingSidebar events={upcomingEvents} />
                </div>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span> Nauka
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span> Sport
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500"></span> Samorząd
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-500"></span> Święta
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-400"></span> Egzaminy
                </div>
            </div>
        </main>
    );
}
