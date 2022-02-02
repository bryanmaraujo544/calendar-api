import { query } from '../../database';

interface TaskProps {
  id: string,
  title: string,
  description?: string,
  date: string
}

interface DeleteProps {
  userId: string,
  taskId: string
}

class TasksRepository {
  async findAll() {
    const sql = 'SELECT * FROM tasks';
    const rows = await query(sql);
    return rows;
  }

  async findByTitleAndDate({
    id,
    title,
    date
  }: TaskProps) {
    const sql = `
      SELECT *
      FROM tasks
      WHERE user_id = $1 AND title = $2 AND date = $3;
    `;
    const rows = await query(sql, [id, title, date]);
    return rows;
  }

  async create({
    id,
    title,
    description,
    date
  }: TaskProps) {
    const sql = `
      INSERT INTO tasks
      VALUES (default, $1, $2, $3, $4)
      RETURNING *
    `;

    const rows = await query(sql, [title, description, date, id]);
    return rows;
  }

  async findById({ id }: { id: string }) {
    const sql = `
      SELECT *
      FROM tasks
      WHERE user_id = $1
    `;

    const rows = await query(sql, [id]);
    return rows;
  }

  async delete({
    userId,
    taskId
  }: DeleteProps) {
    const sql = `
      DELETE FROM tasks
      WHERE id = $1 AND user_id = $2;
    `;
    await query(sql, [taskId, userId]);
    return;
  }

}

export default new TasksRepository;
