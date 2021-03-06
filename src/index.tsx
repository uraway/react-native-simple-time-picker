import * as React from 'react';
import {StyleSheet, View} from 'react-native';
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
};

export function TimePicker({
  value,
  onChange,
  hoursUnit,
  minutesUnit,
  zeroPadding = false,
  textColor,
}: TimePickerProps) {
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
    for (let i = 0; i <= MAX_HOURS; i++) {
      items.push(
        <Picker.Item
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
    for (let i = 0; i <= MAX_MINUTES; i++) {
      items.push(
        <Picker.Item
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
        style={styles.picker}
        selectedValue={internalHours}
        onValueChange={(itemValue) => handleChangeHours(itemValue)}>
        {getHoursItems()}
      </Picker>
      <Picker
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
