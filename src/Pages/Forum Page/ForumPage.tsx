/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import styles from './ForumPage.style';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Colors from '../../Styles/Colors';
import Fonts from '../../Styles/Fonts';
import InputBox from '../../Components/InputBox';
import RoomCard from '../../Components/Cards/Room Card';
import FloatingButton from '../../Components/Buttons/Floating Button';
import CreateRoomModal from '../../Components/Modals/Create Room Modal';
import database from '@react-native-firebase/database';
import {showMessage} from 'react-native-flash-message';
import parseContentData from '../../Utils/parseContentData';
import CheckRoomPasswordModal from '../../Components/Modals/CheckRoomPasswordModal';
import currentUserInfo from '../../Utils/getUserInfo';
const Tab = createMaterialTopTabNavigator();
const deviceSize = Dimensions.get('window');
function ForumPage() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {shadowColor: 'transparent', paddingTop: 15, elevation: 0},
        tabBarIndicatorStyle: {opacity: 0},
        tabBarPressColor: 'transparent',
      }}>
      <Tab.Screen
        name="SearchFoodsAndDrinks"
        component={AllRooms}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.darkGreen : '',
                  padding: 10,
                  borderRadius: 100,
                  width: deviceSize.width / 2.5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: focused ? 'white' : Colors.textColor,
                    fontFamily: Fonts.defaultRegularFont,
                    fontSize: 18,
                  }}>
                  All Rooms
                </Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="SearchUsers"
        component={MyRooms}
        options={{
          tabBarLabel: ({focused}) => {
            return (
              <View
                style={{
                  backgroundColor: focused ? Colors.darkGreen : '',
                  padding: 10,
                  borderRadius: 100,
                  width: deviceSize.width / 2.5,
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    color: focused ? 'white' : Colors.textColor,
                    fontFamily: Fonts.defaultRegularFont,
                    fontSize: 18,
                  }}>
                  My Rooms
                </Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
const MyRooms = ({navigation}: any) => {
  const [myRoomsData, setMyRoomsData] = useState<any>([]);
  const [filteredRoomData, setFilteredRoomData] = useState<any>(null);
  const [checkRoomPasswordModalVisible, setCheckRoomPasswordModalVisible] =
    useState<boolean>(false);
  const [roomForCheckPassword, setRoomForCheckPassword] = useState<any>({});
  useEffect(() => {
    fetchMyRoomsData();
  }, []);
  async function fetchMyRoomsData() {
    try {
      const fetchedDataArray: any = [];
      await database()
        .ref('rooms')
        .orderByChild('users')
        .on('value', function (snapshot) {
          snapshot.forEach(function (data): any {
            if (data.val().users[0].id === currentUserInfo.userID) {
              fetchedDataArray.push(data.val());
            }
          });
          setMyRoomsData(fetchedDataArray);
        });
    } catch (error) {
      console.log(error);
    }
  }
  const renderRooms = ({item}: any) => (
    <RoomCard
      room={item}
      onPress={() =>
        goMessagesPage(
          item,
          setRoomForCheckPassword,
          setCheckRoomPasswordModalVisible,
          navigation,
        )
      }
    />
  );
  return (
    <View style={styles.container}>
      <InputBox
        iconName="magnify"
        placeholder="Search in my rooms..."
        onChangeText={t =>
          searchInRooms(t, setFilteredRoomData, filteredRoomData, myRoomsData)
        }
      />
      {filteredRoomData ? (
        <FlatList
          data={filteredRoomData}
          renderItem={renderRooms}
          numColumns={2}
        />
      ) : (
        <FlatList data={myRoomsData} renderItem={renderRooms} numColumns={2} />
      )}
      <CheckRoomPasswordModal
        isVisible={checkRoomPasswordModalVisible}
        onClose={() =>
          handleModalVisible(
            setCheckRoomPasswordModalVisible,
            checkRoomPasswordModalVisible,
          )
        }
        room={roomForCheckPassword}
      />
    </View>
  );
};
const AllRooms = ({navigation}: any) => {
  const [createRoomModalVisible, setCreateRoomVisible] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<any>(false);
  const [roomsData, setRoomsData] = useState<any>([]);
  const [filteredRoomData, setFilteredRoomData] = useState<any>(null);
  const [checkRoomPasswordModalVisible, setCheckRoomPasswordModalVisible] =
    useState<boolean>(false);
  const [roomForCheckPassword, setRoomForCheckPassword] = useState<any>();
  useEffect(() => {
    fetchRoomData();
  }, []);

  async function fetchRoomData() {
    await database()
      .ref('rooms/')
      .on('value', snapshot => {
        const fetchedData = snapshot.val();
        if (fetchedData != null) {
          try {
            const parsedData: any = parseContentData(fetchedData);
            setRoomsData(parsedData);
          } catch (error) {
            console.log(error);
          }
        } else {
          setRoomsData([]);
          setFilteredRoomData(null);
        }
      });
  }
  async function createARoom(roomName: string, roomPassword: string) {
    try {
      setLoading(true);
      const roomInfo = {
        name: roomName,
        password: roomPassword ? roomPassword : null,
        admin: currentUserInfo.userID,
        isPrivate: roomPassword ? true : false,
        users: [
          {id: currentUserInfo.userID, userName: currentUserInfo.userName},
        ],
      };
      await database().ref('rooms/').push(roomInfo);
      setLoading(false);
      showMessage({
        message: 'Your room was successfuly created!',
        type: 'success',
        titleStyle: {fontFamily: Fonts.defaultRegularFont},
      });
      setCreateRoomVisible(false);
    } catch (error) {
      setCreateRoomVisible(false);
      setLoading(false);
      showMessage({
        message: 'Opps... There is an error!',
        type: 'danger',
        titleStyle: {fontFamily: Fonts.defaultRegularFont},
      });
    }
  }
  const renderRooms = ({item}: any) => (
    <RoomCard
      room={item}
      onPress={() =>
        goMessagesPage(
          item,
          setRoomForCheckPassword,
          setCheckRoomPasswordModalVisible,
          navigation,
        )
      }
    />
  );
  return (
    <View style={styles.container}>
      <InputBox
        iconName="magnify"
        placeholder="Search in all rooms..."
        onChangeText={t =>
          searchInRooms(t, setFilteredRoomData, filteredRoomData, roomsData)
        }
      />
      {filteredRoomData ? (
        <FlatList
          data={filteredRoomData}
          renderItem={renderRooms}
          numColumns={2}
        />
      ) : (
        <FlatList data={roomsData} renderItem={renderRooms} numColumns={2} />
      )}
      <FloatingButton
        onPress={() =>
          handleModalVisible(setCreateRoomVisible, createRoomModalVisible)
        }
      />
      <CreateRoomModal
        isVisible={createRoomModalVisible}
        onClose={() =>
          handleModalVisible(setCreateRoomVisible, createRoomModalVisible)
        }
        onCreateRoom={createARoom}
        loading={loading}
      />
      <CheckRoomPasswordModal
        isVisible={checkRoomPasswordModalVisible}
        onClose={() =>
          handleModalVisible(
            setCheckRoomPasswordModalVisible,
            checkRoomPasswordModalVisible,
          )
        }
        room={roomForCheckPassword}
      />
    </View>
  );
};
//---------------------------------------------------------------------------------------
//common functions for two pages
//This function is copies the data sent to it and performs a search according to the value sent in it.
//This function is used both in the section where all rooms are and in the part where the rooms of which the user is a member are shown.
function searchInRooms(
  roomName: string,
  filteredDataSet: any,
  filteredData: any,
  currentData: any,
) {
  roomName = roomName.trim();
  if (roomName === '') {
    filteredDataSet(null);
  } else {
    filteredDataSet(currentData);
    if (filteredData) {
      const result = filteredData.filter((room: any) => {
        roomName = roomName.toLowerCase();
        const currentRoomName = room.name.toLowerCase();
        return currentRoomName.indexOf(roomName) > -1;
      });
      if (result) {
        filteredDataSet(result);
      }
    }
  }
}
//For modals:
function handleModalVisible(setModalFunction: any, modalVisibleValue: boolean) {
  setModalFunction(!modalVisibleValue);
}

async function goMessagesPage(
  room: any,
  roomPassword: any,
  modalVisible: any,
  navigation: any,
) {
  await database()
    .ref(`rooms/${room.id}/bannedUsers/`)
    .once('value', async function (snapshot) {
      const isUserBanned = await snapshot.forEach(function (data): any {
        //We are checking if current user is banned
        if (data.val().id === currentUserInfo.userID) {
          showMessage({
            message: 'You cannot enter this room because you are banned.',
            type: 'info',
            titleStyle: {fontFamily: Fonts.defaultRegularFont},
          });
          return true;
        }
        return false;
      });
      if (isUserBanned === false) {
        if (room.isPrivate && currentUserInfo.userID !== room.admin) {
          roomPassword(room);
          modalVisible(true);
        } else {
          if (currentUserInfo.userID) {
            database()
              .ref(`rooms/${room.id}/users`)
              .orderByChild('users')
              .once('value', function (snapshot) {
                let isUserRegisteredTheRoom = false;
                snapshot.forEach(function (data): any {
                  //If current user is included in the room members, directly go message page
                  if (data.val().id === currentUserInfo.userID) {
                    navigation.navigate('Messages', {room});
                    isUserRegisteredTheRoom = true;
                  }
                });
                if (isUserRegisteredTheRoom === false) {
                  //If the user is not among the members of the room, it is first registered and then go message page.
                  database()
                    .ref(`rooms/${room.id}/`)
                    .update({
                      users: [
                        ...room.users,
                        {
                          id: currentUserInfo.userID,
                          userName: currentUserInfo.userName,
                        },
                      ],
                    });
                  navigation.navigate('Messages', {room});
                }
              });
          }
        }
      }
    });
}

export default ForumPage;
