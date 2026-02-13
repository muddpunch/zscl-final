export interface Post {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image: string;
    published: boolean;
    date: string;
    author: string;
    category: string;
}

export const posts: Post[] = [
    {
        id: '1',
        title: "Welcome to the new school year!",
        slug: "welcome-school-year-2026",
        excerpt: "As we begin the new academic year, we have many exciting events planned for the students.",
        content: "Full content about the school year start... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        image: "/images/baner.webp",
        published: true,
        date: "2026-09-01",
        author: "Admin",
        category: "Announcements"
    },
    {
        id: '2',
        title: "Student Council Elections Results",
        slug: "student-council-elections-results",
        excerpt: "The results are in! Meet your new student council representatives for this semester.",
        content: "Full content about elections... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/images/baner.webp",
        published: true,
        date: "2026-09-15",
        author: "Election Committee",
        category: "Council"
    },
    {
        id: '3',
        title: "Upcoming Sports Day",
        slug: "upcoming-sports-day",
        excerpt: "Get ready for the annual sports day. Sign up for your favorite activities now.",
        content: "Full content about sports day... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/images/baner.webp",
        published: true,
        date: "2026-09-20",
        author: "Sports Dept",
        category: "Events"
    },
    {
        id: '4',
        title: "Charity Fundraiser Success",
        slug: "charity-fundraiser-success",
        excerpt: "Thanks to your generosity, we raised over 5000 PLN for the local shelter.",
        content: "Full content about charity... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/images/baner.webp",
        published: true,
        date: "2026-10-05",
        author: "Volunteer Club",
        category: "Community"
    },
    {
        id: '5',
        title: "New Library Books",
        slug: "new-library-books",
        excerpt: "Check out the latest additions to our school library. There's something for everyone.",
        content: "Full content about library... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/images/baner.webp",
        published: true,
        date: "2026-10-12",
        author: "Librarian",
        category: "Academic"
    },
    {
        id: '6',
        title: "Science Fair Registration",
        slug: "science-fair-registration",
        excerpt: "Registration for the annual science fair is now open. Show off your projects!",
        content: "Full content about science fair... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/images/baner.webp",
        published: true,
        date: "2026-10-20",
        author: "Science Dept",
        category: "Events"
    },
    {
        id: '7',
        title: "Holiday Break Schedule",
        slug: "holiday-break-schedule",
        excerpt: "Important dates for the upcoming holiday break. Make sure to check the schedule.",
        content: "Full content about holidays... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        image: "/images/baner.webp",
        published: true,
        date: "2026-12-10",
        author: "Admin",
        category: "Announcements"
    }
];

export async function getPaginatedPosts(page: number, limit: number, category?: string) {
    let filteredPosts = posts;

    if (category && category !== 'All') {
        filteredPosts = posts.filter(post => post.category === category);
    }

    const start = (page - 1) * limit;
    const end = start + limit;
    const totalPages = Math.ceil(filteredPosts.length / limit);
    return {
        posts: filteredPosts.slice(start, end),
        totalPages
    };
}

export function getAllCategories(): string[] {
    const categories = ['All', ...new Set(posts.map(post => post.category))];
    return categories;
}

export async function getFeaturedPost() {
    return posts[0];
}

export async function getPostBySlug(slug: string) {
    return posts.find(post => post.slug === slug);
}

// Admin functionality
export function addPost(post: Omit<Post, 'id' | 'slug'>): Post {
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newPost: Post = {
        ...post,
        id: Date.now().toString(),
        slug: `${slug}-${Date.now()}`,
    };
    posts.unshift(newPost);
    return newPost;
}

export function deletePost(slug: string): boolean {
    const index = posts.findIndex(post => post.slug === slug);
    if (index !== -1) {
        posts.splice(index, 1);
        return true;
    }
    return false;
}
