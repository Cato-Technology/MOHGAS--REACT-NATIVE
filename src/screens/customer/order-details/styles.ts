import { StyleSheet } from 'react-native';

// import colors from 'assets/colors';
import { RFValue } from 'react-native-responsive-fontsize';
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
      fontFamily: 'Rubik-Regular',
      fontSize: 12,

      color: 'gray',
      fontFamily: 'Rubik-Bold',
    },
    descText: {
      fontFamily: 'Rubik-Regular',
      fontSize: 12,
      marginLeft: 18,
      color: colors.text,
      lineHeight: 22,
    },
    inputLablel: {
      marginHorizontal: 20,
      fontFamily: 'Rubik-Regular',
      color: colors.white,
      fontSize: 15,
    },
    forgotPassword: {
      fontFamily: 'Rubik-Regular',
      color: colors.blue,
      fontSize: RFValue(13),
    },
    orTxt: {
      marginHorizontal: 20,
      fontFamily: 'Rubik-Regular',
      fontSize: RFValue(15),
      color: colors.black,
    },
    dash: { height: 0.5, backgroundColor: colors.blue, width: '40%' },
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
      fontFamily: 'Rubik-Regular',
      fontSize: 16,
      flexDirection: 'row',
      alignItems: 'baseline',
    },
    errorMessage: {
      fontFamily: 'Rubik-Regular',
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
      fontFamily: 'Rubik-Regular',
      color: '#000000',
    },
    centerText: {
      width: '100%',
      fontSize: 18,
      fontFamily: 'Rubik-Regular',
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
      fontFamily: 'Rubik-Regular',
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
    twoView: {
      width: '50%',
    },
    check: {
      backgroundColor: '#4ca757',
      borderRadius: 12,
      width: 12,
      height: 12,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 5,
    },
    btnStyle: {
      backgroundColor: '#eb473d',
      height: 37,
      width: 160,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    btnTextStyle: {
      color: '#fff',
      fontFamily: 'Rubik-Bold',
    },
    dropdown: {
      // backgroundColor: "red",
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center'
    },
  });
export default makeStyles;
