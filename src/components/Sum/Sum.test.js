import React from 'react';
import sinon from 'sinon';
import { shallow, mount, render } from 'enzyme';

import Sum from './Sum';

describe('Sum', function() {
  it('should mount in a full DOM', function() {
    // const wrapper = mount(<Sum />);
    // console.log(wrapper.debug());

    expect(mount(<Sum />)).toBeTruthy();
  });

  it('should find a CSS class in DOM', function() {
    expect(mount(<Sum />).find('.sum').length).toBe(1);
  });

  it('should render without throwing an error', function() {
    const html = '<div class=\"sum\"><h1>Sum</h1><input type=\"text\"/><button>+</button><input type=\"text\"/>=<span></span></div>';
    expect(shallow(<Sum />).html()).toBe(html);
  });

  it('should be selectable by class "sum"', function() {
    expect(shallow(<Sum />).is('.sum')).toBe(true);
  });

  it('should render to static HTML', function() {
    expect(render(<Sum />).text()).toEqual('Sum+=');
  });

  it('should be able to call the add function', function() {
    const wrapper = shallow(<Sum />);
    const instance = wrapper.instance();

    const add = sinon.stub(instance, 'add', () => null);
    instance.forceUpdate();
    wrapper.update()

    wrapper.find('button').simulate('click');
    expect(add.callCount).toEqual(1);
  });

  it('should be able to add two numbers', function() {
    const wrapper = mount(<Sum />);
    wrapper.find('input').get(0).value = 3;
    wrapper.find('input').get(1).value = 4;
    wrapper.find('button').simulate('click');
    expect(wrapper.state('sum')).toEqual(7);
    expect(wrapper.find('span').text()).toEqual('7');
  });
});
