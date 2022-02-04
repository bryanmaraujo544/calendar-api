import { query } from '../../database';

interface TaskProps {
  id?: string,
  title: string,
  description?: string,
  date: string
}

interface DeleteProps {
  userId: string,
  taskId: string
}

interface UpdateProps extends DeleteProps, TaskProps {

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
      WHERE user_id = ? AND title = ? AND date = ?;
    `;
    const rows = await query(sql, [id, title, date]);
    return rows;
  }

  async create({
    id: userId,
    title,
    description,
    date
  }: TaskProps) {
    const sql = `
      INSERT INTO tasks
      VALUES (default, ?, ?, ?, ?)

    `;
    await query(sql, [title, description, date, userId]);

    const sql1 = `
      SELECT *
      FROM tasks
      WHERE user_id = ? AND title = ?
    `;
    const taskCreated = await query(sql1, [userId, title]);
    return taskCreated;
  }

  async findById({ id }: { id: string }) {
    const sql = `
      SELECT *
      FROM tasks
      WHERE user_id = ?
    `;

    const rows = await query(sql, [id]);
    return rows;
  }

  async delete({ userId, taskId }: DeleteProps) {
    const sql = `
      DELETE FROM tasks
      WHERE id = ? AND user_id = ?;
    `;
    await query(sql, [taskId, userId]);
    return;
  }

  async update({
    userId,
    taskId,
    title,
    description,
    date
  }: UpdateProps) {
    const sql = `
      UPDATE tasks
      SET title = ?, description = ?, date = ?
      WHERE id = ? AND user_id = ?
    `;
    await query(sql, [title, description, date, taskId, userId]);

    const sql1 = `
      SELECT *
      FROM tasks
      WHERE id = ?
    `;
    const taskUpdated = await query(sql1, [taskId]);
    return taskUpdated;
  }

}

export default new TasksRepository;
