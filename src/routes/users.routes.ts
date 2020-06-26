import { Router, Request, Response } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';
import UpdateAvatarService from '../services/UpdateAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({ name, email, password });

    delete user.password;

    return response.status(201).json(user);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

usersRouter.patch(
  '/',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request: Request, response: Response) => {
    const updateUserAvatar = new UpdateAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename,
    });

    delete user.password;

    return response.json(user);
  },
);

export default usersRouter;
