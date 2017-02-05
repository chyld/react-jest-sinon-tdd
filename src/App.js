import React, { Component } from 'react';
import Sum from './components/Sum/Sum';
import Mode from './components/Mode/Mode';

export default class App extends Component {
  render() {
    return (
      <div>
        <Sum />
        <Mode />
      </div>
    );
  }
}
