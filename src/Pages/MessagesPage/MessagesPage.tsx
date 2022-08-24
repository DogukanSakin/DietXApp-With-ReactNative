import React from 'react';
import {Text, View} from 'react-native';
function MessagesPage({route}: any) {
  const {room} = route.params;
  console.log(room);

  return (
    <View>
      <Text />
    </View>
  );
}
export default MessagesPage;
