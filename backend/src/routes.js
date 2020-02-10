import { Router } from 'express';
import i18n from 'i18n';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ msg: i18n.__('message')});
});

export default routes;