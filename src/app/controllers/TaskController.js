import jwt from 'jsonwebtoken';
import TasksRepository from "../repositories/TasksRepository.js";

class TaskController {
  async index(req, res) {
    const tasks = await TasksRepository.findAll();
    res.send(tasks);
  }

  async store(req, res) {
    const { id } = req.token;
    const { title, description, date } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }

    const [taskAlreadyExistsInThisDate] = await TasksRepository.findByTitleAndDate({ title, date, id });
    if (taskAlreadyExistsInThisDate) {
      return res.status(400).json({ message: 'Already exists an event with this title in this date' });
    }


    const [taskCreated] = await TasksRepository.create({ title, description, date, id });

    // returning the task's infors to frontend because there will need the instant infos to fill the
    // tasks state without be needed to reload the page;
    res.json({ message: 'Task created', taskCreated });
  }

  async show(req, res) {
    const { token } = req.params;

    try {
      const tokenDecoded = jwt.verify(token, 'Ffjk#5kk45921kjfkdjf@*#@(*!');
      const tasks = await TasksRepository.findById({ id: tokenDecoded?.id });
      return res.send(tasks);
    } catch (err) {
      return res.status(400).json({ message: 'token invalid' })
    }
  }

  async delete(req, res) {
    const { id: userId } = req.token;
    const { id: taskId } = req.params;

    await TasksRepository.delete({ userId, taskId });
    res.json({ message: 'Task deleted' });
  }

  async update(req, res) {
    const { id: userId } = req.token;
    const { id: taskId } = req.params;
    const { title, description, date } = req.body;

    const [taskUpdated] = await TasksRepository.update({ userId, taskId, title, description, date });
    res.json({ taskUpdated });
  }
}

export default new TaskController;
