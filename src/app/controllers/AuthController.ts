import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import AuthRepository from '../repositories/AuthRepository';
import { createToken } from '../utils/createToken';

class AuthController {
  async register(req: Request, res: Response) {
    const { photoUrl, email, password } = req.body;

    const [userAlreadyExists] = await AuthRepository.findByEmail(email);

    if (userAlreadyExists){
      return res.status(500).json({ message: 'This email is already been used.' });
    }

    await AuthRepository.create({ photoUrl, email, password });
    res.json({ message: 'User created.' })
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const [userWithThisEmail] = await AuthRepository.findByEmail(email);

    if (!userWithThisEmail) {
      return res.status(400).json({ message: 'Email does not exists', token: null });
    }

    const hashedPassword = userWithThisEmail.password;
    const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Password is wrong', token: null });
    }

    const token = createToken({ id: userWithThisEmail.id });
    return res.json({ message: 'User logged-in', token })
  }

  async auth(req: any, res: any) {
    const { token, auth } = req;
    const [user] = await AuthRepository.findById(token.id);
    res.json({ message: 'Authenticated', auth, user });
  }
};

export default new AuthController;
