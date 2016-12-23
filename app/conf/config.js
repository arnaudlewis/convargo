/**
 * Module dependencies.
 */
import express from 'express';
import favicon from 'serve-favicon';
import logger from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import routes from './server.routes.js';

export default (function init() {
  const app = express();
  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', 'views');
  app.set('view engine', 'pug');
  app.use(favicon('public/images/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser());
  app.use(methodOverride());
  app.use(express.static('public'));
  app.use(helmet());
  app.use(cookieParser());

  app.use(errorHandler());

  routes(app);

  return app;
}());
