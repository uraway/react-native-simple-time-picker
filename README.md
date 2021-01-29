![](https://i.imgur.com/z47iHvd.png)

## Install

```
npm install react-native-simple-time-picker @react-native-picker/picker
yarn add react-native-simple-time-picker @react-native-picker/picker
```

## Usage

```javascript
import React from "react";
import { Text, View, Button } from "react-native";
import { TimePicker } from "./index";

const YourApp = () => {
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const handleChange = (values: { hours: number; minutes: number }) => {
    const { hours, minutes } = values;
    setHours(hours);
    setMinutes(minutes);
  };
  const handleReset = () => {
    setHours(0);
    setMinutes(0);
  };
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>
        {hours} : {minutes}
      </Text>
      <Button title="RESET" onPress={handleReset} />
      <TimePicker value={{ hours, minutes }} onChange={handleChange} />
    </View>
  );
};

export default YourApp;
```

## API

| Property        | Type                                    | Default      | Description                                                                                         |
|-----------------|-------------                            |--------------|-------------                                                                                        |
| value           | { minutes: number, hours: number }      |{ minutes: 0, hours: 0 }         |                                                                                  |
| onChange        | Function                                |              | Callback function for when values are changed `({ hours: number, minutes: number }) => void`        |
| hoursUnit       | String                                  | ''           | Hours Unit for label                                                                                |
| minutesUnit     | String                                  | ''           | Minutes Unit for label                                                                              |
| zeroPadding     | Boolean                                 | false        | Whether to pad numeric labels with zero                                                            |

## Preview

https://snack.expo.io/vy4qwcOOK
