import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {ArrowBack, IndianRupee} from '../../assets/images/svgs';

import SCREENS from '../../utils/constants';
import makeStyles from './styles';
import AuthContext from '../../utils/auth-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type Props = {
  title?: string;
  subTitle?: string;
  isColor?: boolean;
  isBold?: boolean;
  titleStyle?: any;
  back?: boolean;
  addIcon?: boolean;
  disableData?: boolean;
  contentStyle?: any;
  rightIcon?: any;
};

const HeaderBottom = (props: Props) => {
  const navigations = useNavigation();
  const authContext = React.useContext(AuthContext);
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={[styles.header, props.contentStyle]}>
      <View
        style={{
          width: '100%',
        }}>
        {props.title && (
          <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
        )}
        {props.subTitle && (
          <Text style={[styles.subTitle, props.titleStyle]}>
            {props.subTitle}
          </Text>
        )}
      </View>
    </View>
  );
};

export default HeaderBottom;
