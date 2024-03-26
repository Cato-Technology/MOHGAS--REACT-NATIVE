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

type Props = {
  onPressEdit?: any;
  onPressDelete?: any;
  title?: String;
  subTitle?: String;
  price?: String;
  icon?: any;
  srNo?: String;
  style?: any;
  showOptions?: boolean;
  actionOne?: any;
  actionTwo?: any;
  actionThree?: any;
  data?: any
};

const BranchCard = ({
  onPressEdit,
  onPressDelete,
  title,
  subTitle,
  price,
  icon,
  srNo,
  style,
  showOptions,
  actionOne,
  actionTwo,
  actionThree,
  data
}: Props) => {
  const navigations = useNavigation();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const [dropdown, setDown] = useState(false);


  return (
    <TouchableOpacity style={styles.boxContent} onPress={() => {
      showOptions && setDown(!dropdown)
    }}>
      <View style={styles.main}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={[styles.circleView, style]}>{icon}</View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.middleText}>{title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.detailText, { width: '60%' }]}>{subTitle}</Text>
              <Text
                style={[
                  styles.detailText,
                  {
                    color:
                      srNo == 'Pending'
                        ? '#ebae4f'
                        : srNo == 'reject'
                          ? 'red'
                          : '#000',
                  },
                ]}>
                {capitalizeFirstLetter(srNo)}
              </Text>
            </View>
          </View>
        </View>
        <Text style={styles.headingText}>{price}</Text>
      </View>

      {/* dropdown with options */}
      {dropdown &&
        <View style={styles.dropdown}>
          <PromptButton
            title={"accept"}
            onPress={actionOne}
          />

          <PromptButton
            title={"decline"}
            onPress={actionTwo}
            btnColor={"red"}
          />

          <PromptButton
            title={"Complete"}
            onPress={actionThree}
            btnColor={"purple"}
          />
        </View>
      }
    </TouchableOpacity>
  );
};

export default BranchCard;
