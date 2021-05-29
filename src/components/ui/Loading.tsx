import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../theme';

interface TProps {
  color?: string;
}

export const Loading = (props: TProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={props.color ?? Theme.colors.primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
