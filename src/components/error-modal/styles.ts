import {StyleSheet} from 'react-native';

//import fonts from 'assets/fonts';
import colors from '../../utils/themes/light-colors';

export default StyleSheet.create({
  overLay: {
    position: 'absolute',
    backgroundColor: '#3D3D3D90',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  view: {
    width: '90%',
    backgroundColor: '#f3faf5',
    borderRadius: 5,
    padding: 20,
    paddingBottom: 10,
  },
  text: {
    //fontFamily: fonts.regular,
    fontSize: 15,
    textAlign: 'center',
    color: '#000000',
  },
  heading: {
    //fontFamily: fonts.semiBold,
    fontSize: 18,
    color: '#000000',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
