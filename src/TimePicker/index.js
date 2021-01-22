"use strict";
exports.__esModule = true;
exports.TimePicker = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var picker_1 = require("@react-native-community/picker");
var MAX_HOURS = 24;
var MAX_MINUTES = 60;
function TimePicker(_a) {
    var _b, _c;
    var value = _a.value, onChange = _a.onChange, hoursUnit = _a.hoursUnit, minutesUnit = _a.minutesUnit;
    var _d = react_1.useState((_b = value === null || value === void 0 ? void 0 : value.hours) !== null && _b !== void 0 ? _b : 0), internalHours = _d[0], setInternalHours = _d[1];
    var _e = react_1.useState((_c = value === null || value === void 0 ? void 0 : value.minutes) !== null && _c !== void 0 ? _c : 0), internalMinutes = _e[0], setInternalMinutes = _e[1];
    var getHoursItems = function () {
        var items = [];
        for (var i = 0; i <= MAX_HOURS; i++) {
            items.push(<picker_1.Picker.Item key={i} value={i} label={"" + i + hoursUnit}/>);
        }
        return items;
    };
    var getMinutesItems = function () {
        var items = [];
        for (var i = 0; i <= MAX_MINUTES; i++) {
            items.push(<picker_1.Picker.Item key={i} value={i} label={"" + i + minutesUnit}/>);
        }
        return items;
    };
    var handleChangeHours = function (hours) {
        setInternalHours(hours);
        var newValue = {
            minutes: internalMinutes,
            hours: hours
        };
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    };
    var handleChangeMinutes = function (minutes) {
        setInternalMinutes(minutes);
        var newValue = {
            minutes: minutes,
            hours: internalMinutes
        };
        onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
    };
    return (<react_native_1.View style={styles.container}>
      <picker_1.Picker style={styles.picker} selectedValue={internalHours} onValueChange={function (itemValue) { return handleChangeHours(itemValue); }}>
        {getHoursItems()}
      </picker_1.Picker>
      <picker_1.Picker style={styles.picker} selectedValue={internalMinutes} onValueChange={function (itemValue) { return handleChangeMinutes(itemValue); }}>
        {getMinutesItems()}
      </picker_1.Picker>
    </react_native_1.View>);
}
exports.TimePicker = TimePicker;
var styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    picker: {
        flex: 1
    }
});
