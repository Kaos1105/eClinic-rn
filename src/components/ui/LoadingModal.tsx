import React, { useContext } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, ViewStyle } from 'react-native';
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
    <ReactNativeModal isVisible={!isLoaded} style={styles.container} backdropOpacity={0.5}>
      <ActivityIndicator size='large' color={props.color ?? Theme.colors.primaryColor} />
    </ReactNativeModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
