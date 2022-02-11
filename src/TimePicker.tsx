import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  PickerItemProps,
  PickerProps,
} from '@react-native-picker/picker/typings/Picker';
import {Picker} from '@react-native-picker/picker';
import {zeroPad} from './utils/zeroPad';
import {useControlledState} from '@react-stately/utils';

const MAX_MINUTES = 59;
const MAX_SECONDS = 59;

export type ValueMap = {
  hours: number;
  minutes: number;
  seconds: number;
  ampm?: 'am' | 'pm' | undefined;
};

export interface TimePickerProps extends PickerProps {
  defaultValue?: Partial<ValueMap>;
  value?: ValueMap;
  onChange?: (newValue: ValueMap) => void;
  hoursUnit?: string;
  minutesUnit?: string;
  secondsUnit?: string;
  zeroPadding?: boolean;
  textColor?: PickerItemProps['color'];
  hoursInterval?: number;
  minutesInterval?: number;
  secondsInterval?: number;
  pickerShows?: Array<'hours' | 'minutes' | 'seconds'>;
  emptyLabel?: string;
  isAmpm?: boolean;
  ampmLocalization?: {
    am: string;
    pm: string;
  };
}

export function TimePicker({
  defaultValue,
  value,
  onChange = () => {},
  hoursUnit,
  minutesUnit,
  secondsUnit,
  zeroPadding = false,
  textColor = '',
  hoursInterval = 1,
  minutesInterval = 1,
  secondsInterval = 1,
  pickerShows = ['hours', 'minutes'],
  emptyLabel,
  isAmpm,
  ampmLocalization = {
    am: 'am',
    pm: 'pm',
  },
  ...others
}: TimePickerProps) {
  let MAX_HOURS = 23;
  let MIN_HOURS = 0;

  if (isAmpm) {
    MAX_HOURS = 12;
    MIN_HOURS = 1;
  }

  if (
    hoursInterval > MAX_HOURS ||
    minutesInterval > MAX_MINUTES ||
    secondsInterval > MAX_SECONDS
  ) {
    throw new Error(
      'value of hoursInterval, minutesInterval or secondsInterval is invalid.',
    );
  }

  const [internalValue, setInternalValue] = useControlledState<ValueMap>(
    value as ValueMap,
    {
      hours: 1,
      minutes: 0,
      seconds: 0,
      ...defaultValue,
    },
    onChange,
  );

  const getLabel = (i: number, unit?: string) => {
    const numString = zeroPadding ? zeroPad(i) : i.toString();
    return `${numString} ${unit ?? ''}`;
  };

  const getHoursItems = () => {
    const items: React.ReactElement[] = [];
    if (!pickerShows.includes('hours')) {
      return items;
    }

    if (emptyLabel != null) {
      items.push(
        <Picker.Item
          testID="hoursItem"
          key="nullHoursItem"
          value=""
          label={emptyLabel}
          color={textColor}
        />,
      );
    }

    for (let i = MIN_HOURS; i <= MAX_HOURS; i += hoursInterval) {
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

    if (emptyLabel != null) {
      items.push(
        <Picker.Item
          testID="minutesItem"
          key="nullMinutesItem"
          value=""
          label={emptyLabel}
          color={textColor}
        />,
      );
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

    if (emptyLabel != null) {
      items.push(
        <Picker.Item
          testID="secondsItem"
          key="nullSecondsItem"
          value=""
          label={emptyLabel}
          color={textColor}
        />,
      );
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

  const handleChangeHours = React.useCallback(
    (hours: number) => {
      setInternalValue((prev) => ({
        ...prev,
        hours,
      }));
    },
    [setInternalValue],
  );

  const handleChangeMinutes = React.useCallback(
    (minutes: number) => {
      setInternalValue((prev) => ({
        ...prev,
        minutes,
      }));
    },
    [setInternalValue],
  );

  const handleChangeSeconds = React.useCallback(
    (seconds: number) => {
      setInternalValue((prev) => ({
        ...prev,
        seconds,
      }));
    },
    [setInternalValue],
  );

  const handleChangeAmpm = React.useCallback(
    (ampm?: 'am' | 'pm') => {
      setInternalValue((prev) => ({
        ...prev,
        ampm,
      }));
    },
    [setInternalValue],
  );

  return (
    <View style={styles.container}>
      {pickerShows.includes('hours') && (
        <Picker
          {...others}
          testID="hoursPicker"
          style={styles.picker}
          selectedValue={internalValue?.hours}
          onValueChange={handleChangeHours}
        >
          {getHoursItems()}
        </Picker>
      )}

      {pickerShows.includes('minutes') && (
        <Picker
          {...others}
          testID="minutesPicker"
          style={styles.picker}
          selectedValue={internalValue?.minutes}
          onValueChange={handleChangeMinutes}
        >
          {getMinutesItems()}
        </Picker>
      )}

      {pickerShows.includes('seconds') && (
        <Picker
          {...others}
          testID="secondsPicker"
          style={styles.picker}
          selectedValue={internalValue?.seconds}
          onValueChange={handleChangeSeconds}
        >
          {getSecondsItems()}
        </Picker>
      )}

      {isAmpm && (
        <Picker
          {...others}
          testID="ampmPicker"
          style={styles.picker}
          selectedValue={internalValue?.ampm}
          onValueChange={handleChangeAmpm}
        >
          <Picker.Item
            testID="amItem"
            value="am"
            label={ampmLocalization.am}
            color={textColor}
          />
          <Picker.Item
            testID="pmItem"
            value="pm"
            label={ampmLocalization.pm}
            color={textColor}
          />
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
