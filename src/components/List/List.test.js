import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import { shallow, mount, render } from 'enzyme';

import List from './List';

describe('List', function() {
  it('should mount in a full DOM', function() {
    // const wrapper = mount(<List />);
    // console.log(wrapper.debug());

    expect(mount(<List items={[]} />)).to.be.ok;
  });

  it('should find a CSS class in DOM', function() {
    expect(mount(<List items={[]} />).find('.list')).to.have.lengthOf(1);
  });

  it('should render without throwing an error', function() {
    const html = '<div class="list"><h1>Student List</h1></div>';
    expect(shallow(<List items={[]} header="Student List" />).html()).to.equal(html);
  });

  it('should be selectable by class "list"', function() {
    expect(shallow(<List items={[]} />).is('.list')).to.be.true;
  });

  it('should render to static HTML', function() {
    expect(render(<List items={[]} header="Student List" />).text()).to.equal('Student List');
  });

  it('should render with children', function() {
    const html = '<div class="list"><h1>Student List</h1><div class="box"><div class="a">b</div></div><div class="box"><div class="c">d</div></div></div>';
    expect(shallow(<List items={[{css:'a', text:'b'}, {css:'c', text:'d'}]} header="Student List" />).html()).to.equal(html);
  });

  it('should call external function when button is pressed', function() {
    const stub = sinon.stub();
    const wrapper = mount(<List press={stub} items={[{css:'a', text:'b'}, {css:'c', text:'d'}]} header="Student List" />);
    wrapper.find('div.box > div').at(0).simulate('click');
    expect(stub.callCount).to.equal(1);
  });
});
