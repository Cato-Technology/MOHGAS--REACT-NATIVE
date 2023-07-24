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
      fontFamily: 'Rubik-Regular',
      color: colors.white,
      fontSize: 15,
    },
    name: {
      fontFamily: 'Rubik-Regular',
      fontSize: RFValue(17),
      color: colors.text,
      paddingRight: widthPercentageToDP(20),
    },
    editProfile: {
      fontFamily: 'Rubik-Regular',
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
    dropdown: {
      marginTop: 9,
      height: 50,
      backgroundColor: '#f9f9f9',
      borderRadius: 6,
      paddingHorizontal: 10,
    },
    placeholderStyle: {
      fontSize: 16,

      color: colors.lightGrey,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

export default makeStyles;
