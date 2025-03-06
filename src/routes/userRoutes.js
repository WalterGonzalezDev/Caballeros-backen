import express from 'express';
import UserController from '../application/controllers/UserController.js';
import { validateRegister, validateLogin, handleValidationErrors } from '../middlewares/validators.js';

const router = express.Router();
const userController = new UserController();

router.post('/register', validateRegister, handleValidationErrors, userController.register.bind(userController));
router.post('/login', validateLogin, handleValidationErrors, userController.login.bind(userController));

export default router;