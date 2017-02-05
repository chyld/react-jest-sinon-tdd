import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import { shallow, mount, render } from 'enzyme';

import Box from './Box';

describe('Box', function() {
  it('should mount in a full DOM', function() {
    // const wrapper = mount(<Box />);
    // console.log(wrapper.debug());

    expect(mount(<Box />)).to.be.ok;
  });

  it('should find a CSS class in DOM', function() {
    expect(mount(<Box />).find('.box')).to.have.lengthOf(1);
  });

  it('should render without throwing an error', function() {
    const html = '<div class="box"><div class="a b c"></div></div>';
    expect(shallow(<Box css="a b c" />).html()).to.equal(html);
  });

  it('should be selectable by class "box"', function() {
    expect(shallow(<Box />).is('.box')).to.be.true;
  });

  it('should render to static HTML', function() {
    expect(render(<Box text="alice@aol.com" />).text()).to.equal('alice@aol.com');
  });

  it('should call external function when button is pressed', function() {
    const press = sinon.stub();
    const wrapper = mount(<Box press={press} />);
    wrapper.find('div > div').simulate('click');
    expect(press.callCount).to.equal(1);
  });
});
