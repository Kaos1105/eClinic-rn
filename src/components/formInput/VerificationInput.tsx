import React, { useState } from 'react';
import { TextInputFocusEventData } from 'react-native';
import { NativeSyntheticEvent, StyleSheet, Text, TextInputProps, View } from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 6;
interface IProps extends TextInputProps {
  label: string;
  error: string;
  touched: boolean;
  onInputBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  onInputChange: (text: string) => void;
}

export const VerificationInput: React.FC<IProps> = (props) => {
  // const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value: props.value, cellCount: CELL_COUNT });
  const [cellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value: props.value,
    setValue: props.onInputChange,
  });

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{props.label}</Text>
      <CodeField
        ref={ref}
        {...cellProps}
        value={props.value}
        onBlur={props.onInputBlur}
        onChangeText={props.onInputChange}
        cellCount={CELL_COUNT}
        rootStyle={styles.input}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        renderCell={({ index, symbol, isFocused }) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
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
  },
  formControl: { width: '100%' },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
