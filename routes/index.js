import express from 'express';
import { getStats, getStatus } from '../controllers/AppController.js';

const router = express.Router();
router.get('/stats', getStats);
router.get('/status', getStatus);

export default router;
