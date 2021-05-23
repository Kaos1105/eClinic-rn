import AsyncStorage from '@react-native-community/async-storage';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AppConsts from '../../lib/appconst';
import { IUserData } from 'models/userData';
import { RootNavigation } from '../../navigations';
import { NavigationNames } from '../../navigations';
import { Alert } from 'react-native';
import { string } from 'yup/lib/locale';
import { AuthData, RefreshTokenResp } from 'models/firebaseAuth';
import CommonStore from 'stores/commonStore';
import abp from '../../lib/abp';
import {
  EC_PHONGKHAM_ENTITY,
  IPagedResultDtoOfEC_PHONGKHAM_ENTITY,
} from 'models/EC_PHONGKHAM_ENTITY';
import { CM_EMPLOYEE_ENTITY, IPagedResultDtoOfCM_EMPLOYEE_ENTITY } from 'models/CM_EMPLOYEE_ENTITY';
import { IMapGeocoding } from 'models/MapGeocoding';

var qs = require('qs');
//axios response error handler
const axiosResponseConfig = (error) => {
  if (error.message === 'Network Error' && !error.response) {
    Alert.alert('NETWORK ERROR-can not connect to sever network!');
  }
  const { status, config } = error.response;
  if (status === 404) {
    RootNavigation.navigate(NavigationNames.HomeScreen);
  }
  if (status === 400 && config.method === 'get' /*&& data.errors.hasOwnProperty('id')*/) {
    Alert.prompt('Unauthorized request');
    RootNavigation.navigate(NavigationNames.HomeScreen);
  }
  if (status === 500) {
    Alert.alert('SEVER ERROR-check the serve error for more info!');
    RootNavigation.navigate(NavigationNames.HomeScreen);
  }
  throw error.response;
};

//common SetUp
axios.interceptors.response.use(undefined, (error) => {
  axiosResponseConfig(error);
});
axios.interceptors.request.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const fireBaseAuth = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com',
  timeout: 30000,
});

const httpFirebaseDb = axios.create({
  baseURL: AppConsts.fireBaseDb,
  timeout: 30000,
});

const httpFirebaseSecure = axios.create({
  baseURL: 'https://securetoken.googleapis.com',
  timeout: 30000,
});

const googleMapApi = axios.create({
  baseURL: 'https://maps.googleapis.com',
  timeout: 30000,
});

const httpNetCore = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  timeout: 30000,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

httpFirebaseDb.interceptors.request.use(
  async (config) => {
    let token = await AsyncStorage.getItem('fireBaseToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      //firebase specific
      config.params = config.params || {};
      config.params['auth'] = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

httpNetCore.interceptors.request.use(
  async function (config) {
    const token = await abp.auth.getToken();
    if (token != null) {
      config.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
      Alert.prompt('Error authenticate');
      //return Promise.reject();
    }
    config.headers.common['.AspNetCore.Culture'] = abp.utils.getCookieValue(
      'Abp.Localization.CultureName'
    );
    config.headers.common['Abp.TenantId'] = abp.multiTenancy.getTenantIdCookie();
    return config;
  },
  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

const responseBody = (response: AxiosResponse) => response.data;
const responseBodyResult = (response: AxiosResponse) => response.data.result;

// const sleep = (ms: number) => (response: AxiosResponse) =>
//   new Promise<AxiosResponse>((resolve) => setTimeout(() => resolve(response), ms));

// const requests = {
//   get: (url: string) => axios.get(url).then(responseBody),
//   post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
//   put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
//   delete: (url: string) => axios.delete(url).then(responseBody),
// };

// const requests = {
//   get: (url: string) => http.get(url).then(responseBody),
//   post: (url: string, body: {}) => http.post(url, body).then(responseBody),
//   put: (url: string, body: {}) => http.put(url, body).then(responseBody),
//   delete: (url: string) => http.delete(url).then(responseBody),
//   postForm: (url: string, file: Blob) => {
//     let formData = new FormData();
//     formData.append('File', file);
//     return axios
//       .post(url, formData, { headers: { 'Content-type': 'multipart/form-data' } })
//       .then(responseBody);
//   },
// };

const Users = {
  details: (id: string): Promise<IUserData | undefined> =>
    httpFirebaseDb.get(`/users/${id}.json`).then(responseBody),
  edit: (user: IUserData): Promise<IUserData> =>
    httpFirebaseDb.put(`/users/${user.phoneNumber}.json`, user),
};

const FireBaseAuth = {
  getUser: (token: string): Promise<AuthData> =>
    fireBaseAuth
      .post(`/v1/accounts:lookup?key=` + AppConsts.fireBaseApiKey, { idToken: token })
      .then(responseBody)
      .then((value) => {
        return value.users[0];
      }),
  getRefreshToken: (refreshToken: string): Promise<RefreshTokenResp> =>
    httpFirebaseSecure
      .post(`/v1/token?key=` + AppConsts.fireBaseApiKey, {
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      })
      .then(responseBody),
};

const MapGeocoding = {
  getCoordinate: (address: string): Promise<IMapGeocoding> =>
    googleMapApi
      .get(`/maps/api/geocode/json?address=${address}&key=${AppConsts.googleCloudApiKey}`)
      .then(responseBody)
      .then((value) => value.results[0]),
};

const EC_PHONGKHAM_API = {
  list: (input: EC_PHONGKHAM_ENTITY): Promise<IPagedResultDtoOfEC_PHONGKHAM_ENTITY> =>
    httpNetCore.post('/api/PhongKham/EC_PHONGKHAM_Search', input).then(responseBodyResult),
  details: (inputId: string, lat = '', lng = ''): Promise<EC_PHONGKHAM_ENTITY> =>
    httpNetCore
      .get('/api/PhongKham/EC_PHONGKHAM_ById', {
        params: { id: inputId, userLat: lat, userLong: lng },
      })
      .then(responseBodyResult),
};

const CM_EMPLOYEE_API = {
  list: (input: CM_EMPLOYEE_ENTITY): Promise<IPagedResultDtoOfCM_EMPLOYEE_ENTITY> =>
    httpNetCore.post('/api/Employee/CM_EMPLOYEE_Search_Admin', input).then(responseBodyResult),
};

export default {
  httpNetCore,
  Users,
  FireBaseAuth,
  EC_PHONGKHAM_API,
  CM_EMPLOYEE_API,
  MapGeocoding,
};
