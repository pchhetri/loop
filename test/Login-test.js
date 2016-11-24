import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Login from '../components/Login'
import { Textfield, Button } from 'react-mdl'

describe("<Login />", function() {
  it("should render <Textfield /> component", function() {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(Textfield)).to.have.length(2);
  });
  it("should render <Button /> component", function() {
    const wrapper = shallow(<Login />);
    expect(wrapper.find(Button)).to.have.length(1);
  });
  it("should contain Login header text", function() {
    const wrapper = shallow(<Login />).find('h2');
    expect(wrapper.text()).to.contains('Sign in to');
  });
  it("should contain Email label on Textfield", function() {
    const wrapper = shallow(<Login />).find(Textfield).first();
    expect(wrapper.props().label).to.equal('Email');
  });
  it("should contain Password label on Textfield", function() {
    const wrapper = shallow(<Login />).find(Textfield).at(1);
    expect(wrapper.props().label).to.equal('Password');
  });
  it("should contain Login text on button", function() {
    const wrapper = shallow(<Login />).find(Button);
    expect(wrapper.children().text()).to.equal('LOGIN');
  });
  it('should call submit on button click', () => {
    const onClick = sinon.spy();
    const submit = sinon.spy();
    const wrapper = shallow(
      <Button onClick={submit} />
    );
    wrapper.find('button').simulate('click');
    expect(submit.calledOnce).to.equal(true);
  });
});
