import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import DataLocal from '../data/dataLocal';

import en from './translations/en';
import vi from './translations/vi';

const LANGUAGES = {
  en,
  vi,
};

const LANGUAGE_DETECTOR = {
  type: 'languageDetector',
  async: true,
  detect: callback => {
    DataLocal.loadLanguage().then(res => {
      callback(DataLocal.language);
    });
  },
  init: () => {
  },
  cacheUserLanguage: language => {
    DataLocal.saveLanguage(language).then();
  },
};


i18n
  .use(LANGUAGE_DETECTOR)
  .use(initReactI18next)
  .init({
    fallbackLng:'vi',
    resources: LANGUAGES,
    react: {
      useSuspense: false,
    },
    interpolation: {
      escapeValue: false,
    },
    defaultNS: 'common',
    compatibilityJSON: 'v3'
  });
