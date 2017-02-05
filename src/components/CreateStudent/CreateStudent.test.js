import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http'
import { shallow, mount, render } from 'enzyme';

import CreateStudent from './CreateStudent';
axios.defaults.adapter = httpAdapter;

describe('CreateStudent', function() {
  beforeEach(() => {
    nock.disableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });

  it('should mount in a full DOM', function() {
    // const wrapper = mount(<CreateStudent />);
    // console.log(wrapper.debug());

    expect(mount(<CreateStudent />)).to.be.ok;
  });

  it('should find a CSS class in DOM', function() {
    expect(mount(<CreateStudent />).find('.create-student')).to.have.lengthOf(1);
  });

  it('should render without throwing an error', function() {
    const html = '<div class="create-student"><h1>Create Student</h1><div class="error"></div><form><label>Email Address</label><input type="email"/><button>Create</button></form></div>';
    expect(shallow(<CreateStudent />).html()).to.equal(html);
  });

  it('should be selectable by class "CreateStudent"', function() {
    expect(shallow(<CreateStudent />).is('.create-student')).to.be.true;
  });

  it('should render to static HTML', function() {
    expect(render(<CreateStudent />).text()).to.equal('Create StudentEmail AddressCreate');
  });

  it('should should have URL and CREATED props', function() {
    const wrapper = mount(<CreateStudent host="aaa" created={() => null} />);
    expect(wrapper.prop('host')).to.equal('aaa');
    expect(wrapper.prop('created')).to.be.a('function');
  });

  it('should should call preventDefault when button clicked', function() {
    const stub = sinon.stub();
    const wrapper = mount(<CreateStudent />);
    wrapper.find('button').simulate('click', {preventDefault: stub});
    expect(stub.callCount).to.equal(1);
  });

  it('should call webservice to create student', function(done) {
    nock('http://fakehost.com')
    .post('/students', {email: "sam@aol.com"})
    .reply(200, {
      id: 99,
      email: "sam@aol.com"
    });

    const created = sinon.stub();
    const wrapper = mount(<CreateStudent host="http://fakehost.com" created={created} />);
    wrapper.find('input').get(0).value = "sam@aol.com";
    wrapper.find('button').simulate('click');

    setTimeout(() => {
      try{
        const student = created.getCall(0).args[0];
        expect(created.callCount).to.equal(1);
        expect(student).to.deep.equal({id: 99, email: "sam@aol.com"});

        done();
      }catch(e){
        done.fail(e);
      }
    }, 1000);
  });

  it('should display error message on email too short', function(done) {
    nock('http://fakehost.com')
    .post('/students', {email: "bad"})
    .replyWithError('email too short');

    const created = sinon.stub();
    const wrapper = mount(<CreateStudent host="http://fakehost.com" created={created} />);
    wrapper.find('input').get(0).value = "bad";
    wrapper.find('button').simulate('click');

    setTimeout(() => {
      try{
        expect(created.callCount).to.equal(0);
        expect(wrapper.state('error')).to.equal('email too short');

        done();
      }catch(e){
        done.fail(e);
      }
    }, 1000);
  });
});
