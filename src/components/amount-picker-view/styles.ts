import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      paddingHorizontal: widthPercentageToDP(3),
      paddingVertical: heightPercentageToDP(1),

      borderRadius: widthPercentageToDP(2),
    },
    oddStakeText: {
      color: colors.text,
      fontSize: RFValue(16),
      //fontFamily: 'Poppins-SemiBold',
    },
    oddBtnText: {
      color: '#000',
      fontSize: RFValue(16),
      fontWeight: 'bold',
    },

    oddView: {
      backgroundColor: 'green',
      width: widthPercentageToDP(28),
      height: heightPercentageToDP(5),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: widthPercentageToDP(2),
    },
    firstRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: heightPercentageToDP(3),
    },
  });
export default makeStyles;
