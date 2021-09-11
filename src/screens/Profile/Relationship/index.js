import {
  FlatList,
  Image,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import Button from '../../../components/customButton';
import Header from '../../../components/Header';
import Images from '../../../assets/Images';
import {String} from '../../../assets/strings/String';
import styles from './style';

const Relationship = ({ navigation, route }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(route.params.data);
    setSelectedIndex(route.params.selectedIndex);
  }, []);

  const onchangeItem = index => {
    setSelectedIndex(index);
  };

  const onChange = () => {
    route.params.onChooseed(selectedIndex);
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <Header title={String.header_relationship} />
      <View style={styles.txtSelection}>
        <Text style={styles.txtRelationship}>{String.iAm}<Text
          style={{ color: "#000000", fontSize: 16, fontWeight: "bold" }}>
            {data && data[selectedIndex] ? data[selectedIndex].name : ''}</Text>{String.ofHe}</Text>
      </View>
      <View>
        { data &&
        <FlatList
          numColumns={4}
          flexDirection={'column'}
          flexWrap={'wrap'}
          data={data}
          renderItem={(data) => {
            console.log(data);
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
                  }}
                  source={item.icon}
                />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />}
      </View>
      <View style={styles.Sty_btnView}>
        <Button onChange={onChange} title={String.ok} />
      </View>
    </View>
  );
};
export default Relationship;
