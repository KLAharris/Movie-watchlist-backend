import { prisma } from '../config/db.js';

const addToWatchlist = async (req, res) => {
    try {
        const { movieId, status, rating, notes } = req.body;
        const userId = req.user.id;

        const movie = await prisma.movie.findUnique({
            where: { id: movieId },
        });

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        const existingInWatchlist = await prisma.watchlistItem.findUnique({
            where: {
                userId_movieId: { userId, movieId }
            }
        });

        if (existingInWatchlist) {
            return res.status(400).json({ error: "Movie already in watchlist" });
        }

        const watchlistItem = await prisma.watchlistItem.create({
            data: {
                userId,
                movieId,
                status: status || "PLANNED",
                rating,
                notes
            }
        });

        res.status(201).json({ status: "Success", data: { watchlistItem } });
    } catch (error) {
        console.error("Add to watchlist error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const getWatchlist = async (req, res) => {
    try {
        const watchlist = await prisma.watchlistItem.findMany({
            where: { userId: req.user.id },
            include: { movie: true },
            orderBy: { createdAt: 'desc' },
        });

        res.status(200).json({ status: "Success", data: { watchlist } });
    } catch (error) {
        console.error("Get watchlist error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const updateWatchlistItem = async (req, res) => {
    try {
        const { status, rating, notes } = req.body;

        const item = await prisma.watchlistItem.findUnique({
            where: { id: req.params.id },
        });

        if (!item) {
            return res.status(404).json({ error: "Watchlist item not found" });
        }

        if (item.userId !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to update this item" });
        }

        const updated = await prisma.watchlistItem.update({
            where: { id: req.params.id },
            data: { status, rating, notes },
        });

        res.status(200).json({ status: "Success", data: { watchlistItem: updated } });
    } catch (error) {
        console.error("Update watchlist item error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

const removeFromWatchlist = async (req, res) => {
    try {
        const item = await prisma.watchlistItem.findUnique({
            where: { id: req.params.id },
        });

        if (!item) {
            return res.status(404).json({ error: "Watchlist item not found" });
        }

        if (item.userId !== req.user.id) {
            return res.status(403).json({ error: "Not authorized to remove this item" });
        }

        await prisma.watchlistItem.delete({ where: { id: req.params.id } });

        res.status(200).json({ status: "Success", message: "Item removed from watchlist" });
    } catch (error) {
        console.error("Remove from watchlist error:", error);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

export { addToWatchlist, getWatchlist, updateWatchlistItem, removeFromWatchlist };
