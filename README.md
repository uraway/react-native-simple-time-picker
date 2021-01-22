![](http://i.imgur.com/3dMcpRM.png)

## Install

```
npm install react-native-simple-time-picker
yarn add react-native-simple-time-picker
```

## Usage

```javascript
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import TimePicker from 'react-native-simple-time-picker';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default class App extends Component {
  state = {
    selectedHours: 0,
    selectedMinutes: 0,
  }

  render() {
    const { selectedHours, selectedMinutes } = this.state;
    return (
      <View style={styles.container}>
        <Text>{selectedHours}:{selectedMinutes}</Text>
        <TimePicker
          hours={selectedHours}
          minutes={selectedMinutes}
          onChange={({ hours, minutes }) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
        />
      </View>
    );
  }
}
```

## API

| Property        | Type        | Default      | Description |
|-----------------|-------------|--------------|-------------|
| hours           | Number      | 0            |             |
| minutes         | Number      | 0            |             |
| onChange        | Function    |              | Callback function for when values are changed `function({ hours: number, minutes: number }) => void`|
| hoursUnit       | String      | ''           | Hours Unit for label  |
| minutesUnit     | String      | ''           | Minutes Unit for label|
