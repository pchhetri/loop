import React from 'react';
import { shallow, mount, render } from 'enzyme';
import {expect} from 'chai';
import Welcome from '../components/Welcome';
import { Card } from 'react-mdl';

describe("<Welcome />", function() {
  it("should render <Card /> component", function() {
    const wrapper = shallow(<Welcome />);
    expect(wrapper.find(Card)).to.have.length(1);
  });

});
