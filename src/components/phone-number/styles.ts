import {StyleSheet} from 'react-native';
import colors from '../../utils/themes/light-colors';
//import fonts from 'assets/fonts';

export default StyleSheet.create({
  countryPickerView: {
    alignSelf: 'center',
    backgroundColor: '#f9f9f9',
    justifyContent: 'flex-start',
    borderRadius: 9,
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: 45,
  },
  pickerButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  textInputStyle: {
    paddingLeft: 10,
    color: colors.black,
    fontSize: 15,
    width: '60%',
    fontFamily: 'Rubik-Regular',
    paddingRight: 10,
  },
});
