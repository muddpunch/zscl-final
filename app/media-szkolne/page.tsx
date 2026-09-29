type MediaIcon = "instagram" | "youtube" | "website";

const media = [
  { label: "Instagram Szkoły", icon: "instagram", href: "https://www.instagram.com/zsczl/" },
  { label: "Instagram Samorządu", icon: "instagram", href: "https://www.instagram.com/samorzad_zscl/" },
  { label: "YouTube", icon: "youtube", href: "https://www.youtube.com/channel/UCNv4GN5ZxjTnjEY5DoEQOlQ" },
  { label: "Strona szkoły", icon: "website", href: "https://zscl.pl/" },
] satisfies { label: string; icon: MediaIcon; href: string }[];

function Icon({ name }: { name: MediaIcon }) {
  if (name === "instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-14 w-14">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
      </svg>
    );
  }

  if (name === "youtube") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-14 w-14">
        <rect x="2.5" y="5" width="19" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="m10 9 5 3-5 3V9Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-14 w-14">
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2.8 12h18.4M12 2.5c2.4 2.6 3.6 5.8 3.6 9.5s-1.2 6.9-3.6 9.5C9.6 18.9 8.4 15.7 8.4 12S9.6 5.1 12 2.5Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function MediaSzkolnePage() {
  return (
    <div className="min-h-[70vh] bg-white px-6 py-16 md:py-24">
      <header className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-(--accent-colour)">ZSCL</p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-950 md:text-5xl">Media Szkolne</h1>
        <p className="mt-4 text-base leading-7 text-gray-600 md:text-lg">
          Znajdź nas w mediach społecznościowych i odwiedź stronę szkoły.
        </p>
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {media.map(item => (
          <a
            key={item.label}
            href={item.href}
            aria-label={item.label}
            className="group flex min-h-64 flex-col items-center border-2 border-gray-950 bg-white px-6 pt-8 text-(--accent-colour) transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-2 hover:border-(--accent-colour) hover:shadow-[0_16px_36px_rgba(128,0,32,0.2)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--accent-colour) motion-reduce:transition-none"
          >
            <div className="flex flex-1 items-center justify-center transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none">
              <Icon name={item.icon} />
            </div>
            <span className="w-full border-t border-gray-200 py-5 text-center text-sm font-semibold text-gray-900">
              {item.label}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
