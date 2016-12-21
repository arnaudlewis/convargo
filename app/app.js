'use strict'

import app from './conf/config'
const PORT = app.get('port')

const isProduction = process.env.NODE_ENV === 'production'

app.listen(PORT, function() {
  console.log('http://convargo.dev')
})
