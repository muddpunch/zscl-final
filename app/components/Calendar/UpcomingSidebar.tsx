'use client'
import { Event } from '@/lib/events';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import EventCategoryBadge from './EventCategoryBadge';
import { Clock, MapPin } from 'lucide-react';

interface UpcomingSidebarProps {
    events: Event[];
}

export default function UpcomingSidebar({ events }: UpcomingSidebarProps) {
    // In a real app, this would filter based on "current" date
    // For mock data, we'll just show the first few
    const upcomingEvents = events.slice(0, 5);

    return (
        <div className="bg-gradient-to-br from-red-900 to-red-950 text-white rounded-3xl p-6 lg:p-8 shadow-xl h-full">
            <h2 className="text-2xl font-bold mb-2">W tym tygodniu</h2>
            <p className="text-red-200 text-sm mb-8">Nie przegap ważnych terminów.</p>

            <div className="space-y-4">
                {upcomingEvents.map(event => (
                    <div key={event.id} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                            <EventCategoryBadge category={event.category} />
                            <span className="text-xs text-white/70 font-medium">
                                {format(parseISO(event.date), 'EEE, d MMM', { locale: pl })}
                            </span>
                        </div>

                        <h3 className="font-bold text-lg leading-tight mb-2">{event.title}</h3>

                        <div className="space-y-1 text-sm text-gray-300">
                            {(event.startTime) && (
                                <div className="flex items-center gap-2">
                                    <Clock size={14} className="text-red-400" />
                                    <span>
                                        {event.startTime}
                                        {event.endTime ? ` - ${event.endTime}` : ''}
                                    </span>
                                </div>
                            )}

                            {event.location && (
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} className="text-red-400" />
                                    <span>{event.location}</span>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <button className="w-full mt-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold transition-all flex items-center justify-center gap-2 group">
                <span className="group-hover:translate-x-1 transition-transform">Pobierz harmonogram</span>
            </button>
        </div>
    );
}
