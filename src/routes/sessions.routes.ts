import { Router, Request, Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const authenticateUserService = new AuthenticateUserService();

  const { user, token } = await authenticateUserService.execute({
    email,
    password,
  });

  delete user.password;

  return response.status(200).json({ user, token });
});

export default sessionsRouter;
