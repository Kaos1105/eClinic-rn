import React, { useState } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Theme } from "../../theme";
import { Divider } from "../../components";
import { useLocalization } from "../../localization";
import { StoryViewerModal } from "../../modals";
import { storyList, mediaList } from "../../datas";
import { useNavigation } from "@react-navigation/native";
import NavigationNames from "../../navigations/NavigationNames";
import moment from "moment";

type TProps = {};

const StorySection: React.FC<{
  onClickStoryItem: (index: number) => void;
}> = props => (
  <>
    <FlatList
      data={storyList}
      keyExtractor={(item, index) => `key${index}ForStory`}
      renderItem={row => (
        <TouchableOpacity
          style={styles.storyItemContainer}
          onPress={() => props.onClickStoryItem(row.index)}
        >
          <Image
            source={{
              uri: row.item.imageUrl
            }}
            style={styles.storyItemImage}
          />
        </TouchableOpacity>
      )}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={styles.horizontalDivider} />}
      contentContainerStyle={styles.storyContentContainer}
    />
    <Divider />
  </>
);

export const MediaScreen: React.FC<TProps> = props => {
  const navigation = useNavigation();

  const [isShowedStoryModal, setIsShowedStoryModal] = useState(false);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState(0);

  const { getString } = useLocalization();

  return (
    <View style={styles.container}>
      <FlatList
        data={mediaList}
        keyExtractor={(item, index) => `key${index}ForMedia`}
        ListHeaderComponent={() => (
          <StorySection
            onClickStoryItem={(index: number) => {
              setSelectedStoryIndex(index);
              setIsShowedStoryModal(true);
            }}
          />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ padding: 16 }}
            onPress={() =>
              navigation.navigate(NavigationNames.MediaDetailScreen, {
                model: JSON.stringify(item)
              })
            }
            activeOpacity={0.6}
          >
            <View>
              <Image
                source={{
                  uri: item.imageUrl
                }}
                style={styles.image}
              />
              <View style={styles.liveContainer}>
                <Text style={styles.liveText}>{getString("LIVE")}</Text>
              </View>

              <View style={styles.doctorContainer}>
                <Image
                  source={{
                    uri: item.doctor.imageUrl
                  }}
                  style={styles.doctorImage}
                />
                <View style={styles.doctorTextContainer}>
                  <Text style={styles.doctorNameText}>
                    {item.doctor.fullName}
                  </Text>
                  <Text style={styles.doctorTitleText}>
                    {item.doctor.title}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.textRowContainer}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {item.tags.map((item, index) => (
                  <View key={`key${index}ForTag`} style={styles.tagContainer}>
                    <Text style={styles.tagText}>{item}</Text>
                  </View>
                ))}
              </ScrollView>
              <Text style={styles.titleText}>{item.title}</Text>
              <Text style={styles.minuteText}>
                {moment(item.startedDate)
                  .startOf("hour")
                  .fromNow()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <Divider />}
        showsVerticalScrollIndicator={false}
      />
      <StoryViewerModal
        isShowed={isShowedStoryModal}
        selectedIndex={selectedStoryIndex}
        stories={storyList}
        onSwipeComplete={() => setIsShowedStoryModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: {
    height: 210,
    borderRadius: 16,
    borderWidth: 0.4,
    borderColor: Theme.colors.formBackground
  },
  liveContainer: {
    position: "absolute",
    start: 16,
    top: 16,
    backgroundColor: "#F93C1A",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4
  },
  textRowContainer: {
    marginTop: 12,
    marginHorizontal: 4
  },
  liveText: { color: "white", fontSize: 13 },
  titleText: {
    fontSize: 15,
    color: Theme.colors.black,
    marginTop: 8
  },
  minuteText: {
    fontSize: 13,
    fontWeight: "600",
    color: Theme.colors.gray,
    marginTop: 4
  },
  doctorContainer: {
    flexDirection: "row",
    marginTop: 12,
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#FFFFFFEE",
    margin: 4,
    start: 0,
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 12
  },
  doctorImage: {
    width: 28,
    height: 28,
    backgroundColor: Theme.colors.grayForBoxBackground,
    borderRadius: 8
  },
  doctorTextContainer: { paddingHorizontal: 4 },
  doctorNameText: {
    fontWeight: "600",
    fontSize: 12,
    color: Theme.colors.black
  },
  doctorTitleText: {
    fontSize: 11,
    color: Theme.colors.black
  },
  tagContainer: {
    backgroundColor: Theme.colors.grayForBoxBackground,
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginEnd: 8
  },
  tagText: {
    fontWeight: "600",
    fontSize: 12,
    color: Theme.colors.black
  },
  horizontalDivider: { width: 12 },
  storyContentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16
  },
  storyItemContainer: {
    width: 68,
    height: 68,
    backgroundColor: Theme.colors.grayForBoxBackground,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: Theme.colors.primaryColor
  },
  storyItemImage: { flex: 1, borderRadius: 100, margin: 2 }
});
