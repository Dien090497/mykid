import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text, Platform,
} from "react-native";
import { TimePicker } from 'react-native-wheel-picker-android';
import { String } from '../../assets/strings/String';
import { styles } from './styles';

export default class TimePickerModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      time: null,
    };
  }

  openModal = (date, saveConfig) => {
    this.setState({ modalVisible: true, time: date, saveConfigFunc: saveConfig });
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  onFromSelected = (timeSelect) => {
    let time = timeSelect;
    time.setSeconds(0);
    this.setState({time: time});
  };

  onSubmit = () => {
    this.state.saveConfigFunc(this.state.time);
    this.hideModal();
  };

  getMinutes = () => {
    let minutes = [];
    for (let i = 0; i < 60; i++) {
      minutes.push(i < 10 ? '0' + i.toString() : i.toString());
    }
    return minutes;
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.modalVisible}>
        <TouchableOpacity style={styles.bottomView} onPress={this.hideModal}>
          <TouchableOpacity style={styles.containerModal} activeOpacity={1}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.btnCancel} onPress={this.hideModal}>
                <Text style={styles.txtCancel}>{String.cancel}</Text>
              </TouchableOpacity>
              <View style={{width: '50%'}}/>
              <TouchableOpacity style={styles.btnAccept} onPress={this.onSubmit}>
                <Text style={styles.txtAccept}>{String.accept}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.body}>
              <View style={[styles.viewTime, Platform.OS !== 'ios' ? {height: 150, paddingTop: 20} : {}]}>
                { this.state.time &&
                <TimePicker format24
                            initDate={this.state.time}
                            onTimeSelected={this.onFromSelected}
                            minutes={this.getMinutes()}/>
                }
              </View>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
}
