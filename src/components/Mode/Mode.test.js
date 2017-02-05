import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import { shallow, mount, render } from 'enzyme';

import Mode from './Mode';

describe('Mode', function() {
  it('should mount in a full DOM', function() {
    // const wrapper = mount(<Mode />);
    // console.log(wrapper.debug());

    expect(mount(<Mode />)).to.be.ok;
  });

  it('should find a CSS class in DOM', function() {
    expect(mount(<Mode />).find('.mode')).to.have.lengthOf(1);
  });

  it('should render without throwing an error', function() {
    const html = '<div class="mode"><h1>Mode</h1><div class="status"></div><button>Change Mode</button></div>';
    expect(shallow(<Mode />).html()).to.equal(html);
  });

  it('should be selectable by class "mode"', function() {
    expect(shallow(<Mode />).is('.mode')).to.be.true;
  });

  it('should render to static HTML', function() {
    expect(render(<Mode />).text()).to.equal('ModeChange Mode');
  });

  it('should display the current mode', function() {
    const wrapper = mount(<Mode mode="Student" />);
    expect(wrapper.prop('mode')).to.equal("Student");
    expect(wrapper.text()).to.equal("ModeStudentChange Mode");
    expect(wrapper.find('.status').html()).to.equal('<div class="status">Student</div>');
  });

  it('should call external function when button is pressed', function() {
    const toggle = sinon.stub();
    const wrapper = mount(<Mode toggleMode={toggle} />);
    wrapper.find('button').simulate('click');
    expect(toggle.callCount).to.equal(1);
  });
});
