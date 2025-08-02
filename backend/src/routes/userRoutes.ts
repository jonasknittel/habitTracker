import express from 'express';
import * as userController from '../controllers/userController';

const router = express.Router();

router.get('/', userController.getUser);
// router.post('/', userController.createUser);
router.put('/', userController.updateUser);
router.delete('/', userController.deleteUser);

export default router;