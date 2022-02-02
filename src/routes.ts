import { Router } from 'express';
import AuthController from './app/controllers/AuthController';
import UserController from './app/controllers/UserController';
import { auth } from './app/middlewares/auth';
const router = Router();

router.get('/', (req, res) => {
  res.send('index page');
});

router.get('/users', UserController.index);

router.get('/auth', auth, AuthController.auth);
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

export { router };
