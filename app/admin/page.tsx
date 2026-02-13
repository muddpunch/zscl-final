'use client'
import {
    Users,
    Calendar,
    Activity,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    MapPin,
    MoreHorizontal
} from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        {
            label: 'Total Students',
            value: '420',
            change: '+2%',
            trend: 'up',
            icon: Users,
            color: 'bg-blue-100 text-blue-600'
        },
        {
            label: 'Upcoming Events',
            value: '3',
            change: 'This week',
            trend: 'neutral',
            icon: Calendar,
            color: 'bg-purple-100 text-purple-600'
        },
        {
            label: 'Blog Views',
            value: '1.2k',
            change: '+12%',
            trend: 'up',
            icon: TrendingUp,
            color: 'bg-orange-100 text-orange-600'
        },
    ];

    const upcomingEvents = [
        { title: 'Homecoming Dance', date: 'Fri, Sep 29', time: '7:00 PM', location: 'Main Gym', type: 'Social' },
        { title: 'Student Council Meeting', date: 'Mon, Oct 2', time: '3:30 PM', location: 'Room 304', type: 'Academic' },
        { title: 'Football vs. North', date: 'Fri, Oct 6', time: '6:00 PM', location: 'Stadium', type: 'Sports' },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, Jane</h1>
                    <p className="text-gray-500 mt-2">Here's what's happening at ZSCL today.</p>
                </div>
                <button className="bg-[#780000] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-[#5a0000] transition-colors shadow-lg shadow-red-900/20">
                    + Create New Event
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start justify-between">
                        <div>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
                            <div className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</div>
                        </div>
                        <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${stat.trend === 'up' ? 'bg-green-100 text-green-700' :
                            stat.trend === 'down' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                            }`}>
                            {stat.trend === 'up' && <ArrowUpRight size={14} />}
                            {stat.trend === 'down' && <ArrowDownRight size={14} />}
                            {stat.change}
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Event Attendance Chart Placeholder */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-lg font-bold text-gray-900">Event Attendance</h2>
                        <select className="text-sm border-gray-200 rounded-lg p-1.5 bg-gray-50 text-gray-600">
                            <option>Last Semester</option>
                            <option>This Year</option>
                        </select>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-4 px-4">
                        <div className="w-full bg-red-50 rounded-t-lg relative group h-[60%] hover:h-[65%] transition-all">
                            <div className="absolute bottom-0 w-full bg-[#780000] rounded-t-lg h-[80%] opacity-90"></div>
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-medium">Pep Rally</span>
                        </div>
                        <div className="w-full bg-red-50 rounded-t-lg relative group h-[80%] hover:h-[85%] transition-all">
                            <div className="absolute bottom-0 w-full bg-[#780000] rounded-t-lg h-[90%] opacity-90"></div>
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-medium">Homecoming</span>
                        </div>
                        <div className="w-full bg-red-50 rounded-t-lg relative group h-[40%] hover:h-[45%] transition-all">
                            <div className="absolute bottom-0 w-full bg-[#780000] rounded-t-lg h-[70%] opacity-90"></div>
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-medium">Debate</span>
                        </div>
                        <div className="w-full bg-red-50 rounded-t-lg relative group h-[55%] hover:h-[60%] transition-all">
                            <div className="absolute bottom-0 w-full bg-[#780000] rounded-t-lg h-[85%] opacity-90"></div>
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-medium">Talent Show</span>
                        </div>
                        <div className="w-full bg-red-50 rounded-t-lg relative group h-[70%] hover:h-[75%] transition-all">
                            <div className="absolute bottom-0 w-full bg-yellow-400 rounded-t-lg h-[95%] opacity-90"></div>
                            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-gray-500 font-medium">Charity Run</span>
                        </div>
                    </div>
                </div>

                {/* Upcoming Events List */}
                <div className="bg-[#780000] p-6 rounded-2xl shadow-sm text-white">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold">Upcoming Events</h2>
                        <button className="text-white/70 hover:text-white transition-colors">
                            <MoreHorizontal size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {upcomingEvents.map((event, i) => (
                            <div key={i} className="bg-black/20 p-4 rounded-xl backdrop-blur-sm border border-white/5 hover:bg-black/30 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${event.type === 'Social' ? 'bg-purple-500/80' :
                                        event.type === 'Sports' ? 'bg-green-500/80' : 'bg-yellow-500/80 text-black'
                                        }`}>
                                        {event.type}
                                    </span>
                                    <span className="text-xs text-white/60">{event.date}</span>
                                </div>
                                <h3 className="font-bold text-sm mb-1">{event.title}</h3>
                                <div className="flex items-center gap-1.5 text-xs text-white/70">
                                    <MapPin size={12} />
                                    {event.location}
                                    <span className="mx-1">•</span>
                                    {event.time}
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-3 bg-white text-[#780000] rounded-xl font-bold hover:bg-gray-100 transition-colors">
                        View Calendar
                    </button>
                </div>
            </div>
        </div>
    );
}
