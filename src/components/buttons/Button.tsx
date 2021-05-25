import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Theme } from '../../theme';

interface TProps {
  title: string;
  disabled?: boolean;
  style?: ViewStyle;
  type?: 'default' | 'outline';
  size?: 'default' | 'small';
  onPress?: () => void;
  children?: React.ReactNode;
}

export const Button: React.FC<TProps> = (props) => {
  return (
    <TouchableOpacity
      disabled={props.disabled}
      style={
        props.disabled
          ? [styles.container, props.style, styles.disabled]
          : [styles.container, props.style, props.type === 'outline' && styles.outlineContainer]
      }
      onPress={props.onPress}
    >
      {props.children}
      <Text
        style={[
          styles.text,
          props.type === 'outline' && styles.outlineText,
          props.size === 'small' && {
            fontSize: 12,
          },
        ]}
      >
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 22,
    paddingVertical: 10,
    backgroundColor: Theme.colors.primaryColor,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: Theme.colors.gray,
  },
  disabled: {
    backgroundColor: Theme.colors.gray,
  },
  text: { fontWeight: '600', fontSize: 15, color: 'white' },
  outlineText: {
    color: Theme.colors.gray,
    fontWeight: '400',
  },
});
