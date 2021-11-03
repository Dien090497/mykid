import {Platform, StatusBar, StyleSheet} from 'react-native';
import { Colors } from "../../assets/colors/Colors";
import Consts, { FontSize } from "../../functions/Consts";
export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  itemFlatList:{
    flex:1,
    marginVertical:10,
    marginHorizontal:20,
    backgroundColor: Colors.white,
    height: Consts.screenHeight*0.1,
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius:10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconItem:{
    width:Consts.screenHeight*0.1*0.65,
    height:Consts.screenHeight*0.1*0.65,
  },
  itemTime:{
    fontFamily: 'Roboto',
    fontSize: FontSize.xxtraSmall*0.9,
    marginRight:10
  },
  contentItem:{
    flex:1,
    fontSize: FontSize.xxtraSmall,
    paddingHorizontal:10
  }
});
