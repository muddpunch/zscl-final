import { UserRound } from "lucide-react";

const groups = [
  {
    title: "Samorząd",
    members: [
      { name: "Roksana Szczyrbowska · 1TLS", role: "Wiceprzewodnicząca", photo: "/images/samorzad/roksi_ok.jpg" },
      { name: "Zosia Młynarczyk · 4TŻE", role: "Przewodnicząca", photo: "/images/samorzad/zosia_ok.jpg" },
      { name: "Maja Skrzypek · 1TLS", role: "Wiceprzewodnicząca", photo: "/images/samorzad/maja.jpg" },
    ],
  },
  {
    title: "Nagłośnienie",
    members: [
      { name: "Wiktor Dobiasz · 4TIS", role: "Główny nagłaśniacz", photo: "/images/samorzad/wiktor-dobiasz-2026.jpg" },
      { name: "Mateusz Cieślak · 4TIS", role: "Główny nagłaśniacz", photo: "/images/samorzad/mateusz_ok.jpg" },
      { name: "Aleksander Jacek · 4TIS", role: "Nagłaśniacz", photo: "" },
    ],
  },
];

function TeamSection({ title, members }: (typeof groups)[number]) {
  return (
    <section aria-labelledby={`${title}-heading`} className="py-10 md:py-14">
      <div className="mb-8 text-center md:mb-10">
        <span className="mb-3 inline-block h-1 w-10 rounded-full bg-(--accent-colour)" aria-hidden="true" />
        <h2 id={`${title}-heading`} className="text-3xl font-bold tracking-tight text-gray-950 md:text-4xl">
          {title}
        </h2>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 justify-items-center gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {members.map((member, index) => (
          <article key={`${title}-${index}`} className="w-full max-w-sm border-2 border-gray-950 bg-white p-5 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-2 hover:border-(--accent-colour) hover:shadow-[0_16px_36px_rgba(128,0,32,0.2)] motion-reduce:transition-none sm:p-7">
            <div className="relative flex aspect-square items-center justify-center border-2 border-gray-950 bg-stone-50 text-gray-500">
              {member.photo ? (
                <img src={member.photo} alt={member.name} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <UserRound size={38} strokeWidth={1.4} aria-hidden="true" />
                  <span className="text-sm font-medium">Zdjęcie</span>
                </div>
              )}
            </div>

            <div className="mt-5 flex min-h-20 items-center justify-center border-2 border-gray-950 px-4 text-center">
              <span className="text-lg font-medium text-gray-900">{member.name}</span>
            </div>
            <div className="mx-auto mt-2 flex min-h-10 w-1/2 items-center justify-center border-2 border-gray-950 px-3 text-center">
              <span className="text-sm font-medium text-gray-800">{member.role}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function SamorzadPage() {
  return (
    <div className="bg-white">
      <header className="mx-auto max-w-4xl px-6 pb-4 pt-14 text-center md:pt-20">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-(--accent-colour)">ZSCL</p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">Samorząd</h1>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
          Poznaj osoby, które tworzą Samorząd Uczniowski lub pomagają w jego utworzeniu.
        </p>
      </header>

      <div className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        {groups.map(group => <TeamSection key={group.title} {...group} />)}
      </div>
    </div>
  );
}
