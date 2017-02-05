import React from 'react';
import axios from 'axios';
import CreateStudent from '../CreateStudent/CreateStudent';
import Mode from '../Mode/Mode';
import List from '../List/List';

export default class Registration extends React.Component{
  constructor(props){
    super(props);
    this.state = {students: []};
    this.studentClick = this.studentClick.bind(this);
    this.fetchStudents = this.fetchStudents.bind(this);
  }

  componentDidMount(){
    this.fetchStudents();
  }

  fetchStudents(){
    const url = this.props.host + '/students';
    axios.get(url).then(r => {
      const students = r.data.map(s => ({css: 'abc', id: s.id, text: s.email}));
      this.setState({students});
    }).catch(e => e);
  }

  studentClick(e){
    const id = +e.target.getAttribute('data-id');
    console.log('student:', id);
  }

  render(){
    return (
      <div className="registration">
        <h1>Registration</h1>
        <CreateStudent host={this.props.host} created={this.fetchStudents} />
        <List header="Students" items={this.state.students} press={this.studentClick} />
      </div>
    );
  }
}
