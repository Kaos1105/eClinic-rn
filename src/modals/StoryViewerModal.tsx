import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import ViewPager from '@react-native-community/viewpager';
import { StoryModel } from '../models-demo';

type TProps = {
  selectedIndex: number;
  isShowed: boolean;
  onSwipeComplete: () => void;
  stories: StoryModel[];
};

export const StoryViewerModal: React.FC<TProps> = (props) => {
  return (
    <ReactNativeModal
      isVisible={props.isShowed}
      swipeDirection='down'
      propagateSwipe={true}
      scrollHorizontal={true}
      style={{ margin: 0 }}
      onSwipeComplete={props.onSwipeComplete}
    >
      <SafeAreaView style={styles.flex1}>
        <ViewPager style={styles.flex1} initialPage={props.selectedIndex}>
          {props.stories.map((item, index) => (
            <View key={`key${index}ForStoryPreview`} style={styles.flex1}>
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            </View>
          ))}
        </ViewPager>
      </SafeAreaView>
    </ReactNativeModal>
  );
};

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  image: { flex: 1, margin: 16, borderRadius: 24 },
});
