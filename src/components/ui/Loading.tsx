import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../theme';

export const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size='large' color={Theme.colors.primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
