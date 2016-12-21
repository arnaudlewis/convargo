'use strict'

import Router from '../Router'
import Website from '../controllers/Website'
import global from '../global'

const Method = {
  POST: 'post',
  GET: 'get'
}

function buildRoute (app, method, url, action) {
  app.route(url).all(global.init)

  switch(method) {
  case Method.POST :
    return app.route(url).post(action)

  case Method.GET :
    return app.route(url).get(action)
  }
}

function errorHandler(app) {
  app.use(function (err, req, res, next) {
    switch(err.statusCode) {
    case 404:
      console.error(err.message)
      res.status(404).render('notFound')
      break

    case 500:
      console.error(err.message)
      res.status(500).render('internalServerError')
      break

    default :
      console.error(err.message)
      res.status(500).send(err.message)
    }
  })
}

export default function (app) {
  const route = buildRoute.bind(null, app) //give app param for you for route declaration

  //Render client app
  route(Method.GET, Router.App.all, Website.index)

  errorHandler(app)
  //Expose router for templates
  app.locals.Router = Router
}
