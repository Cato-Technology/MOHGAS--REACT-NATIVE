import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
// import { responsiveFontSize } from 'utils/functions/responsive-text';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    contentView: {
      flex: 1,
      paddingHorizontal: widthPercentageToDP(3),
      alignItems: 'center',
    },

    image: {
      width: widthPercentageToDP(35),
      height: widthPercentageToDP(35),
      borderRadius: widthPercentageToDP(35),
      marginTop: 10,
    },
    profile: {
      paddingHorizontal: widthPercentageToDP(4),
    },
    inputLablel: {
      marginHorizontal: 20,
      //fontFamily: fonts.mulishBold,
      color: colors.white,
      fontSize: 15,
    },
    name: {
      //fontFamily: colors.medium,
      fontSize: RFValue(17),
      color: colors.text,
      paddingRight: widthPercentageToDP(20),
    },
    editProfile: {
      //fontFamily: fonts.mulishLight,
      fontSize: RFValue(15),
      color: colors.text,
      paddingLeft: widthPercentageToDP(2),
    },
    menuList: {
      paddingTop: widthPercentageToDP(7),
      marginBottom: heightPercentageToDP(7),
    },
    accountScreenView: {
      alignItems: 'center',
      width: widthPercentageToDP(100),
      paddingHorizontal: widthPercentageToDP(6),
    },
  });

export default makeStyles;
