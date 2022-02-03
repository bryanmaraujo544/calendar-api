import { query } from '../../database';

class UsersRepository {
  async findAll() {
    const sql = 'SELECT * FROM users';
    const rows = await query(sql);
    return rows;
  }

  async update({ photoUrl, userId }: { photoUrl: string, userId: string }) {
    const sql = `
      UPDATE users
      SET profile_image = $1
      WHERE id = $2
      RETURNING *
    `;

    const rows = await query(sql, [photoUrl, userId]);
    return rows;
  }
}

export default new UsersRepository;
