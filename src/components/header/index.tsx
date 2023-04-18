import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {ArrowBack, IndianRupee} from '../../assets/images/svgs';

import SCREENS from '../../utils/constants';
import makeStyles from './styles';
import AuthContext from '../../utils/auth-context';

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

const Header = (props: Props) => {
  const navigations = useNavigation();
  const authContext = React.useContext(AuthContext);
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={[styles.header, props.contentStyle]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        {props.back && (
          <TouchableRipple
            borderless
            style={styles.ripple}
            onPress={() => navigations.goBack()}
            rippleColor={'#8493AE20'}>
            <ArrowBack fill={colors.text} />
          </TouchableRipple>
        )}
        {props.title && (
          <View>
            <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
            <Text style={[styles.subTitle]}>{props.subTitle}</Text>
          </View>
        )}
        {props.rightIcon}
      </View>
    </View>
  );
};

export default Header;
