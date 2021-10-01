import {TouchableOpacity, View, Text, Image} from 'react-native';
import {styles} from './styles';
import Images from '../../assets/Images';
import React, {Component} from 'react';
import TimeZoneDatas from '../../assets/strings/TimeZoneDatas';
import Consts from '../../functions/Consts';
class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioBtnsData: TimeZoneDatas,
      checked: 0,
    };
  }
  updateView(timeZone) {
    for (let i = 0; i <= this.state.radioBtnsData.length; i++) {
      if (timeZone === this.state.radioBtnsData[i].value) {
        this.setState({checked: i, timeZoneSelect: timeZone});
        return;
      }
    }
  }
  render() {
    return (
      <View>
        {this.state.radioBtnsData.map((data, key) => {
          return (
            <View key={key}>
              {this.state.checked == key ? (
                <TouchableOpacity style={styles.btn}>
                  <Text
                    style={{
                      marginLeft: 10,
                      width: Consts.windowWidth - 50,
                    }}>
                    {data.text}
                  </Text>
                  <Image style={styles.img} source={Images.icCheck} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({checked: key});
                    this.props.updateTimeZoneSelect(data.value);
                  }}
                  style={styles.btn}>
                  <Text
                    style={{
                      marginLeft: 10,
                      width: Consts.windowWidth - 50,
                    }}>
                    {data.text}
                  </Text>
                  <Image style={styles.img} source={Images.icCallCancel} />
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    );
  }
}
export default RadioGroup;
