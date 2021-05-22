import React from "react";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useLocalization } from "../localization";
import NavigationNames from "./NavigationNames";
import { Theme } from "../theme";

const getTabTitle = (routeName: string): string => {
  const { getString } = useLocalization();
  if (routeName === NavigationNames.HomeTab) {
    return getString("Home");
  } else if (routeName === NavigationNames.CalendarTab) {
    return getString("Calendar");
  } else if (routeName === NavigationNames.MediaTab) {
    return getString("Media");
  } else if (routeName === NavigationNames.ProfileTab) {
    return getString("Profile");
  } else if (routeName === NavigationNames.MenuTab) {
    return getString("Menu");
  }
  return "";
};

export const tabScreenOptions: (props: {
  route: RouteProp<ParamListBase, keyof ParamListBase>;
  navigation: any;
}) => BottomTabNavigationOptions = ({ route }) => ({
  title: getTabTitle(route.name),
  tabBarIcon: ({ focused, color, size }) => {
    let iconName = "";
    switch (route.name) {
      case NavigationNames.HomeTab:
        iconName = "ios-home";
        break;
      case NavigationNames.CalendarTab:
        iconName = "ios-calendar";
        break;
      case NavigationNames.MediaTab:
        iconName = "ios-videocam";
        break;
      case NavigationNames.ProfileTab:
        iconName = "md-person";
        break;
      case NavigationNames.MenuTab:
        iconName = "ios-menu";
        break;
    }
    return <Ionicons name={iconName} size={28} color={color} />;
  }
});

export const stackScreenOptions: StackNavigationOptions = {
  headerTitleStyle: { color: Theme.colors.black },
  headerTintColor: Theme.colors.black,
  headerTitleAlign: "center",
  headerBackTitleVisible: false,
  cardStyle: {
    backgroundColor: "white"
  }
};
