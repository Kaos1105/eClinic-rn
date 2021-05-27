import { action, computed, observable, runInAction } from 'mobx';
import { DM_CHUYENKHOA_ENTITY } from 'models/DM_CHUYENKHOA_ENTITY';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import { Alert } from 'react-native';
import agent from 'service/api/agent';
import { RootStore } from './rootStore';

const LIMIT = 5;

export default class DM_CHUYENKHOA_Store {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  //Field observable
  // @observable dataArray = new Array<EC_PHONGKHAM_ENTITY>();

  //Paging
  @observable totalCount = 0;
  @observable page = 1;

  // @computed getTotalPages() {
  //   return Math.ceil(this.totalCount / LIMIT);
  // }

  // @action setPages = (page: number) => {
  //   this.page = page;
  // };

  //Filtering option
  @action loadFilters = () => {
    this.page = 1;
    // this.dataArray = [];
    this.loadList();
  };

  //List
  @action loadList = async (input = new DM_CHUYENKHOA_ENTITY()) => {
    try {
      const result = await agent.DM_CHUYENKHOA_API.list(input);
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
