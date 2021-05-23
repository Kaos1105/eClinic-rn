import { observable, action, runInAction, computed } from 'mobx';
import { SyntheticEvent } from 'react';
import { RootStore } from './rootStore';
import agent from 'service/api/agent';
import { IUserData } from '../models/userData';
import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { ICoordinateModel } from 'models/MapGeocoding';

const verifyPermissions = async () => {
  const result = await Permissions.askAsync(Permissions.LOCATION);
  if (result.status !== 'granted') {
    Alert.alert('Insufficient permissions!', 'Your current location will not be shown', [
      { text: 'Okay' },
    ]);
    return false;
  }
  return true;
};

export default class UsersStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  //Details
  @observable currentUser: IUserData | undefined = undefined;

  @observable currentUserLocation: ICoordinateModel | undefined = undefined;

  @action getUser = async (id: string) => {
    try {
      if (this.currentUser) {
        return this.currentUser;
      } else {
        const user = await agent.Users.details(id);
        if (user) {
          runInAction(() => {
            this.currentUser = user;
          });
          return user;
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  @action getUserLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      const location = await Location.getCurrentPositionAsync({
        timeInterval: 5000,
      });

      this.currentUserLocation = {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      };

      return this.currentUserLocation;
    } catch (err) {
      Alert.alert('Could not fetch location!', 'User location feature will be disabled', [
        { text: 'Okay' },
      ]);
    }
  };

  //Edit
  @action editUser = async (user: IUserData) => {
    try {
      await agent.Users.edit(user);
      runInAction(() => {
        this.currentUser = user;
      });
    } catch (error) {
      Alert.prompt('Problem editing user');
      console.log(error);
    } finally {
    }
  };
}
//export default createContext(new ActivityStore());
