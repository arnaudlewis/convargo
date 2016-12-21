'use strict'

import { match } from 'react-router'
import React from 'react'
import ReactDOM from 'react-dom/server'
import { renderToStringWithData } from 'react-apollo'
import 'isomorphic-fetch';

import {NotFound, InternalServerError} from '../utils/Results'
import routes from '../conf/client.routes.js'
import Apollo from '../utils/Apollo'

function index(req, res, next) {
  match({ routes, location: req.originalUrl }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (error) {
      next(InternalServerError(error))
    } else if (renderProps) {

      const client = Apollo.build(req.headers)
      const provider = Apollo.makeProvider(client, renderProps)
      renderToStringWithData(provider)
      .then(content => {
        //const data = client.store.getState().apollo.data
        //const html = (<Html content={content} state={{ apollo: { data } }}/>)
        const dom = <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
        res.render('index', {html: ReactDOM.renderToStaticMarkup(dom)})
      })
      .catch(e => {
        next(InternalServerError(e))
      })

    } else {
      next(NotFound('Unable to find a component'))
    }
  })
}

export default {index}
