import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
interface IProps {
  children?: React.ReactNode;
  style: ViewStyle;
}

export const Card = (props: IProps) => {
  return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
