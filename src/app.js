import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

import movieRoutes from './routes/movieRoutes.js';
import authRoutes from './routes/authRoutes.js';
import WatchlistRoutes from './routes/watchlistRoutes.js';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);
app.use('/watchlist', WatchlistRoutes);

export default app;
