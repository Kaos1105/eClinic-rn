import React from 'react';
import i18n from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import moment from 'moment';
import { LocaleConfig } from 'react-native-calendars';
import i18next from 'i18next';
import 'moment/locale/vi';
require('moment/locale/tr.js');

const I18N_NAME_SPACE = 'translation';

i18n.use(initReactI18next).init({
  resources: {},
  lng: 'vi',
  fallbackLng: 'vi',
  ns: I18N_NAME_SPACE,
  interpolation: {
    escapeValue: false,
  },
});

moment.locale('vi');

LocaleConfig.locales['vi'] = {
  monthNames: [
    'Tháng 1',
    'Tháng 2',
    'Tháng 3',
    'Tháng 4',
    'Tháng 5',
    'Tháng 6',
    'Tháng 7',
    'Tháng 8',
    'Tháng 9',
    'Tháng 10',
    'Tháng 11',
    'Tháng 12',
    ,
  ],
  monthNamesShort: [
    'Một',
    'Hai',
    'Ba',
    'Bốn',
    'Năm',
    'Sáu',
    'Bảy',
    'Tám',
    'Chín',
    'Mười',
    'Mười một',
    'Mười hai',
  ],
  dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
  dayNamesShort: ['CN', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy'],
  today: 'Hôm nay',
};
LocaleConfig.locales['en'] = {
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
    ,
  ],
  monthNamesShort: [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ],
  dayNames: ['Sunday ', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Fri'],
  today: 'Today',
};
LocaleConfig.defaultLocale = 'vi';

i18n.addResources('en', I18N_NAME_SPACE, require('./locales/en.json'));
i18n.addResources('vi', I18N_NAME_SPACE, require('./locales/vi.json'));

export const useLocalization = () => {
  const { t, i18n } = useTranslation();
  return {
    getString: (key: string) => t(key),
    changeLanguage: (lang: string) => {
      moment.locale(lang);
      i18n.changeLanguage(lang);
      LocaleConfig.defaultLocale = lang;
    },
    currentLanguage: () => i18n.language,
  };
};
