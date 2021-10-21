import { Dimensions, FlatList, Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import React, {useEffect, useRef, useState} from 'react';
import Header from '../../../components/Header';
import LoadingIndicator from '../../../components/LoadingIndicator';
import {styles} from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import DataLocal from "../../../data/dataLocal";

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Việt Nam' }
];

export default () => {
  const refLoading = useRef();

  const { t, i18n } = useTranslation();
  const selectedLanguageCode = i18n.language;

  console.log(selectedLanguageCode);

  const setLanguage = code => {
    i18n.changeLanguage(code);
  };

  return (
    <View
      style={[styles.container, {paddingBottom: useSafeAreaInsets().bottom}]}>
      <Header title={String.header_settings}/>
      <View style={styles.mainView}>
        <Text>{t('common:hello')}</Text>
        {LANGUAGES.map(language => {
          const selectedLanguage = language.code === selectedLanguageCode;

          return (
            <Pressable
              key={language.code}
              style={styles.buttonContainer}
              disabled={selectedLanguage}
              onPress={() => setLanguage(language.code)}
            >
              <Text
                style={[selectedLanguage ? styles.selectedText : styles.text]}
              >
                {language.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <LoadingIndicator ref={refLoading}/>
    </View>
  );
};
