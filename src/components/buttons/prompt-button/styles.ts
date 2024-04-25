import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';
export const makeStyles = (colors: any) =>
  StyleSheet.create({
    btnContainer: {
      height: widthPercentageToDP(8),
      maxWidth: '50%',
    //   justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'yellow',
    //   paddingHorizontal: widthPercentageToDP(3),
      borderRadius: widthPercentageToDP(1),
    },

    label: {
      width: '100%',
      textAlign: 'center',
      fontSize: RFValue(14),
      color: '#fff',
      fontFamily: 'Rubik-Bold',
    },
  });
export default makeStyles;
