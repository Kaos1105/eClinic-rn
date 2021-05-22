import * as React from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

const navigationRef = React.createRef<NavigationContainerRef>();

function navigate(name, params = null) {
  navigationRef.current?.navigate(name, params);
}

export default {
  navigate,
  navigationRef,
};
