import {
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';

import Header from '../../../components/Header';
import styles from './style';
import Images from '../../../assets/Images';
import { useTranslation } from 'react-i18next';
import DataLocal from '../../../data/dataLocal';
import {FontSize} from "../../../functions/Consts";

const Relationship = ({ navigation, route }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { t } = useTranslation();
  const [data, setData] = useState( [
    {
      id: 1,
      name: t('common:dad'),
      icon: Images.icFather,
      relationship: 'FATHER',
    },
    {
      id: 2,
      name: t('common:mom'),
      icon: Images.icMother,
      relationship: 'MOTHER',
    },
    {
      id: 3,
      name: t('common:grandfather'),
      icon: Images.icGrandfather,
      relationship: 'GRANDFATHER',
    },
    {
      id: 4,
      name: t('common:grandma'),
      icon: Images.icGrandmother,
      relationship: 'GRANDMOTHER',
    },
    {
      id: 5,
      name: t('common:brother'),
      icon: Images.icBrother,
      relationship: 'BROTHER',
    },
    {
      id: 6,
      name: t('common:sister'),
      icon: Images.icSister,
      relationship: 'SISTER',
    },
    {
      id: 7,
      name: t('common:other'),
      icon: Images.icOther,
      relationship: 'OTHER',
    },
  ]);
  const [ newRelationship, setNewRelationship] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    const dataInfo = route.params.data;
    data.map((item,i) =>{
      if (item.relationship === dataInfo.relationship){
        setSelectedIndex(i)
      }
      if (dataInfo.relationship === 'OTHER'){
        const _data = Object.assign([],data);
        _data[6].name = dataInfo.relationshipName;
        setData(_data)
      }
    })
  }, []);

  const onchangeItem = index => {
    data[index].relationship ==='OTHER' ? setShowModal(true) : setSelectedIndex(index);
  };
  const confirmAddRelationship = () => {
    const config = Object.assign([],data);
    if (newRelationship){
        config[config.length-1].name = newRelationship;
      config[config.length-1].relationshipName = newRelationship;
      }
      setData(config)
      setSelectedIndex(config.length-1)
      setShowModal(false)
    }

  const addRelationship = () =>{
    return(
      <Modal
        animationType='slide'
        transparent={true}
        visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.titleModal}>{t('common:other')}</Text>
            <TextInput
              onChangeText={text => setNewRelationship(text)}
              style={styles.textInputModal}
              placeholder={t('common:setNameAndSetRelationship')}
              placeholderTextColor={'#B5B4B4' }/>
            <View style={styles.groundBtnModal}>
              <TouchableOpacity style={styles.btnCancel}
                                onPress={()=>{setShowModal(false)}}>
                <Text style={styles.textCancel}>{t('common:cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmAddRelationship}
                style={styles.btnConfirm}>
                <Text style={styles.textConfirm}>{t('common:confirm')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const onChange = () => {
    if (route.params.onChooseed) route.params.onChooseed(data[selectedIndex]);
    if (route.params.onSetRelationship) route.params.onSetRelationship(data[selectedIndex]);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header title={t('common:header_relationship')} />
      <View style={styles.txtSelection}>
        <Image source={Images.icUser2} style={styles.iconSelection} resizeMode='contain'/>
        <Text style={styles.txtRelationship}>
          {t('common:iAm')}
          {DataLocal.language === 'vi' ? '' : t('common:ofHe')+' '}
          <Text
            style={{ color: '#696969', fontSize: FontSize.medium, fontWeight: 'bold', fontFamily: 'Roboto' }}>
            {data && data[selectedIndex] ? data[selectedIndex].name : ''}
          </Text>
          {DataLocal.language === 'vi' ? ' '+t('common:ofHe') : ''}
        </Text>
      </View>
      <View>
        { data &&
        <FlatList
          numColumns={4}
          flexDirection={'column'}
          flexWrap={'wrap'}
          data={data}
          style={{paddingHorizontal:'5%'}}
          renderItem={(data) => {
            const item = data.item;
            return (
              <TouchableOpacity
                key={data.index}
                onPress={() => onchangeItem(data.index)}
                style={styles.Sty_Item}>
                <Image
                  style={{
                    ...styles.Sty_iconUser,
                    opacity: selectedIndex == data.index ? 1 : 0.4,
                    resizeMode:'stretch'
                  }}
                  source={item.icon}
                />
                <Text style={styles.text} numberOfLines={1}>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />}
      </View>
      <TouchableOpacity style={styles.button} onPress={onChange}>
        <Text style={styles.buttonText}>{t('common:confirm')}</Text>
      </TouchableOpacity>
      {addRelationship()}
    </View>
  );
};
export default Relationship;
