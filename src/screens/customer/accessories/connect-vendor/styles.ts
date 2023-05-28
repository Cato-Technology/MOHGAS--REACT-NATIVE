import {StyleSheet} from 'react-native';

// import colors from 'assets/colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    icon: {
      overflow: 'hidden',
      width: 500,
      height: 300,
      position: 'absolute',

      top: -200,
      borderBottomRightRadius: 300,
      borderBottomLeftRadius: 300,
      backgroundColor: '#f1f9f0',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      //fontFamily: fonts.bold,
      fontSize: 24,
      alignSelf: 'center',
      color: colors.text,
      marginTop: 10,
    },
    inputLablel: {
      marginHorizontal: 20,
      //fontFamily: fonts.mulishBold,
      color: colors.white,
      fontSize: 15,
    },
    forgotPassword: {
      //fontFamily: fonts.mulishRegular,
      color: colors.blue,
      fontSize: RFValue(13),
    },
    orTxt: {
      marginHorizontal: 20,
      //fontFamily: fonts.mulishRegular,
      fontSize: RFValue(15),
      color: colors.black,
    },
    dash: {height: 0.5, backgroundColor: colors.blue, width: '40%'},
    orView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: 20,
      alignSelf: 'center',
      marginVertical: 10,
    },
    socialLogins: {
      justifyContent: 'space-around',
      width: '30%',
      alignSelf: 'center',
      flexDirection: 'row',
      marginVertical: 10,
      alignItems: 'center',
    },
    noAccountTxt: {
      marginTop: 10,
      //fontFamily: fonts.mulishRegular,
      fontSize: 16,
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    errorMessage: {
      //fontFamily: fonts.regular,
      fontSize: 12,
      color: colors.danger,
      marginLeft: 30,
    },
    checkbox: {
      alignSelf: 'center',
    },
    tcText: {
      flexDirection: 'row',
    },
    tcTextStyle: {
      marginTop: 3,
      fontSize: 15,
      //  fontFamily: fonts.mulishRegular,
      color: '#000000',
    },
    centerText: {
      width: '100%',
      fontSize: 18,
      //  fontFamily: fonts.mulishRegular,
      color: '#000000',
      textAlign: 'center',
      marginTop: 20,
    },
    circleView: {
      backgroundColor: '#4ca757',
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
    },
    centerViewText: {
      fontSize: 12,
      //  fontFamily: fonts.mulishRegular,
      color: '#000000',
      paddingVertical: 10,
    },
    backContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    leftContainer: {
      flex: 0,
      justifyContent: 'flex-start',
    },
    rightContainer: {
      flex: 3,
      justifyContent: 'center',
      paddingTop: 17,
      marginRight: 10,
    },
    backIcon: {
      fontSize: 25,
      paddingTop: 20,
      paddingLeft: 25,
    },
    extraStyle: {
      marginTop: 40,
      // marginLeft: 25,
      // marginRight: 25,
    },
    styleImage: {
      justifyContent: 'center',
      width: 320,
      height: 200,
    },
    extraContainer: {
      paddingTop: 0,
      paddingLeft: 15,
      marginRight: 0,
    },
    tagText: {
      color: '#000000',
      fontSize: 11,
      backgroundColor: '#efefef',
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 3,
      overflow: 'hidden',
      marginRight: 15,
    },
  });
export default makeStyles;
