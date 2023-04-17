import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      height: heightPercentageToDP(7),
      marginTop: heightPercentageToDP(1),
      paddingHorizontal: widthPercentageToDP(3),
      paddingVertical: heightPercentageToDP(1),
      backgroundColor: colors.cardBackground,
      borderRadius: widthPercentageToDP(2),

      alignItems: 'center',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },

    detailText: {
      color: colors.text,
      //fontFamily: 'Poppins-Regular',
    },
    bnkTitleText: {
      color: colors.text,
      //fontFamily: 'Poppins-SemiBold',
    },

    oddView: {
      backgroundColor: 'green',
      width: widthPercentageToDP(21),
      height: heightPercentageToDP(4),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: widthPercentageToDP(2),
    },
    oddStakeText: {
      color: colors.text,
      fontSize: RFValue(16),
      //fontFamily: 'Poppins-SemiBold',
    },
    oddBtnText: {
      color: '#000',
      fontSize: RFValue(14),
      //fontFamily: 'Poppins-SemiBold',
    },
  });
export default makeStyles;
