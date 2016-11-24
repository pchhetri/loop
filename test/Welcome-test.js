import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';
import Welcome from '../components/Welcome';
import {
  Card,
  CardTitle,
  CardText,
  CardActions,
  Button,
  Textfield
} from 'react-mdl';

describe("<Welcome />", function() {
  it("should render <Card /> component", function() {
    const wrapper = shallow(<Welcome />);
    expect(wrapper.find(Card)).to.have.length(1);
  });
  it("should render <CardTitle /> component", function() {
    const wrapper = shallow(<Welcome />);
    expect(wrapper.find(CardTitle)).to.have.length(1);
  });
  it("should render <CardText /> component", function() {
    const wrapper = shallow(<Welcome />);
    expect(wrapper.find(CardText)).to.have.length(1);
  });
  it("should render <CardActions /> component", function() {
    const wrapper = shallow(<Welcome />);
    expect(wrapper.find(CardActions)).to.have.length(1);
  });
  it("should render <Button /> component", function() {
    const wrapper = shallow(<Welcome />);
    expect(wrapper.find(Button)).to.have.length(1);
  });
  it("should render <Textfield /> component", function() {
    const wrapper = shallow(<Welcome />);
    expect(wrapper.find(Textfield)).to.have.length(1);
  });
  it('should contain welcome text', () => {
    const wrapper = shallow(<Welcome />).find(CardTitle);
    expect(wrapper.children().text()).to.equal('Welcome to NodaFi!');
    });
  it('should contain welcome image', () => {
    const wrapper = shallow(<Welcome />).find(CardTitle);
    expect(wrapper.props().style.background).to.contain('welcome.jpg')
    });
  it('should contain centered contents inside CardActions', () => {
    const wrapper = shallow(<Welcome />).find(CardActions);
    expect(wrapper.find('div')).to.have.length(1)
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
