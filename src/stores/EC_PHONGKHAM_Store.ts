import { action, computed, observable, runInAction } from 'mobx';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import { Alert } from 'react-native';
import agent from 'service/api/agent';
import { RootStore } from './rootStore';

const LIMIT = 5;

export default class EC_PHONGKHAM_Store {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  //Paging
  @observable totalCount = 0;

  //List
  @action loadList = async (input = new EC_PHONGKHAM_ENTITY(), userLat = '', userLng = '') => {
    try {
      const result = await agent.EC_PHONGKHAM_API.list(input);
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
