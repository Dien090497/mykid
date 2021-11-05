import { Colors } from '../../../assets/colors/Colors';
import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  tobMain: {
    backgroundColor: Colors.white,
    width: width * 0.9,
    height: height * 0.07,
    marginHorizontal: width * 0.04,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: width * 0.02,
    shadowColor: 'rgba(25,25,25, 0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
    marginTop: 5
  },
  tobViewMain: {
    backgroundColor: Colors.redTitle,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: width * 0.9,
    height: height * 0.06,
    borderRadius: 12
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black
  },
  image: {
    width: 30,
    height: 30,
    marginLeft: 5
  },
  viewImage: {
    flexDirection: 'row',
    position: 'absolute',
    right: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageAvatar: {
    width: height* 0.16,
    height: height* 0.16
  }
});