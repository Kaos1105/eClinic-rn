import { RootStore } from 'stores/rootStore';
import { action, observable, runInAction } from 'mobx';
import { InsertResult } from 'models/InsertResult';

import { EC_BOOKING_ENTITY } from 'models/EC_BOOKING_ENTITY';
import EC_BOOKING_Service from 'service/EC_BOOKING_Service';

class JW_NTV_HOCVAN_Store {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this._rootStore = rootStore;
  }

  //Observable map
  @observable EC_BOOKING_Registry = new Map();

  //Details
  @observable current_EC_BOOKING: EC_BOOKING_ENTITY | null = null;

  //Insert
  @action eC_LichHen_Ins = async (input: EC_BOOKING_ENTITY): Promise<InsertResult> => {
    let result = await EC_BOOKING_Service.eC_LichHen_Ins(input);
    return result;
  };

  //Edit
  @action eC_LichHen_Upd = async (input: EC_BOOKING_ENTITY): Promise<InsertResult> => {
    let result = await EC_BOOKING_Service.eC_LichHen_Upd(input);
    return result;
  };

  //ById
  @action eC_LichHen_ById = async (id: string) => {
    let result = await EC_BOOKING_Service.eC_LichHen_ById(id);
    runInAction(() => {
      if (result) {
        this.current_EC_BOOKING = result;
        this.EC_BOOKING_Registry.set(id, result);
      }
    });
  };

  //Search
  @action eC_LichHen_Search = async (input: EC_BOOKING_ENTITY) => {
    try {
      let result = await EC_BOOKING_Service.eC_LichHen_Search(input);
      runInAction(() => {
        if (result) {
          this.EC_BOOKING_Registry.clear();
          result.forEach((item) => {
            this.EC_BOOKING_Registry.set(item.bookinG_ID, item);
          });
        }
      });
    } catch (error) {
      console.error('Tải thông tin lịch hẹn');
    } finally {
    }
  };

  //Delete
  @action eC_LichHen_Del = async (id: string) => {
    try {
      await EC_BOOKING_Service.eC_LichHen_Del(id);
      runInAction(() => {
        this.EC_BOOKING_Registry.delete(id);
      });
    } catch (error) {
      console.error('Xóa thông tin bị lỗi');
    } finally {
    }
  };

  getCurrent_EC_BOOKING = (id: string) => {
    if (this.current_EC_BOOKING && this.current_EC_BOOKING.bookinG_ID === id) {
      return this.current_EC_BOOKING;
    }
    return null;
  };

  @action setCurrent_NTV_HOCVAN = (id: string) => {
    this.current_EC_BOOKING = this.EC_BOOKING_Registry.get(id);
  };

  EC_BOOKING_Load = async (id?: string, isReload = false) => {
    let eC_Booking = this.getCurrent_EC_BOOKING(id);
    if (!this.EC_BOOKING_Registry.size || (this.EC_BOOKING_Registry.size && isReload)) {
      let inputSearch = new EC_BOOKING_ENTITY();
      inputSearch.bookinG_ID = id;
      this.eC_LichHen_Search(inputSearch);
    } else if (eC_Booking && isReload) {
      this.eC_LichHen_ById(eC_Booking.bookinG_ID!);
    }
  };
}

export default JW_NTV_HOCVAN_Store;
