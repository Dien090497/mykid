import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    FlatList,
} from 'react-native';

import { styles } from './styles';
import { String } from '../../assets/strings/String';
import Consts, { ScaleHeight } from '../../functions/Consts';
import LoadingIndicator from '../../components/LoadingIndicator';
import Header from "../../components/Header";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomIcon from '../../components/VectorIcons';
import { Colors } from '../../assets/colors/Colors';

export default ({ navigation, route }) => {
    const refLoading = useRef();

    const dataSettings = [
        {
            key:'Contacts',
            title: String.setting_contact,
            onPress: () => {navigation.navigate(Consts.ScreenIds.Contacts)},
            icon: <CustomIcon name={'contacts'} iconFamily={'MaterialIcons'} size={ScaleHeight.small} color={'#15d4a1'}/>
        },
        {
            key:'Members',
            title: String.setting_member,
            onPress: () => {navigation.navigate(Consts.ScreenIds.Members)},
            icon: <CustomIcon name={'people-alt'} iconFamily={'MaterialIcons'} size={ScaleHeight.small} color={'#15d4a1'}/>
        }
    ]
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity activeOpacity={0.5} style={{ backgroundColor: 'white', borderRadius: 5, marginVertical: 2, padding: 12 }} key={item.key} onPress={item.onPress}>
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: 0.1}}>{item.icon}</View>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <View style={{flex: 0.1, flexDirection: 'row-reverse'}}>
                        <CustomIcon name={'arrow-forward-ios'} iconFamily={'MaterialIcons'} size={24} color={Colors.gray}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    return (
        <View style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }]}>
            <Header title={String.header_settings} />
            <View style={styles.mainView}>
                <FlatList
                    data={dataSettings}
                    renderItem={renderItem}
                    keyExtractor={(item => item.key)}
                />
            </View>
            <LoadingIndicator ref={refLoading} />
        </View>
    );
};
