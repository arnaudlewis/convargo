'use strict'

import React from 'react'

const App = ({ children, params, location }) => {
  return (<div>{children}</div>)
}

App.propTypes = {
  children: React.PropTypes.element
}

export default App
