import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';

class UserController {
  async index(req: Request, res: Response) {
    const users = await UsersRepository.findAll();
    res.send(users);
  }

  async update(req: any, res: Response) {
    const { id: userId } = req.token;
    const { photoUrl } = req.body;

    if (!photoUrl) {
      return res.status(400).json({ message: 'photo url is required' });
    }

    const [userUpdated] = await UsersRepository.update({ photoUrl, userId });
    res.json({ message: 'User upadted', userUpdated });
  }
}

export default new UserController;
