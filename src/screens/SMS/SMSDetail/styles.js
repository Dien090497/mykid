import {StyleSheet} from 'react-native';
import { FontSize } from '../../../functions/Consts';
import {Colors} from '../../../assets/colors/Colors';

export const styles = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  viewItem: {
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: Colors.white,
  },
  viewContent: {
    flex: 1,
    marginHorizontal: 10
  },
  viewContentDetail: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.grayBgMsg,
    justifyContent: 'center'
  },
  textTime: {
    textAlign: 'right',
    marginTop: 10,
    fontSize: FontSize.xxtraSmall,
    color: Colors.gray,
    fontFamily: 'Roboto-Medium',
  },
  textDate: {
    fontSize: FontSize.small,
    fontFamily: 'Roboto-Medium',
    color: Colors.gray,
  }
});
