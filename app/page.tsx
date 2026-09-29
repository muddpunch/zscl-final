import HeroSection from "./components/HeroSection";
import ContentWithCTA from "./components/ContentWithCTA";
import Columns from "./components/Columns";
import FeatureCard from "./components/FeatureCard";
import BlogCard from "./components/Blog/BlogCard";
import { BookOpen, Users, MessageSquare, Calendar, ArrowRight } from "lucide-react";
import { getPaginatedPosts, Post } from "@/lib/posts";
import { getUpcomingEvents, CATEGORY_COLORS } from "@/lib/events";
import Link from "next/link";

export default async function Home() {
  // Keep the public landing page available while the local database is offline.
  const [{ posts: latestPosts }, upcomingEvents] = await Promise.all([
    getPaginatedPosts(1, 3).catch(() => ({ posts: [], totalPages: 0 })),
    getUpcomingEvents(4).catch(() => []),
  ]);

  return (
    <>
      <HeroSection
        title="Samorząd Uczniowski ZSCL"
        subtitle="Razem budujemy przyszłość naszej szkoły. Dołącz do nas i sprawmy, by ZSCL było miejscem przyjaznym dla każdego."
        image="/images/baner.webp"
        primaryButtonText="Aktualności"
        primaryButtonLink="/blog"
        secondaryButtonText="Kalendarz"
        secondaryButtonLink="/kalendarz"
      />

      {/* Latest News Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Aktualności</h2>
              <p className="text-gray-600">Dowiedz się, co dzieje się w naszej szkole</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-(--accent-colour) font-bold hover:gap-3 transition-all">
              Zobacz wszystkie <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map((post: Post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          <div className="mt-10 text-center md:hidden">
            <Link href="/blog" className="inline-flex items-center gap-2 text-(--accent-colour) font-bold">
              Zobacz wszystkie <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Nadchodzące Wydarzenia</h2>
              <p className="text-gray-600">Bądź na bieżąco z planem szkolnym</p>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => {
                const eventDate = new Date(event.date);
                const day = eventDate.getDate();
                const month = eventDate.toLocaleString('pl-PL', { month: 'short' }).replace('.', '');
                const colors = CATEGORY_COLORS[event.category] || CATEGORY_COLORS.academic;

                return (
                  <div key={event.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6 hover:shadow-md transition-shadow">
                    <div className="shrink-0 w-16 h-16 bg-red-50 rounded-xl flex flex-col items-center justify-center text-(--accent-colour)">
                      <span className="text-2xl font-bold leading-none">{day}</span>
                      <span className="text-xs font-bold uppercase">{month}</span>
                    </div>
                    <div className="grow">
                      <div className="flex flex-wrap items-center gap-3 mb-1">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${colors.bg} ${colors.text} ${colors.border}`}>
                          {event.category === 'academic' ? 'Nauka' : 
                           event.category === 'sports' ? 'Sport' : 
                           event.category === 'council' ? 'Samorząd' : 
                           event.category === 'holidays' ? 'Święta' : 'Egzaminy'}
                        </span>
                        {event.startTime && (
                          <span className="text-xs text-gray-500 flex items-center gap-1">
                             {event.startTime} {event.endTime ? `- ${event.endTime}` : ''}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
                      {event.location && (
                        <p className="text-sm text-gray-500">{event.location}</p>
                      )}
                    </div>
                    <div className="hidden sm:block">
                       <Link href="/kalendarz" className="p-3 rounded-full bg-gray-50 text-gray-400 hover:text-(--accent-colour) hover:bg-red-50 transition-colors">
                         <Calendar size={20} />
                       </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <Link href="/kalendarz" className="inline-flex items-center gap-2 px-8 py-3 bg-(--accent-colour) text-white rounded-full font-bold hover:shadow-lg transition-all active:scale-95">
                Pełny kalendarz <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ContentWithCTA
        title="Samorząd Uczniowski ZSCL"
        content="Wspólnie tworzymy lepsze środowisko do nauki i rozwoju. Twój głos ma znaczenie w życiu naszej społeczności."
        ctaButton="Wszystkie Aktualności"
        ctaButtonLink="/blog"
      />

      <Columns count={3}>
        <FeatureCard
          icon={BookOpen}
          title="Prawa Ucznia"
          description="Pobierz oficjalny podręcznik i dowiedz się o swoich prawach oraz obowiązkach na terenie szkoły."
        />
        <FeatureCard
          icon={Users}
          title="Kluby i Organizacje"
          description="Znajdź swoją społeczność. Przeglądaj listę ponad 20 aktywnych organizacji studenckich."
        />
        <FeatureCard
          icon={MessageSquare}
          title="Kontakt z Reprezentacją"
          description="Masz propozycję zmian? Skontaktuj się bezpośrednio ze swoimi przedstawicielami w samorządzie."
        />
      </Columns>
    </>
  );
}

