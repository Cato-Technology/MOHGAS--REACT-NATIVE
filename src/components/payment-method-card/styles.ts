import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    main: {
      height: heightPercentageToDP(18),
      marginTop: heightPercentageToDP(2),
      paddingHorizontal: widthPercentageToDP(3),
      paddingVertical: heightPercentageToDP(1),
      backgroundColor: colors.cardBackground,
      borderRadius: widthPercentageToDP(2),
    },

    entityText: {
      color: colors.disable,
      marginTop: 2,
      //fontFamily: 'Poppins-SemiBold',
    },
    middleText: {
      color: colors.text,
      marginTop: 2,
      //fontFamily: 'Poppins-SemiBold',
    },
    detailText: {
      width: '100%',
      color: colors.text,
      marginTop: 2,
      //fontFamily: 'Poppins-Regular',
    },
    headingText: {
      width: '100%',
      color: colors.text,
      marginTop: 2,
      fontFamily: 'Poppins-Bold',
    },
  });
export default makeStyles;
