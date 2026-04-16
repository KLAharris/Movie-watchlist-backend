import express from 'express';
import { addToWatchlist, getWatchlist, updateWatchlistItem, removeFromWatchlist } from '../controllers/watchlistController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.put('/:id', updateWatchlistItem);
router.delete('/:id', removeFromWatchlist);

export default router;
