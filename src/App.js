import React, { Component } from 'react';
import Sum from './components/Sum/Sum';
import Mode from './components/Mode/Mode';
import Registration from './components/Registration/Registration';

export default class App extends Component {
  render() {
    return (
      <div>
        <Registration host="http://localhost:9000" />
      </div>
    );
  }
}
