import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      height: 55,
      width: '100%',
      alignItems: 'center',
      padding: 12,
      //  shadowColor: '#000',
      // shadowOffset: {width: 1, height: 1},

      elevation: 5,
    },
    ripple: {
      height: 40,
      width: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: RFValue(20),

      color: colors.text,
      fontFamily: 'Rubik-Bold',
    },
    subTitle: {
      fontSize: RFValue(9),
      fontFamily: 'Rubik-Bold',
      color: colors.yellowHeading,
    },
  });
export default makeStyles;
