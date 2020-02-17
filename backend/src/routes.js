import { Router } from 'express';
import i18n from 'i18n';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/', (req, res) => {
  return res.json({msg: i18n.__('message')});
})
export default routes;
