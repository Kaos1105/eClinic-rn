import { action, observable } from 'mobx';

import { GetCurrentLoginInformations } from '../service/session/dto/getCurrentLoginInformations';
import sessionService from '../service/session/sessionService';

class SessionStore {
  @observable currentLogin: GetCurrentLoginInformations = new GetCurrentLoginInformations();

  @action
  async getCurrentLoginInformations() {
    let result = await sessionService.getCurrentLoginInformations();
    this.currentLogin = result;
  }
}

export default SessionStore;
