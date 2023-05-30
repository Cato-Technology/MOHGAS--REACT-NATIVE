import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React from 'react';
import Styles from './styles';
import {useTheme} from 'react-native-paper';

import GradientButton from '../buttons/gradient-button';

const LabResultModal = ({
  title,
  visible,
  closeModal,
  onTakePhoto,
  onUploadFromGallery,
}) => {
  const {colors} = useTheme();
  const styles = Styles(colors);

  return (
    <Modal animationType="none" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>{title}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text style={{fontFamily: 'Rubik-Bold', fontSize: 20}}>X</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonView}>
            <GradientButton title="Take Photo" onPress={onTakePhoto} />
          </View>
          <View style={styles.buttonView}>
            <GradientButton
              title="Upload From Gallery"
              onPress={onUploadFromGallery}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default LabResultModal;
