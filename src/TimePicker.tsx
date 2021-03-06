import * as React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {View, StyleSheet, StyleProp, TextStyle} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {zeroPad} from './utils/zeroPad';

const MAX_HOURS = 23;
const MAX_MINUTES = 59;

export type ValueMap = {
  hours: number;
  minutes: number;
};

export type TimePickerProps = {
  value?: ValueMap;
  onChange?: ({hours, minutes}: ValueMap) => void;
  hoursUnit?: string;
  minutesUnit?: string;
  zeroPadding?: boolean;
  textColor?: string;
  itemStyle?: StyleProp<TextStyle>;
  hoursInterval?: number;
  minutesInterval?: number;
};

export function TimePicker({
  value,
  onChange,
  hoursUnit,
  minutesUnit,
  zeroPadding = false,
  textColor,
  itemStyle,
  hoursInterval = 1,
  minutesInterval = 1,
}: TimePickerProps) {
  if (hoursInterval > MAX_HOURS || minutesInterval > MAX_MINUTES) {
    throw new Error('value of hoursInterval or minutesInterval is invalid.');
  }

  const [internalHours, setInternalHours] = React.useState(value?.hours ?? 0);
  const [internalMinutes, setInternalMinutes] = React.useState(
    value?.minutes ?? 0,
  );

  React.useEffect(() => {
    setInternalHours(value?.hours ?? 0);
    setInternalMinutes(value?.minutes ?? 0);
  }, [value]);

  const getLabel = (i, unit) => {
    const numString = zeroPadding ? zeroPad(i) : i.toString();
    return `${numString} ${unit ?? ''}`;
  };

  const getHoursItems = () => {
    const items: React.ReactElement[] = [];
    for (let i = 0; i <= MAX_HOURS; i += hoursInterval) {
      items.push(
        <Picker.Item
          testID="hoursItem"
          key={i}
          value={i}
          label={getLabel(i, hoursUnit)}
          color={textColor}
        />,
      );
    }
    return items;
  };

  const getMinutesItems = () => {
    const items: React.ReactElement[] = [];
    for (let i = 0; i <= MAX_MINUTES; i += minutesInterval) {
      items.push(
        <Picker.Item
          testID="minutesItem"
          key={i}
          value={i}
          label={getLabel(i, minutesUnit)}
          color={textColor}
        />,
      );
    }
    return items;
  };

  const handleChangeHours = (hours) => {
    setInternalHours(hours);
    const newValue = {
      minutes: internalMinutes,
      hours,
    };
    onChange?.(newValue);
  };

  const handleChangeMinutes = (minutes) => {
    setInternalMinutes(minutes);
    const newValue = {
      minutes,
      hours: internalHours,
    };
    onChange?.(newValue);
  };

  return (
    <View style={styles.container}>
      <Picker
        testID="hoursPicker"
        itemStyle={itemStyle}
        style={styles.picker}
        selectedValue={internalHours}
        onValueChange={(itemValue) => handleChangeHours(itemValue)}>
        {getHoursItems()}
      </Picker>
      <Picker
        testID="minutesPicker"
        itemStyle={itemStyle}
        style={styles.picker}
        selectedValue={internalMinutes}
        onValueChange={(itemValue) => handleChangeMinutes(itemValue)}>
        {getMinutesItems()}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  picker: {
    flex: 1,
  },
});
