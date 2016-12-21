'use strict'

import R from 'ramda'

const base = {
  domain: 'http://convargo.dev',
  apiEndpoint: 'http://convargo.dev/api',
}

const prod = {
  domain: 'https://alws-convargo.herokuapp.com',
  apiEndpoint: 'https://alws-convargo.herokuapp.com/api',
}

function globalConfiguration() {
  if(process.env.NODE_ENV === 'production') return R.merge(base, prod)
  else return base
}

export const global = globalConfiguration()

export default {
  init(req, res, next) {
    const config = globalConfiguration()
    res.locals.global = config
    next()
  }
}
