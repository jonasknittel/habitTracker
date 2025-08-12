import express from 'express';
import * as habitEntryController from '../controllers/habitEntryController';

const router = express.Router({ mergeParams: true });

router.get('/', habitEntryController.getAllHabitEntries);
router.post('/', habitEntryController.createHabitEntry);
router.delete('/', habitEntryController.deleteHabitEntry);

export default router;