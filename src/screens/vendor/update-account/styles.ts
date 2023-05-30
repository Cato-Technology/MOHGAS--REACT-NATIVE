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
      fontFamily: 'Rubik-Regular',
      fontSize: 24,
      alignSelf: 'center',
      color: colors.text,
      marginTop: 10,
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
    imageView2: {
      height: heightPercentageToDP(10),
      width: widthPercentageToDP(25),
      // backgroundColor: colors.fieldGrey,
      marginLeft: widthPercentageToDP(2),
      marginTop: heightPercentageToDP(2),
      borderRadius: 8,
      alignItems: 'flex-end',
    },
    deleteIcon: {
      marginTop: heightPercentageToDP(0.5),
      marginHorizontal: widthPercentageToDP(2),
    },
    pdfWithBin: {
      position: 'absolute',
      right: heightPercentageToDP(2),
      zIndex: 10,
      top: heightPercentageToDP(3.5),
    },
    imageView: {
      height: heightPercentageToDP(10),
      width: widthPercentageToDP(25),
      // backgroundColor: colors.fieldGrey,
      marginLeft: widthPercentageToDP(2),
      marginTop: heightPercentageToDP(2),
      borderRadius: 8,
      alignItems: 'center',

      justifyContent: 'center',
      backgroundColor: '#efefef',
    },

    addPage: {
      color: colors.heading,
    },
    uploadView: {
      flexDirection: 'row',
      marginHorizontal: widthPercentageToDP(10),
      marginTop: heightPercentageToDP(5),
    },
    uploadText: {
      color: colors.heading,
      marginHorizontal: widthPercentageToDP(3),
      fontSize: 18,
    },
    text: {
      color: colors.heading,
      marginHorizontal: widthPercentageToDP(3),
      fontSize: 17,
    },
    infoView: {
      flexDirection: 'row',
      marginTop: heightPercentageToDP(5),
      marginHorizontal: widthPercentageToDP(10),
    },
    numberText: {
      color: colors.heading,
      fontSize: 18,
    },
    dropdown: {
      marginTop: 16,
      height: 50,
      backgroundColor: '#f9f9f9',
      borderRadius: 6,
      paddingHorizontal: 10,
    },
    icon2: {
      marginRight: 5,
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
