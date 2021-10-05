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
      checked: this.props.checker,
    };
  }
  render() {
    return (
      <View style={styles.containerView}>
        {this.state.radioBtnsData.map((data, key) => {
          return (
            <View key={key}  style={styles.listView}>
              {this.state.checked == key ? (
                <TouchableOpacity style={styles.btn}>
                 <View style={{width:'108%'}}>
                   <Text style={styles.textView}>
                     {data.text}
                   </Text>
                 </View>
                  <Image style={styles.img} source={Images.icCheck} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({checked: key});
                    this.props.updateTimeZoneSelect(data.value);
                  }}
                  style={styles.btn}>
                 <View style={{width:'108%'}}>
                   <Text>
                     {data.text}
                   </Text>
                 </View>
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
