import {useNavigation, useTheme} from '@react-navigation/native';
import React from 'react';
import {Text, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {ArrowBack, IndianRupee} from '../../assets/images/svgs';
import Icon from 'react-native-vector-icons/AntDesign';
import SCREENS from '../../utils/constants';
import makeStyles from './styles';
import AuthContext from '../../utils/auth-context';

type Props = {
  title?: string;
  isColor?: boolean;
  isBold?: boolean;
  titleStyle?: any;
  back?: boolean;
  addIcon?: boolean;
  disableData?: boolean;
};

const Header = (props: Props) => {
  const navigations = useNavigation();
  const authContext = React.useContext(AuthContext);
  const {colors} = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.header}>
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
        <Text style={[styles.title, props.titleStyle]}>{props.title}</Text>
      )}

      {!props?.disableData && (
        <>
          <View
            style={{
              position: 'absolute',
              right: 10,
              flexDirection: 'row',
            }}>
            {props?.addIcon && (
              <Icon
                name="pluscircle"
                size={22}
                color={colors.secondary}
                style={{marginRight: 10, marginTop: 2}}
                onPress={() => navigations.navigate(SCREENS.DEPOSIT)}
              />
            )}
            <View style={{marginTop: 4}}>
              <IndianRupee fill={colors.secondary} />
            </View>
            <Text
              style={{
                color: colors.text,
                fontSize: 20,
              }}>
              {authContext?.userData?.credit}
            </Text>
          </View>
        </>
      )}
    </View>
  );
};

export default Header;
