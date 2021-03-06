![](https://i.imgur.com/z47iHvd.png)

## Install

```
npm install react-native-simple-time-picker

# React Native
npm install @react-native-picker/picker
npx pod-install

# Expo
expo install @react-native-picker/picker
```

## Usage

```javascript
import React from 'react';
import {TimePicker} from 'react-native-simple-time-picker';

const YourApp = () => {
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const handleChange = (value: {hours: number, minutes: number}) => {
    setHours(value.hours);
    setMinutes(value.minutes);
  };
  return <TimePicker value={{hours, minutes}} onChange={handleChange} />;
};
```

## Props

| Property    | Type                               | Default                  | Description                                                                                  |
| ----------- | ---------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------- |
| value       | { minutes: number, hours: number } | { minutes: 0, hours: 0 } |                                                                                              |
| onChange    | Function                           |                          | Callback function for when values are changed `({ hours: number, minutes: number }) => void` |
| hoursUnit   | String                             | ''                       | Hours Unit for label                                                                         |
| minutesUnit | String                             | ''                       | Minutes Unit for label                                                                       |
| zeroPadding | Boolean                            | false                    | Whether to pad numeric labels with zero                                                      |
| textColor   | String                             |                          | Color of the picker item's text                                                              |
| itemStyle   | Text Style Props                   |                          | Style to apply to each of the labels (https://reactnative.dev/docs/text-style-props)         |

## Preview

https://snack.expo.io/@uraway/react-native-simple-time-picker
