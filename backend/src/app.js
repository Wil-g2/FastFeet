import express from 'express';
import routes from './routes';
import i18n from './config/i18n';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(i18n.init);

    //middeware apply languagem by query parameters
    this.server.use((req, res, next) => {
      if (req.query.lang) {
        i18n.setLocale(req.query.lang);
      }
      next();
    });

  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
