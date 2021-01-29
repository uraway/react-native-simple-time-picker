// Type definitions for react-native-simple-time-picker
// Project: https://github.com/uraway/react-native-simple-time-picker
// Definitions by: uraway <https://github.com/uraway>
// TypeScript Version: 4.1.3

export type ValueMap = {
  hours: number;
  minutes: number;
};

export type TimePickerProps = {
  value?: ValueMap;
  onChange?: ({ hours, minutes }: ValueMap) => void;
  hoursUnit?: string;
  minutesUnit?: string;
  zeroPadding?: boolean
};

export declare function TimePicker({
  value,
  onChange,
  hoursUnit,
  minutesUnit,
  zeroPadding,
}: TimePickerProps): JSX.Element;
