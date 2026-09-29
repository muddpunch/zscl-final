import Image from 'next/image';
import { UserRound } from 'lucide-react';

export const metadata = {
  title: 'O nas | Samorząd Uczniowski ZSCL',
  description: 'Poznaj osoby z Samorządu Uczniowskiego i szkolnego zespołu nagłośnienia.',
};

const people = [
  {
    name: 'Zosia Młynarczyk', className: '4TŻE', role: 'Przewodnicząca',
    group: 'Samorząd', photo: '/images/samorzad/zosia_ok.jpg',
    description: 'Reprezentuje Samorząd Uczniowski i koordynuje jego działania oraz inicjatywy uczniowskie.',
  },
  {
    name: 'Roksana Szczyrbowska', className: '1TLS', role: 'Wiceprzewodnicząca',
    group: 'Samorząd', photo: '/images/samorzad/roksi_ok.jpg',
    description: 'Wspiera pracę przewodniczącej i pomaga realizować pomysły oraz działania samorządu.',
  },
  {
    name: 'Maja Skrzypek', className: '1TLS', role: 'Wiceprzewodnicząca',
    group: 'Samorząd', photo: '/images/samorzad/maja.jpg',
    description: 'Wspiera pracę samorządu i współtworzy inicjatywy dla społeczności szkolnej.',
  },
  {
    name: 'Wiktor "Szopen" Dobiasz', className: '4TIS', role: 'Główny nagłaśniacz',
    group: 'Nagłośnienie', photo: '/images/samorzad/wiktor-dobiasz-2026.jpg',
    description: 'Wielbiciel pana Roberta Hysy.',
  },
  {
    name: 'Mateusz "Cieślak" Cieślak', className: '4TIS', role: 'Główny nagłaśniacz',
    group: 'Nagłośnienie', photo: '/images/samorzad/mateusz_ok.jpg',
    description: 'Wielbiciel pana Roberta Hysy.',
  },
  {
    name: 'Aleksander "Jaca" Jacek', className: '4TIS', role: 'Nagłośnienie',
    group: 'Nagłośnienie', photo: '',
    description: 'aha.',
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-[70vh] bg-gray-50 px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-5xl">
        <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-(--accent-colour)">ZSCL</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">O nas</h1>
          <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
            Poznaj osoby tworzące Samorząd Uczniowski i zespół nagłośnienia.
          </p>
        </header>

        <div className="space-y-6 md:space-y-8">
          {people.map((person) => (
            <article key={person.name} className="grid overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md md:grid-cols-[280px_minmax(0,1fr)]">
              <div className="relative aspect-square bg-gray-100 md:aspect-auto md:min-h-[280px]">
                {person.photo ? (
                  <Image src={person.photo} alt={person.name} fill sizes="(max-width: 768px) 100vw, 280px" className="object-cover" />
                ) : (
                  <div className="flex h-full min-h-64 items-center justify-center text-gray-400">
                    <UserRound size={64} strokeWidth={1.2} aria-label="Brak zdjęcia" />
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center p-6 md:p-9">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-(--accent-colour)">{person.group}</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-950 md:text-3xl">{person.name}</h2>
                <p className="mt-1 text-sm font-medium text-gray-500">Klasa {person.className}</p>
                <span className="mt-5 w-fit rounded-full bg-red-50 px-3.5 py-1.5 text-sm font-semibold text-(--accent-colour)">{person.role}</span>
                <p className="mt-5 max-w-2xl text-base leading-7 text-gray-700">{person.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
