import {Colors} from '../../../assets/colors/Colors';
import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

export const styles = StyleSheet.create({
  tobMain: {
    backgroundColor: Colors.white,
    width: width * 0.9,
    height: height * 0.07,
    marginHorizontal: width * 0.04,
    padding: 10,
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
    marginBottom: height * 0.015,
    marginTop: 5
  },
  tobViewMain: {
    backgroundColor: Colors.redTitle,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.04,
    width: width * 0.9,
    height: height * 0.05,
    borderRadius: 12
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    marginHorizontal: height * 0.007
  },
  image: {
    width: height * 0.04,
    height: height * 0.04
  },
  image1: {
    width: height * 0.05,
    height: height * 0.05,
    borderRadius: height * 0.05
  },
  viewAvatar: {
    flexDirection: 'row',
    position: 'absolute',
    right: width * 0.02,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tobView: {
    width: width * 0.08,
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  view: {
    width: width * 0.08
  }
});
