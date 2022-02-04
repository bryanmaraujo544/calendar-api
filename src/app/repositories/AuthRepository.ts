import { query } from '../../database';
import bcrypt from 'bcrypt';

interface UserInfos {
  photoUrl: string,
  email: string,
  password: string
}

class AuthRepository {
  async findByEmail(email: string) {
    const rows = await query("SELECT * FROM users WHERE email = ?", [email]);
    return rows;
  }

  async findById(id: string) {
    const rows = await query('SELECT * FROM users WHERE id = ?', [id]);
    return rows;
  }

  async create({
    photoUrl,
    email,
    password
  }: UserInfos) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
      INSERT INTO users
      VALUES (default, ?, ?, ?)
    `;

    const result = await query(sql, [email, hashedPassword, photoUrl]);
    return result;
  }

  async login({
    email,
    password
  }: { email: string, password: string }) {

  }
}

export default new AuthRepository;
