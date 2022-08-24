import React from 'react';
import {Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
function ProfilePage() {
  return (
    <View>
      <Text>Profile Page!</Text>
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </View>
  );
}
export default ProfilePage;
