import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      width: widthPercentageToDP(85),
      padding: widthPercentageToDP(4),
      borderRadius: widthPercentageToDP(3),
      backgroundColor: colors.modalBackground,
      alignItems: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: heightPercentageToDP(2),
      paddingHorizontal: widthPercentageToDP(4),
    },
    heading: {
      fontSize: RFValue(16),
      fontFamily: 'Poppins-Bold',
      color: 'red',
    },
    subHeading: {
      fontSize: RFValue(14),
      //fontFamily: 'Poppins-Regular',
      textAlign: 'center',
    },
    yesBtn: {
      paddingHorizontal: widthPercentageToDP(11),
      paddingVertical: widthPercentageToDP(2),
      borderWidth: 0.5,
      borderRadius: widthPercentageToDP(3),
    },
    noBtn: {
      paddingHorizontal: widthPercentageToDP(11),
      paddingVertical: widthPercentageToDP(2),
      backgroundColor: colors.primary,
      borderRadius: widthPercentageToDP(3),
    },
    yesBtnText: {
      fontSize: RFValue(16),
      //fontFamily: 'Poppins-Regular',
      color: colors.red,
    },
    noBtnText: {
      fontSize: RFValue(16),
      //fontFamily: 'Poppins-Regular',
      color: colors.text,
    },
  });
export default makeStyles;
