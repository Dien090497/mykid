import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
} from 'react-native';
import { TimePicker } from 'react-native-wheel-picker-android';
import { String } from '../../assets/strings/String';
import { showAlert } from '../../functions/utils';
import { styles } from './styles';
import i18next from 'i18next';

export default class PeriodModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      config: null,
      from: null,
      to: null
    };
  }

  openModal = (config, saveConfig) => {
    const splitFrom = config.from.split(':');
    const from = new Date();
    from.setHours(Math.floor(splitFrom[0]));
    from.setMinutes(Math.floor(splitFrom[1]));
    from.setSeconds(0);
    const splitTo = config.to.split(':');
    const to = new Date();
    to.setHours(Math.floor(splitTo[0]));
    to.setMinutes(Math.floor(splitTo[1]));
    to.setSeconds(0);
    this.setState({ modalVisible: true, config: config, from: from, to: to, saveConfigFunc: saveConfig });
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
      showAlert(String.timeInvalidNote);
      return;
    }
    const splitFrom = this.state.from.toString().split(' ');
    const splitTo = this.state.to.toString().split(' ');
    const config = Object.assign({}, this.state.config);
    if (splitFrom.length > 4 && splitTo.length > 4) {
      config.from = splitFrom[4];
      config.to = splitTo[4];
    }
    config.status = 'ON';
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
            <View style={styles.header}>
              <TouchableOpacity style={styles.btnCancel} onPress={this.hideModal}>
                <Text style={styles.txtCancel}>{i18next.t('common:cancel')}</Text>
              </TouchableOpacity>
              <View style={{width: '50%'}}/>
              <TouchableOpacity style={styles.btnAccept} onPress={this.onSubmit}>
                <Text style={styles.txtAccept}>{i18next.t('common:accept')}</Text>
              </TouchableOpacity>
            </View>
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
                <Text style={styles.txtSub}>-</Text>
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
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    );
  }
}
