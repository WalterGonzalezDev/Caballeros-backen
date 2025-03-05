import express from 'express';
import UserController from '../application/controllers/UserController.js';

const router = express.Router();
const userController = new UserController();

router.post('/register', userController.register.bind(userController));

export default router;