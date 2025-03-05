import db from '../../config/db.js';

export default class UserRepository {
  async findByEmail(email) {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Error finding user by email: ${error.message}`);
    }
  }

  async create(user) {
    try {
      const { name, email, password, roleId } = user;
      const [result] = await db.query(
        'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
        [name, email, password, roleId]
      );
      return result.insertId;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
}