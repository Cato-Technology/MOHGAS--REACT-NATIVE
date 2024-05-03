import { useNavigation, useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from 'react-native-responsive-fontsize';
import { heightPercentageToDP } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AntIcon from 'react-native-vector-icons/AntDesign';
import makeStyles from './styles';
import { capitalizeFirstLetter } from '../../utils/functions/general-functions';
import PromptButton from '../buttons/prompt-button';
import { TouchableOpacity } from 'react-native-gesture-handler';
import SCREENS from '../../utils/constants';


type Props = {
  data?: any;
};

const FeedbackItem = ({
  data
}: Props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);


  return (
    <TouchableOpacity style={styles.boxContent} >
      <View style={{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        // alignItems: 'center'
      }}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            // backgroundColor: "red",
            // width: '100%'
          }}>


          <Text style={{
            color: 'white',
            marginBottom: 8
          }}>{data?.feedback_text}</Text>
          <Text style={{
            color: 'black',
            fontSize: 10
          }}>{data?.created_at}</Text>
        </View>

      </View>

    </TouchableOpacity>
  );
};

export default FeedbackItem;
