import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {TimePicker, zeroPad} from '../lib';

describe('ReactNativeSimpleTimePicker', () => {
  it('should render', () => {
    const wrapper = shallow<typeof TimePicker>(<TimePicker />);
    expect(wrapper.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render all hours and minutes items', () => {
    const wrapper = shallow<typeof TimePicker>(<TimePicker />);
    expect(wrapper.find({testID: 'hoursItem'}).length).toBe(24);
    expect(wrapper.find({testID: 'minutesItem'}).length).toBe(60);
  });

  it('should render units', () => {
    const wrapper = shallow<typeof TimePicker>(
      <TimePicker hoursUnit="h" minutesUnit="m" />,
    );

    wrapper.find({testID: 'hoursItem'}).forEach((node, index) => {
      expect(node.props().label).toBe(`${index} h`);
    });
    wrapper.find({testID: 'minutes'}).forEach((node, index) => {
      expect(node.props().label).toBe(`${index} m`);
    });
  });

  it('should update state', async () => {
    const wrapper = shallow<typeof TimePicker>(<TimePicker />);

    wrapper.find({testID: 'hoursPicker'}).props().onValueChange(20, 20);
    expect(wrapper.find({testID: 'hoursPicker'}).props().selectedValue).toBe(
      20,
    );

    wrapper.find({testID: 'minutesPicker'}).props().onValueChange(30, 30);
    expect(wrapper.find({testID: 'minutesPicker'}).props().selectedValue).toBe(
      30,
    );
  });

  it('should render with zeroPadding', () => {
    const wrapper = shallow<typeof TimePicker>(<TimePicker zeroPadding />);

    wrapper.find({testID: 'hoursItem'}).forEach((node, index) => {
      expect(node.props().label).toBe(`${zeroPad(index)} `);
    });
    wrapper.find({testID: 'minutes'}).forEach((node, index) => {
      expect(node.props().label).toBe(`${zeroPad(index)} `);
    });
  });
});
