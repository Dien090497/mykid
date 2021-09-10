import Consts, { FontSize, ScaleHeight } from "../../functions/Consts";

import {Colors} from '../../assets/colors/Colors';
import {StyleSheet} from 'react-native';

const widthContent = Consts.screenWidth/2.2;
const heightContent = widthContent / 2;
const imageW = Consts.screenWidth / 6.5;
const marginT = Consts.screenHeight / 15;
const marginLive = -Consts.screenHeight / 35 - 18;
export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.grayBackground,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,
    elevation: 24,
  },
  item: {
    flex: 1,
    alignItems:"center",
    padding:5,
    justifyContent: "center",
  },
  icon: {
    height: FontSize.xtraBig,
    aspectRatio: 1,
    margin: 3,
    resizeMode: 'contain'
  },
  bgIcon: {
    width:30,
    height:30,
  },
  icBackGroundLiveStream: {
    height: heightContent,
    width: widthContent,
    resizeMode: 'contain',
    top: -heightContent / 2,
    left: (Consts.screenWidth - widthContent) / 2,
    alignSelf: 'center',
    position: 'absolute',

  },
  contentLiveStream: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  icLiveStream: {
    height:imageW,
    width: imageW,
    marginLeft: -imageW/3.5,
    marginTop: marginLive,
  }
});
