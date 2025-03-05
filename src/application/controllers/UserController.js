import UserService from '../services/UserService.js';

export default class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async register(req, res) {
    try {
      const { name, email, password, roleId } = req.body;
      const user = await this.userService.registerUser({ name, email, password, roleId });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}