import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import Module from '../Module';
import Clock from '../Clock';
import Notes from '../Notes';
import Calculator from '../Calculator';

it('renders module without crashing', () => {
    const div = document.createElement('div');
    const startModule = React.createElement(Module, {});
    ReactDOM.render(startModule, div);
    ReactDOM.unmountComponentAtNode(div);
});

it('renders module clock without crashing', () => {
    const loadModule = React.createElement(Module, {});
    const wrapper = shallow(loadModule);
    wrapper.find('#clock-icon').simulate('click');
    wrapper.update();
    expect(wrapper.find(Clock).text()).toEqual('<Clock />');
});

it('renders module notes without crashing', () => {
    const loadModule = React.createElement(Module, {});
    const wrapper = shallow(loadModule);
    wrapper.find('#notes-icon').simulate('click');
    wrapper.update();
    expect(wrapper.find(Notes).text()).toEqual('<Notes />');
});

it('renders module calculator without crashing', () => {
    const loadModule = React.createElement(Module, {});
    const wrapper = shallow(loadModule);
    wrapper.find('#calc-icon').simulate('click');
    wrapper.update();
    expect(wrapper.find(Calculator).text()).toEqual('<Calculator />');
});