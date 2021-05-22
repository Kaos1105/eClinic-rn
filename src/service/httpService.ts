import AppConsts from '../lib/appconst';
import { L } from '../lib/abpUtility';
import axios from 'axios';
import abp from '../lib/abp';

const qs = require('qs');

//declare var abp: any;
const http = axios.create({
  baseURL: AppConsts.remoteServiceBaseUrl,
  timeout: 30000,
  paramsSerializer: function (params) {
    return qs.stringify(params, {
      encode: false,
    });
  },
});

http.interceptors.request.use(
  async function (config) {
    const token = await abp.auth.getToken();
    if (token != null) {
      config.headers.common['Authorization'] = 'Bearer ' + token;
    } else {
      console.warn('Error authenticate');
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

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message &&
      error.response.data.error.details
    ) {
      // Modal.error({
      //   title: error.response.data.error.message,
      //   content: error.response.data.error.details,
      // });
      console.error(error.response.data.error.message);
    } else if (
      !!error.response &&
      !!error.response.data.error &&
      !!error.response.data.error.message
    ) {
      // Modal.error({
      //   title: L('LoginFailed'),
      //   content: error.response.data.error.message,
      // });
      console.error(error.response.data.error.message);
    } else if (!error.response) {
      //Modal.error({ content: L('UnknownError') });
      console.error('UnknownError');
    }

    // setTimeout(() => {}, 1000);

    return Promise.reject(error);
  }
);

export default http;
