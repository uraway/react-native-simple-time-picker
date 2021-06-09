import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import {TimePicker} from 'react-native-simple-time-picker';

const YourApp = () => {
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const handleChange = (value: {hours: number; minutes: number}) => {
    setHours(value.hours);
    setMinutes(value.minutes);
  };
  const handleReset = () => {
    setHours(0);
    setMinutes(0);
  };
  return (
    <View style={styles.container}>
      <Text>
        {hours} : {minutes}
      </Text>
      <Button title="RESET" onPress={handleReset} />
      <TimePicker
        value={{hours, minutes}}
        onChange={handleChange}
        itemStyle={styles.itemStyle}
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
