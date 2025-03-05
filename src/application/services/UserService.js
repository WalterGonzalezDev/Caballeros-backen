import UserRepository from '../../infrastructure/repositories/UserRepository.js';
import User from '../../domain/User.js';

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

      const userId = await this.userRepository.create({ name, email, password, roleId });
      return new User({ id: userId, name, email, roleId });
    } catch (error) {
      throw new Error(`Error registering user: ${error.message}`);
    }
  }
}