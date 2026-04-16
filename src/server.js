import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import { connectDB, disconnectDB } from './config/db.js';

import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import WatchlistRoutes from './routes/watchlistRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);
app.use('/watchlist', WatchlistRoutes);

const port = 5001;
let server;
connectDB().then(() => {
    server = app.listen(port, () => {
        console.log(`server is running on port ${port}`);
    });
});

process.on("unhandledRejection", (err) => {
    console.error("Unhandled Rejection:", err);
    server.close(async() => {
        await disconnectDB();
        process.exit(1);
    });
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    server.close(async() => {
        await disconnectDB();
        process.exit(1);
    });
});

process.on("SIGINT", async() => {
    console.log("SIGINT received, shutting down gracefully...");
    server.close(async() => {
        await disconnectDB();
        process.exit(0);
    });
});