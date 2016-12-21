import React from 'react';
import ReactDOM from 'react-dom';
import ClientRouter from './components/ClientRouter.jsx';

window.onload = () => {
  ReactDOM.render(<ClientRouter />, document.getElementById('content'));
};
