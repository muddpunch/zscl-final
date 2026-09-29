'use client'
import { X, Clock, MapPin, Calendar } from 'lucide-react';
import { CATEGORY_COLORS, type Event } from '@/lib/event-types';
import { format, parseISO } from 'date-fns';
import { pl } from 'date-fns/locale';
import EventCategoryBadge from './EventCategoryBadge';
import { useEffect } from 'react';

interface EventModalProps {
    event: Event;
    onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'auto';
        };
    }, [onClose]);

    const colors = CATEGORY_COLORS[event.category];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className={`p-6 border-b border-gray-100 flex justify-between items-start ${colors.bg}`}>
                    <div>
                        <EventCategoryBadge category={event.category} className="mb-2 shadow-sm" />
                        <h3 className={`text-xl font-bold ${colors.text}`}>{event.title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-1 rounded-full hover:bg-black/5 transition-colors ${colors.text}`}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                    <div className="flex items-start gap-4 text-gray-700">
                        <Calendar className="text-gray-400 mt-0.5 shrink-0" size={20} />
                        <div>
                            <p className="font-semibold">Data</p>
                            <p className="text-sm text-gray-500">{format(parseISO(event.date), 'EEEE, d MMMM yyyy', { locale: pl })}</p>
                        </div>
                    </div>

                    {event.startTime && (
                        <div className="flex items-start gap-4 text-gray-700">
                            <Clock className="text-gray-400 mt-0.5 shrink-0" size={20} />
                            <div>
                                <p className="font-semibold">Czas</p>
                                <p className="text-sm text-gray-500">
                                    {event.startTime}
                                    {event.endTime ? ` - ${event.endTime}` : ''}
                                </p>
                            </div>
                        </div>
                    )}

                    {event.location && (
                        <div className="flex items-start gap-4 text-gray-700">
                            <MapPin className="text-gray-400 mt-0.5 shrink-0" size={20} />
                            <div>
                                <p className="font-semibold">Lokalizacja</p>
                                <p className="text-sm text-gray-500">{event.location}</p>
                            </div>
                        </div>
                    )}

                    {event.description && (
                        <div className="pt-4 border-t border-gray-100 mt-4">
                            <p className="text-gray-600 leading-relaxed text-sm">
                                {event.description}
                            </p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="text-sm font-semibold text-gray-500 hover:text-gray-800 transition-colors"
                    >
                        Zamknij podgląd
                    </button>
                </div>
            </div>
        </div>
    );
}
