import React from 'react';
import { Text, StyleSheet, Modal } from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import { ImageModel } from '../models-demo';

type TProps = {
  items: ImageModel[];
  visible: boolean;
  selectedImageIndex: number;
  onChange?: (currentIndex: number) => void;
  onSwipeDown?: () => void;
};

export const PhotoViewerModal: React.FC<TProps> = (props) => {
  return (
    <Modal visible={props.visible} transparent={true}>
      <ImageViewer
        enableSwipeDown={true}
        swipeDownThreshold={200}
        onSwipeDown={props.onSwipeDown}
        imageUrls={props.items.map((item) => {
          return {
            url: item.imageUrl,
          };
        })}
        footerContainerStyle={styles.footerContainerStyle}
        backgroundColor='#000000'
        index={props.selectedImageIndex}
        onChange={props.onChange}
        renderFooter={(currentIndex: number) => {
          return (
            <Text style={styles.imagePreviewFooterText}>
              {props.items[currentIndex < 0 ? 0 : currentIndex].description}
            </Text>
          );
        }}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  footerContainerStyle: {
    backgroundColor: '#000000AA',
    left: 0,
    right: 0,
    bottom: 0,
  },
  imagePreviewFooterText: {
    color: 'white',
    paddingHorizontal: 16,
    paddingTop: 16,
    fontSize: 16,
    paddingBottom: 32,
    minHeight: 100,
  },
});
