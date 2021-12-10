import React, { useLayoutEffect, useRef, useState } from 'react';
import {
    Dimensions,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { styles } from './styles';
import Header from '../../../components/Header';
import { getPositionModesApi, setPositionModesApi } from '../../../network/InstallPositionService';
import LoadingIndicator from '../../../components/LoadingIndicator';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Colors } from '../../../assets/colors/Colors';
import DataLocal from '../../../data/dataLocal';
import { useTranslation } from 'react-i18next';
import NotificationModal from '../../../components/NotificationModal';
import Consts from '../../../functions/Consts';

const { width, height } = Dimensions.get('window');
export default function InstallPosition({ navigation }) {
    const [mode, setMode] = useState(null);
    const [choose, setChoose] = useState(null);
    const [time, setTime] = useState(0);
    const refLoading = useRef();
    const refNotification = useRef();
    const { t } = useTranslation();

    const radio_props = [
        { label: t('common:on'), value: true },
        { label: t('common:off'), value: false },
    ];

    const radio_props1 = [
        { label: t('common:1_minute'), value: 1 },
        { label: t('common:10_minute'), value: 2 },
        { label: t('common:60_minute'), value: 3 }
    ];

    useLayoutEffect(() => {
        getPositionModes();
    }, []);

    const getPositionModes = async () => {
        getPositionModesApi(DataLocal.deviceId, {
            success: resData => {
                if (resData.data.enable !== null) {
                    setMode(resData.data.enable);
                }
                if (resData.data.time !== 0) {
                    setTime(resData.data.time);
                    if (resData.data.time === 60) {
                        return setChoose(1);
                    }
                    if (resData.data.time === 600) {
                        return setChoose(2);
                    }
                    if (resData.data.time === 3600) {
                        return setChoose(3);
                    }
                }
            },
            refLoading,
            refNotification,
        });
    };

    const setPositionModes = async () => {
        setPositionModesApi(DataLocal.deviceId, mode, time, {
            success: resData => {
                if (resData.data && resData.data.mode) {
                    setMode(resData.data.mode)
                }
                refNotification.current.open(t('common:changeLanguageAndTimezone'), () => navigation.goBack())
            },
            refLoading,
            refNotification,
        });
    };

    const onMethodChanged = (index) => {
        if (index != mode) {
            setMode(index);
        }
    }

    const chooseMinute = (index) => {
        console.log('index', index)
        if (index != choose) {
            setChoose(index);
            if (index === 1) {
                setTime(60);
            } else if (index === 2) {
                setTime(600);
            } else {
                setTime(3600);
            }
        }
    }

    const gotoHomeScreen = () => {
        if (DataLocal.haveSim === '0') {
                navigation.navigate(Consts.ScreenIds.Tabs)
        }
    }

    return (
        <View style={styles.contain}>
            <Header title={t('common:header_installPosition')} />
            <View style={styles.container}>
                <View style={{ marginLeft: '5%', marginTop: '5%', width: '100%'}}>
                    <Text style={styles.textHeader}>{t('common:turn_off_gps')}</Text>
                </View>
                <RadioForm formHorizontal={false} animation={true} style={{ marginTop: height * 0.008 }}>
                    {
                        radio_props.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i} style={styles.radioForm}>
                                <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    isSelected={mode === obj.value}
                                    onPress={(value) => {
                                        onMethodChanged(value);
                                    }}
                                    borderWidth={1}
                                    buttonInnerColor={Colors.red}
                                    buttonOuterColor={Colors.red}
                                    buttonSize={20}
                                    buttonOuterSize={30}
                                    buttonStyle={{ marginRight: width * 0.03 }}
                                    buttonWrapStyle={{ marginLeft: width * 0.03 }}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    labelHorizontal={false}
                                    onPress={(value) => {
                                        onMethodChanged(value);
                                    }}
                                    labelStyle={styles.labelStyle}
                                    labelWrapStyle={{ width: '88%' }}
                                />
                            </RadioButton>
                        ))
                    }
                </RadioForm>
                {mode === true &&
                    <View>
                        <View style={{ marginLeft: '5%', marginTop: '5%', width: '100%', height: '8%' }}>
                            <Text style={styles.textHeader}>{t('common:cycle')}</Text>
                        </View>
                        <RadioForm formHorizontal={false} animation={true} style={{ marginTop: height * 0.008 }}>
                            {
                                radio_props1.map((obj, i) => (
                                    <RadioButton labelHorizontal={true} key={i} style={styles.radioForm}>
                                        <RadioButtonInput
                                            obj={obj}
                                            index={i}
                                            isSelected={choose === obj.value}
                                            onPress={(value) => {
                                                chooseMinute(value);
                                            }}
                                            borderWidth={1}
                                            buttonInnerColor={Colors.red}
                                            buttonOuterColor={Colors.red}
                                            buttonSize={20}
                                            buttonOuterSize={30}
                                            buttonStyle={{ marginRight: width * 0.03 }}
                                            buttonWrapStyle={{ marginLeft: width * 0.03 }}
                                        />
                                        <RadioButtonLabel
                                            obj={obj}
                                            index={i}
                                            labelHorizontal={false}
                                            onPress={(value) => {
                                                onMethodChanged(value);
                                            }}
                                            labelStyle={styles.labelStyle}
                                            labelWrapStyle={{ width: '88%' }}
                                        />
                                    </RadioButton>
                                ))
                            }
                        </RadioForm>
                    </View>
                }
                <View style={{ width: '100%', alignItems: 'center', height: '8%', marginTop: '5%' }}>
                    <TouchableOpacity style={styles.tob} onPress={setPositionModes}>
                        <Text style={[styles.text, { color: Colors.white }]}>{t('common:save')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <LoadingIndicator ref={refLoading} />
            <NotificationModal ref={refNotification} goBack={gotoHomeScreen} />
        </View>
    );
}
