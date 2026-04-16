import express from 'express';
import { createMovie, getMovies, getMovie, updateMovie, deleteMovie } from '../controllers/movieController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getMovies);
router.get('/:id', getMovie);
router.post('/', protect, createMovie);
router.put('/:id', protect, updateMovie);
router.delete('/:id', protect, deleteMovie);

export default router;
