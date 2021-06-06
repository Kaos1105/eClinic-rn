import React, { useContext } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, ViewStyle, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '../../theme';
import { ReactNativeModal } from 'react-native-modal';
import { RootStoreContext } from 'stores/rootStore';
import { observer } from 'mobx-react-lite';

interface TProps {
  color?: string;
}

export const LoadingModal = observer((props: TProps) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoaded } = rootStore.commonStore;
  return (
    !isLoaded && (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={Theme.colors.tintColor} />
      </View>
    )
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
