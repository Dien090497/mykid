import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text, Platform,
} from "react-native";
import { TimePicker } from 'react-native-wheel-picker-android';
import { styles } from './style';
import i18next from 'i18next';
import SimpleToast from "react-native-simple-toast";

export default class PeriodModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      from: null,
      to: null
    };
  }

  openModal = (from, to, saveConfig) => {
    this.setState({ modalVisible: true, from: from, to: to, saveConfigFunc: saveConfig });
  };

  hideModal = () => {
    this.setState({ modalVisible: false });
  };

  onFromSelected = (timeSelect) => {
    let time = timeSelect;
    time.setSeconds(0);
    this.setState({from: time});
  };

  onToSelected = (timeSelect) => {
    let time = timeSelect;
    time.setSeconds(0);
    this.setState({to: time});
  };

  onSubmit = () => {
    if (this.state.to <= this.state.from) {
      SimpleToast.show(i18next.t('common:timeInvalidNote'));
      return;
    }
    const splitFrom = this.state.from.toString().split(' ');
    const splitTo = this.state.to.toString().split(' ');
    const config = Object.assign({}, this.state.config);
    if (splitFrom.length > 4 && splitTo.length > 4) {
      config.from = splitFrom[4];
      config.to = splitTo[4];
    }
    this.state.saveConfigFunc(config);
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
        animationType='slide'
        transparent={true}
        visible={this.state.modalVisible}>
        <TouchableOpacity style={styles.bottomView} onPress={this.hideModal}>
          <TouchableOpacity style={styles.containerModal} activeOpacity={1}>
            <View style={styles.body}>
              <View style={[styles.viewTime, Platform.OS !== 'ios' ? {height: 150, paddingTop: 20} : {}]}>
                { this.state.from &&
                <TimePicker format24
                            initDate={this.state.from}
                            onTimeSelected={this.onFromSelected}
                            minutes={this.getMinutes()}/>
                }
              </View>
              <View style={[styles.viewSub, Platform.OS !== 'ios' ? {height: 150} : {}]}>
                <View style={styles.iconSub}/>
              </View>
              <View style={[styles.viewTime, Platform.OS !== 'ios' ? {height: 150, paddingTop: 20} : {}]}>
                { this.state.to &&
                <TimePicker format24
                            initDate={this.state.to}
                            onTimeSelected={this.onToSelected}
                            minutes={this.getMinutes()}/>
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
