import { Router } from 'express';
import i18n from 'i18n';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/', UserController.store );
routes.get('/', (req, res) => {
  return res.json({msg: i18n.__('message')});
})
export default routes;
