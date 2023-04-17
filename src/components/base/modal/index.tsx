import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';

import makeStyles from './styles';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useTheme} from '@react-navigation/native';

type Props = {
  isVisible: boolean;
  children: any;
  setIsVisible: any;
};

const ModalComponent = ({isVisible, children, setIsVisible}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <View>
      <Modal
        deviceWidth={widthPercentageToDP(100)}
        deviceHeight={heightPercentageToDP(100)}
        onBackdropPress={() => setIsVisible(false)}
        backdropColor={colors.bg}
        isVisible={isVisible}>
        <View style={styles.mainView}>{children}</View>
      </Modal>
    </View>
  );
};

export default ModalComponent;
