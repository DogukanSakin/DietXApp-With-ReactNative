/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, Alert} from 'react-native';
import MessageCard from '../../Components/Cards/Message Card';
import styles from './MessagesPage.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../Styles/Colors';
import InputBox from '../../Components/InputBox';
import currentUserInfo from '../../Utils/getUserInfo';
import database from '@react-native-firebase/database';
import parseContentData from '../../Utils/parseContentData';
import MessageContentInfoModal from '../../Components/Modals/Message Content Info Modal';
import Fonts from '../../Styles/Fonts';
import {showMessage} from 'react-native-flash-message';
import RoomSettingsModal from '../../Components/Modals/Room Setting Modal';
import SearchRoomUsersModal from '../../Components/Modals/Search Room Users Modal';
function MessagesPage({route, navigation}: any) {
  const {room} = route.params;

  const [messageInput, setMessageInput] = useState<string>();
  const [roomMessageData, setRoomMessageData] = useState<any>();
  const [messageContentInfoModalVisible, setMessageContentModalInfoVisible] =
    useState<boolean>(false);
  const [contentModalMessage, setContentModalMessage] = useState<any>();
  const [isTextInputEnabled, setIsTextInputEnabled] = useState<boolean>(true);
  const [roomSettingsModalVisible, setRoomSettingsModalVisible] =
    useState<boolean>(false);
  const [roomUsersModalVisible, setRoomUsersModalVisible] =
    useState<boolean>(false);
  useEffect(() => {
    getRoomMessageData();
    checkCurrentUserIsBanned();
  }, []);
  function handleMessageContentInfoModalVisible(item?: any) {
    if (room.admin === currentUserInfo.userID) {
      if (item) {
        setContentModalMessage(item);
      }
      setMessageContentModalInfoVisible(!messageContentInfoModalVisible);
    }
  }
  function handleModalVisible(visibleValue: boolean, setMethod: any) {
    setMethod(!visibleValue);
  }
  async function checkCurrentUserIsBanned() {
    //If the user is banned during the chat, they are now blocked from sending messages.
    await database()
      .ref(`rooms/${room.id}/bannedUsers/`)
      .on('value', function (snapshot) {
        snapshot.forEach(function (data): any {
          if (data.val().id === currentUserInfo.userID) {
            setIsTextInputEnabled(false);
          }
        });
      });
  }
  async function getRoomMessageData() {
    try {
      await database()
        .ref(`rooms/${room.id}/messages/`)
        .on('value', snapshot => {
          const fetchedData = snapshot.val();
          if (fetchedData != null) {
            const parsedData: any = parseContentData(fetchedData, true);
            setRoomMessageData(parsedData);
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  function leaveRoomDialogBox() {
    return Alert.alert(
      'Are your sure?',
      'Are you sure you want to leave the room? If there is a user other than you and you are the administrator for this room, the administration is transferred to one of these users. If not, your room will be deleted.',
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await database()
                .ref(`rooms/${room.id}/users/`)
                .once('value')
                .then(async snapshot => {
                  const fetchedData = snapshot.val();
                  const dataLength = fetchedData.length;
                  if (dataLength == 1) {
                    //If the room has only one member and the admin leaves the room voluntarily, the room is deleted
                    await database().ref(`rooms/${room.id}`).remove();
                    navigation.navigate('Forum');
                  } else {
                    //If a user other than the administrator is present in the room, the adminship is transferred to the first of these users.
                    if (room.admin === currentUserInfo.userID) {
                      database()
                        .ref(`rooms/${room.id}/`)
                        .update({admin: fetchedData[1].id});
                    }
                    updateUsersInRoomData(room, currentUserInfo.userID);
                    navigation.navigate('Forum');
                  }
                });
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  }
  async function handleSendMessage() {
    const messageInfo = {
      authorID: currentUserInfo.userID,
      authorName: currentUserInfo.userName,
      message: messageInput,
      sendTime: new Date().toISOString(),
    };
    await database().ref(`rooms/${room.id}/messages/`).push(messageInfo);
    setMessageInput('');
  }
  async function handleBanUser(userID: any, userName: any) {
    await database()
      .ref(`rooms/${room.id}/bannedUsers/`)
      .on('value', function (snapshot) {
        snapshot.forEach(function (data): any {
          if (data.val().id === userID) {
            showMessage({
              message: 'You have banned this user before!',
              type: 'danger',
              titleStyle: {fontFamily: Fonts.defaultRegularFont},
            });
          } else {
            database()
              .ref(`rooms/${room.id}/`)
              .update({
                bannedUsers: [
                  ...room.bannedUsers,
                  {id: userID, userName: userName},
                ],
              });
            showMessage({
              message: 'The user has been banned.',
              type: 'success',
              titleStyle: {fontFamily: Fonts.defaultRegularFont},
            });
            database()
              .ref(`rooms/${room.id}/messages/`)
              .on('value', function (snapshot) {
                snapshot.forEach(function (data): any {
                  if (data.val().authorID === userID) {
                    database()
                      .ref(`rooms/${room.id}/messages/${data.key}`)
                      .remove();
                  }
                });
              });
            updateUsersInRoomData(room, userID);
          }
        });
      });

    setMessageContentModalInfoVisible(false);
  }

  const renderMessages = ({item}: any) => (
    <MessageCard
      message={item}
      onOpenMessageContentInfo={() =>
        handleMessageContentInfoModalVisible(item)
      }
      roomAdmin={room.admin}
    />
  );
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/*If current user room's admin, this icon visible to them for room settings */}
        {room.admin === currentUserInfo.userID ? (
          <Icon
            name="cog"
            size={30}
            color={Colors.darkGreen}
            style={styles.iconContainer}
            onPress={() =>
              handleModalVisible(
                roomSettingsModalVisible,
                setRoomSettingsModalVisible,
              )
            }
          />
        ) : (
          <Icon
            name="account-multiple"
            size={30}
            color={Colors.darkGreen}
            style={styles.iconContainer}
            onPress={() =>
              handleModalVisible(
                roomUsersModalVisible,
                setRoomUsersModalVisible,
              )
            }
          />
        )}

        <Text style={styles.roomNameText}>Room: {room.name}</Text>
        <Icon
          name="chevron-right"
          size={30}
          color={Colors.darkGreen}
          style={styles.iconContainer}
          onPress={() => navigation.navigate('Forum')}
        />
      </View>

      <View style={styles.line} />
      <FlatList data={roomMessageData} renderItem={renderMessages} />
      <View style={styles.messageInputContainer}>
        <View style={styles.inputInnerContainer}>
          <InputBox
            placeholder="Message..."
            multiline
            value={messageInput}
            onChangeText={t => setMessageInput(t)}
            editable={isTextInputEnabled}
          />
        </View>
        <Icon
          name="send-circle"
          size={45}
          color={Colors.darkGreen}
          onPress={handleSendMessage}
        />
      </View>
      {contentModalMessage && (
        <MessageContentInfoModal
          isVisible={messageContentInfoModalVisible}
          onClose={() => handleMessageContentInfoModalVisible()}
          message={contentModalMessage}
          onBanUser={handleBanUser}
        />
      )}
      <RoomSettingsModal
        isVisible={roomSettingsModalVisible}
        onClose={() =>
          handleModalVisible(
            roomSettingsModalVisible,
            setRoomSettingsModalVisible,
          )
        }
        room={room}
        onLeaveRoom={leaveRoomDialogBox}
      />
      <SearchRoomUsersModal
        isVisible={roomUsersModalVisible}
        onClose={() =>
          handleModalVisible(roomUsersModalVisible, setRoomUsersModalVisible)
        }
        room={room}
        onLeaveRoom={leaveRoomDialogBox}
      />
    </View>
  );
}
async function updateUsersInRoomData(room: any, userID: any) {
  const result = await database()
    .ref(`rooms/${room.id}/users/`)
    .once('value')
    .then(snapshot => {
      if (snapshot.val()) {
        const fetchedData = snapshot.val();
        const filteredData = fetchedData.filter(
          (user: any) => user.id !== userID,
        );
        return filteredData;
      }
    });
  await database()
    .ref(`rooms/${room.id}/users/`)
    .set({...result});
}
export default MessagesPage;
