import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    header: {
      flexDirection: 'row',
      height: 50,
      width: '100%',
      alignItems: 'center',

      //  shadowColor: '#000',
      // shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
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
      fontSize: RFValue(24),
      fontWeight: 'bold',
      color: colors.yellowHeading,
      //  fontFamily: 'Poppins-Bold',
    },
    subTitle: {
      fontSize: RFValue(9),
      fontWeight: 'bold',
      color: colors.yellowHeading,
    },
  });
export default makeStyles;
