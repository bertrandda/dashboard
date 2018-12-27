import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Calculator from '../Calculator';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const startCalculator = React.createElement(Calculator, {});
  ReactDOM.render(startCalculator, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('calculate plus', () => {
  const loadCalculator = React.createElement(Calculator, {});
  const wrapper = shallow(loadCalculator);
  wrapper.find('#zero-button').simulate('click');
  wrapper.find('#dot-button').simulate('click');
  wrapper.find('#one-button').simulate('click');
  wrapper.find('#plus-button').simulate('click');
  wrapper.find('#two-button').simulate('click');
  wrapper.find('#equal-button').simulate('click');
  wrapper.update();
  expect(wrapper.find('.result').text()).toEqual('2.1');
});

it('calculate minus', () => {
  const loadCalculator = React.createElement(Calculator, {});
  const wrapper = shallow(loadCalculator);
  wrapper.find('#four-button').simulate('click');
  wrapper.find('#minus-button').simulate('click');
  wrapper.find('#three-button').simulate('click');
  wrapper.find('#equal-button').simulate('click');
  wrapper.update();
  expect(wrapper.find('.result').text()).toEqual('1');
});

it('calculate time', () => {
  const loadCalculator = React.createElement(Calculator, {});
  const wrapper = shallow(loadCalculator);
  wrapper.find('#five-button').simulate('click');
  wrapper.find('#time-button').simulate('click');
  wrapper.find('#six-button').simulate('click');
  wrapper.find('#equal-button').simulate('click');
  wrapper.update();
  expect(wrapper.find('.result').text()).toEqual('30');
});

it('calculate divide', () => {
  const loadCalculator = React.createElement(Calculator, {});
  const wrapper = shallow(loadCalculator);
  wrapper.find('#nine-button').simulate('click');
  wrapper.find('#eight-button').simulate('click');
  wrapper.find('#divide-button').simulate('click');
  wrapper.find('#seven-button').simulate('click');
  wrapper.find('#equal-button').simulate('click');
  wrapper.update();
  expect(wrapper.find('.result').text()).toEqual('14');
});

it('delete result', () => {
  const loadCalculator = React.createElement(Calculator, {});
  const wrapper = shallow(loadCalculator);
  wrapper.find('#nine-button').simulate('click');
  wrapper.find('#eight-button').simulate('click');
  wrapper.find('#divide-button').simulate('click');
  wrapper.find('#seven-button').simulate('click');
  wrapper.find('#equal-button').simulate('click');
  wrapper.find('#ca-button').simulate('click');
  wrapper.update();
  expect(wrapper.find('.result').text()).toEqual('');
});