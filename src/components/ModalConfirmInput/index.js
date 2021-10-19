import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, TextInput, Dimensions, Image} from 'react-native';
import {styles} from './styles';
import {Colors} from '../../assets/colors/Colors';
import  {ScaleHeight} from '../../functions/Consts';
import {String} from "../../assets/strings/String";
import Images from "../../assets/Images";

const {width, height} = Dimensions.get('window');
export default class ModalConfirmInput extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      text: ''
    };
  }

  open = (title, confirm) => {
    this.setState({modalVisible: true,title: title, confirm: confirm});
  };

  close = (callback) => {
    this.setState({modalVisible: false}, () => {
      if (callback) {
        callback();
      }
    });
  };
  actionNo = () => {
    this.close(() => {
    });
  };

  actionYes = () => {
    this.close(() => {
      setTimeout(() => {
        if (this.props.onPressYes) {
          this.props.onPressYes();
        }
      }, 500);
    });
  };

  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        animationType={'none'}
      >
        <View style={styles.itemLeft}>
          <TouchableOpacity style={styles.modal} onPress={() => {this.close()}}>
            <View style={styles.tobModal}>
              <View style={[styles.tobView, {marginTop: height* 0.03}]}>
                <Text style={styles.textModel}>{this.props.title}</Text>
                <View style={styles.textInput}>
                  <TextInput
                    style={{width: '88%', height: height* 0.05, marginLeft: 5}}
                    maxLength={11}
                    placeholder={this.props.inputText}
                    placeholderTextColor={"#9D9D9D"}
                    keyboardType={'default'}
                    value={this.state.text}
                    onChangeText={ (text) => this.setState({text: text})}
                  />
                 <TouchableOpacity onPress={ () => this.setState({text: ''})}>
                   <Image source={Images.icClose} style={{width: 22, height: 22}} resizeMode={'stretch'}/>
                 </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.tobView, {width: '88%', flexDirection: 'row'}]}>
                <View style={styles.tob}>
                  <TouchableOpacity
                    style={[styles.smallButton, {backgroundColor: Colors.white}]}
                    onPress={ () => {
                      this.actionNo();
                    }}
                  >
                    <Text
                      style={[styles.smallButtonText, {color: Colors.red}]}>
                      {String.cancel}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.TobOpacity}>
                  <TouchableOpacity
                    style={[styles.smallButton, {backgroundColor: Colors.red}]}
                    onPress={ () => {
                      this.actionYes();
                    }}
                  >
                    <Text
                      style={[styles.smallButtonText, {color: Colors.white}]}>
                      {String.confirm}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
