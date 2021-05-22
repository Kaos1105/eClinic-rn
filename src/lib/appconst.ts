import {
  EXPO_APP_REMOTE_SERVICE_BASE_URL,
  EXPO_APP_FIREBASE_API_KEY,
  EXPO_APP_FIREBASE_BASE_URL,
  EXPO_APP_USERNAME,
  EXPO_APP_PASSWORD,
} from '@env';
const AppConsts = {
  userManagement: {
    defaultAdminUserName: 'admin',
  },
  adminCredential: {
    userName: EXPO_APP_USERNAME,
    password: EXPO_APP_PASSWORD,
  },
  localization: {
    defaultLocalizationSourceName: 'eClinic',
  },
  authorization: {
    encrptedAuthTokenName: 'enc_auth_token',
  },
  //appBaseUrl: process.env.EXPO_APP_BASE_URL,
  fireBaseApiKey: EXPO_APP_FIREBASE_API_KEY,
  fireBaseDb: EXPO_APP_FIREBASE_BASE_URL,
  remoteServiceBaseUrl: EXPO_APP_REMOTE_SERVICE_BASE_URL,
};
export default AppConsts;
