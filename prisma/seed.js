const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    // ─── Posts ────────────────────────────────────────────────────────────
    const posts = [
        {
            title: "Witajcie w nowym roku szkolnym!",
            slug: "witajcie-rok-szkolny-2026",
            excerpt: "Zaczynamy nowy rok akademicki z wieloma ekscytującymi wydarzeniami zaplanowanymi dla uczniów.",
            content: "Pełna treść o rozpoczęciu roku szkolnego... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "/images/baner.webp",
            published: true,
            author: "Administrator",
            category: "Ogłoszenia",
            date: new Date("2026-09-01"),
        },
        {
            title: "Wyniki wyborów do Samorządu Uczniowskiego",
            slug: "wyniki-wyborow-samorzad",
            excerpt: "Mamy wyniki! Poznaj swoich nowych przedstawicieli w samorządzie na ten semestr.",
            content: "Pełna treść o wynikach wyborów... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/images/baner.webp",
            published: true,
            author: "Komisja Wyborcza",
            category: "Samorząd",
            date: new Date("2026-09-15"),
        },
        {
            title: "Nadchodzący Dzień Sportu",
            slug: "nadchodzacy-dzien-sportu",
            excerpt: "Przygotuj się na coroczny dzień sportu. Zapisz się na swoje ulubione dyscypliny już teraz.",
            content: "Pełna treść o dniu sportu... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/images/baner.webp",
            published: true,
            author: "Dział Sportu",
            category: "Wydarzenia",
            date: new Date("2026-09-20"),
        },
        {
            title: "Sukces zbiórki charytatywnej",
            slug: "sukces-zbiorki-charytatywnej",
            excerpt: "Dzięki Waszej hojności zebraliśmy ponad 5000 PLN dla lokalnego schroniska.",
            content: "Pełna treść o zbiórce... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/images/baner.webp",
            published: true,
            author: "Klub Wolontariatu",
            category: "Społeczność",
            date: new Date("2026-10-05"),
        },
        {
            title: "Nowe książki w bibliotece",
            slug: "nowe-ksiazki-biblioteka",
            excerpt: "Sprawdź najnowsze pozycje w naszej szkolnej bibliotece. Każdy znajdzie coś dla siebie.",
            content: "Pełna treść o bibliotece... Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            image: "/images/baner.webp",
            published: true,
            author: "Bibliotekarz",
            category: "Nauka",
            date: new Date("2026-10-12"),
        },
    ]

    for (const post of posts) {
        const exists = await prisma.post.findUnique({ where: { slug: post.slug } })
        if (!exists) {
            await prisma.post.create({ data: post })
            console.log(`✓ Post created: ${post.title}`)
        }
    }

    // ─── Events ───────────────────────────────────────────────────────────
    const events = [
        { title: 'Spotkanie Samorządu',    date: '2026-03-10', startTime: '15:00', endTime: '16:30', category: 'council',   location: 'Sala Konferencyjna' },
        { title: 'Trening Piłki Nożnej',   date: '2026-03-12', startTime: '15:30', endTime: '17:00', category: 'sports',    location: 'Boisko szkolne' },
        { title: 'Kółko Debat',           date: '2026-03-15', startTime: '16:00', endTime: '17:30', category: 'academic',  location: 'Sala 102' },
        { title: 'Mecz Siatkówki',        date: '2026-03-18', startTime: '18:00',                   category: 'sports',    location: 'Hala Sportowa' },
        { title: 'Egzamin próbny z Biologii', date: '2026-03-20', startTime: '09:00', endTime: '11:00', category: 'exams',     location: 'Sala 304' },
        { title: 'Dzień Zdjęcia do Rocznika', date: '2026-03-22', startTime: '08:00', endTime: '14:00', category: 'academic' },
        { title: 'Konkurs Matematyczny',   date: '2026-03-25', startTime: '09:00', endTime: '12:00', category: 'exams',     location: 'Sala 201' },
    ]

    for (const event of events) {
        const exists = await prisma.event.findFirst({ where: { title: event.title, date: event.date } })
        if (!exists) {
            await prisma.event.create({ data: event })
            console.log(`✓ Event created: ${event.title}`)
        }
    }

    // ─── Photos ───────────────────────────────────────────────────────────
    const photos = [
        { title: 'Bal Jesienny 2025',          imageUrl: '/images/baner.webp', category: 'Wydarzenia',   event: 'Bal Jesienny',      uploadDate: '2025-10-15', description: 'Uczniowie świętujący podczas balu jesiennego' },
        { title: 'Tydzień Kolorów - Dzień Fryzur', imageUrl: '/images/baner.webp', category: 'Społeczność', event: 'Tydzień Kolorów',   uploadDate: '2025-09-20', description: 'Kreatywne fryzury podczas tygodnia kolorów' },
        { title: 'Mistrzostwa w Koszykówce',   imageUrl: '/images/baner.webp', category: 'Sport',         event: 'Mecz Koszykówki',   uploadDate: '2025-11-10', description: 'Zwycięstwo w meczu mistrzowskim' },
        { title: 'Ceremonia Zakończenia 2025', imageUrl: '/images/baner.webp', category: 'Uroczystości', event: 'Zakończenie Roku',  uploadDate: '2025-06-15', description: 'Świętujemy z naszymi absolwentami' },
        { title: 'Spotkanie Rady Uczniów',     imageUrl: '/images/baner.webp', category: 'Samorząd',      event: 'Miesięczne Spotkanie', uploadDate: '2025-09-05', description: 'Planowanie wydarzeń szkolnych' },
    ]

    for (const photo of photos) {
        const exists = await prisma.photo.findFirst({ where: { title: photo.title } })
        if (!exists) {
            await prisma.photo.create({ data: photo })
            console.log(`✓ Photo created: ${photo.title}`)
        }
    }

    console.log('\n✅ Database seeded successfully!')
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
