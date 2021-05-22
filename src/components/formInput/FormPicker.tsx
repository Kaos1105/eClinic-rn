import React, { useState } from 'react';
import {
  TextInputProps,
  View,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  TouchableOpacity,
} from 'react-native';
// import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { Theme } from '../../theme';
import { Picker } from '@react-native-picker/picker';

interface IProps extends TextInputProps {
  label: string;
  error: string;
  options: Array<{ label: string; value: string }>;
  touched: boolean;
  onInputBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onInputChange: (text: string) => void;
}
export const FormPicker: React.FC<IProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.value);

  const onChange = (itemValue: string, itemIndex: number) => {
    if (itemValue) {
      setSelectedValue(itemValue);
      props.onInputChange(itemValue);
    }
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>

      <View style={styles.pickerContainer}>
        <Picker selectedValue={selectedValue} onValueChange={onChange} style={styles.picker}>
          {props.options.map((value, index) => (
            <Picker.Item key={index} label={value.label} value={value.value} />
          ))}
        </Picker>
      </View>

      {props.error && props.touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{props.error}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  label: { marginVertical: 8 },
  formControl: {
    width: '100%',
  },

  picker: {
    height: 25,
    width: '100%',
  },
  pickerContainer: {
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
});
