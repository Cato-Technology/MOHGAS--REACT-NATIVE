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
    imageView: {
      height: heightPercentageToDP(8),
      width: widthPercentageToDP(18),
      // backgroundColor: colors.fieldGrey,
      marginLeft: widthPercentageToDP(2),
      marginTop: heightPercentageToDP(2),
      borderRadius: 15,
      alignItems: 'center',

      justifyContent: 'center',
      backgroundColor: '#efefef',
      marginBottom: 10,
    },
    imageViewText: {
      fontSize: 10,
      color: '#000',
      fontWeight: '200',
      textAlign: 'center',
      width: widthPercentageToDP(18),
      marginLeft: widthPercentageToDP(2),
    },
  });

export default makeStyles;
