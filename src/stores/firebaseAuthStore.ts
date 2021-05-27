import { observable, computed, action, runInAction, makeObservable } from 'mobx';
import { AuthData, FireBaseAuthResponse } from 'models/firebaseAuth';
import { Alert } from 'react-native';
import agent from 'service/api/agent';
import { RootStore } from './rootStore';

let timer: ReturnType<typeof setTimeout>;
export default class FireBaseAuthStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
    makeObservable(this);
  }

  @observable user: AuthData | null = null;

  @computed get isLoggedIn() {
    return !!this.user;
  }

  @action login = async (values: FireBaseAuthResponse) => {
    try {
      if (values) {
        const userData = await agent.FireBaseAuth.getUser(values.token);
        if (userData.localId) {
          this._rootStore.commonStore.setAuth(values);
          runInAction(() => {
            this.user = userData;
          });
        }
      }
    } catch (error) {
      throw error;
    }
  };

  @action getRefreshToken = async (refreshToken: string) => {
    try {
      const refreshTokenResp = await agent.FireBaseAuth.getRefreshToken(refreshToken);
      if (refreshTokenResp.id_token) {
        this._rootStore.commonStore.setAuthRefresh(refreshTokenResp);
      }
    } catch (error) {
      throw error;
    }
  };

  @action getUser = async (idToken: string) => {
    try {
      const user = await agent.FireBaseAuth.getUser(idToken);
      runInAction(() => {
        this.user = user;
      });
    } catch (error) {
      console.log(error);
    }
  };

  checkExpireTime = () => {
    let expireString = this._rootStore.commonStore.expiryDate;
    if (expireString) {
      let expireDate = new Date(expireString);
      let currentTime = new Date();
      if (expireDate < currentTime) {
        this.logout();
      } else {
        // let gapTime = expireDate.getTime() - currentTime.getTime();
        // this.setLogoutTimer(gapTime);
      }
    }
  };

  setLogoutTimer = (expirationTime: number) => {
    timer = setTimeout(() => {
      Alert.alert('Token expired, please sign in');
      this.logout();
    }, expirationTime);
  };

  @action logout = () => {
    if (timer) {
      clearTimeout(timer);
    }
    this._rootStore.commonStore.clearAuth();
    this.user = null;
  };
}
