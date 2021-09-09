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
            selected: false,
            isApproval: true
        }
    ])

    const [dataAdmin] = useState([
        {
            key: 'Dad',
            userName: 'user234236',
            phone: '012335236',
            selected: true,
            isAdmin: true
        },
    ])

    useEffect(() => {
        //call API Danh sách thành viên
        //setDataContacts
    })

    const removeContact = (item) => {
        //call remove Contact
    }
    const renderItem = ({ item }) => {
        return (
            renderMemberItem(item)
        )
    }
    const pressRefresh = () => {
        //Call API Refresh
    }

    const renderMemberItem = (item) => {
        return (
                <TouchableOpacity activeOpacity={0.9}  key={item.key} style={styles.itemContainer}>
                    <View style={styles.itemLeft}>
                        <Image
                            style={styles.avatar}
                            source={Images.icUser1} />
                        <View style={styles.info}>
                            <Text style={styles.username}>{item.userName}</Text>
                            <Text style={styles.otherInfoText}>Tài khoản: {item.account}</Text>
                            <Text style={styles.otherInfoText}>Mối quan hệ với trẻ: {item.relationship}</Text>
                            {item.isApproval && (<View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={[styles.smallButton, {marginRight: 10}]}
                                    onPress={() => removeContact(item)}
                                >
                                    <Text style={[styles.smallButtonText, {color: Colors.orange}]}>{String.member_reject}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.smallButton}
                                    onPress={() => removeContact(item)}
                                >
                                    <Text style={[styles.smallButtonText, {color: 'green'}]}>{String.member_approval}</Text>
                                </TouchableOpacity>
                            </View>)}
                        </View>
                    </View>
                    {!item.isApproval && !item.isAdmin && (<View
                        style={styles.itemRight}
                    >
                        <TouchableOpacity style={styles.smallButton} onPress={() => removeContact(item)}>
                            <Text style={[styles.smallButtonText, {color: Colors.red }]}>{String.member_remove}</Text>
                        </TouchableOpacity>
                    </View>)}
                </TouchableOpacity>

        )
    }

    const renderHeader = (isAdmin) => {
        return (<View style={styles.headerContainer}>
            <Image
                style={styles.iconHeader}
                source={isAdmin ? Images.icAdmin : Images.icTwoUsers} />
            <Text style={styles.headerText}>{isAdmin ? 'Administrator' : 'Family Members'}</Text>
        </View>)
    }

    return (
        <View style={[styles.container, { paddingBottom: useSafeAreaInsets().bottom }]}>
            <Header title={String.header_members} />
            <View style={styles.mainView}>
                {renderHeader(true)}
                {renderMemberItem(dataAdmin[0])}
                <FlatList
                    data={dataContacts}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.key}
                    ListHeaderComponent={renderHeader()}
                    stickyHeaderIndices={[0]}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={pressRefresh}
                >
                    <Text style={styles.buttonText}>{String.member_refresh}</Text>
                </TouchableOpacity>
            </View>
            <LoadingIndicator ref={refLoading} />
        </View>
    );
};
