import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';

class UserController {
  async index(req: Request, res: Response) {
    const users = await UsersRepository.findAll();
    res.send(users);
  }
}

export default new UserController;
