import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  PickerItemProps,
  PickerProps,
} from '@react-native-picker/picker/typings/Picker';
import {Picker} from '@react-native-picker/picker';
import {zeroPad} from './utils/zeroPad';

const MAX_MINUTES = 59;
const MAX_SECONDS = 59;

export type ValueMap = {
  hours: number;
  minutes: number;
  seconds: number;
  ampm?: 'am' | 'pm' | undefined;
};

export interface TimePickerProps extends PickerProps {
  value?: Partial<ValueMap>;
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
  value,
  onChange,
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

  const [internalHours, setInternalHours] = React.useState(value?.hours ?? 0);
  const [internalMinutes, setInternalMinutes] = React.useState(
    value?.minutes ?? 0,
  );
  const [internalSeconds, setInternalSeconds] = React.useState(
    value?.minutes ?? 0,
  );
  const [internalAmpm, setInternalAmpm] = React.useState(value?.ampm);

  React.useEffect(() => {
    setInternalHours(value?.hours ?? 0);
    setInternalMinutes(value?.minutes ?? 0);
    setInternalSeconds(value?.seconds ?? 0);
    setInternalAmpm(value?.ampm);
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

  const handleChangeHours = (hours: number) => {
    setInternalHours(hours);
    const newValue: ValueMap = {
      hours,
      minutes: internalMinutes,
      seconds: internalSeconds,
      ampm: internalAmpm,
    };
    onChange?.(newValue);
  };

  const handleChangeMinutes = (minutes: number) => {
    setInternalMinutes(minutes);
    const newValue: ValueMap = {
      hours: internalHours,
      minutes,
      seconds: internalSeconds,
      ampm: internalAmpm,
    };
    onChange?.(newValue);
  };

  const handleChangeSeconds = (seconds: number) => {
    setInternalSeconds(seconds);
    const newValue: ValueMap = {
      hours: internalHours,
      minutes: internalMinutes,
      seconds,
      ampm: internalAmpm,
    };
    onChange?.(newValue);
  };

  const handleChangeAmpm = (ampmValue?: 'am' | 'pm') => {
    setInternalAmpm(ampmValue);
    const newValue: ValueMap = {
      hours: internalHours,
      minutes: internalMinutes,
      seconds: internalSeconds,
      ampm: ampmValue,
    };
    onChange?.(newValue);
  };

  return (
    <View style={styles.container}>
      {pickerShows.includes('hours') && (
        <Picker
          {...others}
          testID="hoursPicker"
          style={styles.picker}
          selectedValue={internalHours}
          onValueChange={handleChangeHours}>
          {getHoursItems()}
        </Picker>
      )}

      {pickerShows.includes('minutes') && (
        <Picker
          {...others}
          testID="minutesPicker"
          style={styles.picker}
          selectedValue={internalMinutes}
          onValueChange={handleChangeMinutes}>
          {getMinutesItems()}
        </Picker>
      )}

      {pickerShows.includes('seconds') && (
        <Picker
          {...others}
          testID="secondsPicker"
          style={styles.picker}
          selectedValue={internalSeconds}
          onValueChange={handleChangeSeconds}>
          {getSecondsItems()}
        </Picker>
      )}

      {isAmpm && (
        <Picker
          {...others}
          testID="ampmPicker"
          style={styles.picker}
          selectedValue={internalAmpm}
          onValueChange={handleChangeAmpm}>
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
