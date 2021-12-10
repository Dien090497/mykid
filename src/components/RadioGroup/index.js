import {TouchableOpacity, View, Text, Image} from 'react-native';
import {styles} from './styles';
import Images from '../../assets/Images';
import React, {Component} from 'react';
import TimeZoneDatas from '../../assets/strings/TimeZoneDatas';

class RadioGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioBtnsData: TimeZoneDatas,
      checked: 5,
    };
  }
  updateView(timeZone) {
    for (let i = 0; i < this.state.radioBtnsData.length; i++) {
      if (timeZone === this.state.radioBtnsData[i].value) {
        this.setState({checked: i, timeZoneSelect: timeZone});
        return;
      }
    }
  }
  render() {
    return (
      <View style={styles.containerView}>
        {this.state.radioBtnsData.map((data, key) => {
          return (
            <View key={key}  style={styles.listView}>
              {this.state.checked == key ? (
                <TouchableOpacity style={styles.btn}>
                 <View style={{width:'100%'}}>
                   <Text style={styles.textView}>
                     {data.text}
                   </Text>
                 </View>
                  <View style={{width: '14%', justifyContent: 'center',alignItems: 'flex-end'}}>
                    <Image style={styles.img} source={Images.icUncheck} resizeMode={'stretch'}/>
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({checked: key});
                    this.props.updateTimeZoneSelect(data.value);
                  }}
                  style={styles.btn}>
                 <View style={{width:'100%'}}>
                   <Text>
                     {data.text}
                   </Text>
                 </View>
                  <View style={{width: '14%', justifyContent: 'center',alignItems: 'flex-end'}}>
                    <Image style={styles.img} source={Images.icClickCancel} resizeMode={'stretch'}/>
                  </View>
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
