import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {TimePicker, zeroPad} from '../lib';

describe('ReactNativeSimpleTimePicker', () => {
  it('should render', () => {
    const wrapper = shallow<typeof TimePicker>(
      <TimePicker pickerShows={['hours', 'minutes', 'seconds']} />,
    );
    expect(wrapper.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render all hours and minutes items', () => {
    const wrapper = shallow<typeof TimePicker>(<TimePicker />);
    expect(wrapper.find({testID: 'hoursItem'}).length).toBe(24);
    expect(wrapper.find({testID: 'minutesItem'}).length).toBe(60);
    expect(wrapper.find({testID: 'secondsItem'}).length).toBe(0);
  });

  it('should render pickers', () => {
    const wrapper = shallow<typeof TimePicker>(<TimePicker />);
    expect(wrapper.find({testID: 'hoursPicker'}).isEmptyRender()).toBe(false);
    expect(wrapper.find({testID: 'minutesPicker'}).isEmptyRender()).toBe(false);
    expect(wrapper.find({testID: 'secondsPicker'}).isEmptyRender()).toBe(true);
  });

  it('should render pickers with pickerShows prop', () => {
    const wrapper = shallow<typeof TimePicker>(
      <TimePicker pickerShows={['hours', 'minutes', 'seconds']} />,
    );
    expect(wrapper.find({testID: 'hoursPicker'}).isEmptyRender()).toBe(false);
    expect(wrapper.find({testID: 'minutesPicker'}).isEmptyRender()).toBe(false);
    expect(wrapper.find({testID: 'secondsPicker'}).isEmptyRender()).toBe(false);
  });

  it('should render all hours, minutes and seconds items with interval props', () => {
    const wrapper = shallow<typeof TimePicker>(
      <TimePicker
        pickerShows={['hours', 'minutes', 'seconds']}
        hoursInterval={5}
        minutesInterval={15}
        secondsInterval={2}
      />,
    );
    expect(wrapper.find({testID: 'hoursItem'}).length).toBe(5);
    expect(wrapper.find({testID: 'minutesItem'}).length).toBe(4);
    expect(wrapper.find({testID: 'secondsItem'}).length).toBe(30);
  });

  it('should fail to render with invalid interval prop', () => {
    expect(() =>
      shallow<typeof TimePicker>(<TimePicker hoursInterval={24} />),
    ).toThrowError();

    expect(() =>
      shallow<typeof TimePicker>(<TimePicker minutesInterval={60} />),
    ).toThrowError();

    expect(() =>
      shallow<typeof TimePicker>(<TimePicker secondsInterval={60} />),
    ).toThrowError();
  });

  it('should render units', () => {
    const wrapper = shallow<typeof TimePicker>(
      <TimePicker hoursUnit="h" minutesUnit="m" secondsUnit="s" />,
    );

    wrapper.find({testID: 'hoursItem'}).forEach((node, index) => {
      expect(node.props().label).toBe(`${index} h`);
    });
    wrapper.find({testID: 'minutesItem'}).forEach((node, index) => {
      expect(node.props().label).toBe(`${index} m`);
    });
    wrapper.find({testID: 'secondsItem'}).forEach((node, index) => {
      expect(node.props().label).toBe(`${index} s`);
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

    wrapper.find({testID: 'minutesPicker'}).props().onValueChange(5, 5);
    expect(wrapper.find({testID: 'minutesPicker'}).props().selectedValue).toBe(
      5,
    );
  });

  it('should render with zeroPadding', () => {
    const wrapper = shallow<typeof TimePicker>(<TimePicker zeroPadding />);

    wrapper.find({testID: 'hoursItem'}).forEach((node, index) => {
      expect(node.props().label).toBe(`${zeroPad(index)} `);
    });
    wrapper.find({testID: 'minutesItem'}).forEach((node, index) => {
      expect(node.props().label).toBe(`${zeroPad(index)} `);
    });
    wrapper.find({testID: 'secondsItem'}).forEach((node, index) => {
      expect(node.props().label).toBe(`${zeroPad(index)} `);
    });
  });
});
