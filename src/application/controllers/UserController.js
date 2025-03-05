import UserService from '../services/UserService.js';
import { generateToken } from '../../utils/auth.js';
import logger from '../../config/logger.js';

export default class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async register(req, res) {
    try {
      const { name, email, password, roleId } = req.body;
      const user = await this.userService.registerUser({ name, email, password, roleId });
      const token = generateToken(user);
      logger.info(`User registered: ${email}`);
      res.status(201).json({ user, token });
    } catch (error) {
      logger.error(`Error registering user: ${error.message}`);
      res.status(400).json({ error: error.message });
    }
  }
}