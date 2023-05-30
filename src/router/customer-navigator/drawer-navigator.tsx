import React from 'react';
import {Text, View} from 'react-native';
import SCREENS from '../../utils/constants';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
//import EditProfile from '../cutstomer/screens/home/edit-profile';

import BottomTabNavigator from './bottom-tab-navigator';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Fontisto';
import Icon4 from 'react-native-vector-icons/MaterialIcons';

import {Avatar} from 'react-native-paper';
import aImage from '../../assets/avatar.jpg';
import EditUsername from '../../screens/customer/home/edit-username';

import AuthContext from '../../utils/auth-context';
import EditEmail from '../../screens/customer/home/edit-email';
import ForgetPassword from '../../screens/auth/forget-password';
const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  const auth = React.useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={{marginTop: 10, paddingHorizontal: 10}}>
        <Icon2
          name="arrow-back"
          size={30}
          color="#000000"
          onPress={() => props.navigation.closeDrawer()}
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',

            alignItems: 'center',
            marginTop: 10,
          }}>
          <Avatar.Image size={45} source={aImage} />
          <View style={{marginLeft: 10}}>
            <Text style={{fontFamily: 'Rubik-Bold', fontSize: 22}}>
              {auth?.userData?.full_name}
            </Text>
            <Text style={{fontSize: 12, textAlign: 'left'}}>
              {auth?.userData?.email}
            </Text>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Edit Profile"
        labelStyle={{color: '#000000'}}
        style={{marginVertical: -4, borderRadius: 0}}
        onPress={() =>
          props.navigation.navigate(SCREENS.PROFILE_NAVIGATOR, {
            screen: SCREENS.EDIT_PROFILE,
          })
        }
        icon={() => <Icon name="edit" size={20} color="#000000" />}
      />
      <DrawerItem
        label="Logout"
        labelStyle={{color: '#000000'}}
        style={{marginVertical: -4, borderRadius: 0}}
        onPress={() => auth.authContext.signOut()}
        icon={() => <Icon4 name="logout" size={22} color="#000000" />}
      />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerItemStyle: {
          marginVertical: -4,
          borderRadius: 0,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={SCREENS.MAIN_NAVIGATOR}
        component={BottomTabNavigator}
      />

      <Drawer.Screen
        name={SCREENS.EDIT_USERNAME}
        component={EditUsername}
        options={{
          drawerLabel: 'Username',
          drawerLabelStyle: {color: '#000000', fontSize: 16},
          drawerIcon: ({color, number, focused}) => {
            //set the icon for all screens
            return <Icon2 name="person-outline" size={20} color="#000000" />;
          },
        }}
      />
      <Drawer.Screen
        name={SCREENS.EDIT_EMAIL}
        component={EditEmail}
        options={{
          drawerLabel: 'Email',
          drawerLabelStyle: {color: '#000000', fontSize: 16},
          drawerIcon: ({color, number, focused}) => {
            //set the icon for all screens
            return <Icon3 name="email" size={20} color="#000000" />;
          },
        }}
      />
      <Drawer.Screen
        name={SCREENS.PASSWORD}
        component={ForgetPassword}
        options={{
          drawerLabel: 'Password',
          drawerLabelStyle: {color: '#000000', fontSize: 16},
          drawerIcon: ({color, number, focused}) => {
            //set the icon for all screens
            return (
              <Icon2 name="ios-lock-closed-outline" size={20} color="#000000" />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
};
export default DrawerNavigator;
