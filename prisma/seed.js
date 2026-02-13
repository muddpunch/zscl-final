const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    const posts = [
        {
            title: "Welcome to the new school year!",
            slug: "welcome-school-year-2026",
            excerpt: "As we begin the new academic year, we have many exciting events planned for the students.",
            content: "Full content about the school year start... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "/images/baner.webp",
            published: true,
        },
        {
            title: "Student Council Elections Results",
            slug: "student-council-elections-results",
            excerpt: "The results are in! Meet your new student council representatives for this semester.",
            content: "Full content about elections... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/images/baner.webp",
            published: true,
        },
        {
            title: "Upcoming Sports Day",
            slug: "upcoming-sports-day",
            excerpt: "Get ready for the annual sports day. Sign up for your favorite activities now.",
            content: "Full content about sports day... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/images/baner.webp",
            published: true,
        },
        {
            title: "Charity Fundraiser Success",
            slug: "charity-fundraiser-success",
            excerpt: "Thanks to your generosity, we raised over 5000 PLN for the local shelter.",
            content: "Full content about charity... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/images/baner.webp",
            published: true,
        },
        {
            title: "New Library Books",
            slug: "new-library-books",
            excerpt: "Check out the latest additions to our school library. There's something for everyone.",
            content: "Full content about library... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/images/baner.webp",
            published: true,
        },
        {
            title: "Science Fair Registration",
            slug: "science-fair-registration",
            excerpt: "Registration for the annual science fair is now open. Show off your projects!",
            content: "Full content about science fair... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/images/baner.webp",
            published: true,
        },
        {
            title: "Holiday Break Schedule",
            slug: "holiday-break-schedule",
            excerpt: "Important dates for the upcoming holiday break. Make sure to check the schedule.",
            content: "Full content about holidays... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/images/baner.webp",
            published: true,
        }
    ]

    for (const post of posts) {
        const exists = await prisma.post.findUnique({
            where: { slug: post.slug }
        })
        if (!exists) {
            await prisma.post.create({
                data: post
            })
        }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
