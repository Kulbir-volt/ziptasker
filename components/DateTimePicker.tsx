import React from "react";
import DatePicker, {
  DatePickerOptions,
} from "@react-native-community/datetimepicker";

const DateTimePicker: React.FC<DatePickerOptions> = (props) => {
  return <DatePicker {...props} />;
};

export { DateTimePicker };
