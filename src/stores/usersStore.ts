import { observable, action, runInAction, computed } from 'mobx';
import { SyntheticEvent } from 'react';
import { RootStore } from './rootStore';
import agent from 'service/api/agent';
import { IUserData } from '../models/userData';
import { Alert } from 'react-native';

export default class UsersStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  //Details
  @observable currentUser: IUserData | undefined = undefined;

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
