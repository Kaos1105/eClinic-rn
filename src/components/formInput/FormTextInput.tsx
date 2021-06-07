import React from 'react';
import {
  TextInputProps,
  View,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';
interface IProps extends TextInputProps {
  label: string;
  error: string;
  touched: boolean;
  editable?: boolean;
  onInputBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onInputChange: (text: string) => void;
}
export const FormTextInput: React.FC<IProps> = (props) => {
  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        editable={props.editable}
        style={styles.input}
        onChangeText={props.onInputChange}
        onBlur={props.onInputBlur}
        value={props.value}
      />
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
});
