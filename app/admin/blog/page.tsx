'use client'
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, FileText } from 'lucide-react';
import { Post } from '@/lib/posts';

export default function BlogManagement() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        category: 'Announcements',
        author: 'Admin'
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const res = await fetch('/api/posts');
            const data = await res.json();
            setPosts(data.posts || []);
        } catch (error) {
            console.error('Failed to fetch posts', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleDelete(slug: string) {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
            setPosts(prev => prev.filter(p => p.slug !== slug));
        } catch (error) {
            alert('Failed to delete post');
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setShowAddModal(false);
                fetchPosts();
                setFormData({
                    title: '',
                    excerpt: '',
                    content: '',
                    category: 'Announcements',
                    author: 'Admin'
                });
            } else {
                alert('Failed to create post');
            }
        } catch (error) {
            alert('Error creating post');
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Blog Management</h1>
                    <p className="text-gray-500">Create and edit news posts.</p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-[#780000] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5a0000] transition-colors flex items-center gap-2"
                >
                    <Plus size={20} />
                    New Post
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Post Title</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Author</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm">Date</th>
                            <th className="px-6 py-4 font-semibold text-gray-700 text-sm text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {isLoading ? (
                            <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading posts...</td></tr>
                        ) : posts.length === 0 ? (
                            <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-500">No posts found.</td></tr>
                        ) : (
                            posts.map(post => (
                                <tr key={post.slug} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-semibold text-gray-900">{post.title}</div>
                                        <div className="text-sm text-gray-500 truncate max-w-md">{post.excerpt}</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                            {post.author}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{post.date}</td>
                                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                                        <button onClick={() => handleDelete(post.slug)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add Post Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)}>
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="p-6 border-b border-gray-100">
                            <h2 className="text-xl font-bold text-gray-900">Create New Post</h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text" required
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-[#780000] outline-none"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none"
                                        value={formData.category}
                                        onChange={e => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        <option>Announcements</option>
                                        <option>Events</option>
                                        <option>Council</option>
                                        <option>Academic</option>
                                        <option>Community</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                                    <input
                                        type="text" required
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg outline-none"
                                        value={formData.author}
                                        onChange={e => setFormData({ ...formData, author: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Summary)</label>
                                <textarea
                                    required rows={2}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-[#780000] outline-none resize-none"
                                    value={formData.excerpt}
                                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Content</label>
                                <textarea
                                    required rows={6}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-[#780000] outline-none resize-none"
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                ></textarea>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
                                <button type="submit" className="px-6 py-2 bg-[#780000] text-white rounded-lg hover:bg-[#5a0000]">Publish Post</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
