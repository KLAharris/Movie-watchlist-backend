import { prisma } from '../config/db.js';

const createMovie = async (req, res) => {
    try {
        const { title, overview, releaseYear, genere, runtime, posterUrl } = req.body;

        const movie = await prisma.movie.create({
            data: {
                title,
                overview,
                releaseYear,
                genere: genere || [],
                runtime,
                posterUrl,
                createdBy: req.user.id,
            },
        });

        res.status(201).json({ status: "Success", data: { movie } });
    } catch (error) {
        console.error("Create movie error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getMovies = async (req, res) => {
    try {
        const movies = await prisma.movie.findMany({
            orderBy: { createdAt: 'desc' },
        });

        res.status(200).json({ status: "Success", data: { movies } });
    } catch (error) {
        console.error("Get movies error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getMovie = async (req, res) => {
    try {
        const movie = await prisma.movie.findUnique({
            where: { id: req.params.id },
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.status(200).json({ status: "Success", data: { movie } });
    } catch (error) {
        console.error("Get movie error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const updateMovie = async (req, res) => {
    try {
        const { title, overview, releaseYear, genere, runtime, posterUrl } = req.body;

        const movie = await prisma.movie.findUnique({
            where: { id: req.params.id },
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        if (movie.createdBy !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to update this movie" });
        }

        const updated = await prisma.movie.update({
            where: { id: req.params.id },
            data: { title, overview, releaseYear, genere, runtime, posterUrl },
        });

        res.status(200).json({ status: "Success", data: { movie: updated } });
    } catch (error) {
        console.error("Update movie error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const movie = await prisma.movie.findUnique({
            where: { id: req.params.id },
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        if (movie.createdBy !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to delete this movie" });
        }

        await prisma.movie.delete({ where: { id: req.params.id } });

        res.status(200).json({ status: "Success", message: "Movie deleted" });
    } catch (error) {
        console.error("Delete movie error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { createMovie, getMovies, getMovie, updateMovie, deleteMovie };
