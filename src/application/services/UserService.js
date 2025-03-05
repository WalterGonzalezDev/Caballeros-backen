import UserRepository from '../../infrastructure/repositories/UserRepository.js';
import User from '../../domain/User.js';
import { hashPassword } from '../../utils/auth.js';
import logger from '../../config/logger.js';

export default class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async registerUser({ name, email, password, roleId }) {
    try {
      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await hashPassword(password);
      const userId = await this.userRepository.create({ name, email, password: hashedPassword, roleId });
      return new User({ id: userId, name, email, roleId });
    } catch (error) {
      logger.error(`Error registering user: ${error.message}`);
      throw new Error(`Error registering user: ${error.message}`);
    }
  }
}