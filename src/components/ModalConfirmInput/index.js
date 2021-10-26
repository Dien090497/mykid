import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View, TextInput, Dimensions, Image} from 'react-native';
import {styles} from './styles';
import {Colors} from '../../assets/colors/Colors';
import {ScaleHeight} from '../../functions/Consts';
import {String} from "../../assets/strings/String";
import Images from "../../assets/Images";

const {width, height} = Dimensions.get('window');
export default class ModalConfirmInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  open = (title, confirm, text, check) => {
    console.log(text)
    this.setState({modalVisible: true, title: title, confirm: confirm, text: text, check: check});
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

  actionYes = (title, text) => {
    this.close(() => {
      setTimeout(() => {
        if (this.props.onPressYes) {
          this.props.onPressYes(title, text)
          this.setState({text: ''})
        }
      }, 500);
    });
  };

  isChangeText = (text) => {
    if (this.state.check) {
      this.setState({text: text.replace(/[^0-9]/g, '')})
    } else {
      this.setState({text: text})
    }
  }

  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        animationType={'none'}
      >
        <View style={styles.itemLeft}>
          <TouchableOpacity style={styles.modal} onPress={() => {
            this.close()
          }}>
            <View style={styles.tobModal}>
              <View style={[styles.tobView, {marginTop: height * 0.03}]}>
                <Text style={styles.textModel}>{this.props.title}</Text>
                <View style={styles.textInput}>
                  <TextInput
                    style={{width: '88%', height: height * 0.05, marginLeft: 5, color: Colors.black}}
                    maxLength={(this.state.check ? 11 : 30)}
                    placeholder={this.props.inputText}
                    placeholderTextColor={"#9D9D9D"}
                    keyboardType={(this.state.check ? 'number-pad' : 'default')}
                    value={this.state.text}
                    underlineColorAndroid={'transparent'}
                    onChangeText={(text) => this.isChangeText(text)}
                  />
                  <TouchableOpacity onPress={() => this.setState({text: ''})}>
                    <Image source={Images.icClose} style={{width: 22, height: 22}} resizeMode={'stretch'}/>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={[styles.tobView, {width: '88%', flexDirection: 'row'}]}>
                <View style={styles.tob}>
                  <TouchableOpacity
                    style={[styles.smallButton, {backgroundColor: Colors.white}]}
                    onPress={() => {
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
                  {this.state.text !== '' ? (
                    <TouchableOpacity
                      style={[styles.smallButton, {backgroundColor: Colors.red}]}
                      onPress={() => {
                        this.actionYes(this.props.title, this.state.text);
                      }}
                    >
                      <Text
                        style={[styles.smallButtonText, {color: Colors.white}]}>
                        {String.confirm}
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <View
                      style={[
                        styles.smallButton,
                        {
                          backgroundColor: Colors.colorInputView,
                          borderColor: Colors.colorInputView
                        }]
                      }>
                      <Text
                        style={[styles.smallButtonText, {color: Colors.white}]}>
                        {String.confirm}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
