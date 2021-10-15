import { FlatList, Image, Modal, Platform, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import React, { Component, useEffect, useRef, useState } from "react";
import { styles } from "./styles";
import { String } from "../../../assets/strings/String";
import { Colors } from "../../../assets/colors/Colors";
import Images from "../../../assets/Images";
import FastImage from "react-native-fast-image";

export default class PreviewImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      data: null,
      selected: null,
      src: null,
      time: null,
      rotate: null,
    };
  }

  openModal = (data, index) => {
    this.setState({
      modalVisible: true,
      data: data,
      selected: index,
      src: data[index].src,
      time: data[index].date.toLocaleString(),
      rotate:0
    });
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };


  nextImage = () => {
    const index = this.state.selected;
    if (index >= this.state.data.length - 1) {
      const i = 0;
      this.setState({
        ...this.state,
        selected: i,
        src: this.state.data[i].src,
        time: this.state.data[i].date.toLocaleString(),
        rotate: 0
      });
    } else if (index < 0) {
      const i = this.state.data.length - 1;
      this.setState({
        ...this.state,
        selected: i,
        src: this.state.data[i].src,
        time: this.state.data[i].date.toLocaleString(),
        rotate: 0
      });
    } else {
      const i = index + 1;
      this.setState({
        ...this.state,
        selected: i,
        src: this.state.data[i].src,
        time: this.state.data[i].date.toLocaleString(),
        rotate: 0
      });
    }
  };

  prevImage = () => {
    const index = this.state.selected;
    if (index > this.state.data.length - 1) {
      const i = 0;
      this.setState({
        ...this.state,
        selected: i,
        src: this.state.data[i].src,
        time: this.state.data[i].date.toLocaleString(),
        rotate: 0
      });
    } else if (index <= 0) {
      const i = this.state.data.length - 1;
      this.setState({
        ...this.state,
        selected: i,
        src: this.state.data[i].src,
        time: this.state.data[i].date.toLocaleString(),
        rotate: 0
      });
    } else {
      const i = index - 1;
      this.setState({
        ...this.state,
        selected: i,
        src: this.state.data[i].src,
        time: this.state.data[i].date.toLocaleString(),
        rotate: 0
      });
    }
  };

  rotateRight = ()=>{
    const rotate = this.state.rotate + 90;
    if (rotate >= 360){
      this.setState({...this.state, rotate: 0})
    }else if (rotate < 0){
      this.setState({...this.state, rotate: 360})
    }else {
      this.setState({...this.state, rotate: rotate})
    }
  }

  rotateLeft = ()=>{
    const rotate = this.state.rotate - 90;
    if (rotate <= -360){
      this.setState({...this.state, rotate: 0})
    }else if (rotate > 0){
      this.setState({...this.state, rotate: -360})
    }else {
      this.setState({...this.state, rotate: rotate})
    }
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}>
        <TouchableOpacity style={styles.bottomView} onPress={this.hideModal}>
          <View style={styles.body}>
            <FastImage source={this.state.src} style={[styles.image,{transform: [{ rotate: this.state.rotate+'deg' }]}]} resizeMode={FastImage.resizeMode.stretch} />
            <Text style={styles.txtDate}>{this.state.time}</Text>
            <Text style={styles.txtDes}>Cảnh chụp: chụp từ xa</Text>
            <View style={styles.groupBtn}>
              <TouchableOpacity onPress={this.rotateRight}>
                <Image source={Images.icRotateRight} style={styles.icTouch} resizeMode="contain" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.prevImage}>
                <Image source={Images.icDetail}
                       style={[styles.icTouch, { tintColor: Colors.colorMain, transform: [{ rotate: "180deg" }] }]}
                       resizeMode="contain" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.nextImage}>
                <Image source={Images.icDetail} style={[styles.icTouch, { tintColor: Colors.colorMain }]}
                       resizeMode="contain" />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.rotateLeft}>
                <Image source={Images.icRotateLeft} style={styles.icTouch} resizeMode="contain" />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
        <StatusBar backgroundColor={Colors.transparent} />
      </Modal>
    );
  }
}


