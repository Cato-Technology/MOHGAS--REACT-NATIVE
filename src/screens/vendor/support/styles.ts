import {StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {widthPercentageToDP} from 'react-native-responsive-screen';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    contentView: {
      flex: 1,
      paddingHorizontal: widthPercentageToDP(3),
    },
    headingText: {
      fontFamily: 'Poppins-Bold',
      fontSize: RFValue(14),
      color: colors.text,
    },
    makeBetView: {
      width: '100%',
      alignItems: 'center',
      flex: 2,
    },
  });

export default makeStyles;
