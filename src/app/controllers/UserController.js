import UsersRepository from '../repositories/UsersRepository.js';

class UserController {
  async index(req, res) {
    const users = await UsersRepository.findAll();
    res.send(users);
  }

  async update(req, res) {
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