// import { Image, Modal, StatusBar, Text, TouchableOpacity, View } from "react-native";
// import React, { Component, useEffect, useRef, useState } from "react";
// import { styles } from "./styles";
// import { String } from "../../../assets/strings/String";
// import { Colors } from "../../../assets/colors/Colors";
// import Images from "../../../assets/Images";
// import FastImage from "react-native-fast-image";
//
//
// export function PreViewImage({ visible, data, selected, callback }) {
//   const [modalVisible, setModalVisible] = useState(false);
//   const [select, setSelect] = useState(setSelect);
//
//   const listImage = Object.assign([],data)
//
//   const hideModal = () => {
//     callback();
//     setModalVisible(false);
//   };
//
//   useEffect(() => {
//     setSelect(selected)
//     setModalVisible(visible);
//   });
//
//
//   const nextImage = () => {
//     const index = select;
//     if (index >= data.length - 1) {
//       setSelect(0);
//     } else if (index < 0) {
//       setSelect(data.length - 1);
//     } else {
//       setSelect(index + 1);
//     }
//   };
//
//   const prevImage = () => {
//     const index = select;
//     if (index > data.length - 1) {
//       setSelect(0);
//     } else if (index <= 0) {
//       setSelect(data.length - 1);
//     } else {
//       setSelect(index - 1);
//     }
//   };
//
//   const rotateRight = () => {
//     // const rotate = this.state.rotate + 90;
//     // if (rotate >= 360) {
//     //   this.setState({ ...this.state, rotate: 0 });
//     // } else if (rotate < 0) {
//     //   this.setState({ ...this.state, rotate: 360 });
//     // } else {
//     //   this.setState({ ...this.state, rotate: rotate });
//     // }
//   };
//
//   const rotateLeft = () => {
//     // const rotate = this.state.rotate - 90;
//     // if (rotate <= -360) {
//     //   this.setState({ ...this.state, rotate: 0 });
//     // } else if (rotate > 0) {
//     //   this.setState({ ...this.state, rotate: -360 });
//     // } else {
//     //   this.setState({ ...this.state, rotate: rotate });
//     // }
//   };
//   console.log(listImage[select].id)
//   return (
//     <Modal
//       animationType="slide"
//       transparent={true}
//       visible={modalVisible}>
//       <TouchableOpacity style={styles.bottomView} onPress={hideModal}>
//         <View style={styles.body}>
//           {/*<FastImage source={data[selected].src}*/}
//           {/*           style={[styles.image, { transform: [{ rotate: "0deg" }] }]}*/}
//           {/*           resizeMode={FastImage.resizeMode.stretch} />*/}
//           {/*<Text style={styles.txtDate}>{data[selected].date.toISOString()}</Text>*/}
//           <Text style={styles.txtDes}>Cảnh chụp: chụp từ xa</Text>
//           <View style={styles.groupBtn}>
//             <TouchableOpacity onPress={rotateRight}>
//               <Image source={Images.icRotateRight} style={styles.icTouch} resizeMode="contain" />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={prevImage}>
//               <Image source={Images.icDetail}
//                      style={[styles.icTouch, { tintColor: Colors.colorMain, transform: [{ rotate: "180deg" }] }]}
//                      resizeMode="contain" />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={nextImage}>
//               <Image source={Images.icDetail} style={[styles.icTouch, { tintColor: Colors.colorMain }]}
//                      resizeMode="contain" />
//             </TouchableOpacity>
//             <TouchableOpacity onPress={rotateLeft}>
//               <Image source={Images.icRotateLeft} style={styles.icTouch} resizeMode="contain" />
//             </TouchableOpacity>
//           </View>
//         </View>
//         <Text>123</Text>
//       </TouchableOpacity>
//       <StatusBar backgroundColor={Colors.transparent} />
//     </Modal>
//   );
//
// }
