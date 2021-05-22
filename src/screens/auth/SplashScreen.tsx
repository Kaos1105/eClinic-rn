import React from 'react';
import { View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../theme';

export const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['white', Theme.colors.primaryColor, Theme.colors.status.online]}
        style={styles.gradient}
      >
        <Image style={styles.image} source={require('../../../assets/logo.png')} />
        <ActivityIndicator size='large' color='white' />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: { width: 150, height: 50, resizeMode: 'contain' },
});
