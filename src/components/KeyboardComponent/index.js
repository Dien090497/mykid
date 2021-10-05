import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity, Image,
} from 'react-native';
import {styles} from './styles';
import {KeyboardAccessoryView} from 'react-native-keyboard-accessory';
import {Colors} from '../../assets/colors/Colors';
import {TextInput} from 'react-native-gesture-handler';
import Images from '../../assets/Images';
import {String} from '../../assets/strings/String';

const KeyboardComponent = (props) => {
  const onTypeMessage = (messageText) => setMessageText(messageText);
  const [messageText, setMessageText] = useState('');
  const [textPlaceHolder, setTextPlaceHolder] = useState(String.chatPlaceholder);
  const [styleButton, setStyleButton] = useState(styles.textInputButton);
  const refTextInput = useRef();

  useEffect(() => {
    if (refTextInput) {
      Platform.OS === 'ios'
        ? refTextInput.current.focus()
        : setTimeout(() => refTextInput.current.focus(), 30);
    }
  }, [refTextInput]);

  const clickButtonFlyText = () => {
    if (isOnFlyText) {
      setStyleButton(styles.textInputButton);
      setTextPlaceHolder(String.chatPlaceholder);
    } else {
      setStyleButton(styles.textInputButtonBlue);
      setTextPlaceHolder(String.placeholderForChatInput);
    }
  };
  const sendMessage = () => {
    setMessageText('');
    props.closeKeyBoard();
  };
  return (
    <KeyboardAccessoryView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      alwaysVisible={true}
      androidAdjustResize>
      {/* <View style={{
        height: 100,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
      }}>
        <View style={{
          width: '100%',
          justifyContent: 'center',
          margin: 10,
          alignItems: 'center',
        }}>
          <Text style={{
            color: Colors.black,
            fontFamily: 'Roboto-Regular',
            fontWeight: 'bold',
            fontSize: 18,
          }}>{String.chat}</Text>
        </View>
        <View style={styles.lineStyle}/>
        <View style={styles.footerTextInput}>
          <TextInput
            style={styles.textInputKeyboard}
            placeholder={textPlaceHolder}
            underlineColorAndroid="transparent"
            multiline={true}
            placeholderTextColor="grey"
            returnKeytype="Done"
            value={ messageText}
            maxLength={200}
            onChangeText={onTypeMessage}
            enableScrollToCaret
            ref={refTextInput}
          />
          <TouchableOpacity
            style={styleButton}
            onPress={clickButtonFlyText}>
            <Image style={styles.icon} source={Images.icRecord}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.textInputButton}
            onPress={sendMessage}>
            <Image style={styles.icon} source={Images.icRecord}/>
          </TouchableOpacity>
        </View>
      </View> */}
      {/* <View style={styles.viewBottom}>
          <TouchableOpacity style={styles.viewImg} onPress={() => {toggleRecord(!isRecord)}}>
            <Image source={Images.icRecord} style={styles.icRecord}/>
          </TouchableOpacity>
          <View style={styles.viewContent}>
            <View style={styles.toInput}>
              <TextInput
                ref={refTextInput}
                numberOfLines={1}
                maxLength={20}
                autoCompleteType={'off'}
                importantForAutofill={'off'}
                autoCorrect={false}
                underlineColorAndroid={'transparent'}
                style={styles.textInput}
                disableFullscreenUI
                value={messageText}
                placeholder={'...'}
                onChangeText={txt => setMessageText(txt)}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.viewImg}>
            <Image source={Images.icCamera} style={styles.icCamera}/>
          </TouchableOpacity>
        </View> */}
    </KeyboardAccessoryView>
  );
};
export default KeyboardComponent;
