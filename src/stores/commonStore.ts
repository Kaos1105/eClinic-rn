import { RootStore } from './rootStore';
import { observable, action, reaction, makeObservable, runInAction, values, computed } from 'mobx';
import { FireBaseAuthResponse, RefreshTokenResp } from '../models/fireBaseAuth';
import AsyncStorage from '@react-native-community/async-storage';
import { bool } from 'yup';
import Toast from 'react-native-toast-message';

export type ToastPosition = 'top' | 'bottom';
export interface ToastData {
  type: string;
  position: ToastPosition;
  text1: string;
  text2: string;
  visibilityTime: number;
  autoHide: boolean;
  topOffset: number;
  onHide: () => void;
}

export default class CommonStore {
  _rootStore: RootStore;
  @observable fireBaseToken: string | null;
  @observable fireBaseRefreshToken: string | null;
  @observable userId: string | null;
  @observable expiryDate: string | null;

  //toast data
  @observable toastToggle = false;
  @observable toastData: ToastData = {
    type: '',
    position: 'top',
    text1: '',
    text2: '',
    visibilityTime: 400,
    autoHide: true,
    topOffset: 100,
    onHide: () => {
      this.setToastToggle(false);
    },
  };

  constructor(rootStore: RootStore = null) {
    this._rootStore = rootStore;
    makeObservable(this);

    //react when property have changed
    reaction(
      () => this.fireBaseToken,
      (token) => {
        if (token) {
          AsyncStorage.setItem('fireBaseToken', token);
        } else {
          AsyncStorage.removeItem('fireBaseToken');
        }
      }
    );

    reaction(
      () => this.userId,
      (userId) => {
        if (userId) {
          AsyncStorage.setItem('userId', userId);
        } else {
          AsyncStorage.removeItem('userId');
        }
      }
    );

    reaction(
      () => this.fireBaseRefreshToken,
      (fireBaseRefreshToken) => {
        if (fireBaseRefreshToken) {
          AsyncStorage.setItem('fireBaseRefreshToken', fireBaseRefreshToken);
        } else {
          AsyncStorage.removeItem('fireBaseRefreshToken');
        }
      }
    );

    reaction(
      () => this.expiryDate,
      (expiryDate) => {
        if (expiryDate) {
          AsyncStorage.setItem('expiryDate', expiryDate);
        } else {
          AsyncStorage.removeItem('expiryDate');
        }
      }
    );
  }

  // @action setToken = (token: string | null) => {
  //   this.fireBaseToken = token;
  // };

  @action loadAsyncStorage = async () => {
    try {
      let storageData = await Promise.all([
        AsyncStorage.getItem('fireBaseToken'),
        AsyncStorage.getItem('fireBaseRefreshToken'),
        AsyncStorage.getItem('userId'),
        AsyncStorage.getItem('expiryDate'),
      ]);
      runInAction(() => {
        if (storageData.length > 0) {
          this.fireBaseToken = storageData[0];
          this.fireBaseRefreshToken = storageData[1];
          this.userId = storageData[2];
          this.expiryDate = storageData[3];
        }
      });
      return true;
    } catch (err) {
      // console.log(err);
      return false;
    }
  };

  @action
  clearAuth = () => {
    this.fireBaseToken = null;
    this.userId = null;
    this.expiryDate = null;
  };

  @action
  setToastToggle = (isToggle: boolean) => {
    this.toastToggle = isToggle;
  };

  @action setToastData = (
    type: string,
    text1: string,
    text2: string,
    visibilityTime = 400,
    autoHide = true,
    topOffset = 100
  ) => {
    this.toastData = { ...this.toastData, type, text1, text2, visibilityTime, autoHide, topOffset };
    this.toastToggle = true;
  };

  getToast = () => {
    return this.toastData;
  };

  @action setAuth = (authInfo: FireBaseAuthResponse) => {
    this.fireBaseToken = authInfo.token;
    this.userId = authInfo.phoneNumber;
    this.fireBaseRefreshToken = authInfo.refreshToken;

    const expirationDate = new Date(
      // new Date().getTime() + parseInt(authInfo.expirationTime) * 1000
      authInfo.expirationTime
    );
    this.expiryDate = expirationDate.toISOString();
  };

  @action setAuthRefresh = (authInfo: RefreshTokenResp) => {
    this.fireBaseToken = authInfo.id_token;
    this.userId = authInfo.user_id;
    this.fireBaseRefreshToken = authInfo.refresh_token;

    const expirationDate = new Date(
      // new Date().getTime() + parseInt(authInfo.expirationTime) * 1000
      new Date().getTime() + parseInt(authInfo.expires_in) * 1000
    );
    this.expiryDate = expirationDate.toISOString();
  };
}
