import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Clock from '../Clock';

import Utils from '../../utils'

it('renders without crashing', () => {
  const div = document.createElement('div');
  const startClock = React.createElement(Clock, {});
  ReactDOM.render(startClock, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('load with data title', () => {
  const loadClock = React.createElement(Clock, { data: { timezone: "Asia/Tokyo", format: "24h", time: "22:06:30" } });
  const wrapper = shallow(loadClock);
  wrapper.update();
  expect(wrapper.find('.first-card-face h2').text()).toEqual('Asia/Tokyo');
});

it('load with data hour', async () => {
  const loadClock = React.createElement(Clock, { data: { timezone: "Asia/Tokyo", format: "24h", time: "22:06:30" } });
  const wrapper = shallow(loadClock);
  await Utils.sleep(500);
  wrapper.update();
  expect(wrapper.find('.first-card-face .time').text()).toMatch(/\d\d:\d\d:\d\d$/);
});