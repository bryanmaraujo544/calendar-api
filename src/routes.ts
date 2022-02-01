import { Router } from 'express';
import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';
const router = Router();

router.get('/', (req, res) => {
  res.send('index page');
});

router.get('/users', UserController.index);

router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

export { router };
