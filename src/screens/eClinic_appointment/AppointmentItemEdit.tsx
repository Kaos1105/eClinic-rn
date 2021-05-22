import { EC_BOOKING_ENTITY } from 'models/EC_BOOKING_ENTITY';
import { RootStoreContext } from 'stores/rootStore';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export const AppointmentItemEdit = (route: any) => {
  //store Data
  const rootStore = useContext(RootStoreContext);

  return (
    <>
      {/* <Text>{route.params.item}</Text>
      <Text>{route.params.item}</Text>
      <Text>{route.params.item}</Text> */}
    </>
  );
};
