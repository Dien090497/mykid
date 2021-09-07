import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './styles';
import {Colors} from '../../assets/colors/Colors';

export default class ConfirmPopup extends Component {
  /* 
  title
  titleStyle
  titleText
  content
  contentStyle
  contentText
  noButtonStyle
  noButtonText
  yesButtonStyle
  yesButtonText
  */
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

  actionYes = () => {
    this.close(() => {
      setTimeout(() => {
        if (this.props.onPressYes) {
          this.props.onPressYes();
        }
      }, 500);
    });
  };

  actionNo = () => {
    this.close(() => {
      if (this.props.onPressNo) {
        this.props.onPressNo();
      }
    });
  };

  render() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
      >
        <View style={{flex: 1, backgroundColor: Colors.blackTransparent}}>
          <TouchableOpacity onPress={() => {
            this.close();
          }} style={styles.container}>
            <View style={styles.content}>
              {this.props.title ? this.props.title : this.props.titleContent && <Text
                style={this.props.titleStyle
                  ? this.props.titleStyle
                  : styles.textTitle}> {this.props.titleContent
                ? this.props.titleContent
                : ''}</Text>}
              {this.props.content ? this.props.content : this.props.contentText && <Text
                style={this.props.contentStyle
                  ? this.props.contentStyle
                  : styles.textContent}> {this.props.contentText
                ? this.props.contentText
                : ''}</Text>}
              <View style={styles.rowButton}>
                <TouchableOpacity onPress={() => {
                  this.actionNo();
                }} style={[{width: '45%'}, this.props.noButtonStyle
                  ? this.props.noButtonStyle
                  : styles.noButton]}>
                  <Text
                    style={this.props.noButtonTextStyle
                      ? this.props.noButtonTextStyle
                      : styles.noButtonText}>{this.props.noButtonText
                    ? this.props.noButtonText
                    : 'Huỷ'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                  this.actionYes();
                }} style={[{width: '45%'}, this.props.yesButtonStyle
                  ? this.props.yesButtonStyle
                  : styles.yesButton]}>
                  <Text
                    style={this.props.yesButtonTextStyle
                      ? this.props.yesButtonTextStyle
                      : styles.yesButtonText}>{this.props.yesButtonText
                    ? this.props.yesButtonText
                    : 'Đồng ý'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}