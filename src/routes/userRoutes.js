import express from 'express';
import UserController from '../application/controllers/UserController.js';
import { validateRegister, validateLogin, handleValidationErrors } from '../middlewares/validators.js';


const router = express.Router();
const userController = new UserController();

router.post('/register', handleValidationErrors, validateRegister, userController.register);
router.post('/login', handleValidationErrors, validateLogin, userController.login);

export default router;