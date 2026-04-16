import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const creatorId = "42bcb402-cb00-444a-a83d-a667dc2c3a5b";

const movies = [
    {
        title: "The Last Horizon",
        overview: "An astronaut stranded on a distant planet must find a way back to Earth before her oxygen runs out.",
        releaseYear: 2021,
        genere: ["Sci-Fi", "Thriller", "Drama"],
        runtime: 138,
        posterUrl: "https://example.com/TheLastHorizon.jpg",
        createdBy: creatorId,
    },
    {
        title: "Whispers in the Dark",
        overview: "A blind detective uses her heightened senses to hunt a serial killer who leaves no traces behind.",
        releaseYear: 2019,
        genere: ["Crime", "Mystery", "Thriller"],
        runtime: 112,
        posterUrl: "https://example.com/WhispersInTheDark.jpg",
        createdBy: creatorId,
    },
    {
        title: "Borrowed Time",
        overview: "After a near-death experience, a man begins living his life in reverse — regaining memories of a future he's already lost.",
        releaseYear: 2022,
        genere: ["Drama", "Fantasy", "Romance"],
        runtime: 125,
        posterUrl: "https://example.com/BorrowedTime.jpg",
        createdBy: creatorId,
    },
    {
        title: "Iron Roots",
        overview: "A small mining town fights back when a mega-corporation threatens to demolish their homes and history.",
        releaseYear: 2020,
        genere: ["Drama", "Action"],
        runtime: 107,
        posterUrl: "https://example.com/IronRoots.jpg",
        createdBy: creatorId,
    },
    {
        title: "The Quiet Ocean",
        overview: "Two rival marine biologists are forced to share a research vessel and discover more than just new species.",
        releaseYear: 2023,
        genere: ["Romance", "Comedy", "Adventure"],
        runtime: 101,
        posterUrl: "https://example.com/TheQuietOcean.jpg",
        createdBy: creatorId,
    },
    {
        title: "Neon Requiem",
        overview: "In a cyberpunk dystopia, a jazz musician uncovers a government conspiracy hidden inside an AI-composed symphony.",
        releaseYear: 2024,
        genere: ["Sci-Fi", "Mystery", "Thriller"],
        runtime: 133,
        posterUrl: "https://example.com/NeonRequiem.jpg",
        createdBy: creatorId,
    },
    {
        title: "A Thousand Paper Cranes",
        overview: "Based on a true story, a young girl in post-war Japan inspires a nation with her unwavering hope and courage.",
        releaseYear: 2018,
        genere: ["Drama", "History", "Family"],
        runtime: 98,
        posterUrl: "https://example.com/AThousandPaperCranes.jpg",
        createdBy: creatorId,
    },
    {
        title: "Splitsville",
        overview: "Two divorcing parents accidentally book the exact same vacation rental and must co-parent under one chaotic roof.",
        releaseYear: 2022,
        genere: ["Comedy", "Romance", "Family"],
        runtime: 95,
        posterUrl: "https://example.com/Splitsville.jpg",
        createdBy: creatorId,
    },
    {
        title: "Blood and Soil",
        overview: "A decorated war general returns home to find his own government has declared him an enemy of the state.",
        releaseYear: 2020,
        genere: ["Action", "War", "Thriller"],
        runtime: 142,
        posterUrl: "https://example.com/BloodAndSoil.jpg",
        createdBy: creatorId,
    },
    {
        title: "Saltwater & Goodbye",
        overview: "A grieving fisherman discovers his late wife left him a series of letters to be opened one year after her passing.",
        releaseYear: 2023,
        genere: ["Drama", "Romance"],
        runtime: 110,
        posterUrl: "https://example.com/SaltwaterAndGoodbye.jpg",
        createdBy: creatorId,
    },
];

const main = async () => {
    console.log("Seeding database with movies...");
    for (const movie of movies) {
        await prisma.movie.create({
            data: movie,
        });
        console.log(`Created movie: ${movie.title}`);
    }
    console.log("Database seeding completed.");
};

main()
    .catch((error) => {
        console.error(error);
        process.exit(1);

    })
    .finally(async () => {
        await prisma.$disconnect();
    });
    