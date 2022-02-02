import { Router } from 'express';
import AuthController from './app/controllers/AuthController';
import TaskController from './app/controllers/TaskController';
import UserController from './app/controllers/UserController';
import { auth } from './app/middlewares/auth';
const router = Router();

router.get('/', (req, res) => {
  res.send('index page');
});

router.get('/auth', auth, AuthController.auth);
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

router.get('/users', UserController.index);

router.get('/tasks', auth, TaskController.index);
router.get('/tasks/:token', TaskController.show);
router.post('/tasks', auth, TaskController.store);
router.delete('/tasks/:id', auth, TaskController.delete);
router.put('/tasks/:id', auth, TaskController.update);


export { router };
