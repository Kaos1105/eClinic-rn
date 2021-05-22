import { action, computed, observable, runInAction } from 'mobx';
import { EC_PHONGKHAM_ENTITY } from 'models/EC_PHONGKHAM_ENTITY';
import { Alert } from 'react-native';
import agent from 'service/api/agent';
import { RootStore } from './rootStore';

const LIMIT = 10;

export default class EC_PHONGKHAM_Store {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  //Field observable
  @observable dataArray = new Array<EC_PHONGKHAM_ENTITY>();

  //Paging
  @observable totalCount = 0;
  @observable page = 1;

  @computed getTotalPages() {
    return Math.ceil(this.totalCount / LIMIT);
  }

  @action setPages = (page: number) => {
    this.page = page;
  };

  //Filtering option
  @action loadFilters = () => {
    this.page = 1;
    this.dataArray = [];
    this.loadList();
  };

  //List
  @action loadList = async (input = new EC_PHONGKHAM_ENTITY()) => {
    try {
      const result = await agent.EC_PHONGKHAM_API.list(input);
      const { totalCount, items } = result;
      runInAction(() => {
        this.dataArray = items;
        this.totalCount = totalCount;
      });
    } catch (error) {
      Alert.prompt('Problem loading list data');
      console.log(error);
    } finally {
    }
  };
}
