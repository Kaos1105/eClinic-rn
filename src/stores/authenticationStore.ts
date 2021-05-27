import { action, observable } from 'mobx';

import AppConsts from './../lib/appconst';
import LoginModel from '../models/Login/loginModel';
import tokenAuthService from '../service/tokenAuth/tokenAuthService';
import { RootStore } from './rootStore';
import AsyncStorage from '@react-native-community/async-storage';

import abp from '../lib/abp';
import { Alert } from 'react-native';

class AuthenticationStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  @observable loginModel: LoginModel = new LoginModel();

  get isAuthenticated(): boolean {
    if (!abp.session.userId) return false;

    return true;
  }

  @action
  public async login(model: LoginModel) {
    try {
      let result = await tokenAuthService.authenticate({
        userNameOrEmailAddress: model.userNameOrEmailAddress,
        password: model.password,
        rememberClient: model.rememberMe,
      });
      //var tokenExpireDate = model.rememberMe ? new Date(new Date().getTime() + 1000 * result.expireInSeconds) : undefined;
      var tokenExpireDate = new Date(new Date().getTime() + 1000 * result.expireInSeconds);
      abp.auth.setToken(result.accessToken, tokenExpireDate);
      abp.utils.setCookieValue(
        AppConsts.authorization.encrptedAuthTokenName,
        result.encryptedAccessToken,
        tokenExpireDate,
        abp.appPath
      );
      return true;
    } catch (err) {
      Alert.alert(err);
      return false;
    }
  }

  @action
  logout() {
    //localStorage.clear();
    //sessionStorage.clear();
    abp.auth.clearToken();
  }
}
export default AuthenticationStore;
