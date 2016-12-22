import React from 'react';

const App = ({ children, params, location }) => (<div>{children}</div>);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
