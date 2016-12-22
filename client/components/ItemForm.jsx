import React from 'react';

export default class Home extends React.Component {

  handleClick() {
    window.alert('hello');
  }

  render() {
    return <div onClick={this.handleClick}>Item form</div>;
  }
}
