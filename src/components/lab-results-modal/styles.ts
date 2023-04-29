import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const styles = (colors: any) =>
  StyleSheet.create({
    // modal
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 5,
      shadowColor: '#000',
      paddingHorizontal: widthPercentageToDP(5),
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '90%',
      paddingBottom: heightPercentageToDP(5),
    },
    modalText2: {
      fontSize: 18,
      marginTop: heightPercentageToDP(2),
      color: colors.heading,
    },
    modalText: {
      fontSize: 20,
      color: colors.heading,
    },
    gradientButton: {
      marginTop: heightPercentageToDP(7),
    },
    cancel: {
      textAlign: 'center',
      marginTop: heightPercentageToDP(3),
      marginBottom: heightPercentageToDP(4),
    },
    cancelText: {
      textAlign: 'center',

      color: colors.grey,
    },
    modalView2: {
      paddingBottom: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      alignItems: 'center',
    },
    buttonView: {
      paddingTop: heightPercentageToDP(1),
    },
  });
export default styles;
