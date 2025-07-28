import express from 'express';
import * as habitEntryController from '../controllers/habitEntryController';

const router = express.Router();

router.get('/', habitEntryController.getAllHabitEntries);
router.post('/', habitEntryController.createHabitEntry);
router.post('/:habitEntryId', habitEntryController.createHabitEntry);

export default router;