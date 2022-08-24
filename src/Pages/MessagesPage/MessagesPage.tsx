import React from 'react';
import {Text, View, FlatList} from 'react-native';
import MessageCard from '../../Components/Cards/Message Card';
import styles from './MessagesPage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Styles/Colors';
import InputBox from '../../Components/InputBox';
import auth from '@react-native-firebase/auth';
function MessagesPage({route}: any) {
  const {room} = route.params;
  const currentUserUID = auth().currentUser?.uid;
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {room.admin === currentUserUID ? (
          <Icon
            name="cog"
            size={30}
            color={Colors.darkGreen}
            style={styles.iconContainer}
          />
        ) : (
          <Icon
            name="account-multiple"
            size={30}
            color={Colors.darkGreen}
            style={styles.iconContainer}
          />
        )}

        <Text style={styles.roomNameText}>Room: {room.name}</Text>
        <Icon
          name="logout"
          size={30}
          color={Colors.darkGreen}
          style={styles.iconContainer}
        />
      </View>

      <View style={styles.line} />
      <FlatList data={null} renderItem={null} />
      <View style={styles.messageInputContainer}>
        <View style={styles.inputInnerContainer}>
          <InputBox placeholder="Message..." multiline />
        </View>
        <Icon
          name="send"
          size={30}
          color={Colors.darkGreen}
          style={styles.iconContainer}
        />
      </View>
    </View>
  );
}
export default MessagesPage;
