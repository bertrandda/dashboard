import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Notes from '../Notes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const startNotes = React.createElement(Notes, {});
  ReactDOM.render(startNotes, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('load with data notes', () => {
  const loadNotes = React.createElement(Notes, { data: { notes: "My notes saved" } });
  const wrapper = shallow(loadNotes);
  expect(wrapper.find('.first-card-face .notes-text-area').props().value).toEqual('My notes saved');
});