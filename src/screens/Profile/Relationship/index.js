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
import {String} from '../../../assets/strings/String';
import styles from './style';
import Images from "../../../assets/Images";
import { Colors } from "../../../assets/colors/Colors";

const Relationship = ({ navigation, route }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState([]);
  const [newRelationship, setNewRelationship] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useLayoutEffect(() => {
    setData(route.params.data);
    setSelectedIndex(route.params.selectedIndex);
  }, []);

  const onchangeItem = index => {
    data[index].relationship ==='OTHER' ? setShowModal(true) : setSelectedIndex(index);
  };
  const confirmAddRelationship = () => {
    if (newRelationship){
      data.unshift({
        id: data.length+1,
        name: newRelationship,
        icon: Images.icFather,
        relationship: "OTHER"+data.length,
      })
      setData(data)
      setSelectedIndex(0)
      setShowModal(false)
    }
  }

  const addRelationship = () =>{
    return(
      <Modal
        animationType="slide"
        transparent={true}
        visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <Text style={styles.titleModal}>Khác</Text>
            <TextInput
              onChangeText={text => setNewRelationship(text)}
              style={styles.textInputModal}
              placeholder={String.setNameAndSetRelationship}
              placeholderTextColor={'#B5B4B4' }/>
            <View style={styles.groundBtnModal}>
              <TouchableOpacity style={styles.btnCancel}
                                onPress={()=>{setShowModal(false)}}>
                <Text style={styles.textCancel}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={confirmAddRelationship}
                style={styles.btnConfirm}>
                <Text style={styles.textConfirm}>{String.confirm}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const onChange = () => {
    route.params.onChooseed(selectedIndex);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header title={String.header_relationship} />
      <View style={styles.txtSelection}>
        <Image source={Images.icUser2} style={styles.iconSelection} resizeMode='contain'/>
        <Text style={styles.txtRelationship}>{String.iAm}<Text
          style={{ color: "#696969", fontSize: 16, fontWeight: "bold" }}>
            {data && data[selectedIndex] ? data[selectedIndex].name : ''}</Text>{String.ofHe}</Text>
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
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />}
      </View>
      <TouchableOpacity style={styles.button} onPress={onChange}>
        <Text style={styles.buttonText}>{String.confirm}</Text>
      </TouchableOpacity>
      {addRelationship()}
    </View>
  );
};
export default Relationship;
