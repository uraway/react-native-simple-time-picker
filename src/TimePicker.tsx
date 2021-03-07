import * as React from 'react';
import {View, StyleSheet} from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {PickerProps} from '@react-native-picker/picker/typings/Picker';
import {Picker} from '@react-native-picker/picker';
import {zeroPad} from './utils/zeroPad';

const MAX_HOURS = 23;
const MAX_MINUTES = 59;
const MAX_SECONDS = 59;

export type ValueMap = {
  hours: number;
  minutes: number;
  seconds: number;
};

export interface TimePickerProps extends PickerProps {
  value?: Partial<ValueMap>;
  onChange?: ({hours, minutes, seconds}: ValueMap) => void;
  hoursUnit?: string;
  minutesUnit?: string;
  secondsUnit?: string;
  zeroPadding?: boolean;
  textColor?: string;
  hoursInterval?: number;
  minutesInterval?: number;
  secondsInterval?: number;
  pickerShows?: Array<'hours' | 'minutes' | 'seconds'>;
}

export function TimePicker({
  value,
  onChange,
  hoursUnit,
  minutesUnit,
  secondsUnit,
  zeroPadding = false,
  textColor,
  hoursInterval = 1,
  minutesInterval = 1,
  secondsInterval = 1,
  pickerShows = ['hours', 'minutes'],
  ...others
}: TimePickerProps) {
  if (
    hoursInterval > MAX_HOURS ||
    minutesInterval > MAX_MINUTES ||
    secondsInterval > MAX_SECONDS
  ) {
    throw new Error(
      'value of hoursInterval, minutesInterval or secondsInterval is invalid.',
    );
  }

  const [internalHours, setInternalHours] = React.useState(value?.hours ?? 0);
  const [internalMinutes, setInternalMinutes] = React.useState(
    value?.minutes ?? 0,
  );
  const [internalSeconds, setInternalSeconds] = React.useState(
    value?.minutes ?? 0,
  );

  React.useEffect(() => {
    setInternalHours(value?.hours ?? 0);
    setInternalMinutes(value?.minutes ?? 0);
    setInternalSeconds(value?.seconds ?? 0);
  }, [value]);

  const getLabel = (i: number, unit?: string) => {
    const numString = zeroPadding ? zeroPad(i) : i.toString();
    return `${numString} ${unit ?? ''}`;
  };

  const getHoursItems = () => {
    const items: React.ReactElement[] = [];
    if (!pickerShows.includes('hours')) {
      return items;
    }

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
    if (!pickerShows.includes('minutes')) {
      return items;
    }

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

  const getSecondsItems = () => {
    const items: React.ReactElement[] = [];
    if (!pickerShows.includes('seconds')) {
      return items;
    }

    for (let i = 0; i <= MAX_SECONDS; i += secondsInterval) {
      items.push(
        <Picker.Item
          testID="secondsItem"
          key={i}
          value={i}
          label={getLabel(i, secondsUnit)}
          color={textColor}
        />,
      );
    }
    return items;
  };

  const handleChangeHours = (hours) => {
    setInternalHours(hours);
    const newValue = {
      hours,
      minutes: internalMinutes,
      seconds: internalSeconds,
    };
    onChange?.(newValue);
  };

  const handleChangeMinutes = (minutes) => {
    setInternalMinutes(minutes);
    const newValue = {
      hours: internalHours,
      minutes,
      seconds: internalSeconds,
    };
    onChange?.(newValue);
  };

  const handleChangeSeconds = (seconds) => {
    setInternalSeconds(seconds);
    const newValue = {
      hours: internalHours,
      minutes: internalMinutes,
      seconds,
    };
    onChange?.(newValue);
  };

  return (
    <View style={styles.container}>
      {pickerShows.includes('hours') && (
        <Picker
          testID="hoursPicker"
          style={styles.picker}
          selectedValue={internalHours}
          onValueChange={(itemValue) => handleChangeHours(itemValue)}
          {...others}>
          {getHoursItems()}
        </Picker>
      )}

      {pickerShows.includes('minutes') && (
        <Picker
          testID="minutesPicker"
          style={styles.picker}
          selectedValue={internalMinutes}
          onValueChange={(itemValue) => handleChangeMinutes(itemValue)}
          {...others}>
          {getMinutesItems()}
        </Picker>
      )}

      {pickerShows.includes('seconds') && (
        <Picker
          testID="secondsPicker"
          style={styles.picker}
          selectedValue={internalSeconds}
          onValueChange={(itemValue) => handleChangeSeconds(itemValue)}
          {...others}>
          {getSecondsItems()}
        </Picker>
      )}
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
