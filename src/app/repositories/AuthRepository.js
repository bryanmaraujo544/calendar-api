import { query } from '../../database/index.js';
import bcrypt from 'bcrypt';



class AuthRepository {
  async findByEmail(email) {
    const rows = await query("SELECT * FROM users WHERE email = ?", [email]);
    return rows;
  }

  async findById(id) {
    const rows = await query('SELECT * FROM users WHERE id = ?', [id]);
    return rows;
  }

  async create({
    photoUrl,
    email,
    password
  }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
      INSERT INTO users
      VALUES (default, ?, ?, ?)
    `;

    const result = await query(sql, [email, hashedPassword, photoUrl]);
    return result;
  }
}

export default new AuthRepository;
