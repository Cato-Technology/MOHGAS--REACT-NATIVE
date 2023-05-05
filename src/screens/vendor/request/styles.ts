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

      top: -100,
      borderBottomRightRadius: 300,
      borderBottomLeftRadius: 300,
      backgroundColor: '#f3faf5',
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

    dash: {height: 0.5, backgroundColor: colors.blue, width: '40%'},

    errorMessage: {
      //fontFamily: fonts.regular,
      fontSize: 12,
      color: colors.danger,
      marginLeft: 30,
    },

    centerText: {
      width: '90%',
      fontSize: 15,
      //  fontFamily: fonts.mulishRegular,
      color: '#000000',
      textAlign: 'left',
      marginTop: 20,
    },
    circleView: {
      backgroundColor: '#455F9B',
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
    lightText: {
      color: '#fff',
      fontSize: 11,
      fontWeight: '300',
      textAlign: 'left',
    },
    hardText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'left',
    },
  });
export default makeStyles;
