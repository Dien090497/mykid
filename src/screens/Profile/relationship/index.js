import React, { useEffect, useState } from "react";
import { View, Text, Linking, TouchableOpacity, FlatList, Image } from "react-native";
import styles from "./style";
import Images from "../../../assets/Images";
import Button from "../../../components/customButton";
import Header from "../../../components/Header";
import { String } from '../../../assets/strings/String';

const Relationship = ({ navigation }) => {
  const [relationship, setRelationship] = useState("Bố");
  const [data, setData] = useState([
    {
      id: 1,
      name: "Bố",
      icon: Images.icFather,
      check: true,
    },
    {
      id: 2,
      name: "Mẹ",
      icon: Images.icMother,
    },
    {
      id: 4,
      name: "Ông nội",
      icon: Images.icGrandfather,
    },
    {
      id: 5,
      name: "Bà nội",
      icon: Images.icGrandmother,
    },
    {
      id: 6,
      name: "Anh trai",
      icon: Images.icBrother,
    },
    {
      id: 7,
      name: "Chị",
      icon: Images.icSister,
    },
    {
      id: 8,
      name: "Khác",
      icon: Images.icOther,
    },
  ]);
  const onchangeItem = (item) => {
    let dataCopy = [...data];
    dataCopy.map(it => {
      if (item.id == it.id) {
        it["check"] = true;
        setRelationship(item.name);
      } else {
        it["check"] = false;
      }
    });
    setData(dataCopy);
  };

  const onChange = ()=> {
    navigation.goBack();
  }
  return (
    <View style={styles.container}>
      <Header title={String.header_relationship} />
      <View style={styles.txtSelection}>
        <Text style={styles.txtRelationship}>Tôi là <Text
          style={{ color: "#000000", fontSize: 16, fontWeight: "bold" }}>{relationship}</Text> của anh ấy</Text>
      </View>
      {/*numColumns={2}*/}
      <View>
        <FlatList
          // horizontal={true}
          numColumns={4}
          flexDirection={"column"}
          flexWrap={"wrap"}
          data={data}
          renderItem={(data, index) => {
            const item = data.item;
            return (
              <TouchableOpacity
                onPress={() => onchangeItem(item)}
                style={styles.Sty_Item}>
                <Image
                  style={{ ...styles.Sty_iconUser, opacity: item.check ? 1 : 0.4 }}
                  source={item.icon}
                />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.Sty_btnView}>
        <Button
          onChange={onChange}
          title={"Ok"}
        />
      </View>

    </View>
  );
};
export default Relationship;
