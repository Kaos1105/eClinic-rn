import { action, computed, observable, runInAction } from 'mobx';
import { CM_EMPLOYEE_ENTITY } from 'models/CM_EMPLOYEE_ENTITY';
import { Alert } from 'react-native';
import agent from 'service/api/agent';
import { RootStore } from './rootStore';

const LIMIT = 10;

export default class CM_EMPLOYEE_Store {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  //Paging
  @observable totalCount = 0;

  //List
  @action loadList = async (input = new CM_EMPLOYEE_ENTITY()) => {
    try {
      const result = await agent.CM_EMPLOYEE_API.list(input);
      const { totalCount, items } = result;
      runInAction(() => {
        // this.dataArray = items;
        this.totalCount = totalCount;
      });
      return items;
    } catch (error) {
      Alert.alert('Problem loading list data');
      console.log(error);
    } finally {
    }
  };
}
