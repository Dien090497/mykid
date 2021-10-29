import React, { Component } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { Colors } from "../../assets/colors/Colors";
import { ScaleHeight } from "../../functions/Consts";
import i18next from "i18next";

export default class ModalConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  open = (title) => {
    this.setState({ modalVisible: true, title: title });
  };

  close = (callback) => {
    this.setState({ modalVisible: false }, () => {
      if (callback) {
        callback();
      }
    });
  };
  actionClose = () => {
    this.close(() => {
    });
  };

  render() {
    return (
      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        animationType={"none"}
      >
        <View style={styles.itemLeft}>
          <View style={styles.modal}>
            <View style={styles.tobModal}>
              <View style={styles.viewTitle}>
                <Text style={styles.title}>MyKid</Text>
              </View>
              <View style={styles.tobView}>
                <Text style={styles.textModel}>{this.state.title}</Text>
              </View>
                <TouchableOpacity
                  style={styles.smallButton}
                  onPress={() => {
                    this.actionClose();
                  }}
                >
                  <Text
                    style={styles.smallButtonText}>
                    {i18next.t("common:member_approval")}
                  </Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}
