import express from 'express';
import * as habitEntryController from '../controllers/habitEntryController';

const router = express.Router({ mergeParams: true });

router.get('/', habitEntryController.getAllHabitEntries);
router.post('/', habitEntryController.createHabitEntry);

export default router;