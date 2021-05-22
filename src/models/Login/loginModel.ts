import { observable } from 'mobx';

class LoginModel {
  tenancyName!: string;
  userNameOrEmailAddress!: string;
  password!: string;
  @observable rememberMe!: boolean;
  @observable showModal!: boolean;

  constructor(userNameOrEmailAddress?: string, password?: string) {
    this.userNameOrEmailAddress = userNameOrEmailAddress,
      this.password = password
  }

  toggleRememberMe = () => {
    this.rememberMe = !this.rememberMe;
  };

  toggleShowModal = () => {
    this.showModal = !this.showModal;
  };
}

export default LoginModel;
