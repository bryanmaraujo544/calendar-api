import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import TasksRepository from "../repositories/TasksRepository";

class TaskController {
  async index(req: any, res: any) {
    const tasks = await TasksRepository.findAll();
    res.send(tasks);
  }

  async store(req: any, res: any) {
    const { id } = req.token;
    const { title, description, date } = req.body;

    if (!title || !date) {
      return res.status(400).json({ message: 'Title and date are required' });
    }

    const [taskAlreadyExistsInThisDate] = await TasksRepository.findByTitleAndDate({ title, date, id });
    if (taskAlreadyExistsInThisDate) {
      return res.status(400).json({ message: 'Already exists an event with this title in this date' });
    }

    const taskCreated = await TasksRepository.create({ title, description, date, id });
    console.log({ taskCreated });
    res.json({ message: 'Task created' });
  }

  async show(req: Request, res: any) {
    const { token } = req.params;

    try {
      const tokenDecoded: any = jwt.verify(token, 'Ffjk#5kk45921kjfkdjf@*#@(*!');
      const tasks = await TasksRepository.findById({ id: tokenDecoded?.id });
      return res.send(tasks);
    } catch (err) {
      return res.status(400).json({ message: 'token invalid' })
    }
  }
}

export default new TaskController;
