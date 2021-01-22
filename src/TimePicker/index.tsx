import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-community/picker";

export type ValueMap = {
  hours: number;
  minutes: number
}

export type TimePickerProps = {
  value?: ValueMap;
  onChange?: ({ hours, minutes }: ValueMap) => void;
  hoursUnit?: string;
  minutesUnit?: string;
};


const MAX_HOURS = 24;
const MAX_MINUTES = 60;

export function TimePicker({ value, onChange, hoursUnit, minutesUnit }: TimePickerProps) {
  const [internalHours, setInternalHours] = useState(value?.hours ?? 0);
  const [internalMinutes, setInternalMinutes] = useState(value?.minutes ?? 0);

  const getHoursItems = () => {
    const items = [];
    for (let i = 0; i <= MAX_HOURS; i++) {
      items.push(
        <Picker.Item key={i} value={i} label={`${i}${hoursUnit}`} />
      );
    }
    return items;
  };

  const getMinutesItems = () => {
    const items = [];
    for (let i = 0; i <= MAX_MINUTES; i++) {
      items.push(
        <Picker.Item key={i} value={i} label={`${i}${minutesUnit}`} />
      );
    }
    return items;
  };

  const handleChangeHours = (hours: number) => {
    setInternalHours(hours)
    const newValue = {
      minutes: internalMinutes,
      hours
    }
    onChange?.(newValue)
  };

  const handleChangeMinutes = (minutes: number) => {
    setInternalMinutes(minutes);
    const newValue = {
      minutes,
      hours: internalMinutes,
    };
    onChange?.(newValue);
  };

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        selectedValue={internalHours}
        onValueChange={(itemValue) => handleChangeHours(itemValue as number)}
      >
        {getHoursItems()}
      </Picker>
      <Picker
        style={styles.picker}
        selectedValue={internalMinutes}
        onValueChange={(itemValue) => handleChangeMinutes(itemValue as number)}
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

