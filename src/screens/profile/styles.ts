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
    },
    content: {
      flex: 1,
      alignItems: 'center',
      paddingTop: heightPercentageToDP(5),
      justifyContent: 'center',
      paddingBottom: heightPercentageToDP(10),
    },
    image: {
      width: widthPercentageToDP(20),
      height: widthPercentageToDP(20),
      borderRadius: widthPercentageToDP(12.5),
    },
    profile: {
      paddingHorizontal: widthPercentageToDP(4),
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
      flexDirection: 'row',
      alignItems: 'center',
      width: widthPercentageToDP(100),
      paddingHorizontal: widthPercentageToDP(6),
    },
  });

export default makeStyles;
