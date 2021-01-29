import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-picker/picker";

const MAX_HOURS = 23;
const MAX_MINUTES = 59;

export function TimePicker({ value, onChange, hoursUnit, minutesUnit }) {
  const [internalHours, setInternalHours] = useState(value?.hours ?? 0);
  const [internalMinutes, setInternalMinutes] = useState(value?.minutes ?? 0);

  const getHoursItems = () => {
    const items = [];
    for (let i = 0; i <= MAX_HOURS; i++) {
      items.push(
        <Picker.Item key={i} value={i} label={`${i} ${hoursUnit ?? ''}`} />
      );
    }
    return items;
  };

  const getMinutesItems = () => {
    const items = [];
    for (let i = 0; i <= MAX_MINUTES; i++) {
      items.push(
        <Picker.Item key={i} value={i} label={`${i} ${minutesUnit ?? ''}`} />
      );
    }
    return items;
  };

  const handleChangeHours = (hours) => {
    setInternalHours(hours)
    const newValue = {
      minutes: internalMinutes,
      hours
    }
    onChange?.(newValue)
  };

  const handleChangeMinutes = (minutes) => {
    setInternalMinutes(minutes);
    const newValue = {
      minutes,
      hours: internalHours,
    };
    onChange?.(newValue);
  };

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={internalHours}
        onValueChange={(itemValue) => handleChangeHours(itemValue)}
      >
        {getHoursItems()}
      </Picker>
      <Picker
        style={styles.picker}
        selectedValue={internalMinutes}
        onValueChange={(itemValue) => handleChangeMinutes(itemValue)}
      >
        {getMinutesItems()}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  picker: {
    flex: 1,
  },
});

