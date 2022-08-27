import React, {FC, useState} from 'react';
import {Text, View, FlatList} from 'react-native';
import Modal from 'react-native-modal';
import styles from './RoomSettingsModal.style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../../../Styles/Colors';
import InputBox from '../../InputBox';
import {Formik} from 'formik';
import MainButton from '../../Buttons/MainButton';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Fonts from '../../../Styles/Fonts';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import UserSearchCard from '../../Cards/User Search Card';
interface IFormValues {
  roomName: string;
  roomPassword: string;
}
interface IModalProps {
  isVisible: boolean;
  onClose: () => void;
  room: any;
  onLeaveRoom: () => void;
}

const RoomSettingsModal: FC<IModalProps> = ({
  isVisible,
  onClose,
  room,
  onLeaveRoom,
}) => {
  const Tab = createMaterialTopTabNavigator();
  function RoomSettingsPage() {
    return <RoomSettings room={room} onLeaveRoom={onLeaveRoom}></RoomSettings>;
  }
  function RoomUsersPage() {
    return <RoomUsers room={room}></RoomUsers>;
  }
  function RoomBannedUsersPage() {
    return <BannedUsers room={room}></BannedUsers>;
  }
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={onClose}
      onBackdropPress={onClose}
      style={styles.modalContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Icon
            name="chevron-left"
            size={30}
            color={Colors.iconColor}
            onPress={onClose}></Icon>
          <Text style={styles.titleText}>{room.name}'s Settings</Text>
        </View>
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              shadowColor: 'transparent',
              paddingTop: 15,
              elevation: 0,
            },
            tabBarIndicatorStyle: {opacity: 0},
            tabBarPressColor: 'transparent',
          }}>
          <Tab.Screen
            name="RoomSettings"
            component={RoomSettingsPage}
            options={{
              tabBarLabel: ({focused}) => {
                return (
                  <Text
                    style={{
                      color: focused ? Colors.darkGreen : Colors.textColor,
                      fontFamily: Fonts.defaultRegularFont,
                      fontSize: 17,
                    }}>
                    Room Settings
                  </Text>
                );
              },
            }}
          />
          <Tab.Screen
            name="RoomUsers"
            component={RoomUsersPage}
            options={{
              tabBarLabel: ({focused}) => {
                return (
                  <Text
                    style={{
                      color: focused ? Colors.darkGreen : Colors.textColor,
                      fontFamily: Fonts.defaultRegularFont,
                      fontSize: 17,
                    }}>
                    Users
                  </Text>
                );
              },
            }}
          />
          <Tab.Screen
            name="RoomBannedUsers"
            component={RoomBannedUsersPage}
            options={{
              tabBarLabel: ({focused}) => {
                return (
                  <Text
                    style={{
                      color: focused ? Colors.darkGreen : Colors.textColor,
                      fontFamily: Fonts.defaultRegularFont,
                      fontSize: 17,
                    }}>
                    Banned Users
                  </Text>
                );
              },
            }}
          />
        </Tab.Navigator>
      </View>
    </Modal>
  );
};
function RoomSettings({room, onLeaveRoom}: any) {
  const navigation = useNavigation();
  const initialFormValues: IFormValues = {
    roomName: room.name,
    roomPassword: room.isPrivate ? room.password : '',
  };
  const [loading, setLoading] = useState<boolean>(false);
  async function handleUpdateRoomValues(formValues: any) {
    const checkRoomName = formValues.roomName.trim();
    if (checkRoomName !== '') {
      try {
        setLoading(true);
        formValues.roomPassword = formValues.roomPassword.trim();
        const newRoomValues = {
          name: formValues.roomName,
          isPrivate: formValues.roomPassword != '' ? true : false,
          password:
            formValues.roomPassword != '' ? formValues.roomPassword : null,
        };
        await database().ref(`rooms/${room.id}/`).update(newRoomValues);
        navigation.navigate('Forum' as never);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  }
  return (
    <View style={styles.pageContainer}>
      <View style={styles.formContainer}>
        <Formik
          initialValues={initialFormValues}
          onSubmit={handleUpdateRoomValues}>
          {({values, handleChange, handleSubmit}) => (
            <>
              <Text style={styles.placeHolderText}>Change room name:</Text>
              <InputBox
                iconName="rename-box"
                onChangeText={handleChange('roomName')}
                value={values.roomName}></InputBox>

              <View style={styles.line}></View>
              <Text style={styles.placeHolderText}>
                Change room password: (Optional)
              </Text>
              <InputBox
                iconName="lock"
                onChangeText={handleChange('roomPassword')}
                value={values.roomPassword}
                secureTextEntry={true}></InputBox>
              <Text style={styles.placeHolderText}>
                *If you want to make the room public, just delete the password
                and save it.{' '}
              </Text>
              <MainButton
                title="Save changes"
                onPress={handleSubmit}
                loading={loading}></MainButton>
            </>
          )}
        </Formik>
      </View>

      <Text style={styles.leaveRoomButton} onPress={onLeaveRoom}>
        Leave the room{' '}
      </Text>
    </View>
  );
}
function RoomUsers({room}: any) {
  const renderUser = ({item}: any) => (
    <UserSearchCard user={item}></UserSearchCard>
  );
  const [roomUsers, setRoomUsers] = useState<any>(room.users);
  return (
    <View style={styles.pageContainer}>
      <InputBox
        iconName="magnify"
        placeholder="Search room members..."
        onChangeText={t => filterUsers(t, room.users, setRoomUsers)}></InputBox>
      <FlatList data={roomUsers} renderItem={renderUser}></FlatList>
    </View>
  );
}
function BannedUsers({room}: any) {
  const [bannedUsers, setBannedUsers] = useState<any>(room.bannedUsers);
  const renderBannedUser = ({item}: any) => (
    <UserSearchCard
      user={item}
      unBanButtonVisible={true}
      onUnBanUser={handleUnBanUser}></UserSearchCard>
  );
  async function handleUnBanUser(user: any) {
    const filteredRoomBannedList = room.bannedUsers.filter(
      (bannedUsers: any) => {
        return bannedUsers.id !== user.id;
      },
    );
    setBannedUsers(filteredRoomBannedList);
    await database()
      .ref(`rooms/${room.id}/bannedUsers/`)
      .set({...filteredRoomBannedList});
  }
  return (
    <View style={styles.pageContainer}>
      <InputBox
        iconName="magnify"
        placeholder="Search room members..."
        onChangeText={t =>
          filterUsers(t, room.bannedUsers, setBannedUsers)
        }></InputBox>
      <FlatList data={bannedUsers} renderItem={renderBannedUser}></FlatList>
    </View>
  );
}
//common function for two pages
function filterUsers(searchedUserName: string, userData: any, dataSet: any) {
  const filteredList = userData.filter((user: any) => {
    const currentUserName = user.userName.trim().toLowerCase();
    const searchedName = searchedUserName.trim().toLowerCase();
    return currentUserName.indexOf(searchedName) > -1;
  });
  dataSet(filteredList);
}
export default RoomSettingsModal;
