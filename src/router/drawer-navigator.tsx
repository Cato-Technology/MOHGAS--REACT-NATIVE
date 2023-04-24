import React from 'react';
import {Text, View} from 'react-native';
import SCREENS from '../utils/constants';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import EditProfile from '../screens/home/edit-profile';
import EditEmail from '../screens/home/edit-email';
import BottomTabNavigator from './bottom-tab-navigator';
import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Icon3 from 'react-native-vector-icons/Fontisto';
import Icon4 from 'react-native-vector-icons/MaterialIcons';

import {Avatar} from 'react-native-paper';
import aImage from '../assets/avatar.jpg';
import EditUsername from '../screens/home/edit-username';
import ForgetPassword from '../screens/auth/forget-password';
import AuthContext from '../utils/auth-context';
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
            justifyContent: 'space-around',

            alignItems: 'center',
            marginTop: 10,
          }}>
          <Avatar.Image size={45} source={aImage} />
          <View>
            <Text style={{fontWeight: 'bold', fontSize: 22}}>Emeka Adams</Text>
            <Text style={{fontSize: 12}}>waqarhussain4154@gmail.com</Text>
          </View>
        </View>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelStyle={{color: '#000000'}}
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
          marginVertical: -6,
          borderRadius: 0,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name={SCREENS.MAIN_NAVIGATOR}
        component={BottomTabNavigator}
      />
      <Drawer.Screen
        name={SCREENS.EDIT_PROFILE}
        component={EditProfile}
        options={{
          drawerLabel: 'Edit Profile',
          drawerLabelStyle: {color: '#000000', fontSize: 16},
          drawerIcon: ({color, number, focused}) => {
            //set the icon for all screens
            return <Icon name="edit" size={20} color="#000000" />;
          },
        }}
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
