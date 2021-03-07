| iOS                                                                                                                               | Android                                                                                                                           |
| --------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| <image src="https://user-images.githubusercontent.com/15242484/110229867-e53c2480-7f4f-11eb-8afd-85e079063dff.png" width="300" /> | <image src="https://user-images.githubusercontent.com/15242484/110229829-955d5d80-7f4f-11eb-9153-f9a1d0c04ef3.png" width="300" /> |

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

| Property         | Type                               | Default                  | Description                                                                                  |
| ---------------- | ---------------------------------- | ------------------------ | -------------------------------------------------------------------------------------------- |
| value            | { minutes: number, hours: number } | { minutes: 0, hours: 0 } |                                                                                              |
| onChange         | Function                           |                          | Callback function for when values are changed `({ hours: number, minutes: number }) => void` |
| pickerShows      | Array                              | `["hours", "minutes"]`   | Pickers to display (`e.g. ["hours", "minutes", "seconds"]`)                                  |
| hoursUnit        | String                             | ''                       | Hours Unit for label                                                                         |
| minutesUnit      | String                             | ''                       | Minutes Unit for label                                                                       |
| secondsUnit      | String                             | ''                       | Seconds Unit for label                                                                       |
| zeroPadding      | Boolean                            | false                    | Whether to pad numeric labels with zero                                                      |
| textColor        | String                             |                          | Color of the picker item's text                                                              |
| hoursInterval    | Integer                            | 1                        |                                                                                              |
| minutesInterval  | Integer                            | 1                        |                                                                                              |
| secondsInterval  | Integer                            | 1                        |                                                                                              |
| emptyLabel       | String                             | undefined                | Enable empty option with this label                                                          |
| isAmpm           | Boolean                            | false                    | Whether to display am/pm picker                                                              |
| ampmLocalization | { am: string, pm: string }         | { am: 'am', pm: 'pm' }   | Label for am/pm picker items                                                                 |

## Preview

https://snack.expo.io/@uraway/react-native-simple-time-picker
