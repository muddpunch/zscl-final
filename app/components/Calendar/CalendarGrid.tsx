'use client'
import { useState } from 'react';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
    parseISO
} from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { CATEGORY_COLORS, type Event } from '@/lib/event-types';
import { pl } from 'date-fns/locale';
import EventCategoryBadge from './EventCategoryBadge';
import EventModal from './EventModal';

interface CalendarGridProps {
    events: Event[];
}

export default function CalendarGrid({ events }: CalendarGridProps) {
    const [currentMonth, setCurrentMonth] = useState(() => new Date());
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    // Generate calendar days
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday for PL
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const days = eachDayOfInterval({
        start: startDate,
        end: endDate
    });

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
    const goToToday = () => setCurrentMonth(new Date());

    const getEventsForDay = (date: Date) => {
        return events.filter(event => isSameDay(parseISO(event.date), date));
    };

    const weekDays = ['PON', 'WT', 'ŚR', 'CZW', 'PT', 'SOB', 'NDZ'];

    return (
        <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-100 h-full">
            {/* Calendar Header */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 capitalize">
                        {format(currentMonth, 'LLLL yyyy', { locale: pl })}
                    </h2>
                    <p className="text-red-500 font-medium tracking-wide text-sm mt-1 uppercase">
                        Wydarzenia szkolne
                    </p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                        <button
                            onClick={prevMonth}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-white rounded-md transition-all shadow-sm"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            onClick={goToToday}
                            className="px-4 py-2 text-sm font-semibold text-gray-700 hover:text-gray-900"
                        >
                            Dzisiaj
                        </button>
                        <button
                            onClick={nextMonth}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-white rounded-md transition-all shadow-sm"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="w-full">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 mb-4">
                    {weekDays.map(day => (
                        <div key={day} className="text-center text-xs font-bold text-gray-400 tracking-wider py-2">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 auto-rows-fr border-t border-l border-gray-100">
                    {days.map((day, dayIdx) => {
                        const dayEvents = getEventsForDay(day);
                        const isCurrentMonth = isSameMonth(day, monthStart);

                        return (
                            <div
                                key={day.toString()}
                                className={`
                                    min-h-[120px] p-2 border-b border-r border-gray-100 flex flex-col gap-2 relative bg-white
                                    ${!isCurrentMonth ? 'bg-gray-50/50' : ''}
                                `}
                            >
                                <span className={`
                                    text-sm font-semibold w-7 h-7 flex items-center justify-center rounded-full
                                    ${!isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                                    ${isSameDay(day, new Date()) ? 'bg-red-600 text-white' : ''}
                                `}>
                                    {format(day, 'd')}
                                </span>

                                <div className="flex flex-col gap-1.5 flex-1">
                                    {dayEvents.map(event => {
                                        const colors = CATEGORY_COLORS[event.category];
                                        return (
                                            <button
                                                key={event.id}
                                                onClick={() => setSelectedEvent(event)}
                                                className={`
                                                    text-[10px] md:text-xs p-1.5 rounded border-l-2 truncate leading-tight cursor-pointer hover:opacity-80 transition-opacity text-left w-full
                                                    ${colors.bg} ${colors.text} ${colors.border.replace('border', 'border-l')}
                                                `}
                                                title={event.title}
                                            >
                                                <span className="font-bold mr-1 block md:inline">
                                                    {event.startTime ? event.startTime : 'Cały dzień'}
                                                </span>
                                                {event.title}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Event Modal */}
            {selectedEvent && (
                <EventModal
                    event={selectedEvent}
                    onClose={() => setSelectedEvent(null)}
                />
            )}
        </div>
    );
}
