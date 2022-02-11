import React, {useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {TimePicker, ValueMap} from 'react-native-simple-time-picker';

const YourApp = () => {
  const [value, setValue] = useState<ValueMap>({
    hours: 1,
    minutes: 0,
    seconds: 0,
    ampm: 'am',
  });

  const handleChange = (newValue: ValueMap) => {
    setValue(newValue);
  };
  const handleReset = () => {
    setValue({
      hours: 1,
      minutes: 0,
      seconds: 0,
      ampm: 'am',
    });
  };
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(value)}</Text>
      <Button title="RESET" onPress={handleReset} />
      <TimePicker
        value={value}
        onChange={handleChange}
        itemStyle={styles.itemStyle}
        pickerShows={['hours', 'minutes', 'seconds']}
        isAmpm
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    margin: 24,
  },
});

export default YourApp;
