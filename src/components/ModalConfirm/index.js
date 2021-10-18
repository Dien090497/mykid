import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {Colors} from '../../assets/colors/Colors';
import  {ScaleHeight} from '../../functions/Consts';
import {String} from "../../assets/strings/String";

export default class ModalConfirm extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  open = () => {
    this.setState({modalVisible: true});
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
            <View style={[styles.tobView, {marginTop: ScaleHeight.small}]}>
              <Text style={styles.textModel}>{this.props.title}</Text>
            </View>
            <View style={[styles.tobView, {width: '86%'}]}>
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