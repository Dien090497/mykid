import { Image, Modal, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { Component } from 'react';
import { styles } from './styles';
import { Colors } from '../../../assets/colors/Colors';
import Images from '../../../assets/Images';
import FastImage from 'react-native-fast-image';

export default class PreviewImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      data: null,
      selected: null,
      url: null,
      time: null,
      rotate: null,
    };
  }

  openModal = (data, index,text) => {
    this.setState({
      modalVisible: true,
      data: data,
      selected: index,
      url: data[index].url,
      time: data[index].shootingTime,
      rotate:0,
      text: text,
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
        url: this.state.data[i].url,
        time: this.state.data[i].shootingTime,
        rotate: 0
      });
    } else if (index < 0) {
      const i = this.state.data.length - 1;
      this.setState({
        ...this.state,
        selected: i,
        url: this.state.data[i].url,
        time: this.state.data[i].shootingTime,
        rotate: 0
      });
    } else {
      const i = index + 1;
      this.setState({
        ...this.state,
        selected: i,
        url: this.state.data[i].url,
        time: this.state.data[i].shootingTime,
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
        url: this.state.data[i].url,
        time: this.state.data[i].shootingTime,
        rotate: 0
      });
    } else if (index <= 0) {
      const i = this.state.data.length - 1;
      this.setState({
        ...this.state,
        selected: i,
        url: this.state.data[i].url,
        time: this.state.data[i].shootingTime,
        rotate: 0
      });
    } else {
      const i = index - 1;
      this.setState({
        ...this.state,
        selected: i,
        url: this.state.data[i].url,
        time: this.state.data[i].shootingTime,
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
        animationType='slide'
        transparent={true}
        visible={this.state.modalVisible}>
        <View style={styles.bottomView}>
          <View style={styles.body}>
            <TouchableOpacity onPress={this.hideModal} style={{alignSelf:'flex-end', marginRight:-25, marginBottom: 5}}>
              <Image source={Images.icClose} style={styles.icClose} resizeMode='contain' />
            </TouchableOpacity>
            <Image
              source={{uri:this.state.url}}
              style={[styles.image,{transform: [{ rotate: this.state.rotate+'deg' }]}]}
              resizeMode={'stretch'} />
            <Text style={styles.txtDate}>{this.state.time}</Text>
            <Text style={styles.txtDes}>{this.state.text}</Text>
            <View style={styles.groupBtn}>
              <TouchableOpacity onPress={this.rotateRight}>
                <Image source={Images.icRotateRight} style={styles.icTouch} resizeMode='contain' />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.prevImage}>
                <Image source={Images.icDetail}
                       style={[styles.icTouch, { tintColor: Colors.colorMain, transform: [{ rotate: '180deg' }] }]}
                       resizeMode='contain' />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.nextImage}>
                <Image source={Images.icDetail} style={[styles.icTouch, { tintColor: Colors.colorMain }]}
                       resizeMode='contain' />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.rotateLeft}>
                <Image source={Images.icRotateLeft} style={styles.icTouch} resizeMode='contain' />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <StatusBar backgroundColor={Colors.transparent} />
      </Modal>
    );
  }
}
