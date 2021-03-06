import React from 'react';
import axios from 'axios';
import CreateStudent from '../CreateStudent/CreateStudent';
import CreateKlass from '../CreateKlass/CreateKlass';
import Mode from '../Mode/Mode';
import List from '../List/List';

export default class Registration extends React.Component{
  constructor(props){
    super(props);
    this.modes = ['None', 'Student', 'Klass'];
    this.state = {students: [], klasses: [], mode: 0};
    this.studentClick = this.studentClick.bind(this);
    this.fetchStudents = this.fetchStudents.bind(this);
    this.klassClick = this.klassClick.bind(this);
    this.fetchKlasses = this.fetchKlasses.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
  }

  componentDidMount(){
    this.fetchStudents();
    this.fetchKlasses();
  }

  toggleMode(){
    let mode = this.state.mode;
    const length = this.modes.length;
    if(mode < length - 1){
      mode += 1;
    }else{
      mode = 0;
    }
    this.setState({...this.state, mode});
  }

  fetchStudents(){
    const url = this.props.host + '/students';
    axios.get(url).then(r => {
      const students = r.data.map(s => ({css: 'empty', id: s.id, text: s.email}));
      this.setState({...this.state, students});
    }).catch(e => e);
  }

  fetchKlasses(){
    const url = this.props.host + '/klasses';
    axios.get(url).then(r => {
      const klasses = r.data.map(k => ({css: 'empty', id: k.id, text: k.name}));
      this.setState({...this.state, klasses});
    }).catch(e => e);
  }

  studentClick(e){
    const id = +e.target.getAttribute('data-id');
    const url = `${this.props.host}/students/${id}/klasses`;
    axios.get(url).then(r => {
      const ids = r.data.map(k => k.id);
      const klasses = this.state.klasses.map(k => {
        const css = ids.includes(k.id) ? "present" : "empty";
        return {css, id: k.id, text: k.text};
      });
      const students = this.state.students.map(s => {
        const css = s.id === id ? "present" : "empty";
        return {css, id: s.id, text: s.text};        
      });
      this.setState({...this.state, klasses, students});
    }).catch(e => e);
  }

  klassClick(e){
    const id = +e.target.getAttribute('data-id');
    console.log('klass:', id);
  }

  render(){
    return (
      <div className="registration">
        <h1>Registration</h1>
        <Mode mode={this.modes[this.state.mode]} toggleMode={this.toggleMode} />
        <CreateStudent host={this.props.host} created={this.fetchStudents} />
        <List header="Students" items={this.state.students} press={this.studentClick} />
        <CreateKlass host={this.props.host} created={this.fetchKlasses} />
        <List header="Klasses" items={this.state.klasses} press={this.klassClick} />
      </div>
    );
  }
}
