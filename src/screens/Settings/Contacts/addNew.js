import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Keyboard, TextInput, TouchableOpacity, PermissionsAndroid, TouchableWithoutFeedback, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { selectContact } from 'react-native-select-contact';
import { String } from '../../../assets/strings/String';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Header from "../../../components/Header";
import {showAlert} from '../../../functions/utils';
import { styles } from './styles';
export default () => {
    const [relationship, setRelationship] = useState('')
    const [phone, setPhone] = useState('')
    const callContacts = async () => {
        try {
            var permissionAndroid
            //Nếu là nền tảng android thì sẽ yêu cầu cấp quyền trước
            if(Platform.OS == 'android'){
                permissionAndroid = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS)
                if(permissionAndroid != 'granted')
                {
                    showAlert('Bạn chưa cấp quyền truy cập danh bạ')
                    return;
                }
            }
            
            try {
                var rsSelected = await selectContact();
                if (rsSelected && rsSelected.phones.length > 0)
                {
                    setRelationship(rsSelected.name)
                    setPhone(rsSelected.phones[0].number);

                }
                //    console.log('rsSelected', rsSelected)
            } catch (e) {
                console.warn(e);
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const saveContact = async () => {
        //Thực hiện lưu liên lạc
    }
    return (
        <View style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }]}>
            <Header title={String.header_addContact} />
            <View style={styles.mainView}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, paddingHorizontal: 20, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <TextInput
                        underlineColorAndroid={"transparent"}
                        style={{ fontSize: 16, padding: 10, marginBottom: 10, height: 50, width: '100%', backgroundColor: '#efefef', borderRadius: 10, alignSelf: 'center' }}
                        disableFullscreenUI
                        value={relationship}
                        placeholder={'Mối quan hệ với trẻ...'}
                        onChangeText={(text) => setRelationship(text)}
                    />

                    <View style={{ flexDirection: 'row', height: 50, width: '100%', backgroundColor: '#efefef', alignSelf: 'center', borderRadius: 10 }}>
                        <TextInput
                            underlineColorAndroid={"transparent"}
                            style={{ fontSize: 16, padding: 10, flex: 0.9 }}
                            disableFullscreenUI
                            value={phone}
                            placeholder={'Nhập số điện thoại...'}
                            onChangeText={(text) => setPhone(text)}
                            keyboardType={'phone-pad'}
                        >
                        </TextInput>
                        <TouchableOpacity style={{ flex: 0.1, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}
                            onPress={callContacts}
                        >
                            <Icon
                                name={'contacts'}
                                size={24}
                                color={'gray'}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <TouchableOpacity
                style={{ height: 60, backgroundColor: '#2fc886', width: '90%', alignSelf: 'center', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                onPress={saveContact}
                >
                <Text style={{ color: 'white', fontSize: 16 }}>Lưu</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}


