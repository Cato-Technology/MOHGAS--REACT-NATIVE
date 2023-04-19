import {View, Text, Button} from 'react-native';
import React from 'react';
import AuthContext from '../../utils/auth-context';

const Profile = () => {
  const auth = React.useContext(AuthContext);
  return (
    <View>
      <Text>Profile</Text>
      <Button title="LogOut" onPress={() => auth.authContext.signOut()} />
    </View>
  );
};

export default Profile;
