import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text, Platform,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import { styles } from './styles';
import i18next from 'i18next';
import DataLocal from "../../data/dataLocal";

export default class DatePickerModal extends Component {
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
    this.setState({ time: time });
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
  };

  render() {
    return (
      <Modal
        animationType='slide'
        transparent={true}
        visible={this.state.modalVisible}>
        <TouchableOpacity style={styles.bottomView} onPress={this.hideModal}>
          <TouchableOpacity style={styles.containerModal} activeOpacity={1}>
            <View style={styles.body}>
              <View style={[styles.viewTime]}>
                {this.state.time &&
                <DatePicker mode={'date'}
                            date={this.state.time}
                            locale={DataLocal.language}
                            onDateChange={date => { this.setState(...this.state, this.time = date)}}
                />
                }
              </View>
            </View>
            <View style={styles.groupBtn}>
              <TouchableOpacity style={styles.buttonCancel} onPress={this.hideModal}>
                <Text style={styles.buttonTextCancel}>{i18next.t('common:cancel')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={this.onSubmit}>
                <Text style={styles.buttonText}>{i18next.t('common:accept')}</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
}
