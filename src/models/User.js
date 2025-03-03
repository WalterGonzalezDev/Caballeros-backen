const db = require('../utils/db');

class User {
  static async create(user) {
    const { name, email, password, role_id } = user;
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
      [name, email, password, role_id]
    );
    return result;
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }
}

module.exports = User;