![](https://i.imgur.com/z47iHvd.png)

## Install

```
npm install react-native-simple-time-picker @react-native-picker/picker
yarn add react-native-simple-time-picker @react-native-picker/picker
```

## Usage

```javascript
import React from 'react';
import { Text, View } from 'react-native';
import { TimePicker } from 'react-native-simple-time-picker'

const YourApp = () => {
  const [hours, setHours] = React.useState(0)
  const [minutes, setMinutes] = React.useState(0)
  const handleChange = (values: { hours: number, minutes: number }) => {
    const { hours, minutes } = values;
    setHours(hours);
    setMinutes(minutes);
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>{hours} : {minutes}</Text>
      <TimePicker hours={hours} minutes={minutes} onChange={handleChange} />
    </View>
  );
}

export default YourApp;
```

## API

| Property        | Type        | Default      | Description |
|-----------------|-------------|--------------|-------------|
| hours           | Number      | 0            |             |
| minutes         | Number      | 0            |             |
| onChange        | Function    |              | Callback function for when values are changed `function({ hours: number, minutes: number }) => void`|
| hoursUnit       | String      | ''           | Hours Unit for label  |
| minutesUnit     | String      | ''           | Minutes Unit for label|

## Preview

<div data-snack-id="@uraway/6db199" data-snack-platform="ios" data-snack-preview="true" data-snack-theme="dark" style="overflow:hidden;background:#212121;border:1px solid var(--color-border);border-radius:4px;height:505px;width:100%"></div>
<script async src="https://snack.expo.io/embed.js"></script>
