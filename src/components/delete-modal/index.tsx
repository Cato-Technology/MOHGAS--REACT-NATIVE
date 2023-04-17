import {Text, View, Pressable} from 'react-native';
import React from 'react';

import {Modal} from '../../components/base';

import makeStyles from './styles';
import {useTheme} from '@react-navigation/native';

type Props = {
  heading?: string;
  isVisible: boolean;
  setIsVisible: any;
  subHeading: string;
  callMe: any;
};

const DeleteModalComponent = ({
  isVisible,
  setIsVisible,
  callMe,
  heading = 'Delete Dependant?',
  subHeading = 'Are you sure you want to delete profiles?',
}: Props) => {
  const {colors} = useTheme();
  const styles = makeStyles(colors);
  return (
    <Modal isVisible={isVisible} setIsVisible={setIsVisible}>
      <View style={styles.container}>
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subHeading}>{subHeading}</Text>
        <View style={styles.buttonsContainer}>
          <Pressable
            onPress={() => {
              setIsVisible(false);
              callMe();
            }}
            style={styles.yesBtn}>
            <Text style={styles.yesBtnText}>Yes</Text>
          </Pressable>
          <Pressable onPress={() => setIsVisible(false)} style={styles.noBtn}>
            <Text style={styles.noBtnText}>No</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModalComponent;
