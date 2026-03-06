'use client'
import { useState, useEffect } from 'react';
import { Plus, Trash2, Image as ImageIcon, Search } from 'lucide-react';
import { Photo } from '@/lib/photos';
import Image from 'next/image';

export default function GalleryManagement() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        imageUrl: '',
        category: 'Życie Szkoły',
        event: '',
        description: ''
    });

    useEffect(() => {
        fetchPhotos();
    }, []);

    async function fetchPhotos() {
        try {
            const res = await fetch('/api/photos');
            const data = await res.json();
            setPhotos(data.photos || []);
        } catch (error) {
            console.error('Błąd podczas pobierania zdjęć', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Czy na pewno chcesz usunąć to zdjęcie?')) return;

        try {
            await fetch(`/api/photos/${id}`, { method: 'DELETE' });
            setPhotos(prev => prev.filter(p => p.id !== id));
        } catch (error) {
            alert('Nie udało się usunąć zdjęcia');
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await fetch('/api/photos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowAddModal(false);
                fetchPhotos();
                setFormData({
                    title: '',
                    imageUrl: '',
                    category: 'Życie Szkoły',
                    event: '',
                    description: ''
                });
            } else {
                alert('Nie udało się przesłać zdjęcia');
            }
        } catch (error) {
            alert('Błąd podczas przesyłania zdjęcia');
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Zarządzanie Galerią</h1>
                    <p className="text-gray-500">Zarządzaj zdjęciami i albumami w galerii.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-[#780000] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5a0000] transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    Dodaj zdjęcie
                </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {isLoading ? (
                    <div className="col-span-full py-12 text-center text-gray-500">Ładowanie zdjęć...</div>
                ) : photos.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-gray-500">Nie znaleziono zdjęć.</div>
                ) : (
                    photos.map(photo => (
                        <div key={photo.id} className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                            <Image
                                src={photo.imageUrl}
                                alt={photo.title}
                                fill
                                className="object-cover"
                            />

                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                                <div className="flex justify-end">
                                    <button
                                        onClick={() => handleDelete(photo.id)}
                                        className="p-2 bg-white/20 hover:bg-red-500 rounded-full backdrop-blur-sm transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm truncate">{photo.title}</h3>
                                    <p className="text-xs text-white/80">{photo.event}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Photo Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)}>
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
                        {/* Modal content similar to Events modal but adapted for photos */}
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Prześlij zdjęcie</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tytuł</label>
                                <input
                                    type="text" required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-[#780000] outline-none"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">URL obrazu</label>
                                <input
                                    type="url" required
                                    placeholder="https://..."
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-[#780000] outline-none"
                                    value={formData.imageUrl}
                                    onChange={e => setFormData({ ...formData, imageUrl: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 mt-1">Na razie wklej bezpośredni link do obrazu.</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategoria</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Życie Szkoły</option>
                                        <option>Sport</option>
                                        <option>Wydarzenia</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nazwa wydarzenia</label>
                                    <input
                                        type="text"
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none"
                                        value={formData.event}
                                        onChange={e => setFormData({ ...formData, event: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Anuluj</button>
                                <button type="submit" className="px-6 py-2 bg-[#780000] text-white rounded-lg hover:bg-[#5a0000]">Prześlij</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
