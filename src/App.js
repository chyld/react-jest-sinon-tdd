import React, { Component } from 'react';
import Sum from './components/Sum/Sum';
import Mode from './components/Mode/Mode';
import CreateStudent from './components/CreateStudent/CreateStudent';

export default class App extends Component {
  render() {
    return (
      <div>
        <Sum />
        <Mode />
        <CreateStudent host="http://localhost:9000" created={(student) => console.log('create:', student)} />
      </div>
    );
  }
}
