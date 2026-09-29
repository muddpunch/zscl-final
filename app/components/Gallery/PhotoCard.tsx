import type { Photo } from '@/lib/photos';

export default function PhotoCard({ photo }: { photo: Photo }) {
    return (
        <figure className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <div
                    role="img"
                    aria-label={photo.title}
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                    style={{ backgroundImage: `url(${JSON.stringify(photo.imageUrl)})` }}
                />
            </div>
            <figcaption className="p-4">
                <h3 className="font-bold text-gray-950">{photo.title}</h3>
                <p className="mt-1 text-sm font-medium text-(--accent-colour)">{photo.event}</p>
                {photo.description && <p className="mt-2 text-sm leading-6 text-gray-600">{photo.description}</p>}
            </figcaption>
        </figure>
    );
}
