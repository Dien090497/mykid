import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    FlatList,
    Switch,
} from 'react-native';

import { styles } from './styles';
import { String } from '../../../assets/strings/String';
import Consts from '../../../functions/Consts';
import LoadingIndicator from '../../../components/LoadingIndicator';
import Header from "../../../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomIcon from '../../../components/VectorIcons';
import { Colors } from '../../../assets/colors/Colors';
import Images from '../../../assets/Images';

export default ({ navigation, route }) => {
    const refLoading = useRef();
    const [isBlocking, setIsBlocking] = useState(false)
    const [dataContacts, setDataContacts] = useState([
        {
            key: 'Dad',
            userName: 'user234236',
            phone: '012335236',
            selected: true
        },
        {
            key: 'Mom',
            name: 'Mẹ',
            phone: '01233523',
            selected: false
        }
    ])

    const changeSOS = (item) => {
        //call API changeSOS
        dataContacts.map((contact) => {
            if (contact.key == item.key) {
                contact.selected = true
            }
            else {
                contact.selected = false
            }
        })
        setDataContacts([...dataContacts]);
    }

    const removeContact = (item) => {
        //call remove Contact
    }
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.9} style={{ backgroundColor: Colors.cardHeader, borderRadius: 10, marginVertical: 2, marginHorizontal: 10 }} key={item.key} onPress={item.onPress}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15 }}>
                <Image
                    style={styles.Sty_iconCheckbox}
                    source={Images.icAdmin} />
                <Text  style={{padding: 10, fontWeight: 'bold', fontSize: 16}}>Administrator</Text>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: 'white' }}>
                <Image
                    style={styles.Sty_iconCheckbox1}
                    source={Images.icOther} />
                    <View style={{justifyContent: 'center'}}>
                    <Text  style={{padding: 10, fontWeight: 'bold', fontSize: 16}}>{item.userName}</Text>
                    <Text  style={{padding: 10, fontSize: 16, color: Colors.grayPlaceHolder}}>Tài khoản: {item.account}</Text>
                    <Text  style={{padding: 10, fontSize: 16, color: Colors.grayPlaceHolder}}>Mối quan hệ với trẻ: {item.relationship}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    const pressAddNew = () => {
        navigation.navigate(Consts.ScreenIds.AddNewContact)
    }

    return (
        <View style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }]}>
            <Header title={String.header_members} />
            <View style={styles.mainView}>
                <FlatList
                    data={dataContacts}
                    renderItem={renderItem}
                />
            </View>

            <TouchableOpacity
                style={{ height: 60, backgroundColor: Colors.blueButton, width: '90%', alignSelf: 'center', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                onPress={pressAddNew}
            >
                <Text style={{ color: 'white', fontSize: 16 }}>Làm mới</Text>
            </TouchableOpacity>
            <LoadingIndicator ref={refLoading} />
        </View>
    );
};
