import 'react-native';
import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import {TimePicker} from '../src';

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
    expect(wrapper.find({testID: 'ampmPicker'}).isEmptyRender()).toBe(true);
  });

  it('should render pickers with pickerShows prop', () => {
    const wrapper = shallow<typeof TimePicker>(
      <TimePicker pickerShows={['hours', 'minutes', 'seconds']} />,
    );
    expect(wrapper.find({testID: 'hoursPicker'}).isEmptyRender()).toBe(false);
    expect(wrapper.find({testID: 'minutesPicker'}).isEmptyRender()).toBe(false);
    expect(wrapper.find({testID: 'secondsPicker'}).isEmptyRender()).toBe(false);
  });

  it('should render pickers with pickerProps e.g. enabled', () => {
    const wrapper = shallow<typeof TimePicker>(
      <TimePicker
        pickerShows={['hours', 'minutes', 'seconds']}
        enabled={false}
      />,
    );
    expect(wrapper.find({testID: 'hoursPicker'}).props().enabled).toBe(false);
    expect(wrapper.find({testID: 'minutesPicker'}).props().enabled).toBe(false);
    expect(wrapper.find({testID: 'secondsPicker'}).props().enabled).toBe(false);
  });

  it('should render empty slot with emptyLabel empty string', () => {
    const wrapper = shallow<typeof TimePicker>(
      <TimePicker
        pickerShows={['hours', 'minutes', 'seconds']}
        emptyLabel=""
      />,
    );
    expect(wrapper.find({testID: 'hoursItem'}).length).toBe(25);
    expect(wrapper.find({testID: 'hoursItem'}).first().props().label).toBe('');
    expect(wrapper.find({testID: 'minutesItem'}).length).toBe(61);
    expect(wrapper.find({testID: 'minutesItem'}).first().props().label).toBe(
      '',
    );
    expect(wrapper.find({testID: 'secondsItem'}).length).toBe(61);
    expect(wrapper.find({testID: 'secondsItem'}).first().props().label).toBe(
      '',
    );
  });

  it('should not render empty slot with emptyLabel undefined', () => {
    const wrapper = shallow<typeof TimePicker>(
      <TimePicker
        pickerShows={['hours', 'minutes', 'seconds']}
        emptyLabel={undefined}
      />,
    );
    expect(wrapper.find({testID: 'hoursItem'}).length).toBe(24);
    expect(wrapper.find({testID: 'hoursItem'}).first().props().label).toBe(
      '0 ',
    );
    expect(wrapper.find({testID: 'minutesItem'}).length).toBe(60);
    expect(wrapper.find({testID: 'minutesItem'}).first().props().label).toBe(
      '0 ',
    );
    expect(wrapper.find({testID: 'secondsItem'}).length).toBe(60);
    expect(wrapper.find({testID: 'secondsItem'}).first().props().label).toBe(
      '0 ',
    );
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

  it('should render label with units', () => {
    const wrapper = shallow<typeof TimePicker>(
      <TimePicker
        hoursUnit="h"
        minutesUnit="m"
        secondsUnit="s"
        pickerShows={['hours', 'minutes', 'seconds']}
      />,
    );

    expect(wrapper.find({testID: 'hoursItem'}).first().props().label).toBe(
      '0 h',
    );
    expect(wrapper.find({testID: 'minutesItem'}).first().props().label).toBe(
      '0 m',
    );
    expect(wrapper.find({testID: 'secondsItem'}).first().props().label).toBe(
      '0 s',
    );
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
    const wrapper = shallow<typeof TimePicker>(
      <TimePicker zeroPadding pickerShows={['hours', 'minutes', 'seconds']} />,
    );

    expect(wrapper.find({testID: 'hoursItem'}).first().props().label).toBe(
      '00 ',
    );
    expect(wrapper.find({testID: 'minutesItem'}).first().props().label).toBe(
      '00 ',
    );
    expect(wrapper.find({testID: 'secondsItem'}).first().props().label).toBe(
      '00 ',
    );
  });

  it('should render pickers with isAmpm', () => {
    const wrapper = shallow<typeof TimePicker>(<TimePicker isAmpm />);
    expect(wrapper.find({testID: 'hoursPicker'}).isEmptyRender()).toBe(false);
    expect(wrapper.find({testID: 'minutesPicker'}).isEmptyRender()).toBe(false);
    expect(wrapper.find({testID: 'ampmPicker'}).isEmptyRender()).toBe(false);

    expect(wrapper.find({testID: 'hoursItem'}).length).toBe(12);
    expect(wrapper.find({testID: 'minutesItem'}).length).toBe(60);

    wrapper.find({testID: 'ampmPicker'}).props().onValueChange('pm', 'pm');
    expect(wrapper.find({testID: 'ampmPicker'}).props().selectedValue).toBe(
      'pm',
    );

    expect(wrapper.find({testID: 'amItem'}).props().label).toBe('am');
    expect(wrapper.find({testID: 'pmItem'}).props().label).toBe('pm');
  });

  it('should render pickers with isAmpm & ampmLocalization', () => {
    const wrapper = shallow<typeof TimePicker>(
      <TimePicker isAmpm ampmLocalization={{am: '午前', pm: '午後'}} />,
    );
    expect(wrapper.find({testID: 'hoursPicker'}).isEmptyRender()).toBe(false);
    expect(wrapper.find({testID: 'minutesPicker'}).isEmptyRender()).toBe(false);
    expect(wrapper.find({testID: 'ampmPicker'}).isEmptyRender()).toBe(false);

    wrapper.find({testID: 'ampmPicker'}).props().onValueChange('pm', '午後');
    expect(wrapper.find({testID: 'ampmPicker'}).props().selectedValue).toBe(
      'pm',
    );

    expect(wrapper.find({testID: 'amItem'}).props().label).toBe('午前');
    expect(wrapper.find({testID: 'pmItem'}).props().label).toBe('午後');
  });
});
