import { createContext } from 'react';
import { configure } from 'mobx';
import AuthenticationStore from './authenticationStore';
import CM_EMPLOYEE_Store from './CM_EMPLOYEE_Store';
import EC_BOOKING_Store from './EC_BOOKING_Store';
import FireBaseAuthStore from './firebaseAuthStore';
import CommonStore from './commonStore';
import UsersStore from './usersStore';
import EC_PHONGKHAM_Store from './EC_PHONGKHAM_Store';
import DM_CHUYENKHOA_Store from './DM_CHUYENKHOA_Store';

configure({ enforceActions: 'always' });

export class RootStore {
  authenticationStore: AuthenticationStore;
  eC_BOOKING_Store: EC_BOOKING_Store;
  cM_EMPLOYEE_Store: CM_EMPLOYEE_Store;
  fireBaseAuthStore: FireBaseAuthStore;
  commonStore: CommonStore;
  usersStore: UsersStore;
  eC_PHONGKHAM_Store: EC_PHONGKHAM_Store;
  dM_CHUYENKHOA_Store: DM_CHUYENKHOA_Store;

  constructor() {
    this.cM_EMPLOYEE_Store = new CM_EMPLOYEE_Store(this);
    this.authenticationStore = new AuthenticationStore(this);
    this.eC_BOOKING_Store = new EC_BOOKING_Store(this);
    this.fireBaseAuthStore = new FireBaseAuthStore(this);
    this.commonStore = new CommonStore(this);
    this.usersStore = new UsersStore(this);
    this.eC_PHONGKHAM_Store = new EC_PHONGKHAM_Store(this);
    this.dM_CHUYENKHOA_Store = new DM_CHUYENKHOA_Store(this);
  }
}

export const RootStoreContext = createContext(new RootStore());
