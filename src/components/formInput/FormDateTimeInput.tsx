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
import { format } from 'date-fns';

interface IProps extends TextInputProps {
  label: string;
  error: string;
  touched: boolean;
  isDate: boolean;
  onInputBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onInputChange: (text: string) => void;
}
export const FormDateTimeInput: React.FC<IProps> = (props) => {
  const [date, setDate] = useState(props.value === '' ? new Date() : new Date(props.value));
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate?: Date) => {
    setShow(false);
    if (selectedDate) {
      setDate(selectedDate);
      props.onInputChange(selectedDate.toISOString());
    }
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <View>
        <TextInput
          {...props}
          editable={false}
          style={[styles.input, { flex: 1 }]}
          value={format(date, 'dd/MM/yyyy')}
        />
        {show && (
          <DateTimePicker
            value={date}
            maximumDate={new Date()}
            mode={props.isDate ? 'date' : 'time'}
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        )}
        <TouchableOpacity
          style={styles.icon}
          onPress={() => {
            setShow(true);
          }}
        >
          <Ionicons name='calendar' color={Theme.colors.primaryColorDark} size={24} />
        </TouchableOpacity>
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
  form: {
    margin: 20,
  },
  label: { marginVertical: 8 },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  formControl: { width: '100%' },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
  icon: { position: 'absolute', right: 10, top: 10 },
});
