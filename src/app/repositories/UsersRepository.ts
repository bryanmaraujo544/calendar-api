import { query } from '../../database';

class UsersRepository {
  async findAll() {
    const sql = 'SELECT * FROM users';
    const rows = await query(sql);
    return rows;
  }
}

export default new UsersRepository;
