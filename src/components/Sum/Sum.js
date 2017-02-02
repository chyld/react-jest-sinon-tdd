import React from 'react';

export default class Sum extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
    this.add = this.add.bind(this);
  }

  add(){
    const a = +this.a.value;
    const b = +this.b.value;
    this.setState({sum: a + b});
  }

  render(){
    return(
      <div className="sum">
        <h1>Sum</h1>
        <input ref={n => this.a = n} type="text" />
        <button onClick={this.add}>+</button>
        <input ref={n => this.b = n} type="text" />
        =
        <span>{this.state.sum}</span>
      </div>
    );
  }
}
