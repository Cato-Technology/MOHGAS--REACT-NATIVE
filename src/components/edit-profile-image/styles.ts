import {StyleSheet} from 'react-native';

export const makeStyles = (colors: any) =>
  StyleSheet.create({
    overLay: {
      position: 'absolute',
      backgroundColor: colors.modalBg,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
    view: {
      width: '90%',
      backgroundColor: '#fff',
      borderRadius: 5,
      padding: 20,
      paddingBottom: 10,
    },
    text: {
      fontSize: 15,
      textAlign: 'center',
      color: colors.lightGrey,
    },
    heading: {
      fontSize: 18,
      color: colors.yellowHeading,
      marginBottom: 5,
    },
  });
export default makeStyles;
