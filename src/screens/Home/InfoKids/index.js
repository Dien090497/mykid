import {
  FlatList,
  Image, Modal, RefreshControl,
  Text,
  TouchableOpacity,
  View,
  Dimensions, Keyboard
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import {Colors} from "../../../assets/colors/Colors";
import {styles} from "./styles";
import ModalConfirmInput from "../../../components/ModalConfirmInput";
import ActionSheet from '@alessiocancian/react-native-actionsheet';
import {String} from "../../../assets/strings/String";
import {ScaleHeight} from "../../../functions/Consts";
import LoadingIndicator from '../../../components/LoadingIndicator';
import DataLocal from "../../../data/dataLocal";
import {getInfoApi, setInfoKitsApi} from "../../../network/InfoKidsService";
import DatePicker from 'react-native-date-picker';
import {showAlert} from "../../../functions/utils";

export default function InfoKits() {
  let sheet = null;
  const refLoading = useRef();
  const refModalInput = useRef();
  const [title, setTitle] = useState('');
  const [inputText, setInputText] = useState('')
  const [gender, setGender] = useState('');
  const [modalDate, setModalDate] = useState(false);
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [weights, setWeight] = useState(0);
  const [heights, setHeight] = useState(0);
  const [date, setDate] = useState(new Date());
  const [check, setCheck] = useState(false);

  const data = [
    {
      id: '1',
      name: String.nameKids,
      textName: name,
      inputText: String.enterNameKids
    },
    {
      id: '2',
      name: String.birthday,
      textName: (check !== undefined ? `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
        -2,
      )}-${`0${date.getDate()}`.slice(-2)}` : birthday),
      inputText: ''
    },
    {
      id: '3',
      name: String.gender,
      textName: (gender === 'MALE' ? String.male : String.female),
      inputText: ''
    },
    {
      id: '4',
      name: String.height,
      textName: heights + ' cm',
      isTextName: heights + '',
      inputText: String.enterHeight
    },
    {
      id: '5',
      name: String.weight,
      textName: weights + ' kg',
      isTextName: weights + '',
      inputText: String.enterWeight
    },
  ];

  const dataGender = [
    'MALE',
    'FEMALE'
  ]

  useLayoutEffect(() => {
    getInfo();
  }, []);

  const getInfo = () => {
    getInfoApi(DataLocal.deviceId, {
      success: res => {
        setName(res.data.name);
        setBirthday(res.data.birthday);
        setGender(res.data.gender);
        setWeight(res.data.weight);
        setHeight(res.data.height);
      },
      refLoading: refLoading
    })
  }

  const setInfo = (title, res) => {
    if (title === String.nameKids) {
      setName(res);
    } else if (title === String.height) {
      setHeight(parseInt(res));
    } else {
      setWeight(parseInt(res));
    }
  }

  const handleGenderAction = (index) => {
    if (index < 2) {
      setGender(dataGender[index]);
    }
  }

  const InstallInfo = () => {
    const bd = `${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
      -2,
    )}-${`0${date.getDate()}`.slice(-2)}`;
    let birthday = (check !== undefined ? bd : birthday)
    const height = parseInt(heights);
    const weight = parseInt(weights);
    let body = {
      birthday,
      gender,
      height,
      name,
      weight
    }
    setInfoKitsApi(DataLocal.deviceId, body, {
      success: res => {
        showAlert('Thành công')
      },
      refLoading: refLoading
    })
  }

  const OnMoDal = (item) => {
    setTitle(item.item.name)
    setInputText(item.item.inputText)
    if (item.item.id === '2') {
      setModalDate(true)
    } else if (item.item.id === '3') {
      Keyboard.dismiss();
      sheet.show();
    } else {
      if (item.item.id !== '1') {
        refModalInput.current.open('', () => {
          console.log('')
        }, item.item.isTextName, true);
      } else {
        refModalInput.current.open('', () => {
          console.log('')
        }, item.item.textName, false);
      }
    }
  }

  const datePicker = () => {
    return (
      <DatePicker
        mode={'date'}
        modal
        open={modalDate}
        date={date}
        onConfirm={(time) => {
          setModalDate(false)
          setDate(time)
          setCheck(true)
        }}
        onCancel={() => {
          setModalDate(false)
        }}
        title={'Chọn ngày'}
        cancelText={String.cancel}
        confirmText={String.confirm}
      />
    );
  }

  const renderFlatlist = (itemFlatlist) => {
    return (
      <View style={{flex: 1}}>
        <View style={styles.tobMain}>
          <Text style={styles.text}> {itemFlatlist.item.name} </Text>
          <View style={styles.viewImage}>
            <Text
              style={
                [styles.text, {
                  color: 'rgba(181, 180, 180, 1)',
                  fontSize: 12
                }]}>
              {itemFlatlist.item.textName}
            </Text>
            <TouchableOpacity
              onPress={() => {
                OnMoDal(itemFlatlist)
              }}
            >
              <Image
                source={Images.icEditProfile}
                style={[styles.image, {width: 40, height: 40, borderRadius: 20}]}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <Header title={String.home_infoKits}/>
      <View
        style={{
          width: '100%',
          height: '22%',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Image source={Images.icAvatar} style={{width: 130, height: 130}} resizeMode={'stretch'}/>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <FlatList
          data={data}
          renderItem={renderFlatlist}
          keyExtractor={item => item.id}
          style={{paddingTop: 15}}
        />
        {parseInt(heights) > 0 && parseInt((weights)) > 0 ? (
          <TouchableOpacity style={styles.tobViewMain} onPress={InstallInfo}>
            <Text style={[styles.text, {color: Colors.white}]}>Lưu</Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.tobViewMain,
            {
              backgroundColor: Colors.colorInputView,
              borderColor: Colors.colorInputView
            }
          ]}>
            <Text style={[styles.text, {color: Colors.white}]}>Lưu</Text>
          </View>
        )}
      </View>
      <ModalConfirmInput
        ref={refModalInput}
        title={title}
        inputText={inputText}
        onPressYes={setInfo}
      />
      <ActionSheet
        ref={o => sheet = o}
        styles={{
          buttonBox: {width: '100%', height: ScaleHeight.big * 1.2},
          buttonText: {fontSize: 18, fontWeight: '400', fontStyle: 'normal'}
        }}
        cancelButtonIndex={2}
        options={[
          'Nam',
          'Nữ',
          String.cancel]}
        onPress={handleGenderAction}
      />
      {datePicker()}
      <LoadingIndicator ref={refLoading}/>
    </View>
  );
}