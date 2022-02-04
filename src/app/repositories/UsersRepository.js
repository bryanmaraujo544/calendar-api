import { query } from '../../database/index.js';

class UsersRepository {
  async findAll() {
    const sql = 'SELECT * FROM users';
    const rows = await query(sql);
    return rows;
  }

  async update({ photoUrl, userId }) {
    const sql = `
      UPDATE users
      SET profile_image = ?
      WHERE id = ?
    `;
    await query(sql, [photoUrl, userId]);

    const sql1 = `
      SELECT *
      FROM users
      WHERE id = ?
    `;
    const userUpdated = await query(sql1, [userId]);

    return userUpdated;
  }
}

export default new UsersRepository;
