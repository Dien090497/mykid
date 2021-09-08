import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    FlatList,
} from 'react-native';

import { styles } from './styles';
import { String } from '../../../assets/strings/String';
import Consts from '../../../functions/Consts';
import LoadingIndicator from '../../../components/LoadingIndicator';
import Header from "../../../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomIcon from '../../../components/VectorIcons';
import { Colors } from '../../../assets/colors/Colors';

export default ({ navigation, route }) => {
    const refLoading = useRef();

    const dataContacts = [
        {
            key: 'Dad',
            name: 'Bố',
            phone: '012335236',
        },
        {
            key: 'Mom',
            name: 'Mẹ',
            phone: '01233523',
        }
    ]
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity activeOpacity={0.5} style={{ backgroundColor: Colors.grayInput, borderRadius: 10, marginVertical: 2, padding: 15, marginHorizontal: 10 }} key={item.key} onPress={item.onPress}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ flex: 0.2 }}>{item.icon}</View>
                    <View style={{ flex: 0.8 }}>
                        <Text style={styles.titleText}>{item.name}</Text>
                        <Text style={styles.phoneText}>{item.phone}</Text>
                    </View>
                    <CustomIcon name={'arrow-forward-ios'} iconFamily={'MaterialIcons'} size={24} color={Colors.gray} />
                </View>
            </TouchableOpacity>
        )
    }
    const pressAddNew = () => {
        navigation.navigate(Consts.ScreenIds.AddNewContact)
    }

    return (
        <View style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }]}>
            <Header title={String.header_contacts} />
            <View style={styles.mainView}>
                <FlatList
                    data={dataContacts}
                    renderItem={renderItem}
                />
            </View>
            <TouchableOpacity
                style={{ height: 60, backgroundColor: '#2fc886', width: '90%', alignSelf: 'center', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
                onPress={pressAddNew}
                >
                <Text style={{ color: 'white', fontSize: 16 }}>Thêm số mới</Text>
            </TouchableOpacity>
            <LoadingIndicator ref={refLoading} />
        </View>
    );
};
