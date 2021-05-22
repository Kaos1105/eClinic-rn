import { EC_BOOKING_ENTITY } from 'models/EC_BOOKING_ENTITY';
import { RootStoreContext } from 'stores/rootStore';
import React, { useContext } from 'react';
import { View, Text } from 'react-native';

interface IProps {
  item: EC_BOOKING_ENTITY;
}

const AppointmentItem = (props: IProps) => {
  //store Data
  const rootStore = useContext(RootStoreContext);

  return (
    <>
      <Text>{props.item.bookinG_ID}</Text>
      <Text>{props.item.benhnhaN_ID}</Text>
      <Text>{props.item.bacsykhaM_ID}</Text>
    </>
  );
};

export default AppointmentItem;
